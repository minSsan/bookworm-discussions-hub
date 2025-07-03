
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { mockBooks, mockChapters } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const CreateDiscussion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    bookId: '',
    chapterId: '',
    content: ''
  });

  if (!user) {
    navigate('/discussions');
    return null;
  }

  const selectedBookChapters = mockChapters.filter(c => c.bookId === formData.bookId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }
    
    if (formData.title.length > 50) {
      toast.error('제목은 50자 이내로 입력해주세요.');
      return;
    }
    
    if (!formData.bookId) {
      toast.error('서적을 선택해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('본문을 입력해주세요.');
      return;
    }
    
    if (formData.content.length < 20) {
      toast.error('본문은 20자 이상 입력해주세요.');
      return;
    }

    // 실제로는 서버에 게시글을 저장하는 로직이 들어갑니다
    toast.success('게시글이 작성되었습니다.');
    navigate('/discussions');
  };

  const handleBookChange = (bookId: string) => {
    setFormData({ ...formData, bookId, chapterId: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/discussions')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            토론 게시판으로 돌아가기
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>새 토론 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="토론 제목을 입력하세요 (최대 50자)"
                  maxLength={50}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">{formData.title.length}/50자</p>
              </div>

              <div>
                <Label htmlFor="book">서적 *</Label>
                <Select value={formData.bookId} onValueChange={handleBookChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="서적을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBooks.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.bookId && (
                <div>
                  <Label htmlFor="chapter">챕터 (선택사항)</Label>
                  <Select 
                    value={formData.chapterId} 
                    onValueChange={(chapterId) => setFormData({ ...formData, chapterId })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="챕터를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedBookChapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="content">본문 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="토론 내용을 입력하세요 (최소 20자)"
                  className="min-h-[200px]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.content.length}자 {formData.content.length < 20 && '(최소 20자)'}
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  작성하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/discussions')}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateDiscussion;
