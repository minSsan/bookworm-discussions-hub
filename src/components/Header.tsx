
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, MessageSquare, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DevBook</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              홈
            </Link>
            <Link
              to="/discussions"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/discussions') ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              토론
            </Link>
            <Link
              to="/mypage"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/mypage') ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              마이페이지
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              로그인
            </Button>
            <Button size="sm">
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
