import { Link, useNavigate } from "react-router-dom";
import { getRole, clearAuth } from "../utils/token";
import {
  Search,
  House,
  ShieldUser,
  LogOut,
  User
} from "lucide-react";

export default function Headers({
  search,
  setSearch,
  genres = [],
  activeGenre,
  setActiveGenre,
  topRated,
  setTopRated,
  setShowHelp
}) {
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO - Lebih Elegan */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-2xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MovieMbur
            </span>
            <span className="text-xs text-gray-500 font-medium tracking-wider">PREMIUM CINEMA</span>
          </div>
        </Link>

        {/* SEARCH - Lebih Minimalis */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative group">
            <Search className="text-gray-500 w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-red-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for movies, series, actors..."
              className="w-full bg-gray-900/50 border border-gray-800 pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none text-white
                       placeholder:text-gray-600 focus:border-red-600/50 focus:bg-gray-900/80
                       transition-all duration-300 shadow-lg backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-800/80 rounded-lg text-xs text-gray-400 border border-gray-700/50">
              ⌘K
            </div>
          </div>
        </div>

        {/* NAVIGATION - Icons dengan Badge Effect */}
        <nav className="flex items-center gap-2">
          <Link 
            to="/" 
            className="p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60 hover:border-red-500/30 
                       transition-all duration-300 group relative"
            title="Home"
          >
            <House className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>

          <Link 
            to="/profile" 
            className="p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-gray-800/60 hover:border-red-500/30 
                       transition-all duration-300 group relative"
            title="Profile"
          >
            <User className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>

          {role === "admin" && (
            <Link 
              to="/admin" 
              className="p-3 rounded-xl bg-gradient-to-br from-red-900/20 to-red-900/5 border border-red-800/30 
                         hover:from-red-800/30 hover:to-red-900/20 transition-all duration-300 group relative"
              title="Admin"
            >
              <ShieldUser className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></span>
            </Link>
          )}

          <button 
            onClick={handleLogout}
            className="p-3 rounded-xl bg-gray-900/40 border border-gray-800/30 hover:bg-red-900/20 hover:border-red-700/50 
                       transition-all duration-300 group relative"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
        </nav>
      </div>
    </header>
  );
}