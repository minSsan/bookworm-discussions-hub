
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Heart } from 'lucide-react';
import Header from '../components/Header';
import { mockBooks, mockDiscussions } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [priceListOpen, setPriceListOpen] = useState(false);
  
  const book = mockBooks.find(b => b.id === id);
  const bookDiscussions = mockDiscussions.filter(d => d.bookId === id);
  
  if (!book) {
    return <div>Book not found</div>;
  }
  
  const minPrice = Math.min(...book.prices.map(p => p.price));
  const sortedPrices = [...book.prices].sort((a, b) => a.price - b.price);
  const topDiscussions = bookDiscussions.slice(0, 5);

  const handlePurchase = () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    // 구매 처리 로직 (실제로는 결제 API 호출)
    toast.success('구매가 완료되었습니다.');
    
    // 사용자의 구매 목록에 추가 (실제로는 서버에서 처리)
    if (user && id) {
      user.purchasedBooks.push(id);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Book Cover */}
            <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {/* Book Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-2">{book.author}</p>
              <p className="text-sm text-gray-500 mb-4">{book.publishYear}년</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {book.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6">{book.description}</p>
              
              <div className="mb-6">
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  최저가 {minPrice.toLocaleString()}원
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handlePurchase}>
                  구매하기
                </Button>
                <Link to={`/discussions?bookId=${book.id}`} className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    토론 참여하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Price List */}
        <Card className="mb-6">
          <Collapsible open={priceListOpen} onOpenChange={setPriceListOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">판매 가격 목록</CardTitle>
                  <ChevronDown className={`h-4 w-4 transition-transform ${priceListOpen ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {sortedPrices.map((price) => (
                    <div key={price.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{price.price.toLocaleString()}원</p>
                        <p className="text-sm text-gray-600">
                          {price.condition === 'new' ? '새 책' : 
                           price.condition === 'like-new' ? '거의 새 것' :
                           price.condition === 'good' ? '양호' : '보통'} · {price.sellerName}
                        </p>
                      </div>
                      <Button size="sm" onClick={handlePurchase}>구매</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
        
        {/* Popular Discussions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              인기 토론 주제
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDiscussions.map((discussion) => (
                <Link 
                  key={discussion.id} 
                  to={`/discussions/${discussion.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <h3 className="font-medium mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {discussion.content}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{discussion.author}</span>
                    <span>좋아요 {discussion.likes}개</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BookDetail;
