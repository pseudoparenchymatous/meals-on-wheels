import { router } from "@inertiajs/react";
import { useState } from "react";
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
import { toast, Toaster } from "sonner";

const Button = ({ onClick, children, className, disabled }) => (
  <button onClick={onClick} className={className} disabled={disabled}>
    {children}
  </button>
);

const AlertDialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-200 animate-in fade-in-0 "
          onClick={() => onOpenChange(false)}
        >
            <div 
              className="bg-white w-full max-w-md m-4 p-6 rounded-2xl shadow-2xl text-center transform transition-transform duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};


const AlertDialogContent = ({ children }) => <div>{children}</div>;
const AlertDialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const AlertDialogTitle = ({ children }) => <h2 className="text-2xl font-bold text-gray-800 mb-2">{children}</h2>;
const AlertDialogDescription = ({ children }) => <div className="text-gray-600 mb-6">{children}</div>;
const AlertDialogFooter = ({ children }) => <div className="flex justify-end gap-3">{children}</div>;
const AlertDialogCancel = ({ children, disabled, onClick }) => (
    <Button
        onClick={onClick}
        disabled={disabled}
        className="py-2 px-5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
    >
        {children}
    </Button>
);
const AlertDialogAction = ({ children, disabled, onClick }) => (
    <Button
        onClick={onClick}
        disabled={disabled}
        className="py-2 px-5 rounded-lg bg-[#F72585] hover:bg-[#F72585]/90 text-white"
    >
        {children}
    </Button>
);

    

export default function Meallist({ meals }) {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [mealToDelete, setMealtoDelete] = useState(null);
    const [openconfirmDialog, setOpenConfirmDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const deleteMeal = (id) => {
        router.delete(`/admin/meals/${id}`);
        setOpenConfirmDialog(false);
        toast.success("Meal has been deleted");
        setMealtoDelete(null);
    };

    return (
        <div>
        <Toaster position="top-center" richColors/>
            <MealForm
                selected={selected}
                setSelectedMeal={setSelected}
                open={open}
                setOpen={setOpen}
            />

        <div className="border rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow className="text-xs uppercase">
                        <TableHead>Image</TableHead>
                        <TableHead>Meal Name</TableHead>
                        <TableHead>Prepared By</TableHead>
                        <TableHead>Prep Time</TableHead>
                        <TableHead>Meal Tags</TableHead>
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
                                className="h-16 w-20 object-cover rounded place-content-center"
                                />
                            </TableCell>
                            <TableCell>{meal.title}</TableCell>
                            <TableCell>{meal.prepared_by}</TableCell>
                            <TableCell>{meal.preparation_time}</TableCell>
                            <TableCell>{meal.meal_tag}</TableCell>
                            <TableCell className="space-x-2">
                                <button onClick={() => {setSelected(meal); setOpen(true);}} className="text-blue-600 hover:underline spacee">Edit</button>
                                <button onClick={() => {setMealtoDelete(meal.id); setOpenConfirmDialog(true);}} className="text-red-600 hover:underline ">Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        
        <AlertDialog
                open={openconfirmDialog}
                onOpenChange={(isOpen) => {
                    setOpenConfirmDialog(isOpen);
                    if (!isOpen) setMealtoDelete(null);
                }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>Are you sure you want to delete this meal?</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={ () => setOpenConfirmDialog(false)} disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteMeal(mealToDelete)} disabled={isSubmitting}
                        > {isSubmitting ? 'Processing...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        
    );
}
