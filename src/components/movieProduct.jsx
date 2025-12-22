import { Play, Star, Clock } from "lucide-react";

export default function MovieProduct({ movie, onClick, viewMode = 'grid', isMobile = false }) {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer flex items-stretch bg-gradient-to-b from-gray-900/50 to-gray-900/20 backdrop-blur-sm 
                 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800/50 hover:border-red-500/30
                 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10"
      >
        {/* MOVIE POSTER */}
        <div className="relative w-24 sm:w-32 md:w-40 aspect-[2/3] flex-shrink-0 overflow-hidden">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          
          {/* RATING BADGE */}
          <div className="absolute top-2 right-2 bg-gradient-to-br from-amber-600 to-amber-800 px-2 py-1 rounded-lg shadow-lg">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-white" />
              <span className="text-white font-bold text-xs">{movie.rating}/10</span>
            </div>
          </div>
        </div>

        {/* MOVIE INFO */}
        <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-400 transition-colors line-clamp-1">
            {movie.title}
          </h2>

          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="text-gray-400 text-xs sm:text-sm px-2 py-1 bg-gray-900/50 rounded-full border border-gray-800">
              {movie.release_year}
            </span>
            {movie.duration && (
              <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {movie.duration} min
              </span>
            )}
          </div>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
            {movie.description || "No description available."}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Play className="w-3 h-3" />
              Watch Trailer
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW (Default)
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative bg-gradient-to-b from-gray-900/50 to-gray-900/20 backdrop-blur-sm 
               rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800/50 hover:border-red-500/30
               transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
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
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-gradient-to-br from-amber-600 to-amber-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-lg">
            <Star className="w-3 h-3 text-white" />
            <span className="text-white font-bold text-xs sm:text-sm">{movie.rating}/10</span>
          </div>
        </div>
        
        {/* PLAY BUTTON OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full 
                        flex items-center justify-center transform scale-90 group-hover:scale-100 
                        transition-transform duration-300 shadow-2xl">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* MOVIE INFO */}
      <div className="relative z-20 p-3 sm:p-4 md:p-5">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-gray-400 text-xs sm:text-sm px-2 py-1 bg-gray-900/50 rounded-full border border-gray-800">
            {movie.release_year}
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-xs">HD</span>
          </div>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
          {movie.description || "No description available."}
        </p>

        {/* HOVER ACTION BAR */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 
                      transition-all duration-300 pt-2 sm:pt-3 border-t border-gray-800/50">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs">Click to watch trailer</span>
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}