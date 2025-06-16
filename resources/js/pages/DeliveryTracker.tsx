import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { NavItem, type Delivery } from '@/types';
import { LayoutGrid, Truck, Apple } from 'lucide-react';

interface PageProps {
  deliveries: Delivery[];
}

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Delivery Tracker',
        href: '/delivery-tracker',
        icon: Truck,
    },
    {
        title: 'Meals',
        href: '/admin/meals',
        icon: Apple,
    },
];

export default function DeliveryTracker({ deliveries }: PageProps) {
  return (
    <AppLayout navItems={navItems}>
      <Head title="Meal Delivery Tracker" />
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Your Meal Deliveries</h1>
        {deliveries.length === 0 ? (
          <p>No deliveries found.</p>
        ) : (
          <ul className="space-y-2">
            {deliveries.map((delivery) => (
              <li
                key={delivery.id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <div className="font-medium">{delivery.meal.title}</div>
                <div>Status: <strong>{delivery.status}</strong></div>
                <div>Scheduled: {delivery.scheduled_time}</div>
                <div>Delivered: {delivery.delivered_time ?? 'Pending'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}
  