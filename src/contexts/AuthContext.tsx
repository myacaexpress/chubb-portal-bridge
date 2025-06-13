
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  chubbPortalConfigured: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateChubbPortalConfig: (credentials: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('chubb-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any credentials
    const userData = {
      id: '1',
      email,
      name: email.split('@')[0],
      chubbPortalConfigured: localStorage.getItem('chubb-portal-config') !== null
    };
    
    setUser(userData);
    localStorage.setItem('chubb-user', JSON.stringify(userData));
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: '1',
      email,
      name,
      chubbPortalConfigured: false
    };
    
    setUser(userData);
    localStorage.setItem('chubb-user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chubb-user');
  };

  const updateChubbPortalConfig = (credentials: any) => {
    localStorage.setItem('chubb-portal-config', JSON.stringify(credentials));
    if (user) {
      const updatedUser = { ...user, chubbPortalConfigured: true };
      setUser(updatedUser);
      localStorage.setItem('chubb-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateChubbPortalConfig }}>
      {children}
    </AuthContext.Provider>
  );
};
