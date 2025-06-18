import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import MemberLayout from '@/layouts/MemberLayout';
import { Head } from '@inertiajs/react';

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
        <MemberLayout>
            <Head title="Member Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
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
        </MemberLayout>
    );
}