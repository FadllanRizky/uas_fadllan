import { X, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/* HELPER YOUTUBE */
const getEmbedUrl = (url) => {
  if (!url) return "";
  if (url.includes("embed")) return url;

  let id = "";
  if (url.includes("youtu.be")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    id = url.split("v=")[1].split("&")[0];
  }

  return `https://www.youtube.com/embed/${id}`;
};

export default function MovieDetailModal({ movie, onClose }) {
  const STORAGE_KEY = `movie_stats_${movie.id}`;

  const [text, setText] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  /* LOAD DATA SAAT MODAL BUKA */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setLikes(saved.likes || 0);
      setComments(saved.comments || []);
    }

    saveToHistory();
  }, []);

  /* SIMPAN KE LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ likes, comments })
    );
  }, [likes, comments]);

  /* LIKE */
  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  /* COMMENT */
  const handleComment = () => {
    if (!text.trim()) return;
    setComments((prev) => [...prev, text]);
    setText("");
  };

  /* WATCH HISTORY */
  const saveToHistory = () => {
    const history =
      JSON.parse(localStorage.getItem("watch_history")) || [];

    const exists = history.find((h) => h.id === movie.id);
    if (exists) return;

    history.unshift({
      id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url,
      watchedAt: new Date().toISOString(),
    });

    localStorage.setItem("watch_history", JSON.stringify(history));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="bg-zinc-900 max-w-4xl w-full rounded-2xl overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={26} />
        </button>

        <div className="aspect-video bg-black">
          <iframe
            src={getEmbedUrl(movie.trailer_url)}
            title={movie.title}
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="p-6 text-white">
          <h2 className="text-3xl font-extrabold mb-2">
            {movie.title}
          </h2>

          <p className="text-gray-400 mb-4">
            ⭐ {movie.rating}/10 • {movie.release_year} • {movie.duration} min
          </p>

          <p className="text-gray-300 mb-6">
            {movie.description}
          </p>

          {/* LIKE & COMMENT */}
          <div className="flex items-center gap-6 mb-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-red-500"
            >
              <Heart /> {likes}
            </button>

            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle /> {comments.length}
            </div>
          </div>

          {/* COMMENTS */}
          <div className="border-t border-zinc-800 pt-4">
            <h3 className="font-semibold mb-2">Comments</h3>

            <div className="space-y-2 max-h-32 overflow-y-auto mb-3">
              {comments.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No comments yet
                </p>
              )}
              {comments.map((c, i) => (
                <p key={i} className="text-sm text-gray-300">
                  • {c}
                </p>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-zinc-800 px-3 py-2 rounded-lg outline-none"
              />
              <button
                onClick={handleComment}
                className="bg-red-600 px-4 rounded-lg hover:bg-red-700"
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
