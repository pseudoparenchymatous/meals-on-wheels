import AdminLayout from '@/layouts/AdminLayout';
import Meallist from "@/components/Meallist";
import { Head } from "@inertiajs/react";

export default function MealAdminDashboard({meals, ingredients}) {
    return (
        <AdminLayout>
            <Head title="Meals" />
            <h1 className="text-3xl font-bold pb-10">Meals Dashboard Control</h1>
            <Meallist meals={meals} ingredients={ingredients}/>
        </AdminLayout>
    );
}

