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
            <Head title="Kitchen Meal" />
            <div>
                <div className="fg-foreground text-2xl p-10 m-1">
                    <h1 className="text-3xl font-bold pb-10">My Created Meals</h1>
                    <div className="flex justify-end">
                        <MealForm
                            selected={selected}
                            setSelectedMeal={setSelected}
                            open={open}
                            setOpen={setOpen}
                            activeTab={undefined}
                        />
                    </div>
                </div>

                <MealList meals={meals} ingredients={ingredients}/>
            </div>
        </KitchenPartnerLayout>
    );
}

