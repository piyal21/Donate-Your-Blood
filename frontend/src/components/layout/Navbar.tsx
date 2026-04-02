import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { authApi } from '../../api/auth';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, clearAuth, refreshToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } catch { /* ignore */ }
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-red-600" fill="currentColor" />
              <span className="text-xl font-bold text-gray-900">Donate Your Blood</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/donors" className="text-gray-600 hover:text-red-600 transition">Donors</Link>
            <Link to="/announcements" className="text-gray-600 hover:text-red-600 transition">Blood Requests</Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-red-600 transition">Campaigns</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-red-600 transition flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-red-600 transition">Admin</Link>
                )}
                <div className="flex items-center gap-3 ml-2">
                  <Link to="/dashboard/profile" className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user?.first_name}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-red-600 transition">Sign In</Link>
                <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-600">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white pb-4">
          <div className="flex flex-col px-4 pt-2 gap-2">
            <Link to="/donors" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Donors</Link>
            <Link to="/announcements" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Blood Requests</Link>
            <Link to="/campaigns" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Campaigns</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/dashboard/profile" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Profile</Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="py-2 text-left text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="py-2 text-red-600 font-medium" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
