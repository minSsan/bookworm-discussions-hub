
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, MessageSquare, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import { mockDiscussions, mockBooks } from '../data/mockData';

const ITEMS_PER_PAGE = 10;

const Discussions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const bookIdFilter = searchParams.get('bookId');
  
  // Sort discussions by date (newest first)
  const sortedDiscussions = [...mockDiscussions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Filter by bookId if specified
  const bookFilteredDiscussions = bookIdFilter 
    ? sortedDiscussions.filter(discussion => discussion.bookId === bookIdFilter)
    : sortedDiscussions;
  
  const filteredDiscussions = bookFilteredDiscussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredDiscussions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDiscussions = filteredDiscussions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const getBookTitle = (bookId: string) => {
    const book = mockBooks.find(b => b.id === bookId);
    return book?.title || '알 수 없는 도서';
  };

  const filteredBook = bookIdFilter ? mockBooks.find(b => b.id === bookIdFilter) : null;

  const clearBookFilter = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const setBookFilter = (bookId: string) => {
    setSearchParams({ bookId });
    setCurrentPage(1);
  };

  // Get unique books that have discussions
  const booksWithDiscussions = mockBooks.filter(book => 
    mockDiscussions.some(discussion => discussion.bookId === book.id)
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [bookIdFilter, searchTerm]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">토론 게시판</h1>
          <p className="text-gray-600 mb-6">
            개발 서적에 대한 다양한 토론에 참여해보세요
          </p>

          {/* Book Filter Display */}
          {filteredBook && (
            <div className="mb-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm text-blue-700">
                  <strong>{filteredBook.title}</strong> 관련 토론
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearBookFilter}
                  className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

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
                onClick={clearBookFilter}
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
              <Link to={`/discussions/${discussion.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">
                        {discussion.title}
                      </CardTitle>
                      <Badge variant="outline" className="mb-2">
                        {getBookTitle(discussion.bookId)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 ml-4">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {discussion.likes}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {discussion.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{discussion.author}</span>
                    <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        
        {filteredDiscussions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {bookIdFilter ? '해당 서적에 대한 토론이 없습니다.' : '검색 결과가 없습니다.'}
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
