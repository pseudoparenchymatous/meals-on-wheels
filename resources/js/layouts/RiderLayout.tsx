import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {LayoutGrid,Truck} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/rider/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Delivery Tracker',
        href: '/rider/delivery-tracker',
        icon: Truck,
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


