import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, setAuthToken } from '../api/client';

const TOKEN_KEY = 'band_admin_token';

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const { token: t } = await apiLogin(email, password);
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    setAuthToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAuthToken(null);
  }, []);

  const value = useMemo(
    () => ({ token, isAuthenticated: !!token, login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
