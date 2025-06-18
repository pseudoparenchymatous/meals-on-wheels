import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    LayoutGrid,
} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/kitchen-partner/dashboard',
        icon: LayoutGrid,
    },
];

export default function AdminLayout({ children }) {
    return (
        <AppLayout navItems={navItems} >
            <Head title="Kitchen Partner" />
            <div>
                { children }
            </div>
        </AppLayout>

    );
}

