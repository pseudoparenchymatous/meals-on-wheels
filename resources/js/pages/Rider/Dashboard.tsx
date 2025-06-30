import RiderLayout from '@/layouts/RiderLayout';
import { Head, usePage } from '@inertiajs/react';
import { PackageCheck, TimerReset, Bike, Info } from 'lucide-react';

export default function Dashboard() {
    const { riderName, todaysDeliveries, pendingOrders, averageDeliveryTime } = usePage().props as {
        riderName: string;
        todaysDeliveries: number;
        pendingOrders: number;
        averageDeliveryTime: string;    
    };

    return (
        <RiderLayout>
            <Head title="Rider Dashboard" />
            <div className="p-6 space-y-6">
                {/* Greeting Section */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Hello, Rider {riderName}! 🛵
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Welcome back to your dashboard. Let’s complete some deliveries!
                        </p>
                    </div>
                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3001/3001764.png"
                            alt="Rider Icon"
                            className="w-16 h-16"
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <PackageCheck className="text-blue-600 w-8 h-8" />
                        <div>
                            <p className="text-sm text-blue-600">Today’s Deliveries</p>
                            <h3 className="text-xl font-bold text-blue-800">{todaysDeliveries}</h3>
                        </div>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <TimerReset className="text-yellow-600 w-8 h-8" />
                        <div>
                            <p className="text-sm text-yellow-600">Pending Orders</p>
                            <h3 className="text-xl font-bold text-yellow-800">{pendingOrders}</h3>
                        </div>
                    </div>
                    <div className="bg-green-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <Bike className="text-green-600 w-8 h-8" />
                        <div>
                            <p className="text-sm text-green-600">Average Delivery Time</p>
                            <h3 className="text-xl font-bold text-green-800">{averageDeliveryTime}</h3>
                        </div>
                    </div>
                </div>

                {/* Rider Tips & Updates Section */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center mb-3">
                        <Info className="text-blue-500 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">Rider Tips & Updates</h3>
                    </div>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Remember to check the meal package before departure.</li>
                        <li>Maintain food safety and hygiene standards.</li>
                        <li>Keep your phone charged and location turned on during shifts.</li>
                        <li>Report delays or issues immediately to the admin.</li>
                        <li>
                            Track your current delivery from the{' '}
                            <span className="font-semibold text-blue-600">Delivery Tracker</span>.
                        </li>
                    </ul>
                </div>
            </div>
        </RiderLayout>
    );
}
