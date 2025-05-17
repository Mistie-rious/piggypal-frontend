"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

// Define our interfaces
interface User {
  id: string;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface LoginResponse {
  token: string;
  userId: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("jwtToken");
      const userId = sessionStorage.getItem("userId");
      
      if (token && userId) {
        try {
          // You could make an API call to verify the token and get user data
          // For now, we'll just use what we have stored
          setUser({
            id: userId,
            email: sessionStorage.getItem("userEmail") || "",
          });
        } catch (err) {
          // Token is invalid, clear storage
          sessionStorage.removeItem("jwtToken");
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("userEmail");
        }
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log(`Login attempt for email: ${email}`);
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Making login API request...");
      const resp = await apiClient.post<ApiResponse<LoginResponse>>("auth/login", { email, password });
      console.log("Login API response received:", resp.data);
      
      if (!resp.data.success) {
        const errorMsg = resp.data.errors?.join(", ") ?? resp.data.message ?? "Unknown error";
        console.error(`Login failed: ${errorMsg}`);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: errorMsg,
        });
        setError(errorMsg);
        return false;
      }
      
      console.log("Login successful, storing session data");
      const { token, userId } = resp.data.data!;
      sessionStorage.setItem("jwtToken", token);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userEmail", email);
      
      setUser({
        id: userId,
        email: email,
      });
      
      console.log(`User ${userId} successfully logged in`);
      toast({ title: "Login successful", description: "Welcome back!" });
      return true;
    } catch (err: any) {
      console.error("Login error:", err);
      if (axios.isAxiosError(err)) {
        console.error(`Axios error: ${err.message}, Status: ${err.response?.status}, Data:`, err.response?.data);
        
        if (err.response?.status === 401) {
          setError("Invalid credentials");
          toast({ variant: "destructive", title: "Invalid credentials" });
        } else {
          const statusCode = err.response?.status || "unknown";
          const errorMsg = `Server error (${statusCode}): ${err.response?.data?.message || err.message}`;
          setError(errorMsg);
          toast({ 
            variant: "destructive", 
            title: "Server error", 
            description: `Status: ${statusCode}` 
          });
        }
      } else {
        console.error("Non-axios error:", err);
        setError("Network error. Please try again.");
        toast({ 
          variant: "destructive", 
          title: "Network error", 
          description: "Connection failed. Please try again." 
        });
      }
      return false;
    } finally {
      console.log("Login attempt completed, isLoading set to false");
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post<ApiResponse<null>>("/auth/register", { email, password, username });
      
      if (!response.data.success) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: response.data.errors?.join(", ") ?? response.data.message,
        });
        setError(response.data.message || "Registration failed");
        return false;
      }
      
      toast({ title: "Registration successful", description: "You can now log in" });
      return true;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`Server error: ${err.response.status}`);
        toast({
          variant: "destructive",
          title: "Server error",
          description: `Status code: ${err.response.status}`,
        });
      } else {
        setError("Network error. Please try again.");
        toast({
          variant: "destructive",
          title: "Network error",
          description: "Please try again.",
        });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};