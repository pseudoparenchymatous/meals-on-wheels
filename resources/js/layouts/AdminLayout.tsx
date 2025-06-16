import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { NavItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Apple,
    LayoutGrid,
    Users,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
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
