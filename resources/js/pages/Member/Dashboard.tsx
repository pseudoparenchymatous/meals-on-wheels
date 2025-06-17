import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Dummy data – replace with real data from backend
    const todaysMeal = {
        title: "Chicken Adobo",
        description: "Served with rice and vegetables.",
        image: "/images/chicken-adobo.jpg" // Replace with a real image URL
    };

    const tomorrowsMeal = {
        title: "Fish Fillet",
        description: "Crispy fish fillet with tartar sauce and steamed veggies.",
        image: "/images/fish-fillet.jpg" // Replace with a real image URL
    };

    const handleOrder = () => {
        // You can replace this with Inertia.post('/order-meal') if connected to Laravel backend
        setOrderPlaced(true);
    };

    return (
        <AppLayout>
            <Head title="Member Dashboard" />
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* TODAY'S MEAL */}
                    <div className="rounded-xl border border-gray-300 dark:border-gray-700 shadow-md overflow-hidden">
                        <img
                            src={todaysMeal.image}
                            alt="Today's Meal"
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-blue-700">Today's Meal</h2>
                            <p className="font-bold">{todaysMeal.title}</p>
                            <p className="text-gray-600 dark:text-gray-300">{todaysMeal.description}</p>

                            <div className="mt-4">
                                {orderPlaced ? (
                                    <p className="text-green-600 font-semibold">Order placed! Your meal is on the way.</p>
                                ) : (
                                    <button
                                        onClick={handleOrder}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Request Delivery
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* TOMORROW'S MEAL */}
                    <div className="rounded-xl border border-gray-300 dark:border-gray-700 shadow-md overflow-hidden">
                        <img
                            src={tomorrowsMeal.image}
                            alt="Tomorrow's Meal"
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-green-700">Tomorrow's Meal</h2>
                            <p className="font-bold">{tomorrowsMeal.title}</p>
                            <p className="text-gray-600 dark:text-gray-300">{tomorrowsMeal.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}