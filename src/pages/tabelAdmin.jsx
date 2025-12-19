import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, Users, Film, BarChart3, Search } from "lucide-react";

const emptyMovie = {
  title: "",
  description: "",
  rating: "",
  release_year: "",
  duration: "",
  poster_url: "",
  trailer_url: "",
  director: "",
};

export default function TableAdmin() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState(emptyMovie);
  const [editingMovie, setEditingMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);


  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, []);

  /* ================= FETCH ================= */
  const fetchUsers = async () => {
    const res = await axiosAuth.get("/admin/users");
    setUsers(res.data || []);
  };

  const fetchMovies = async () => {
    const res = await axiosAuth.get("/movies");
    setMovies(res.data || []);
  };

  /* ================= CREATE ================= */
  const handleAddMovie = async (e) => {
    e.preventDefault();

    const payload = {
      ...newMovie,
      rating: Number(newMovie.rating),
      release_year: Number(newMovie.release_year),
    };

    await axiosAuth.post("/movies", payload);
    setNewMovie(emptyMovie);
    fetchMovies();
  };

  /* ================= UPDATE ================= */
  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    const payload = {
      ...editingMovie,
      rating: Number(editingMovie.rating),
      release_year: Number(editingMovie.release_year),
    };

    delete payload.genres; // ⬅️ PENTING

    await axiosAuth.put(`/movies/${editingMovie.id}`, payload);
    setEditingMovie(null);
    fetchMovies();
  };

  /* ================= DELETE ================= */
  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    await axiosAuth.delete(`/movies/${id}`);
    fetchMovies();
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.director.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UPDATE USER ================= */
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    await axiosAuth.put(`/admin/users/${editingUser.id}`, {
      fullname: editingUser.fullname,
      email: editingUser.email,
      role: editingUser.role,
    });

    setEditingUser(null);
    fetchUsers();
  };

  /* ================= DELETE USER ================= */
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axiosAuth.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage movies, users, and platform content</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white font-bold">{movies.length}</div>
                  <div className="text-xs text-gray-400">Total Movies</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-800/30 flex items-center justify-center">
                  <Film className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white font-bold">{users.length}</div>
                  <div className="text-xs text-gray-400">Total Users</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-800/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search movies by title or director..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                       transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ADD MOVIE FORM */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-900/20 to-green-900/10 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Add New Movie</h2>
              </div>

              <form onSubmit={handleAddMovie} className="space-y-4">
                {Object.keys(emptyMovie).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      {key.replace("_", " ")}
                    </label>
                    <input
                      required
                      placeholder={`Enter ${key.replace("_", " ")}`}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 
                               focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                               transition-all duration-300"
                      value={newMovie[key]}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <button className="w-full mt-4 py-3.5 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 
                           text-white font-bold rounded-lg shadow-lg shadow-green-900/30 hover:shadow-green-900/50
                           transition-all duration-300 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Add Movie
                </button>
              </form>
            </div>
          </div>

          {/* MOVIES TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden">
              <div className="p-6 border-b border-gray-800/50">
                <h2 className="text-xl font-bold text-white">Movies Management</h2>
                {/* USERS TABLE */}
                <div className="mt-10 bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-800/50">
                    <h2 className="text-xl font-bold text-white">Users Management</h2>
                    <p className="text-gray-400 text-sm mt-1">{users.length} users found</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/30">
                        <tr>
                          <th className="p-4 text-left text-sm text-gray-400">ID</th>
                          <th className="p-4 text-left text-sm text-gray-400">Name</th>
                          <th className="p-4 text-left text-sm text-gray-400">Email</th>
                          <th className="p-4 text-left text-sm text-gray-400">Role</th>
                          <th className="p-4 text-left text-sm text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/50">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-gray-900/30">
                            <td className="p-4 text-white font-mono">{u.id}</td>
                            <td className="p-4 text-white">{u.fullname}</td>
                            <td className="p-4 text-gray-300">{u.email}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === "admin"
                                ? "text-red-400 border border-red-800/30"
                                : "text-green-400 border border-green-800/30"
                                }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="p-4 flex gap-2">
                              <button
                                onClick={() => setEditingUser(u)}
                                className="p-2 border border-blue-800/30 rounded-lg"
                              >
                                <Edit2 className="w-4 h-4 text-blue-400" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-2 border border-red-800/30 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-1">{filteredMovies.length} movies found</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/30">
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold text-gray-400">ID</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-400">Title</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-400">Rating</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-400">Director</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {filteredMovies.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-900/30 transition-colors">
                        <td className="p-4">
                          <div className="text-white font-mono">{m.id}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-white">{m.title}</div>
                          <div className="text-xs text-gray-500">{m.release_year}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-xs font-bold ${m.rating >= 8 ? 'bg-gradient-to-r from-amber-900/20 to-amber-900/10 text-amber-400 border border-amber-800/30' : 'bg-gradient-to-r from-gray-900/20 to-gray-900/10 text-gray-400 border border-gray-800/30'}`}>
                              ⭐ {m.rating}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300">{m.director}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingMovie(m)}
                              className="p-2 bg-gradient-to-r from-blue-900/20 to-blue-900/10 border border-blue-800/30 rounded-lg hover:border-blue-700/50 hover:bg-blue-900/30 transition-all duration-300"
                            >
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteMovie(m.id)}
                              className="p-2 bg-gradient-to-r from-red-900/20 to-red-900/10 border border-red-800/30 rounded-lg hover:border-red-700/50 hover:bg-red-900/30 transition-all duration-300"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredMovies.length === 0 && (
                <div className="text-center py-12">
                  <Film className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Movies Found</h3>
                  <p className="text-gray-500">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* EDIT MODAL */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-8 max-w-xl w-full relative">
              <button
                onClick={() => setEditingUser(null)}
                className="absolute top-4 right-4 text-gray-400"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">
                Edit User
              </h2>

              <form onSubmit={handleUpdateUser} className="space-y-4">
                <input
                  value={editingUser.fullname}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, fullname: e.target.value })
                  }
                  placeholder="Full Name"
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white"
                />
  

                <input
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white"
                />

                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-6 py-2 border border-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 rounded-lg text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingMovie && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800/50 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl">
              <button
                onClick={() => setEditingMovie(null)}
                className="absolute top-6 right-6 p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-900/10 flex items-center justify-center">
                  <Edit2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Edit Movie</h2>
                  <p className="text-gray-400">Update movie details</p>
                </div>
              </div>

              <form onSubmit={handleUpdateMovie} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(emptyMovie).map((key) => (
                  <div key={key} className={key === 'description' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      {key.replace("_", " ")}
                    </label>
                    {key === 'description' ? (
                      <textarea
                        required
                        value={editingMovie[key] || ""}
                        onChange={(e) =>
                          setEditingMovie({
                            ...editingMovie,
                            [key]: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 
                                 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                                 transition-all duration-300"
                      />
                    ) : (
                      <input
                        required
                        value={editingMovie[key] || ""}
                        onChange={(e) =>
                          setEditingMovie({
                            ...editingMovie,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 
                                 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                                 transition-all duration-300"
                      />
                    )}
                  </div>
                ))}

                <div className="md:col-span-2 flex justify-end gap-3 mt-6 pt-6 border-t border-gray-800/50">
                  <button
                    type="button"
                    onClick={() => setEditingMovie(null)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                             text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50
                             transition-all duration-300"
                  >
                    Update Movie
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}