import { Head, useForm, usePage } from '@inertiajs/react';
import RiderLayout from '@/layouts/RiderLayout';
import { NavItem } from '@/types';
import RiderMap from '@/components/RiderMap';

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/rider/dashboard' },
  { title: 'Delivery Tracker', href: '/rider/delivery-tracker' },
];

export default function DeliveryDetails({ delivery, route }) {
  const { data, setData, post, processing, errors } = useForm({
    status: delivery.status,
  });

  const isDelivered = delivery.status === 'delivered';

  const submit = (e) => {
    e.preventDefault();

    if (isDelivered) return;

    post(`/rider/delivery/${delivery.id}/update-status`, {
      preserveScroll: true,
      onSuccess: () => {
        window.location.href = '/rider/delivery-tracker';
      },
    });
  };

  return (
    <RiderLayout navItems={[
      { name: 'Dashboard', href: '/rider/dashboard' },
      { name: 'Delivery Tracker', href: '/rider/delivery-tracker' },
    ]}>
      <Head title="Delivery Details" />
      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
        <p><strong>Meal:</strong> {delivery.meal.name}</p>
        <p><strong>Status:</strong> {delivery.status.toUpperCase()}</p>
        <p><strong>Day:</strong> {delivery.day}</p>
        <p><strong>Week:</strong> {delivery.week}</p>
        <p><strong>Kitchen Partner:</strong> {delivery.kitchen_partner}</p>
        <p><strong>To Member:</strong> {delivery.member}</p>
        
        <div>
          <RiderMap from={route.from} to={route.to}/>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <label className="block">
            <span className="text-gray-700">Update Status</span>
            <select
              name="status"
              value={data.status}
              onChange={e => setData('status', e.target.value)}
              disabled={isDelivered}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="on the way">On the Way</option>
              <option value="delivered">Delivered</option>
            </select>
          </label>

          {isDelivered ? (
            <p className="text-sm text-gray-500">This delivery has already been delivered and can’t be updated.</p>
          ) : (
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Status
            </button>
          )}

          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </form>
      </div>
    </RiderLayout>
  );
}
