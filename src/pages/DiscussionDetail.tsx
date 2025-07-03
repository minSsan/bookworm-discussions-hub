
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { mockDiscussions, mockBooks, mockChapters } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const DiscussionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  
  const discussion = mockDiscussions.find(d => d.id === id);
  const book = discussion ? mockBooks.find(b => b.id === discussion.bookId) : null;
  const chapter = discussion?.chapterId ? mockChapters.find(c => c.id === discussion.chapterId) : null;
  
  // Redirect to home if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (!discussion || !book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">토론을 찾을 수 없습니다.</p>
          </div>
        </main>
      </div>
    );
  }

  useState(() => {
    setLikes(discussion.likes);
    setIsLiked(discussion.isLiked || false);
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    toast.success(isLiked ? '좋아요를 취소했습니다.' : '좋아요를 추가했습니다.');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return;
    }

    const comment = {
      id: Date.now().toString(),
      discussionId: discussion.id,
      content: newComment,
      author: user.name,
      authorId: user.id,
      createdAt: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast.success('댓글이 추가되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/discussions" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            토론 목록으로 돌아가기
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-4">{discussion.title}</CardTitle>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">
                    {book.title}
                  </Badge>
                  {chapter && (
                    <Badge variant="secondary">
                      {chapter.title}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{discussion.author}</span>
                  <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{discussion.content}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                좋아요 {likes}
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MessageSquare className="h-4 w-4" />
                댓글 {comments.length}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 작성 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">댓글 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="댓글을 입력해주세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleAddComment}>댓글 추가</Button>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
          
          {comments.length === 0 && (
            <Card>
              <CardContent className="pt-4">
                <p className="text-center text-gray-500">아직 댓글이 없습니다.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default DiscussionDetail;
