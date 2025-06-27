import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

export default function Index() {
  const { reassessments } = usePage().props;

  return (
    <AdminLayout>
      <Head title="Reassessments" />
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Reassessments</h1>
        <Link
          href={route('admin.reassessments.create')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Reassessment
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Member</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Notes</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reassessments.map((r) => (
            <tr key={r.id}>
              <td className="border px-4 py-2">
                {r.member?.first_name} {r.member?.last_name}
              </td>
              <td className="border px-4 py-2">{r.assessment_date}</td>
              <td className="border px-4 py-2">{r.notes}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link
                  href={route('admin.reassessments.edit', r.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  as="button"
                  method="delete"
                  href={route('admin.reassessments.destroy', r.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

