
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, MessageSquare, X, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import { mockDiscussions, mockBooks, mockChapters } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

const Discussions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const bookIdFilter = searchParams.get('bookId');
  const chapterIdFilter = searchParams.get('chapterId');
  
  // Sort discussions by date (newest first)
  const sortedDiscussions = [...mockDiscussions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Filter by bookId if specified
  let filteredDiscussions = bookIdFilter 
    ? sortedDiscussions.filter(discussion => discussion.bookId === bookIdFilter)
    : sortedDiscussions;
    
  // Filter by chapterId if specified
  if (chapterIdFilter) {
    filteredDiscussions = filteredDiscussions.filter(discussion => discussion.chapterId === chapterIdFilter);
  }
  
  // Filter by search term
  const searchFilteredDiscussions = filteredDiscussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(searchFilteredDiscussions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDiscussions = searchFilteredDiscussions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const getBookTitle = (bookId: string) => {
    const book = mockBooks.find(b => b.id === bookId);
    return book?.title || '알 수 없는 도서';
  };

  const getChapterTitle = (chapterId: string) => {
    const chapter = mockChapters.find(c => c.id === chapterId);
    return chapter?.title || '';
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const setBookFilter = (bookId: string) => {
    setSearchParams({ bookId });
    setCurrentPage(1);
  };

  const setChapterFilter = (chapterId: string) => {
    const chapter = mockChapters.find(c => c.id === chapterId);
    if (chapter) {
      setSearchParams({ bookId: chapter.bookId, chapterId });
    }
    setCurrentPage(1);
  };

  // Get unique books that have discussions
  const booksWithDiscussions = mockBooks.filter(book => 
    mockDiscussions.some(discussion => discussion.bookId === book.id)
  );

  // Get chapters for the selected book
  const chaptersForSelectedBook = bookIdFilter 
    ? mockChapters.filter(c => c.bookId === bookIdFilter && mockDiscussions.some(d => d.chapterId === c.id))
    : [];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [bookIdFilter, chapterIdFilter, searchTerm]);

  const handleDiscussionClick = (discussionId: string) => {
    if (!user) {
      toast.error('게시글을 보려면 로그인이 필요합니다.');
      return;
    }
    navigate(`/discussions/${discussionId}`);
  };

  const handleCreateDiscussion = () => {
    if (!user) {
      toast.error('게시글을 작성하려면 로그인이 필요합니다.');
      return;
    }
    navigate('/discussions/create');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">토론 게시판</h1>
            <Button onClick={handleCreateDiscussion}>
              <Plus className="h-4 w-4 mr-2" />
              작성하기
            </Button>
          </div>
          <p className="text-gray-600 mb-6">
            개발 서적에 대한 다양한 토론에 참여해보세요
          </p>

          {/* Book Filter Buttons */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">서적별 필터</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!bookIdFilter ? "default" : "outline"}
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                전체
              </Button>
              {booksWithDiscussions.map((book) => (
                <Button
                  key={book.id}
                  variant={bookIdFilter === book.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBookFilter(book.id)}
                  className="text-xs"
                >
                  {book.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Chapter Filter Buttons */}
          {bookIdFilter && chaptersForSelectedBook.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">챕터별 필터</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!chapterIdFilter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchParams({ bookId: bookIdFilter })}
                  className="text-xs"
                >
                  전체 챕터
                </Button>
                {chaptersForSelectedBook.map((chapter) => (
                  <Button
                    key={chapter.id}
                    variant={chapterIdFilter === chapter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChapterFilter(chapter.id)}
                    className="text-xs"
                  >
                    {chapter.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="토론 제목, 내용, 작성자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Discussion List */}
        <div className="space-y-4 mb-8">
          {paginatedDiscussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <div onClick={() => handleDiscussionClick(discussion.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">
                        {discussion.title}
                      </CardTitle>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline">
                          {getBookTitle(discussion.bookId)}
                        </Badge>
                        {discussion.chapterId && (
                          <Badge variant="secondary">
                            {getChapterTitle(discussion.chapterId)}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 ml-4">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {discussion.likes}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {discussion.content.length > 100 
                      ? discussion.content.substring(0, 100) + '...' 
                      : discussion.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{discussion.author}</span>
                    <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        {searchFilteredDiscussions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {bookIdFilter || chapterIdFilter ? '해당 조건의 토론이 없습니다.' : '검색 결과가 없습니다.'}
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default Discussions;
