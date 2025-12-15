import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { loginUser } from '../api/api';

type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  // ✅ dérivé automatiquement
  const isLoggedIn = !!token;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const token = await loginUser(email, password);

      if (!token) return false;

      localStorage.setItem('token', token);
      setToken(token);

      return true;
    } catch (err) {
      console.error('Erreur login:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
