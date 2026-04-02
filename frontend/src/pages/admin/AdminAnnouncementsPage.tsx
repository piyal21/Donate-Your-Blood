import { useQuery } from '@tanstack/react-query';
import { bloodRequestApi } from '../../api/announcements';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { URGENCY_COLORS, STATUS_COLORS } from '../../utils/bloodTypeUtils';
import { formatDate } from '../../utils/formatDate';

export default function AdminAnnouncementsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'blood-requests'],
    queryFn: () => bloodRequestApi.list(),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Blood Requests</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Blood Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Urgency</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Needed By</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.data.results.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{req.title}</td>
                  <td className="px-4 py-3 font-bold text-red-600">{req.blood_type_needed}</td>
                  <td className="px-4 py-3"><Badge text={req.urgency} className={URGENCY_COLORS[req.urgency]} /></td>
                  <td className="px-4 py-3"><Badge text={req.status} className={STATUS_COLORS[req.status]} /></td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(req.needed_date)}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(req.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
