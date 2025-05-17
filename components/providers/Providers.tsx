"use client";

import { AuthProvider } from "./auth-provider";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from "../theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={new QueryClient()}>
 
    {children}
 
    </QueryClientProvider>
    </ThemeProvider>
    </AuthProvider>;
}
