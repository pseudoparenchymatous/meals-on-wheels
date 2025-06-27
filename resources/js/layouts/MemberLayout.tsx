import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    LayoutGrid,
    Truck,
    ClipboardList,
} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/member/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Delivery Tracker',
        href: '/member/delivery-tracker',
        icon: Truck,
    },
    {
        title: 'Reassessments',
        href: '/member/reassessments',
        icon: ClipboardList,
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
