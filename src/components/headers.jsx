import { Link, useNavigate } from "react-router-dom";
import { getRole, clearAuth } from "../utils/token";
import {
  Search,
  House,
  ShieldUser,
  LogOut,
  User,
  Menu,
  X,
  History
} from "lucide-react";
import { useState } from "react";

export default function Headers({
  search,
  setSearch,
  genres = [],
  activeGenre,
  setActiveGenre,
  topRated,
  setTopRated,
  setShowHelp,
  isMobile = false
}) {
  const navigate = useNavigate();
  const role = getRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* LOGO & MOBILE MENU BUTTON */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-gray-900/50 border border-gray-800"
            >
              {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          )}
          
          <Link
            to="/"
            className="group flex items-center gap-2 sm:gap-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
              <span className="text-white font-black text-lg sm:text-xl">M</span>
            </div>
            {!isMobile && (
              <div className="flex flex-col">
                <span className="text-white font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MovieMbur
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider hidden sm:block">PREMIUM CINEMA</span>
              </div>
            )}
          </Link>
        </div>

        {/* SEARCH - Responsive */}
        {!isMobile ? (
          <div className="flex-1 max-w-2xl mx-4 sm:mx-6 md:mx-8">
            <div className="relative group">
              <Search className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-red-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for movies, series, actors..."
                className="w-full bg-gray-900/50 border border-gray-800 pl-9 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm outline-none text-white
                         placeholder:text-gray-600 focus:border-red-600/50 focus:bg-gray-900/80
                         transition-all duration-300 shadow-lg backdrop-blur-sm"
              />
              {!isMobile && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800/80 rounded text-xs text-gray-400 border border-gray-700/50 hidden sm:block">
                  ⌘K
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {searchOpen ? (
              <div className="absolute top-16 left-0 right-0 bg-gray-950 border-b border-gray-800 p-3">
                <div className="relative">
                  <Search className="text-gray-500 w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full bg-gray-900/50 border border-gray-800 pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none text-white"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg bg-gray-900/50 border border-gray-800"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </>
        )}

        {/* NAVIGATION - Responsive */}
        {isMobile && menuOpen ? (
          <div className="absolute top-16 left-0 right-0 bg-gray-950 border-b border-gray-800 p-4 shadow-2xl">
            <div className="space-y-3">
              <Link 
                to="/" 
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60"
                onClick={() => setMenuOpen(false)}
              >
                <House className="w-5 h-5 text-gray-400" />
                <span className="text-white">Home</span>
              </Link>
              
              <Link 
                to="/history" 
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60"
                onClick={() => setMenuOpen(false)}
              >
                <History className="w-5 h-5 text-gray-400" />
                <span className="text-white">Watch History</span>
              </Link>
              
              <Link 
                to="/profile" 
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60"
                onClick={() => setMenuOpen(false)}
              >
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-white">Profile</span>
              </Link>
              
              {role === "admin" && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-red-900/20 to-red-900/5 border border-red-800/30"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShieldUser className="w-5 h-5 text-red-400" />
                  <span className="text-white">Admin</span>
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-red-900/20 w-full text-left"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
                <span className="text-white">Logout</span>
              </button>
            </div>
          </div>
        ) : !isMobile && (
          <nav className="flex items-center gap-2">
            <Link 
              to="/history" 
              className="p-2.5 sm:p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60 hover:border-red-500/30 
                       transition-all duration-300 group relative"
              title="Watch History"
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            </Link>
            
            <Link 
              to="/" 
              className="p-2.5 sm:p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60 hover:border-red-500/30 
                       transition-all duration-300 group relative"
              title="Home"
            >
              <House className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            </Link>

            <Link 
              to="/profile" 
              className="p-2.5 sm:p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60 hover:border-red-500/30 
                       transition-all duration-300 group relative"
              title="Profile"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            </Link>

            {role === "admin" && (
              <Link 
                to="/admin" 
                className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-red-900/20 to-red-900/5 border border-red-800/30 
                         hover:from-red-800/30 hover:to-red-900/20 transition-all duration-300 group relative"
                title="Admin"
              >
                <ShieldUser className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-red-300 transition-colors" />
              </Link>
            )}

            <button 
              onClick={handleLogout}
              className="p-2.5 sm:p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-red-900/20 hover:border-red-700/50 
                       transition-all duration-300 group relative"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}