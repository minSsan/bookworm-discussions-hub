
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const minPrice = Math.min(...book.prices.map(p => p.price));
  
  return (
    <Link to={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="aspect-[3/4] bg-gray-100 rounded-md mb-4 flex items-center justify-center">
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-xs text-gray-500">{book.publishYear}년</p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {book.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {book.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-gray-500">
              좋아요 {book.likes}개
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
