export default function MovieProduct({ movie, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative bg-gradient-to-b from-gray-900 to-black 
                 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20
                 transition-all duration-500 transform hover:-translate-y-2
                 border border-gray-800/30 hover:border-red-500/30"
    >
      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      
      {/* MOVIE POSTER */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* RATING BADGE */}
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-br from-amber-600 to-amber-800 
                      px-3 py-1.5 rounded-lg shadow-lg shadow-amber-900/50">
          <div className="flex items-center gap-1">
            <span className="text-white font-black text-lg">★</span>
            <span className="text-white font-bold">{movie.rating}/10</span>
          </div>
        </div>
        
        {/* PLAY BUTTON OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full 
                        flex items-center justify-center transform scale-90 group-hover:scale-100 
                        transition-transform duration-300 shadow-2xl">
            <div className="text-white text-2xl">▶</div>
          </div>
        </div>
      </div>

      {/* MOVIE INFO */}
      <div className="relative z-20 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h2 className="text-xl font-black text-white mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm font-medium px-3 py-1 bg-gray-900/50 rounded-full border border-gray-800">
            {movie.release_year}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">HD</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {movie.description || "No description available."}
        </p>

        {/* HOVER ACTION BAR */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 
                      transition-all duration-300 pt-4 border-t border-gray-800/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Click for details</span>
            <div className="flex items-center gap-1">
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