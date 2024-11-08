"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  handleLogout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
