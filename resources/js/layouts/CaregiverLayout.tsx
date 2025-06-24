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
        href: '/caregiver/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Delivery Tracker',
        href: '/caregiver/delivery-tracker',
        icon: Truck,
    },
];

export default function CaregiverLayout({ children }) {
    return (
        <AppLayout navItems={navItems} >
            <div>
                { children }
            </div>
        </AppLayout>

    );
}