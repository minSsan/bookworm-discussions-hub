
import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 테스트 사용자 데이터
const testUsers = [
  { id: '1', name: '김철수', email: 'test@test.com', password: 'test123', purchasedBooks: ['2'] },
  { id: '2', name: '김민수', email: 'user@test.com', password: 'user123', purchasedBooks: [] },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = testUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        purchasedBooks: foundUser.purchasedBooks,
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const existingUser = testUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      purchasedBooks: [],
    };
    
    testUsers.push(newUser);
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      purchasedBooks: newUser.purchasedBooks,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
