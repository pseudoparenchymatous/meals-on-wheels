import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

export default function Edit({ reassessment, members }) {
  const { data, setData, put, processing, errors } = useForm({
    member_id: reassessment.member_id,
    assessment_date: reassessment.assessment_date,
    notes: reassessment.notes || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('admin.reassessments.update', reassessment.id));
  }

  return (
    <AdminLayout>
      <Head title="Edit Reassessment" />
      <h1 className="text-xl font-semibold mb-4">Edit Reassessment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Member</label>
          <select
            value={data.member_id}
            onChange={(e) => setData('member_id', e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select a member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.first_name} {m.last_name}
              </option>
            ))}
          </select>
          {errors.member_id && <div className="text-red-600">{errors.member_id}</div>}
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={data.assessment_date}
            onChange={(e) => setData('assessment_date', e.target.value)}
            className="border p-2 w-full"
          />
          {errors.assessment_date && <div className="text-red-600">{errors.assessment_date}</div>}
        </div>
        <div>
          <label>Notes</label>
          <textarea
            value={data.notes}
            onChange={(e) => setData('notes', e.target.value)}
            className="border p-2 w-full"
          />
          {errors.notes && <div className="text-red-600">{errors.notes}</div>}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <Link href={route('admin.reassessments.index')} className="ml-2">
          Cancel
        </Link>
      </form>
    </AdminLayout>
  );
}
