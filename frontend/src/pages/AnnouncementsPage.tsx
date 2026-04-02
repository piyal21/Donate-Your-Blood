import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { bloodRequestApi } from '../api/announcements';
import { formatDate } from '../utils/formatDate';
import { URGENCY_COLORS, STATUS_COLORS, BLOOD_TYPES } from '../utils/bloodTypeUtils';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import { useState } from 'react';

export default function AnnouncementsPage() {
  const [filters, setFilters] = useState({ blood_type_needed: '', status: '', urgency: '' });
  const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));

  const { data, isLoading } = useQuery({
    queryKey: ['blood-requests', params],
    queryFn: () => bloodRequestApi.list(params),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blood Requests</h1>
        <Link to="/dashboard/announcements/create" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium">
          + New Request
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-wrap gap-4">
        <select value={filters.blood_type_needed} onChange={(e) => setFilters({ ...filters, blood_type_needed: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg outline-none">
          <option value="">All Blood Types</option>
          {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
        </select>
        <select value={filters.urgency} onChange={(e) => setFilters({ ...filters, urgency: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg outline-none">
          <option value="">All Urgency</option>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg outline-none">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="matched">Matched</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : !data?.data.results.length ? (
        <EmptyState title="No blood requests found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.data.results.map((req) => (
            <Link key={req.id} to={`/announcements/${req.id}`} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{req.title}</h3>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold shrink-0 ml-2">
                  {req.blood_type_needed}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge text={req.urgency} className={URGENCY_COLORS[req.urgency]} />
                <Badge text={req.status} className={STATUS_COLORS[req.status]} />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                {req.hospital_name && <p>Hospital: {req.hospital_name}</p>}
                {req.location && <p>Location: {req.location}</p>}
                <p>Needed by: {formatDate(req.needed_date)}</p>
                <p className="text-xs text-gray-400">Posted {formatDate(req.created_at)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
