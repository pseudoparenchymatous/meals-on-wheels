import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import {
    Apple,
    CalendarCog,
    HandPlatter,
    LayoutGrid,
    Users,
    ClipboardList,
} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        route: 'dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        route: 'admin.users.index',
        icon: Users,
    },
    {
        title: 'Meals',
        route: 'admin.meals',
        icon: Apple,
    },
    {
        title: 'Planning',
        route: 'admin.planning',
        icon: CalendarCog,
    },
    {
        title: 'Meal Assignments',
        route: 'admin.meal-assignments.index',
        icon: HandPlatter,
    },
    {
        title: 'Donor Management',
        route: 'admin.donor.management',
        icon: Users,
    },
    {
        title: 'Reassessments',
        route: 'admin.reassessments.index',
        icon: ClipboardList,
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
