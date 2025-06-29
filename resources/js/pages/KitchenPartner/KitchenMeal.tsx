import AddMeal from "@/components/MealForm";
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
            <h1 className="text-3xl font-bold mb-5">My Created Meals</h1>
            <AddMeal
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

