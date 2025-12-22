import { useEffect, useState } from "react";
import { History, ArrowLeft, Clock, Calendar, Star, Film } from "lucide-react";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("watch_history")) || [];
    setHistory(data);
  }, []);

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* HEADER WITH BACK BUTTON */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Watch History</h1>
                <p className="text-gray-400">Your movie journey</p>
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800/50 flex items-center justify-center">
              <Film className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No Watch History Yet</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Start watching movies to build your watch history. Your journey begins here!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                       text-white font-medium rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-900/50
                       transition-all duration-300"
            >
              <span>Browse Movies</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/30">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Watch History</h1>
                <p className="text-gray-400">Your cinematic journey</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl">
                <div className="text-sm text-gray-400">Total Watched</div>
                <div className="text-xl font-bold text-white">{history.length}</div>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-900/20 to-blue-900/10 border border-blue-800/30 rounded-xl">
                <div className="text-sm text-gray-400">Hours</div>
                <div className="text-xl font-bold text-blue-400">
                  {Math.round(history.reduce((acc, movie) => acc + (movie.duration || 0), 0) / 60)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {history.map((movie) => (
            <div
              key={movie.id}
              className="group bg-gradient-to-b from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 
                       overflow-hidden hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2
                       shadow-xl hover:shadow-blue-900/20"
            >
              {/* MOVIE POSTER */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                {/* RATING BADGE */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-br from-amber-600 to-amber-800 px-3 py-1.5 rounded-lg shadow-lg shadow-amber-900/50">
                    <Star className="w-3 h-3 text-white" />
                    <span className="text-white font-bold text-sm">{movie.rating || "N/A"}</span>
                  </div>
                </div>
                
                {/* WATCHED BADGE */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="flex items-center gap-1.5 bg-gradient-to-br from-blue-600 to-blue-800 px-3 py-1.5 rounded-lg shadow-lg shadow-blue-900/50">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-white font-bold text-xs">WATCHED</span>
                  </div>
                </div>
              </div>

              {/* MOVIE INFO */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{movie.release_year}</span>
                  </div>
                  {movie.duration && (
                    <div className="text-sm text-gray-400">
                      {movie.duration} min
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-800/50 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Watched on</div>
                    <div className="text-sm text-gray-300 font-medium">
                      {new Date(movie.watchedAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-sm text-gray-300">
                      {new Date(movie.watchedAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 
                           rounded-lg hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 text-sm">
                    Watch Again
                  </button>
                  <button className="px-4 py-2.5 bg-gradient-to-r from-red-900/20 to-red-900/10 border border-red-800/30 
                           rounded-lg hover:border-red-700/50 hover:bg-red-900/30 transition-all duration-300 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900/20 to-blue-900/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Movies</div>
                  <div className="text-2xl font-bold text-white">{history.length}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-900/20 to-green-900/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Hours</div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(history.reduce((acc, movie) => acc + (movie.duration || 0), 0) / 60)}h
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-900/20 to-amber-900/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Last Watched</div>
                  <div className="text-lg font-bold text-white">
                    {history.length > 0 
                      ? new Date(history[0].watchedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })
                      : 'Never'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLEAR HISTORY BUTTON */}
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 
                     rounded-xl hover:border-red-500/30 hover:bg-red-900/20 transition-all duration-300">
              Clear All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}