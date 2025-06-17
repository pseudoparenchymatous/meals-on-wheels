import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    LayoutGrid,
    Truck,
} from 'lucide-react';

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
];

export default function MemberLayout({ children }) {
    return (
        <AppLayout navItems={navItems} >
            <div>
                { children }
            </div>
        </AppLayout>

    );
}
