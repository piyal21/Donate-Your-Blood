import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { bloodRequestApi } from '../api/announcements';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { BLOOD_TYPES } from '../utils/bloodTypeUtils';

interface FormData {
  title: string;
  blood_type_needed: string;
  units_needed: number;
  urgency: string;
  hospital_name: string;
  location: string;
  needed_date: string;
  details: string;
  contact_number: string;
}

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  blood_type_needed: z.string().min(1, 'Blood type is required'),
  units_needed: z.coerce.number().min(1),
  urgency: z.string(),
  hospital_name: z.string(),
  location: z.string(),
  needed_date: z.string().min(1, 'Date is required'),
  details: z.string(),
  contact_number: z.string(),
});

export default function AnnouncementCreatePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: { units_needed: 1, urgency: 'normal', hospital_name: '', location: '', details: '', contact_number: '' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await bloodRequestApi.create(data);
      toast.success('Blood request created!');
      navigate(`/announcements/${res.data.id}`);
    } catch {
      toast.error('Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Blood Request</h1>
      <div className="bg-white p-8 rounded-xl border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input {...register('title')} className={inputClass} placeholder="e.g., Urgent B+ blood needed" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <select {...register('blood_type_needed')} className={inputClass}>
                <option value="">Select</option>
                {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
              </select>
              {errors.blood_type_needed && <p className="text-red-500 text-sm mt-1">{errors.blood_type_needed.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Units Needed</label>
              <input type="number" min={1} {...register('units_needed')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <select {...register('urgency')} className={inputClass}>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
              <input {...register('hospital_name')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location / City</label>
              <input {...register('location')} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Needed By</label>
              <input type="date" {...register('needed_date')} className={inputClass} />
              {errors.needed_date && <p className="text-red-500 text-sm mt-1">{errors.needed_date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input {...register('contact_number')} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
            <textarea {...register('details')} rows={4} className={inputClass} placeholder="Additional details..." />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-medium">
            {loading ? 'Creating...' : 'Create Blood Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
