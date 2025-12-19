import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import { getGenres } from "../api/genre";
import MovieProduct from "../components/movieProduct";
import MovieDetailModal from "../components/movieDetail";
import Headers from "../components/headers";
import Footers from "../components/footers";
import { Filter, Star, Search, HelpCircle } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [topRated, setTopRated] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [movieStats, setMovieStats] = useState(() => {
    const saved = localStorage.getItem("movieStats");
    return saved ? JSON.parse(saved) : {};
  });

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 10;

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
      />

      <main className="pt-32 max-w-7xl mx-auto px-6">

        {/* FILTER CONTROLS */}
        <div className="mb-12 p-6 bg-gradient-to-r from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* GENRE FILTERS */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-red-500" />
                <h3 className="text-white font-bold text-lg">Browse by Genre</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveGenre("All")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeGenre === "All" 
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30" 
                      : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                >
                  All Genres
                </button>
                {genres.slice(0, 6).map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setActiveGenre(genre.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${activeGenre === genre.name 
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30" 
                        : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            {/* TOP RATED FILTER */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTopRated(!topRated)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300
                  ${topRated 
                    ? "bg-gradient-to-r from-amber-900/30 to-amber-900/10 border border-amber-800/50" 
                    : "bg-gray-900/60 border border-gray-800"}`}
              >
                <Star className={`w-5 h-5 ${topRated ? "text-amber-400" : "text-gray-400"}`} />
                <span className={`font-medium ${topRated ? "text-amber-300" : "text-gray-400"}`}>
                  Top Rated
                </span>
              </button>

              {/* HELP BUTTON */}
              <button
                onClick={() => setShowHelp(true)}
                className="p-3 bg-gradient-to-r from-blue-900/20 to-blue-900/10 border border-blue-800/30 rounded-xl hover:border-blue-700/50 transition-all duration-300"
              >
                <HelpCircle className="w-5 h-5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS INFO */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Movies
            </h1>
            <p className="text-gray-400 mt-1">
              Showing {currentMovies.length} of {filteredMovies.length} movies
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentMovies.map((movie) => (
            <MovieProduct
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>

        {/* NO RESULTS */}
        {currentMovies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16 mb-20">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${currentPage === 1 
                  ? "bg-gray-900/30 text-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 text-white hover:border-red-500/30 hover:bg-gray-800/50"}`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => {
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  (i >= currentPage - 2 && i <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300
                        ${currentPage === i + 1 
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30" 
                          : "bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800"}`}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (
                  i === currentPage - 3 ||
                  i === currentPage + 3
                ) {
                  return <span key={i} className="text-gray-600">...</span>;
                }
                return null;
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${currentPage === totalPages 
                  ? "bg-gray-900/30 text-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 text-white hover:border-red-500/30 hover:bg-gray-800/50"}`}
            >
              Next →
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
        />
      )}

      {/* HELP MODAL */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800/50 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Need Help?</h2>
                <p className="text-gray-400 text-sm">Here's how to use MovieMbur</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  🔍
                </div>
                <div>
                  <h4 className="font-bold text-white">Search Movies</h4>
                  <p className="text-gray-400 text-sm">Use the search bar to find specific titles</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  🎭
                </div>
                <div>
                  <h4 className="font-bold text-white">Filter by Genre</h4>
                  <p className="text-gray-400 text-sm">Browse movies by category using genre filters</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                  ⭐
                </div>
                <div>
                  <h4 className="font-bold text-white">Top Rated Movies</h4>
                  <p className="text-gray-400 text-sm">Toggle to show only movies rated 8+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footers
        genres={genres}
        onSelectGenre={setActiveGenre}
      />
    </div>
  );
}