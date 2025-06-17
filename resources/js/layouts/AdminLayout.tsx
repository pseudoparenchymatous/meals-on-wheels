import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Apple,
    LayoutGrid,
    Users,
} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Meals',
        href: '/admin/meals',
        icon: Apple,
    },
];


export default function AdminLayout({ children }) {
    return (
        <AppLayout navItems={navItems} >
            <Head title="Admin" />
            <div>
                { children }
            </div>
        </AppLayout>

    );
}
