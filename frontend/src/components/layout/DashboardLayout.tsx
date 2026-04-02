import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, Droplets, Megaphone, CalendarDays,
  GitCompare, Shield,
} from 'lucide-react';
import Navbar from './Navbar';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
  { to: '/dashboard/announcements/create', icon: Droplets, label: 'Create Blood Request' },
  { to: '/dashboard/campaigns/create', icon: CalendarDays, label: 'Create Campaign' },
  { to: '/dashboard/matches', icon: GitCompare, label: 'My Matches' },
];

const adminItems = [
  { to: '/admin', icon: Shield, label: 'Admin Dashboard', exact: true },
  { to: '/admin/users', icon: User, label: 'Users' },
  { to: '/admin/announcements', icon: Megaphone, label: 'Blood Requests' },
  { to: '/admin/campaigns', icon: CalendarDays, label: 'Campaigns' },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuthStore();
  const isAdmin = location.pathname.startsWith('/admin');
  const items = isAdmin ? adminItems : navItems;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex">
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-1">
            {items.map((item) => {
              const active = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    active
                      ? 'bg-red-50 text-red-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            {!isAdmin && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 mt-4 border-t pt-4"
              >
                <Shield className="h-5 w-5" />
                Admin Panel
              </Link>
            )}
          </nav>
        </aside>
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
