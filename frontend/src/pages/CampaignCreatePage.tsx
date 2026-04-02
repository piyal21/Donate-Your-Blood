import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { campaignApi } from '../api/campaigns';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

import type { CampaignForm } from '../types/campaign';

const schema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  organizer_name: z.string().min(1, 'Organizer name is required'),
  contact_number: z.string().min(1, 'Contact is required'),
  campaign_date: z.string().min(1, 'Date is required'),
  end_date: z.string(),
  location: z.string().min(1, 'Location is required'),
  city: z.string(),
  description: z.string().min(1, 'Description is required'),
});

export default function CampaignCreatePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CampaignForm>({
    resolver: zodResolver(schema),
    defaultValues: { end_date: '', city: '' },
  });

  const onSubmit = async (data: CampaignForm) => {
    setLoading(true);
    try {
      const res = await campaignApi.create(data);
      toast.success('Campaign created!');
      navigate(`/campaigns/${res.data.id}`);
    } catch {
      toast.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Campaign</h1>
      <div className="bg-white p-8 rounded-xl border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input {...register('name')} className={inputClass} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organizer Name</label>
              <input {...register('organizer_name')} className={inputClass} />
              {errors.organizer_name && <p className="text-red-500 text-sm mt-1">{errors.organizer_name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input {...register('contact_number')} className={inputClass} />
              {errors.contact_number && <p className="text-red-500 text-sm mt-1">{errors.contact_number.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" {...register('campaign_date')} className={inputClass} />
              {errors.campaign_date && <p className="text-red-500 text-sm mt-1">{errors.campaign_date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date (optional)</label>
              <input type="date" {...register('end_date')} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input {...register('location')} className={inputClass} />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input {...register('city')} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea {...register('description')} rows={4} className={inputClass} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-medium">
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
}
