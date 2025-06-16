import { router } from "@inertiajs/react";

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
    const deleteMeal = (id) => {
        if (!confirm("Delete meal?")) return;
        router.delete(`/admin/meals/${id}`);
    };

    return (
        <div>
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
                                <img
                                    src={meal.image_path}
                                    alt={meal.title}
                                    className="h-16 w-16 object-cover rounded"
                                />
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
    );
}
