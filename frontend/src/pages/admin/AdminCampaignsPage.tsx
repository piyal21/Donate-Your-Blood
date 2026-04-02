import { useQuery } from '@tanstack/react-query';
import { campaignApi } from '../../api/campaigns';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { STATUS_COLORS } from '../../utils/bloodTypeUtils';
import { formatDate } from '../../utils/formatDate';

export default function AdminCampaignsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'campaigns'],
    queryFn: () => campaignApi.list(),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Campaigns</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Organizer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.data.results.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.organizer_name}</td>
                  <td className="px-4 py-3"><Badge text={c.status} className={STATUS_COLORS[c.status]} /></td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(c.campaign_date)}</td>
                  <td className="px-4 py-3 text-gray-600">{c.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
