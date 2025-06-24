import CaregiverLayout from '@/layouts/CaregiverLayout';
import { Head, usePage } from '@inertiajs/react';
import { LayoutGrid, Truck } from 'lucide-react';

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Delivery Tracker', href: '/delivery-tracker', icon: Truck },
];

const statusColor = {
  pending: 'text-yellow-600',
  preparing: 'text-blue-600',
  'picked up': 'text-orange-600',
  'on the way': 'text-purple-600',
  delivered: 'text-green-600',
};

export default function DeliveryTracker({ deliveries }) {

  return (
    <CaregiverLayout navItems={navItems}>
      <Head title="Meal Delivery Tracker" />
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Meal deliveries for your assigned member</h1>
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
                <div>Week: {delivery.weekly_plan.id}</div>
                <div>Kitchen Partner: {delivery.kitchen_partner.org_name}</div>
                <div>Rider: {delivery.rider.first_name}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CaregiverLayout>
  );
}