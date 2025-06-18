import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    LayoutGrid,
} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/rider/dashboard',
        icon: LayoutGrid,
    },
];

export default function Rider({ children }) {
    return (
        <AppLayout navItems={navItems} >
            <div>
                { children }
            </div>
        </AppLayout>

    );
}


