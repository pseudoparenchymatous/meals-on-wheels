import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { DialogHeader } from "./ui/dialog";
import MealForm from "./MealForm";

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
    
    

export default function Meallist({ meals, onEdit, fetchMeals }) {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    
    const deleteMeal = (id) => {
        if (!confirm("Delete meal?")) return;
        router.delete(`/admin/meals/${id}`);
    };

    return (
        <div>
        <MealForm
                selected={selected}
                setSelectedMeal={setSelected}
                open={open}
                setOpen={setOpen}
            />
        <div className="border rounded-xl">

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Meal Name</TableHead>
                        <TableHead>Prepared By</TableHead>
                        <TableHead>Prep Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meals.map(meal => (
                        <TableRow key={meal.id}>
                            <TableCell className="font-medium">
                            </TableCell>
                            <TableCell>{meal.title}</TableCell>
                            <TableCell>{meal.prepared_by}</TableCell>
                            <TableCell>{meal.preparation_time}</TableCell>
                            <TableCell>{meal.meal_type}</TableCell>
                            <TableCell>
                                <button onClick={() => onEdit(meal)} className="text-blue-600 hover:underline">Edit</button>
                                <button onClick={() => deleteMeal(meal.id)} className="text-red-600 hover:underline">Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </div>
    );
}
