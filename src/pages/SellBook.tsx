
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';
import { mockBooks } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const SellBook = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(!user);
  const [formData, setFormData] = useState({
    bookId: '',
    price: '',
    condition: '',
    description: '',
    images: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!formData.bookId || !formData.price || !formData.condition) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    console.log('판매 등록 데이터:', formData);
    toast.success('서적 판매 등록이 완료되었습니다.');
    
    // 폼 초기화
    setFormData({
      bookId: '',
      price: '',
      condition: '',
      description: '',
      images: [],
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    }
  };

  const handleAuthModalClose = () => {
    if (!user) {
      window.location.href = '/';
    } else {
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">서적 판매하기</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="book">판매할 서적 *</Label>
                <Select
                  value={formData.bookId}
                  onValueChange={(value) => setFormData({ ...formData, bookId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="서적을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBooks.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title} - {book.author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">판매 가격 (원) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="가격을 입력해주세요"
                  required
                />
              </div>

              <div>
                <Label htmlFor="condition">책 상태 *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="책 상태를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">새 책</SelectItem>
                    <SelectItem value="like-new">거의 새 것</SelectItem>
                    <SelectItem value="good">양호</SelectItem>
                    <SelectItem value="fair">보통</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">상태 설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="책의 상태에 대한 상세한 설명을 입력해주세요"
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="images">사진 첨부</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500 mt-1">
                  최대 5장까지 업로드 가능합니다.
                </p>
              </div>

              <Button type="submit" className="w-full">
                판매 등록하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        mode="login"
      />
    </div>
  );
};

export default SellBook;
