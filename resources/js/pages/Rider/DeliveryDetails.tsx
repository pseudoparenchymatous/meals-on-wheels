import { Head, useForm, usePage } from '@inertiajs/react';
import RiderLayout from '@/layouts/RiderLayout';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/rider/dashboard' },
  { title: 'Delivery Tracker', href: '/rider/delivery-tracker' },
];

export default function DeliveryDetails() {
  const { delivery } = usePage().props;
  const { data, setData, post, processing } = useForm({
    status: delivery.status,
  });

  const submit = (e) => {
    e.preventDefault();
    post(`/rider/delivery/${delivery.id}/update-status`);
  };

  return (
    <RiderLayout navItems={navItems}>
      <Head title="Delivery Details" />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold">Delivery Details</h1>
        <div className="space-y-2">
          <p><strong>Meal:</strong> {delivery.meal.name}</p>
          <p><strong>Status:</strong> {delivery.status}</p>
          <p><strong>Day:</strong> {delivery.day}</p>
          <p><strong>Week Plan:</strong> {delivery.week}</p>
          <p><strong>Kitchen Partner:</strong> {delivery.kitchen_partner}</p>
          <p><strong>To Member:</strong> {delivery.member}</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block font-medium">Update Status</span>
            <select
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="on the way">On The Way</option>
              <option value="delivered">Delivered</option>
            </select>
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={processing}
          >
            Update Status
          </button>
        </form>
      </div>
    </RiderLayout>
  );
}
