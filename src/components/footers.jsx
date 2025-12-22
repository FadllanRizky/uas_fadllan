import { useState } from "react";
import {
  Film,
  Github,
  Instagram,
  Youtube,
  Mail,
  Filter,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { History } from "lucide-react";


export default function Footers({ genres = [], onSelectGenre }) {
  const [openGenre, setOpenGenre] = useState(false);

  return (
    <>
      {/* FOOTER */}
      <footer className="bg-gradient-to-t from-gray-950 via-gray-950 to-black border-t border-gray-800/30 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
                <Film className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-white font-black text-3xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MovieMbur
                </h2>
                <p className="text-sm text-gray-500 font-medium tracking-wider">PREMIUM STREAMING</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Platform streaming film modern dengan koleksi terbaik dalam kualitas 4K.
              Nikmati pengalaman menonton premium tanpa batas.
            </p>
            <div className="flex items-center gap-2 mt-4 text-amber-500">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Exclusive Content Available</span>
            </div>
          </div>

          {/* MENU */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Navigation
            </h3>
            <ul className="space-y-4">

              <li className="group">
                <Link
                  to="/"
                  className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-500"></div>
                  Home
                </Link>
              </li>

              <li className="group">
                <Link
                  to="/"
                  className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-500"></div>
                  Movies
                </Link>
              </li>

              <li
                onClick={() => setOpenGenre(true)}
                className="group cursor-pointer"
              >
                <span className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-500"></div>
                  <Filter size={16} /> Filter Genre
                </span>
              </li>

              {/* 🔥 HISTORY */}
              <li className="group">
                <Link
                  to="/history"
                  className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-red-500"></div>
                  <History size={16} />
                  Watch History
                </Link>
              </li>

            </ul>
          </div>

          {/* SOCIAL & CONTACT */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Connect With Us
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Follow us for the latest updates and exclusive content.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-red-500/30 transition-all duration-300">
                <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-red-500/30 transition-all duration-300">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-red-500/30 transition-all duration-300">
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-red-500/30 transition-all duration-300">
                <Mail className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800/30 rounded-xl">
              <p className="text-xs text-gray-500">Need help?</p>
              <p className="text-white font-medium">support@moviembur.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/30 pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} MovieMbur. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-gray-600">
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL GENRE - Lebih Modern */}
      {openGenre && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50 p-8 rounded-2xl w-full max-w-2xl relative shadow-2xl shadow-black/50">
            <button
              onClick={() => setOpenGenre(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300"
            >
              ✕
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <span className="text-white">🎭</span>
                </div>
                Browse by Genre
              </h3>
              <p className="text-gray-400 text-sm">
                Select a genre to filter movies
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  onSelectGenre("All");
                  setOpenGenre(false);
                }}
                className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-medium
                         hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-300
                         shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
              >
                <span>✨</span> All Genres
              </button>

              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    onSelectGenre(g.name);
                    setOpenGenre(false);
                  }}
                  className="px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-300 font-medium
                           hover:bg-gray-800 hover:border-red-500/50 hover:text-white
                           transform hover:-translate-y-0.5 transition-all duration-300
                           backdrop-blur-sm"
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}