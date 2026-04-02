import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <Link to="/dashboard/profile/edit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm">
          Edit Profile
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold">
            {user.first_name[0]}{user.last_name[0]}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="flex gap-2 mt-1">
              <Badge text={user.role} className="bg-blue-100 text-blue-800" />
              {user.is_donor && <Badge text="Donor" className="bg-red-100 text-red-800" />}
              {user.is_donor && (
                <Badge
                  text={user.is_available ? 'Available' : 'Unavailable'}
                  className={user.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-500">Username:</span> <span className="text-gray-900 ml-1">{user.username}</span></div>
          <div><span className="text-gray-500">Blood Group:</span> <span className="text-gray-900 ml-1 font-semibold">{user.blood_group || 'Not set'}</span></div>
          <div><span className="text-gray-500">Gender:</span> <span className="text-gray-900 ml-1">{user.gender === 'M' ? 'Male' : user.gender === 'F' ? 'Female' : user.gender === 'O' ? 'Other' : 'Not set'}</span></div>
          <div><span className="text-gray-500">Date of Birth:</span> <span className="text-gray-900 ml-1">{user.date_of_birth ? formatDate(user.date_of_birth) : 'Not set'}</span></div>
          <div><span className="text-gray-500">City:</span> <span className="text-gray-900 ml-1">{user.city || 'Not set'}</span></div>
          <div><span className="text-gray-500">Contact:</span> <span className="text-gray-900 ml-1">{user.contact_number || 'Not set'}</span></div>
          <div className="sm:col-span-2"><span className="text-gray-500">Address:</span> <span className="text-gray-900 ml-1">{user.address || 'Not set'}</span></div>
          <div><span className="text-gray-500">Member since:</span> <span className="text-gray-900 ml-1">{formatDate(user.created_at)}</span></div>
        </div>
      </div>
    </div>
  );
}
