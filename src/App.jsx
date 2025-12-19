import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import TableAdmin from "./pages/tabelAdmin";
import Profil from "./pages/profil";

import ProtectedRoute from "./components/ProtectedRoute";
import { getToken } from "./utils/token";

export default function App() {
  const token = getToken();
  const [loading, setLoading] = useState(true);

  // 🔑 STATE NAIK KE SINI
  const [activeGenre, setActiveGenre] = useState("All");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 animate-pulse shadow-lg shadow-red-900/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">MovieMbur</h2>
          <p className="text-gray-400">Loading premium experience...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}