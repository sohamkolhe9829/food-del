// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  getUserId,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on page load
    const checkAuth = () => {
      if (isAuthenticated()) {
        setCurrentUser({ id: getUserId() });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setCurrentUser({ id: userData.userId });
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
