import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import TableAdmin from "./pages/tabelAdmin";
import Profil from "./pages/profil";
import WatchList from "./pages/wathcList";

import ProtectedRoute from "./components/ProtectedRoute";
import { getToken } from "./utils/token";

export default function App() {
  const token = getToken();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // STATE untuk Home component
  const [activeGenre, setActiveGenre] = useState("All");
  const [genres, setGenres] = useState([]);

  // Cek ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-900/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            MovieMbur
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">Loading premium experience...</p>
          <div className="mt-4 sm:mt-6 flex justify-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home
                  activeGenre={activeGenre}
                  setActiveGenre={setActiveGenre}
                  genres={genres}
                  setGenres={setGenres}
                  isMobile={isMobile}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <TableAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />

          <Route
            path="*"
            element={<Navigate to={token ? "/" : "/login"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}