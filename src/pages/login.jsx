import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";
import { saveAuth } from "../utils/token";
import { Film, Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

 const submitLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser({ email, password });

    saveAuth(res.data.token, res.data.user.role);

    setMsg("Login berhasil");

    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  } catch (err) {
    setMsg(err.response?.data?.msg || "Login gagal");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black p-4">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* CARD */}
        <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-8">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/30">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your MovieMbur account</p>
          </div>

          {/* MESSAGE */}
          {msg && (
            <div className={`mb-6 p-4 rounded-xl text-center text-sm font-medium ${msg.includes("berhasil") ? "bg-green-900/30 text-green-400 border border-green-800/50" : "bg-red-900/30 text-red-400 border border-red-800/50"}`}>
              {msg}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={submitLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                           transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                           transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-900 border-gray-700" />
                Remember me
              </label>
              <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                       text-white font-bold rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-900/50
                       transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
              <span className="text-white font-medium">G</span>
            </button>
            <button className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
              <span className="text-white font-medium">f</span>
            </button>
            <button className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
              <span className="text-white font-medium">in</span>
            </button>
          </div>

          {/* REGISTER LINK */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-red-400 font-semibold hover:text-red-300 transition-colors inline-flex items-center gap-1"
            >
              Create account <span className="text-lg">→</span>
            </Link>
          </p>
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-8 text-xs text-gray-600">
          By signing in, you agree to our <a href="#" className="text-gray-500 hover:text-gray-400">Terms</a> and <a href="#" className="text-gray-500 hover:text-gray-400">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}