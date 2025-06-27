import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MemberLayout from '@/layouts/MemberLayout'; // or whatever your layout is

export default function MemberReassessments() {
  const { reassessments } = usePage().props;

  return (
    <MemberLayout>
      <Head title="My Reassessments" />
      <h1 className="text-xl font-semibold mb-4">My Reassessments</h1>
      {reassessments.length === 0 ? (
        <p>No reassessments available.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {reassessments.map((r) => (
              <tr key={r.id}>
                <td className="border px-4 py-2">{r.assessment_date}</td>
                <td className="border px-4 py-2">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MemberLayout>
  );
}
