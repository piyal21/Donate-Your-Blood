import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Droplets, Megaphone, CalendarDays, GitCompare, User, ToggleLeft, ToggleRight } from 'lucide-react';
import { donorApi } from '../api/donors';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, updateUser } = useAuthStore();
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    try {
      const res = await donorApi.toggleAvailability();
      updateUser({ is_available: res.data.is_available });
      toast.success(res.data.message);
    } catch {
      toast.error('Failed to toggle availability');
    } finally {
      setToggling(false);
    }
  };

  const cards = [
    { to: '/dashboard/announcements/create', icon: Droplets, label: 'Create Blood Request', desc: 'Post a new blood request' },
    { to: '/dashboard/campaigns/create', icon: CalendarDays, label: 'Create Campaign', desc: 'Organize a donation drive' },
    { to: '/dashboard/matches', icon: GitCompare, label: 'My Matches', desc: 'View donor match requests' },
    { to: '/dashboard/profile', icon: User, label: 'My Profile', desc: 'View and edit your profile' },
    { to: '/announcements', icon: Megaphone, label: 'Blood Requests', desc: 'Browse all blood requests' },
    { to: '/campaigns', icon: CalendarDays, label: 'Campaigns', desc: 'Browse all campaigns' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.first_name}!
        </h1>
        <p className="text-gray-600 mt-1">Manage your blood donation activities</p>
      </div>

      {user?.is_donor && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Donor Availability</h3>
            <p className="text-sm text-gray-600">
              {user.is_available ? 'You are currently available for donation' : 'You are currently unavailable'}
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              user.is_available
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {user.is_available ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
            {user.is_available ? 'Available' : 'Unavailable'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-sm transition group"
          >
            <card.icon className="h-8 w-8 text-red-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-semibold text-gray-900">{card.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
