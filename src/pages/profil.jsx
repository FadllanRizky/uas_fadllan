import { useEffect, useState } from "react";
import { getProfile } from "../api/profil";
import { User, Mail, Shield, Calendar, Star, Film } from "lucide-react";

export default function Profil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="pt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-800/30 flex items-center justify-center">
          <User className="w-10 h-10 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Failed to Load Profile</h3>
        <p className="text-gray-400">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* PROFILE HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            My Profile
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROFILE CARD */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8">
              
              {/* PROFILE HEADER */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/30">
                      <span className="text-3xl font-bold text-white">
                        {profile.fullname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center border-4 border-gray-900">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{profile.fullname}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${profile.role === 'admin' ? 'bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 border border-red-800/50' : 'bg-gradient-to-r from-blue-900/30 to-blue-900/10 text-blue-400 border border-blue-800/50'}`}>
                        {profile.role.toUpperCase()}
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-900/30 to-green-900/10 text-green-400 border border-green-800/50">
                        PREMIUM USER
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl hover:border-red-500/30 hover:bg-gray-800/50 transition-all duration-300">
                  Edit Profile
                </button>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900/20 to-blue-900/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email Address</p>
                      <p className="text-white font-medium">{profile.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-900/20 to-purple-900/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Type</p>
                      <p className="text-white font-medium capitalize">{profile.role}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-900/20 to-green-900/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Member Since</p>
                      <p className="text-white font-medium">2024</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-900/20 to-amber-900/10 flex items-center justify-center">
                      <Film className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Movies Watched</p>
                      <p className="text-white font-medium">24 movies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADDITIONAL INFO */}
              <div className="mt-8 pt-8 border-t border-gray-800/50">
                <h3 className="text-lg font-bold text-white mb-4">Account Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-lg hover:border-green-500/30 text-sm">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Login Sessions</p>
                      <p className="text-sm text-gray-400">Manage active devices</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-lg hover:border-blue-500/30 text-sm">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS SIDEBAR */}
          <div className="space-y-8">
            {/* STATS CARD */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Movies Liked</span>
                  <span className="text-white font-bold">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Comments</span>
                  <span className="text-white font-bold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Watch Time</span>
                  <span className="text-white font-bold">156h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating Average</span>
                  <span className="text-white font-bold">8.7/10</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800/50">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">94%</div>
                    <div className="text-xs text-gray-400">Profile Complete</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-red-500/30 hover:bg-gray-800/50 transition-all duration-300">
                  Change Password
                </button>
                <button className="w-full text-left p-3 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300">
                  Notification Settings
                </button>
                <button className="w-full text-left p-3 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-green-500/30 hover:bg-gray-800/50 transition-all duration-300">
                  Download Data
                </button>
                <button className="w-full text-left p-3 bg-gradient-to-r from-red-900/20 to-red-900/10 border border-red-800/30 rounded-xl hover:border-red-700/50 hover:bg-red-900/30 transition-all duration-300">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}