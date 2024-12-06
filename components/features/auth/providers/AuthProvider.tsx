import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Loginstorage from "../../storage";
import { loginUser } from "../aplications/useLogin";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await Loginstorage.getItem("access_token");
         // console.log("Token almacenado:", token);

      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = async () => {
    await Loginstorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
