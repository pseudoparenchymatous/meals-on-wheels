import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Delivery Tracker', href: '/delivery-tracker' },
];

export default function DeliveryTracker() {
  // Simulate delivery tracking data
  const deliveries = [
    {
      date: '2025-06-10',
      time: 'Wil Arrive Soon',
      status: 'On the way',
      rider: 'Juan Dela Cruz',
      meal: 'Chicken Adobo with Rice',
    },
    {
      date: '2025-06-08',
      time: '12:00 PM',
      status: 'Delivered',
      rider: 'Maria Santos',
      meal: 'Fish Fillet with Vegetables',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Delivery Tracker" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Track Your Meal Deliveries</h1>
        <div className="space-y-4">
          {deliveries.map((delivery, index) => (
            <div key={index} className="rounded-lg border p-4 shadow-sm bg-white dark:bg-neutral-800">
              <p><strong>Date:</strong> {delivery.date}</p>
              <p><strong>Time:</strong> {delivery.time}</p>
              <p><strong>Meal:</strong> {delivery.meal}</p>
              <p><strong>Rider:</strong> {delivery.rider}</p>
              <p><strong>Status:</strong> <span className="text-blue-600 font-medium">{delivery.status}</span></p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
