import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Apple,
    CalendarCog,
    HandPlatter,
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
    {
        title: 'Planning',
        href: '/admin/planning',
        icon: CalendarCog,
    },
    {
        title: 'Meal Assignments',
        href: '/admin/meal-assignments',
        icon: HandPlatter,
    },
        {
        title: 'Donor Management',
        href: '/admin/donor-management',
        icon: Users,
    },
];


export default function AdminLayout({ children }) {
    return (
        <AppLayout navItems={navItems} >
            <div className="m-10">
                { children }
            </div>
        </AppLayout>

    );
}
