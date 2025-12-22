import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import { getGenres } from "../api/genre";
import MovieProduct from "../components/movieProduct";
import MovieDetailModal from "../components/movieDetail";
import Headers from "../components/headers";
import Footers from "../components/footers";
import { Filter, Star, Search, HelpCircle, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home({
  activeGenre,
  setActiveGenre,
  genres = [],
  setGenres,
  isMobile = false
}) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [topRated, setTopRated] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const [movieStats, setMovieStats] = useState(() => {
    const saved = localStorage.getItem("movieStats");
    return saved ? JSON.parse(saved) : {};
  });

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = isMobile ? 8 : 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await getMovies();
        const genreRes = await getGenres();

        setMovies(movieRes.data || []);
        setGenres(genreRes.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  /* RESET PAGE SAAT FILTER BERUBAH */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeGenre, topRated]);

  useEffect(() => {
    localStorage.setItem("movieStats", JSON.stringify(movieStats));
  }, [movieStats]);

  /* FILTER MOVIE */
  const filteredMovies = movies
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((m) =>
      activeGenre === "All"
        ? true
        : m.genres?.includes(activeGenre)
    )
    .filter((m) => (topRated ? m.rating >= 8 : true));

  /* PAGINATION LOGIC */
  const totalPages = Math.ceil(
    filteredMovies.length / MOVIES_PER_PAGE
  );

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE
  );

  // Responsive grid columns
  const getGridCols = () => {
    if (viewMode === 'list') return 'grid-cols-1';
    if (isMobile) return 'grid-cols-2';
    if (window.innerWidth < 1024) return 'grid-cols-3';
    if (window.innerWidth < 1280) return 'grid-cols-4';
    return 'grid-cols-5';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <Headers
        search={search}
        setSearch={setSearch}
        genres={genres}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        topRated={topRated}
        setTopRated={setTopRated}
        setShowHelp={setShowHelp}
        isMobile={isMobile}
      />

      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">

        {/* FILTER CONTROLS - Responsive */}
        <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-800/50">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            
            {/* MOBILE GENRE DROPDOWN */}
            {isMobile ? (
              <div className="w-full">
                <button
                  onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-red-500" />
                    <span className="text-white font-medium">
                      {activeGenre === "All" ? "All Genres" : activeGenre}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showGenreDropdown ? 'rotate-90' : ''}`} />
                </button>
                
                {showGenreDropdown && (
                  <div className="mt-2 p-3 bg-gray-900/80 border border-gray-800 rounded-xl max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setActiveGenre("All");
                          setShowGenreDropdown(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                          ${activeGenre === "All" 
                            ? "bg-gradient-to-r from-red-600 to-red-700 text-white" 
                            : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                      >
                        All
                      </button>
                      {genres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => {
                            setActiveGenre(genre.name);
                            setShowGenreDropdown(false);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                            ${activeGenre === genre.name 
                              ? "bg-gradient-to-r from-red-600 to-red-700 text-white" 
                              : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* DESKTOP GENRE FILTERS */
              <div className="flex-1 w-full lg:w-auto">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">Browse by Genre</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setActiveGenre("All")}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                      ${activeGenre === "All" 
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30" 
                        : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                  >
                    All
                  </button>
                  {genres.slice(0, isMobile ? 4 : 6).map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => setActiveGenre(genre.name)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                        ${activeGenre === genre.name 
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30" 
                          : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                    >
                      {genre.name}
                    </button>
                  ))}
                  {!isMobile && genres.length > 6 && (
                    <button
                      onClick={() => setShowGenreDropdown(true)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      +{genres.length - 6} More
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* CONTROLS RIGHT SIDE */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* VIEW MODE TOGGLE */}
              <div className="flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-red-600/20 text-red-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-red-600/20 text-red-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* TOP RATED FILTER */}
              <button
                onClick={() => setTopRated(!topRated)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl transition-all duration-300
                  ${topRated 
                    ? "bg-gradient-to-r from-amber-900/30 to-amber-900/10 border border-amber-800/50" 
                    : "bg-gray-900/60 border border-gray-800"}`}
              >
                <Star className={`w-4 h-4 ${topRated ? "text-amber-400" : "text-gray-400"}`} />
                <span className={`font-medium text-sm ${topRated ? "text-amber-300" : "text-gray-400"}`}>
                  {isMobile ? "Top" : "Top Rated"}
                </span>
              </button>

              {/* HELP BUTTON */}
              <button
                onClick={() => setShowHelp(true)}
                className="p-3 bg-gradient-to-r from-blue-900/20 to-blue-900/10 border border-blue-800/30 rounded-xl hover:border-blue-700/50 transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS INFO */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {isMobile ? "Movies" : "Featured Movies"}
            </h1>
            <p className="text-gray-400 mt-1 text-xs sm:text-sm">
              Showing {currentMovies.length} of {filteredMovies.length} movies
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs sm:text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            {!isMobile && (
              <div className="text-xs text-gray-600">
                {MOVIES_PER_PAGE} per page
              </div>
            )}
          </div>
        </div>

        {/* MOVIE GRID/LIST */}
        <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6`}>
          {currentMovies.map((movie) => (
            <MovieProduct
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
              viewMode={viewMode}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* NO RESULTS */}
        {currentMovies.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto px-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            {(search || activeGenre !== "All" || topRated) && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveGenre("All");
                  setTopRated(false);
                }}
                className="mt-6 px-4 py-2 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl hover:border-red-500/30 hover:bg-gray-800/50 transition-all duration-300 text-sm"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-20">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto
                ${currentPage === 1 
                  ? "bg-gray-900/30 text-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 text-white hover:border-red-500/30 hover:bg-gray-800/50"}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Previous</span>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {[...Array(Math.min(totalPages, isMobile ? 5 : 7))].map((_, i) => {
                let pageNumber;
                if (totalPages <= (isMobile ? 5 : 7)) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - (isMobile ? 4 : 6) + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                if (pageNumber > totalPages) return null;

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base
                      ${currentPage === pageNumber 
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30" 
                        : "bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {totalPages > (isMobile ? 5 : 7) && currentPage < totalPages - 2 && (
                <>
                  <span className="text-gray-600">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto
                ${currentPage === totalPages 
                  ? "bg-gray-900/30 text-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 text-white hover:border-red-500/30 hover:bg-gray-800/50"}`}
            >
              <span className="text-sm sm:text-base">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          stats={movieStats[selectedMovie.id]}
          setMovieStats={setMovieStats}
          onClose={() => setSelectedMovie(null)}
          isMobile={isMobile}
        />
      )}

      {/* HELP MODAL */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Need Help?</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Here's how to use MovieMbur</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center flex-shrink-0">
                  🔍
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Search Movies</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Use the search bar to find specific titles</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                  🎭
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Filter by Genre</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Browse movies by category using genre filters</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center flex-shrink-0">
                  ⭐
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Top Rated Movies</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Toggle to show only movies rated 8+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footers
        genres={genres}
        onSelectGenre={setActiveGenre}
        isMobile={isMobile}
      />
    </div>
  );
}