import RiderLayout from '@/layouts/RiderLayout';
import { Head, usePage } from '@inertiajs/react';
import { NavItem } from '@/types';

const navItems = [
  { name: 'Dashboard', href: '/rider/dashboard' },
  { name: 'Delivery Tracker', href: '/rider/delivery-tracker' },
];

const statusColor = {
  pending: 'text-yellow-600',
  preparing: 'text-blue-600',
  'picked up': 'text-orange-600',
  'on the way': 'text-purple-600',
  delivered: 'text-green-600',
};

export default function DeliveryTracker() {
  const { deliveries } = usePage().props;

  return (
    <RiderLayout navItems={navItems}>
      <Head title="Meal Delivery Tracker" />
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Your Assigned Meal Deliveries</h1>
        {deliveries.length === 0 ? (
          <p>No deliveries found.</p>
        ) : (
          <ul className="space-y-3">
            {deliveries.map((delivery) => (
              <li key={delivery.id} className="border rounded-md p-4 shadow">
                <div className="font-medium text-lg">{delivery.meal.name}</div>
                <div className={statusColor[delivery.status] || 'text-gray-800'}>
                  Status: <strong>{delivery.status.toUpperCase()}</strong>
                </div>
                <div>Day: {delivery.day}</div>
                <div>Week Plan: {delivery.week}</div>
                <div>Kitchen Partner: {delivery.kitchen_partner}</div>
                <div>Rider: {delivery.rider}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RiderLayout>
  );
}