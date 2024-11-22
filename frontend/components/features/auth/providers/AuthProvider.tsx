// src/features/auth/providers/AuthProvider.tsx

import React, { createContext, useContext, ReactNode } from "react";
import { useLogin } from "../aplications/useLogin";

// Define el tipo de las props para el provider
interface AuthProviderProps {
  children: ReactNode;  // Añadimos el tipo children
}

interface AuthContextProps {
  login: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const login = useLogin;

  return (
    <AuthContext.Provider value={{ login }}>
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
