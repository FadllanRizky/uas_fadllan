import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { User, Mail, Lock, Shield } from "lucide-react";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitRegis = async (e) => {
    e.preventDefault();

    if (fullname.length < 3) {
      setMsg("Fullname minimal 3 karakter");
      return;
    }

    if (!isEmailValid(email)) {
      setMsg("Format email tidak valid");
      return;
    }

    if (password.length < 5) {
      setMsg("Password minimal 5 karakter");
      return;
    }

    try {
      const res = await registerUser({ fullname, email, password });
      setMsg(res.data.msg);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black p-4">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* CARD */}
        <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-8">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join MovieMbur for premium experience</p>
          </div>

          {/* MESSAGE */}
          {msg && (
            <div className={`mb-6 p-4 rounded-xl text-center text-sm font-medium ${msg.includes("berhasil") ? "bg-green-900/30 text-green-400 border border-green-800/50" : "bg-red-900/30 text-red-400 border border-red-800/50"}`}>
              {msg}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={submitRegis} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                           transition-all duration-300"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              {fullname && fullname.length < 3 && (
                <p className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                  ⚠️ Name must be at least 3 characters
                </p>
              )}
            </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {email && !isEmailValid(email) && (
                <p className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                  ⚠️ Please enter a valid email address
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30
                           transition-all duration-300"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Password strength</span>
                    <span className={`text-xs font-medium ${password.length >= 8 ? 'text-green-400' : 'text-amber-400'}`}>
                      {password.length >= 8 ? 'Strong' : 'Weak'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        password.length >= 8 ? 'bg-gradient-to-r from-green-500 to-emerald-500 w-full' :
                        password.length >= 5 ? 'bg-gradient-to-r from-amber-500 to-yellow-500 w-2/3' :
                        'bg-gradient-to-r from-red-500 to-pink-500 w-1/3'
                      }`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {password.length < 5 && "⚠️ Password must be at least 5 characters"}
                    {password.length >= 5 && password.length < 8 && "Could be stronger"}
                    {password.length >= 8 && "Strong password ✓"}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 mt-6">
              <input 
                type="checkbox" 
                id="terms"
                className="mt-1 rounded bg-gray-900 border-gray-700 focus:ring-red-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the <a href="#" className="text-red-400 hover:text-red-300">Terms of Service</a> and <a href="#" className="text-red-400 hover:text-red-300">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 
                       text-white font-bold rounded-xl shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50
                       transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
            <span className="px-4 text-sm text-gray-500">Already have an account?</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          </div>

          {/* LOGIN LINK */}
          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <span>Sign in to existing account</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-8 text-xs text-gray-600">
          Your data is protected with enterprise-grade security
        </div>
      </div>
    </div>
  );
}