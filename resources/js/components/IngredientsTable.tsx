import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

const deleteIngredients = (id) =>{
        router.delete(`/admin/meals/${id}`, {
            onSuccess: () => {
                toast.success('New Ingredients has been added!')
                setOpenConfirmDialog(false);
                setIngToDelete(null);
                setIsSubmitting(false);
            },
            onError: (error) => {
                console.error(error);
                toast.error('Failed to add new Ingredients!')
                setIsSubmitting(false);

            }
        })
        
    }

export default function IngredientsTable ({Ingredients, setSelected, setOpen, setIngToDelete, setOpenConfirmDialog}) {

    return (
            <TableBody>
                {Ingredients.map(ing => (
                    <TableRow key={ing.id} className="">
                        <TableCell>{ing.id} </TableCell>
                            <TableCell>{ing.ing_name}</TableCell>
                            <TableCell>{ing.ing_type}</TableCell>
                            <TableCell>{ing.stocks}</TableCell> 
                            <TableCell>{ing.date_arrive}</TableCell>
                            <TableCell>{ing.expiration_date}</TableCell>
                            <TableCell>{}</TableCell>
                            <TableCell className="space-x-2">
                                <button
                                    onClick={() => {
                                    setSelected(ing); 
                                    setOpen(true)}}
                                    className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                    setIngToDelete(ing);
                                    setOpenConfirmDialog(true);
                                    }}
                                    className="text-red-600 hover:underline">
                                    Delete
                                </button>
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

