import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { donorApi } from '../api/donors';
import { BLOOD_TYPES } from '../utils/bloodTypeUtils';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';

export default function DonorSearchPage() {
  const [filters, setFilters] = useState({ blood_group: '', city: '', is_available: 'true' });

  const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
  const { data, isLoading } = useQuery({
    queryKey: ['donors', params],
    queryFn: () => donorApi.list(params),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Blood Donors</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-wrap gap-4">
        <select
          value={filters.blood_group}
          onChange={(e) => setFilters({ ...filters, blood_group: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Blood Types</option>
          {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
        </select>
        <input
          placeholder="Filter by city..."
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
        />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={filters.is_available === 'true'}
            onChange={(e) => setFilters({ ...filters, is_available: e.target.checked ? 'true' : '' })}
            className="h-4 w-4 text-red-600 rounded"
          />
          Available only
        </label>
      </div>

      {isLoading ? (
        <Spinner />
      ) : !data?.data.results.length ? (
        <EmptyState title="No donors found" description="Try adjusting your filters" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.results.map((donor) => (
            <div key={donor.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{donor.first_name} {donor.last_name}</h3>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                  {donor.blood_group}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{donor.city || 'No city specified'}</p>
              <Badge
                text={donor.is_available ? 'Available' : 'Unavailable'}
                className={donor.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
