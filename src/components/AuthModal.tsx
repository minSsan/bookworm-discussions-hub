
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const [isLoginMode, setIsLoginMode] = useState(mode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let success = false;
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password);
        if (success) {
          toast.success('로그인이 완료되었습니다.');
          onClose();
        } else {
          toast.error('이메일 또는 비밀번호가 잘못되었습니다.');
        }
      } else {
        success = await register(formData.name, formData.email, formData.password);
        if (success) {
          toast.success('회원가입이 완료되었습니다.');
          onClose();
        } else {
          toast.error('이미 존재하는 이메일입니다.');
        }
      }
    } catch (error) {
      toast.error('오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLoginMode ? '로그인' : '회원가입'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLoginMode}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full">
              {isLoginMode ? '로그인' : '회원가입'}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={toggleMode}
              className="w-full"
            >
              {isLoginMode ? '회원가입하기' : '로그인하기'}
            </Button>
          </div>
        </form>
        
        {isLoginMode && (
          <div className="text-sm text-gray-500 mt-4">
            <p>테스트 계정:</p>
            <p>이메일: test@test.com, 비밀번호: test123</p>
            <p>이메일: user@test.com, 비밀번호: user123</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
