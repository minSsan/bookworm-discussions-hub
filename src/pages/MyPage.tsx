
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import { mockUser, mockDiscussions, mockBooks } from '../data/mockData';

const MyPage = () => {
  const user = mockUser;
  
  // Get user's discussions
  const myDiscussions = mockDiscussions.filter(d => d.authorId === user.id);
  const participatedDiscussions = mockDiscussions.filter(d => 
    d.comments.some(c => c.authorId === user.id)
  );
  
  const getBookTitle = (bookId: string) => {
    const book = mockBooks.find(b => b.id === bookId);
    return book?.title || '알 수 없는 도서';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.purchasedBooks.length}</div>
                <div className="text-sm text-gray-600">구매한 도서</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{myDiscussions.length}</div>
                <div className="text-sm text-gray-600">작성한 토론</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{participatedDiscussions.length}</div>
                <div className="text-sm text-gray-600">참여한 토론</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {myDiscussions.reduce((sum, d) => sum + d.likes, 0)}
                </div>
                <div className="text-sm text-gray-600">받은 좋아요</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs */}
        <Tabs defaultValue="my-discussions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-discussions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              내가 작성한 토론
            </TabsTrigger>
            <TabsTrigger value="participated-discussions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              참여한 토론
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-discussions" className="space-y-4">
            {myDiscussions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  아직 작성한 토론이 없습니다.
                </CardContent>
              </Card>
            ) : (
              myDiscussions.map((discussion) => (
                <Link key={discussion.id} to={`/discussions/${discussion.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            {discussion.title}
                          </CardTitle>
                          <Badge variant="outline" className="mb-2">
                            {getBookTitle(discussion.bookId)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 ml-4">
                          좋아요 {discussion.likes}개
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {discussion.content}
                      </p>
                      <div className="text-sm text-gray-500">
                        {new Date(discussion.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="participated-discussions" className="space-y-4">
            {participatedDiscussions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  아직 참여한 토론이 없습니다.
                </CardContent>
              </Card>
            ) : (
              participatedDiscussions.map((discussion) => (
                <Link key={discussion.id} to={`/discussions/${discussion.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            {discussion.title}
                          </CardTitle>
                          <Badge variant="outline" className="mb-2">
                            {getBookTitle(discussion.bookId)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 ml-4">
                          좋아요 {discussion.likes}개
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {discussion.content}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>작성자: {discussion.author}</span>
                        <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyPage;
