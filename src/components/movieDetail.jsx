import { X, Heart, MessageCircle, Star, Clock, Calendar, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorageAutoRefresh } from "../hooks/useLocalStorageAutoRefresh";

/* HELPER YOUTUBE */
const getEmbedUrl = (url) => {
  if (!url) return "";

  let id = "";
  if (url.includes("youtu.be")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    id = url.split("v=")[1].split("&")[0];
  } else if (url.includes("embed")) {
    return url;
  }

  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1`;
};
export default function MovieDetailModal({ movie, onClose, isMobile = false }) {
  const STORAGE_KEY = `movie_stats_${movie.id}`;

  const { updateStorage: updateHistory } = useLocalStorageAutoRefresh("watch_history", []);
  const [text, setText] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* LOAD DATA SAAT MODAL BUKA */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setLikes(saved.likes || 0);
      setComments(saved.comments || []);
    }

    // Auto-save to history when modal opens
    saveToHistory();
    setLoaded(true);
  }, []);

  /* SIMPAN KE LOCALSTORAGE */
  useEffect(() => {
    if(!loaded)return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ likes, comments })
    );
  }, [likes, comments,loaded]);

  /* LIKE */
  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  /* COMMENT */
  const handleComment = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
      user: "You"
    };

    setComments((prev) => [...prev, newComment]);
    setText("");
  };

  /* WATCH HISTORY */
  const saveToHistory = () => {
    updateHistory(prev => {
      const filtered = prev.filter(h => h.id !== movie.id);
      return [
        {
          ...movie,
          watchedAt: new Date().toISOString(),
        },
        ...filtered.slice(0, 49) // Keep only last 50 items
      ];
    });
  };

  const handlePlayTrailer = () => {
    setIsPlaying(true);
    saveToHistory();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800/50 max-w-5xl w-full rounded-xl sm:rounded-2xl overflow-hidden relative shadow-2xl shadow-black/50 max-h-[95vh] overflow-y-auto">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-800
                   hover:bg-red-900/30 hover:border-red-700/50 text-gray-400 hover:text-white
                   transition-all duration-300"
        >
          <X size={isMobile ? 20 : 24} />
        </button>

        {/* TRAILER SECTION */}
        <div className="relative aspect-video bg-black">
          {!isPlaying ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black to-black/80 cursor-pointer"
              onClick={handlePlayTrailer}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-4 shadow-2xl hover:scale-110 transition-transform">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
              </div>
              <p className="text-white font-medium text-lg sm:text-xl">Play Trailer</p>
              <p className="text-gray-400 text-sm mt-2">Click to watch trailer</p>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
              <iframe
                src={getEmbedUrl(movie.trailer_url)}
                title={movie.title}
                allowFullScreen
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="p-4 sm:p-6 md:p-8 text-white">
          {/* MOVIE TITLE & INFO */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-900/20 to-amber-900/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-amber-800/30">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <span className="font-bold text-amber-300 text-sm sm:text-base">{movie.rating}/10</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-gray-800">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-sm sm:text-base">{movie.release_year}</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-gray-800">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-sm sm:text-base">{movie.duration} min</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* INTERACTIONS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <button
              onClick={handleLike}
              className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-900/20 to-red-900/10 
                       border border-red-800/30 rounded-lg sm:rounded-xl hover:from-red-800/30 hover:to-red-900/20
                       transition-all duration-300 w-full sm:w-auto"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 group-hover:text-red-300 transition-colors" />
              <div className="text-left">
                <div className="font-bold text-white text-sm sm:text-base">{likes}</div>
                <div className="text-xs text-gray-400">Likes</div>
              </div>
            </button>

            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg sm:rounded-xl w-full sm:w-auto">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <div className="text-left">
                <div className="font-bold text-white text-sm sm:text-base">{comments.length}</div>
                <div className="text-xs text-gray-400">Comments</div>
              </div>
            </div>
          </div>

          {/* COMMENTS SECTION */}
          <div className="border-t border-gray-800/50 pt-6 sm:pt-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full"></div>
              <span className="text-base sm:text-lg">Community Discussion</span>
            </h3>

            {/* COMMENTS LIST */}
            <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-64 overflow-y-auto pr-2 sm:pr-4 mb-4 sm:mb-6">
              {comments.length === 0 ? (
                <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-800/50 rounded-lg sm:rounded-xl">
                  <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-gray-700 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-500 text-sm sm:text-base px-2">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-900/30 border border-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full"></div>
                      <div>
                        <div className="font-medium text-white text-sm sm:text-base">{comment.user}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()} • {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base pl-8 sm:pl-11 mt-1">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* COMMENT INPUT */}
            <form onSubmit={handleComment} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts about this movie..."
                  className="w-full bg-gray-900/50 border border-gray-800 px-4 py-3 sm:px-5 sm:py-4 rounded-lg sm:rounded-xl outline-none
                           placeholder:text-gray-600 focus:border-red-500/50 focus:bg-gray-900/80
                           transition-all duration-300 text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={!text.trim()}
                className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base
                          ${text.trim()
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-900/30'
                    : 'bg-gray-900/50 border border-gray-800 text-gray-500 cursor-not-allowed'} 
                          sm:w-auto w-full`}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}