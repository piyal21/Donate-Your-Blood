import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchApi } from '../api/matching';
import { formatDate } from '../utils/formatDate';
import { STATUS_COLORS } from '../utils/bloodTypeUtils';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import toast from 'react-hot-toast';

export default function MatchingPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: () => matchApi.myMatches(),
  });

  const acceptMutation = useMutation({
    mutationFn: (id: number) => matchApi.accept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast.success('Match accepted! The requester has been notified.');
    },
    onError: () => toast.error('Failed to accept match'),
  });

  const declineMutation = useMutation({
    mutationFn: (id: number) => matchApi.decline(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast.success('Match declined.');
    },
    onError: () => toast.error('Failed to decline match'),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Donor Matches</h1>

      {isLoading ? (
        <Spinner />
      ) : !data?.data.results.length ? (
        <EmptyState title="No matches yet" description="When someone needs your blood type, you'll see matches here." />
      ) : (
        <div className="space-y-4">
          {data.data.results.map((match) => (
            <div key={match.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{match.blood_request.title}</h3>
                  <p className="text-sm text-gray-500">
                    By {match.blood_request.user.first_name} {match.blood_request.user.last_name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    {match.blood_request.blood_type_needed}
                  </span>
                  <Badge text={match.status} className={STATUS_COLORS[match.status]} />
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {match.blood_request.hospital_name && <p>Hospital: {match.blood_request.hospital_name}</p>}
                {match.blood_request.location && <p>Location: {match.blood_request.location}</p>}
                <p>Needed by: {formatDate(match.blood_request.needed_date)}</p>
              </div>
              {(match.status === 'notified' || match.status === 'pending') && (
                <div className="flex gap-3">
                  <button
                    onClick={() => acceptMutation.mutate(match.id)}
                    disabled={acceptMutation.isPending}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineMutation.mutate(match.id)}
                    disabled={declineMutation.isPending}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
