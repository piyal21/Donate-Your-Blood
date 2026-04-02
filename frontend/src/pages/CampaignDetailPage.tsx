import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { campaignApi } from '../api/campaigns';
import { formatDate } from '../utils/formatDate';
import { STATUS_COLORS } from '../utils/bloodTypeUtils';
import { useAuthStore } from '../store/authStore';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => campaignApi.detail(Number(id)),
  });

  if (isLoading) return <Spinner />;
  const campaign = data?.data;
  if (!campaign) return <div className="text-center py-12">Not found</div>;

  const isOwner = user?.id === campaign.user.id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
          <Badge text={campaign.status} className={STATUS_COLORS[campaign.status]} />
        </div>

        <div className="space-y-3 text-gray-700 mb-6">
          <p><strong>Organizer:</strong> {campaign.organizer_name}</p>
          <p><strong>Date:</strong> {formatDate(campaign.campaign_date)}{campaign.end_date && ` - ${formatDate(campaign.end_date)}`}</p>
          <p><strong>Location:</strong> {campaign.location}</p>
          {campaign.city && <p><strong>City:</strong> {campaign.city}</p>}
          <p><strong>Contact:</strong> {campaign.contact_number}</p>
          <div>
            <strong>Description:</strong>
            <p className="mt-1 text-gray-600 whitespace-pre-wrap">{campaign.description}</p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-3 pt-4 border-t">
            <Link to={`/dashboard/campaigns/${campaign.id}/edit`} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
