import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { bloodRequestApi } from '../api/announcements';
import { formatDate } from '../utils/formatDate';
import { URGENCY_COLORS, STATUS_COLORS } from '../utils/bloodTypeUtils';
import { useAuthStore } from '../store/authStore';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [finding, setFinding] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['blood-requests', id],
    queryFn: () => bloodRequestApi.detail(Number(id)),
  });

  const handleFindDonors = async () => {
    setFinding(true);
    try {
      const res = await bloodRequestApi.findDonors(Number(id));
      toast.success(res.data.message);
    } catch {
      toast.error('Failed to find donors');
    } finally {
      setFinding(false);
    }
  };

  if (isLoading) return <Spinner />;
  const req = data?.data;
  if (!req) return <div className="text-center py-12">Not found</div>;

  const isOwner = user?.id === req.user.id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{req.title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              By {req.user.first_name} {req.user.last_name} &middot; {formatDate(req.created_at)}
            </p>
          </div>
          <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-lg font-bold">
            {req.blood_type_needed}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge text={req.urgency} className={URGENCY_COLORS[req.urgency]} />
          <Badge text={req.status} className={STATUS_COLORS[req.status]} />
          <Badge text={`${req.units_needed} unit(s)`} className="bg-blue-100 text-blue-800" />
        </div>

        <div className="space-y-3 text-gray-700 mb-6">
          {req.hospital_name && <p><strong>Hospital:</strong> {req.hospital_name}</p>}
          {req.location && <p><strong>Location:</strong> {req.location}</p>}
          <p><strong>Needed by:</strong> {formatDate(req.needed_date)}</p>
          {req.contact_number && <p><strong>Contact:</strong> {req.contact_number}</p>}
          {req.details && (
            <div>
              <strong>Details:</strong>
              <p className="mt-1 text-gray-600">{req.details}</p>
            </div>
          )}
        </div>

        {isOwner && (
          <div className="flex gap-3 pt-4 border-t">
            {req.status === 'open' && (
              <button
                onClick={handleFindDonors}
                disabled={finding}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {finding ? 'Searching...' : 'Find Matching Donors'}
              </button>
            )}
            <Link
              to={`/dashboard/announcements/${req.id}/edit`}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
