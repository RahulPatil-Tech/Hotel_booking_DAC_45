import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize credentials from sessionStorage or default to empty
  const [credentials, setCredentials] = useState(() => {
    const saved = sessionStorage.getItem('credentials');
    return saved ? JSON.parse(saved) : { email: '', password: '', role: '' };
  });

  // Sync credentials to sessionStorage on change
  useEffect(() => {
    if (credentials.email && credentials.password) {
      sessionStorage.setItem('credentials', JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem('credentials');
    }
  }, [credentials]);

  // Login method: sets credentials including role
  const login = (email, password, role) => {
    setCredentials({ email, password, role });
  };

  // Logout method: clears credentials
  const logout = () => {
    setCredentials({ email: '', password: '', role: '' });
  };

  return (
    <AuthContext.Provider value={{ credentials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);
