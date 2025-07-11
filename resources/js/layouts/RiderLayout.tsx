import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import {LayoutGrid,Truck} from 'lucide-react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        route: 'dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Delivery Tracker',
        route: 'rider.deliveries',
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


