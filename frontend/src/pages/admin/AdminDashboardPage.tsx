import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/client';
import Spinner from '../../components/ui/Spinner';
import { Users, Droplets, CalendarDays, GitCompare } from 'lucide-react';

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const [users, requests, campaigns] = await Promise.all([
        apiClient.get('/users/', { params: { page_size: 1 } }),
        apiClient.get('/blood-requests/', { params: { page_size: 1 } }),
        apiClient.get('/campaigns/', { params: { page_size: 1 } }),
      ]);
      return {
        totalUsers: users.data.count,
        totalRequests: requests.data.count,
        totalCampaigns: campaigns.data.count,
      };
    },
  });

  if (isLoading) return <Spinner />;

  const stats = [
    { icon: Users, label: 'Total Users', value: data?.totalUsers ?? 0, color: 'text-blue-600 bg-blue-50' },
    { icon: Droplets, label: 'Blood Requests', value: data?.totalRequests ?? 0, color: 'text-red-600 bg-red-50' },
    { icon: CalendarDays, label: 'Campaigns', value: data?.totalCampaigns ?? 0, color: 'text-green-600 bg-green-50' },
    { icon: GitCompare, label: 'Matches', value: '-', color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
