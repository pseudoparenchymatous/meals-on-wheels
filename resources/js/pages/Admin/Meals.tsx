import AdminLayout from '@/layouts/AdminLayout';
import MealForm from "@/components/MealForm";
import Meallist from "@/components/Meallist";
import { Head } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';
import { NavItem } from '@/types';
import { LayoutGrid, Apple } from 'lucide-react';
import { useState } from 'react';
import IngredientsTable from '@/components/IngredientsTable';

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

export default function MealAdminDashboard() {
    const { props } = usePage();
    const meals = props.meals || [];
    const ingredients = props.ingredients || [];

    return (
        <AdminLayout>
            <Head title="Meals" />
            <div>
                <div className="fg-foreground text-2xl p-10 m-1">
                    <h1 className="text-3xl font-bold pb-10">Melas Dashboard Control</h1>
                </div>
                <Meallist meals={meals} ingredients={ingredients}/>
            </div>
        </AdminLayout>
    );
}

