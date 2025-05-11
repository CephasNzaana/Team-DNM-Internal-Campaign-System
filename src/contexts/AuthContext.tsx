
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'honDNM' | 'admin' | 'teamMember' | null;

interface AuthContextType {
  userRole: UserRole;
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  username: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const storedRole = localStorage.getItem('userRole') as UserRole;
    const storedUsername = localStorage.getItem('username');
    
    if (storedRole && storedUsername) {
      setUserRole(storedRole);
      setUsername(storedUsername);
    }
  }, []);
  
  const login = (username: string, role: UserRole) => {
    localStorage.setItem('userRole', role || '');
    localStorage.setItem('username', username);
    setUserRole(role);
    setUsername(username);
  };
  
  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setUserRole(null);
    setUsername(null);
  };
  
  return (
    <AuthContext.Provider value={{
      userRole,
      username,
      isAuthenticated: !!userRole,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
