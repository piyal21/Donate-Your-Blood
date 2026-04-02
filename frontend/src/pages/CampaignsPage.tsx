import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { campaignApi } from '../api/campaigns';
import { formatDate } from '../utils/formatDate';
import { STATUS_COLORS } from '../utils/bloodTypeUtils';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import { MapPin, Phone, Calendar } from 'lucide-react';

export default function CampaignsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaignApi.list(),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blood Donation Campaigns</h1>
        <Link to="/dashboard/campaigns/create" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium">
          + New Campaign
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : !data?.data.results.length ? (
        <EmptyState title="No campaigns found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.results.map((campaign) => (
            <Link key={campaign.id} to={`/campaigns/${campaign.id}`} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                <Badge text={campaign.status} className={STATUS_COLORS[campaign.status]} />
              </div>
              <p className="text-sm text-gray-600 mb-3">{campaign.description.slice(0, 100)}...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(campaign.campaign_date)}</p>
                <p className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {campaign.location}</p>
                <p className="flex items-center gap-1"><Phone className="h-4 w-4" /> {campaign.contact_number}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
