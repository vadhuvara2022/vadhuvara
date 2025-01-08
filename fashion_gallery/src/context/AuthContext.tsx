"use client"
import React, { createContext, useContext, useState, useEffect,ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
interface AuthProviderProps {
    children: ReactNode;
  }
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    // Perform login logic (e.g., set a token in localStorage)
    localStorage.setItem('token', 'your-token');
    setIsAuthenticated(true);
    router.push('/admin');
  };

  const logout = () => {
    // Perform logout logic (e.g., remove the token from localStorage)
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/sign');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};