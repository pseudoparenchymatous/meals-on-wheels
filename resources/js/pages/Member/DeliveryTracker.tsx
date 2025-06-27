import { Head, usePage } from '@inertiajs/react';
import MemberLayout from '@/layouts/MemberLayout';
import { LayoutGrid, Truck } from 'lucide-react';

const statusColor = {
    pending: 'text-yellow-600',
    preparing: 'text-blue-600',
    'picked up': 'text-orange-600',
    'on the way': 'text-purple-600',
    delivered: 'text-green-600',
};

export default function DeliveryTracker({ deliveries }) {
    return (
        <MemberLayout>
            <Head title="Meal Delivery Tracker" />
            <div className="p-4 space-y-4">
                <h1 className="text-xl font-semibold">Your Meal Deliveries</h1>
                {deliveries.length === 0 ? (
                    <p>No deliveries found.</p>
                ) : (
                    <ul className="space-y-3">
                        {deliveries.map((delivery) => (
                            <li key={delivery.id} className="border rounded-md p-4 shadow">
                                <div className="font-medium text-lg">
                                    <span>{delivery.temperature.toUpperCase()} </span>
                                    {delivery.meal}
                                </div>
                                <div>
                                    Status: <strong className={statusColor[delivery.status] || 'text-gray-800'}>{delivery.status.toUpperCase()}</strong>
                                </div>
                                <div>Day: {delivery.day}</div>
                                <div>Week: {delivery.week}</div>
                                <div>Kitchen Partner: {delivery.kitchen_partner}</div>
                                <div>Rider: {delivery.rider}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </MemberLayout>
    );
}

