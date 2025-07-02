
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, MessageSquare, User, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  
  return (
    <>
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
                to="/sell"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/sell') ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                판매하기
              </Link>
              {user && (
                <Link
                  to="/mypage"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/mypage') ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  마이페이지
                </Link>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-700">안녕하세요, {user.name}님</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAuthClick('login')}
                  >
                    로그인
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAuthClick('register')}
                  >
                    회원가입
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </>
  );
};

export default Header;
