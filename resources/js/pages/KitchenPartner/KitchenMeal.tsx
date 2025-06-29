import MealForm from "@/components/MealForm";
import MealList from "@/components/MealList";
import { Head } from "@inertiajs/react";
import { useState } from 'react';
import KitchenPartnerLayout from '@/layouts/KitchenPartnerLayout';

export default function KitchenMeal({meals, ingredients}) {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    return (
        <KitchenPartnerLayout>
            <Head title="Kitchen Meals" />
            <h1 className="text-3xl font-bold pb-10">My Created Meals</h1>
            <MealForm
                selected={selected}
                setSelectedMeal={setSelected}
                open={open}
                setOpen={setOpen}
                activeTab={undefined}
            />
            <MealList meals={meals} ingredients={ingredients}/>
        </KitchenPartnerLayout>
    );
}

