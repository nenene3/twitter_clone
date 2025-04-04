import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import UserProfile from "./features/user/UserProfile";
import CreatePost from "./features/posts/CreatePost";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/check" element={<ProtectedRoute />}>
                  <Route
                    element={
                      <div className="container mx-auto min-h-screen">
                        <Outlet />
                      </div>
                    }
                  >
                    <Route index element={<h1 className="h-screen bg-blue-950">welcome</h1>} />
                    <Route path="create" element={<CreatePost />} />
                  </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user/:userId" element={<UserProfile />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
