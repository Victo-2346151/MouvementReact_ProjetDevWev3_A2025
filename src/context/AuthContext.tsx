import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isLoggedIn: boolean;
  token: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: '',
  login: () => new Promise<boolean>(() => false),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem('token'),
  );

  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || '',
  );

  const navigate = useNavigate();

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/generatetoken',
        {
          userLogin: {
            email,
            password,
          },
        },
      );

      const jwt = response.data.token;

      if (jwt) {
        setIsLoggedIn(true);
        setToken(jwt);
        localStorage.setItem('token', jwt);
        navigate('/');
        return true;
      }

      setIsLoggedIn(false);
      setToken('');
      return false;
    } catch {
      setIsLoggedIn(false);
      setToken('');
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
