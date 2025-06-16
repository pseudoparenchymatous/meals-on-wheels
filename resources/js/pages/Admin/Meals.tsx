import AdminLayout from '@/layouts/AdminLayout';
import MealForm from "@/components/MealForm";
import Meallist from "@/components/Meallist";
import { Head } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';

export default function MealAdminDashboard() {
    const { props } = usePage();
    const meals = props.meals || [];

    return (
        <AdminLayout>
            <Head title="Meals" />
            <div>
                <div className="fg-foreground text-2xl p-10 m-1">
                    <h1 className="text-3xl font-bold pb-10">Add New Menu Dashboard</h1>
                </div>
                <MealForm fetchMeals={undefined} selected={undefined} setSelectedMeal={undefined}/>
                <Meallist meals={meals} onEdit={undefined} fetchMeals={undefined}/>
            </div>
        </AdminLayout>
    );
}

