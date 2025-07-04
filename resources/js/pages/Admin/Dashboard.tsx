import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Bike,
    ClipboardCheck,
    ClockAlert,
    HandCoins,
    Truck,
    Users
} from 'lucide-react';

interface DashboardProp {
    adminName: string,
    data: CardData,
}

interface CardData {
    members: number,
    unverified: number,
    mealsDelivered: number,
    riders: number,
    donations: number,
    alerts: number,
}

const Cards = ({ data }: { data: CardData }) => {
    const stats = [
        {
            title: "Total Members",
            value: data.members,
            route: "/admin/users",
            icon: <Users className="h-6 w-6 text-blue-500" />,
        },
        {
            title: "Pending Approvals",
            value: data.unverified,
            route: "/admin/users",
            icon: <ClipboardCheck className="h-6 w-6 text-amber-500" />,
        },
        {
            title: "Meals Delivered",
            value: data.mealsDelivered,
            route: "/admin/meal-assignments",
            icon: <Truck className="h-6 w-6 text-green-500" />,
        },
        {
            title: "Active Riders",
            value: data.riders,
            route: "/admin/users",
            icon: <Bike className="h-6 w-6 text-purple-500" />,
        },
        {
            title: "Donations (This Month)",
            value: `$ ${data.donations}`,
            route: "/admin/donor-management",
            icon: <HandCoins className="h-6 w-6 text-emerald-500" />,
        },
        {
            title: "Urgent Alerts",
            value: data.alerts,
            route: "/admin/meals",
            icon: <ClockAlert className="h-6 w-6 text-red-500" />,
        },
    ];

    return (
        // This is the parent container for the cards
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                // Each dashboard stat is looped/mapped, then a link to the relevant pages are rendered
                // Each card has an icon, title and the actual stat value
                <Link key={index} href={stat.route}>
                    <div className="border bg-secondary rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 rounded-full bg-secondary">{stat.icon}</div>
                                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-2xl font-semibold">{stat.value}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function Dashboard({ adminName, data }: DashboardProp) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            <div>
                <h2 className="font-semibold mb-5 text-3xl" >Welcome, Admin {adminName}!</h2>
                <div>
                    <Cards data={data}/>
                </div>
            </div>
        </AdminLayout>
    );
}

