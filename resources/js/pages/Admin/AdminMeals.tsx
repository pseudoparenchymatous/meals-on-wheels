import AdminLayout from '@/layouts/AdminLayout';
import MealList from "@/components/MealList";
import { Head } from "@inertiajs/react";

export default function MealAdminDashboard({meals, ingredients, userType}) {
    return (
        <AdminLayout>
            <Head title="Meals" />
            <h1 className="text-3xl font-bold pb-10">Meals Dashboard View</h1>
            <MealList meals={meals} ingredients={ingredients} userType={userType}/>
        </AdminLayout>
    );
}

