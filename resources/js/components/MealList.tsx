import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useState } from "react";
import MealForm from "./MealForm";
import { toast, Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IngredientsTable from "./IngredientsTable";
import IngredientForm from "./IngredientForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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



export default function MealList({ meals, ingredients, userType }) {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [mealToDelete, setMealtoDelete] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTabs] =useState('Meals')
    const [ingredientToDelete, setIngredientToDelete] = useState(null);

    // Function to handle deletion of a meal
    const deleteMeal = (id) => {
        setIsSubmitting(true);
        
        // Use the router to send a DELETE request to the appropriate endpoint based on user type
        router.delete( userType === 'admin' ? `/admin/meals/${id}` : `/kitchen-partner/meals/${id}`, { 
            onSuccess: () => {
                toast.success("Meal has been deleted.");
                setOpenConfirmDialog(false);
                setMealtoDelete(null);
                setIsSubmitting(false);
            },
            onError: (error) => {
                console.error(error);
                toast.error("Meal has run into an error!")
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div>
            <Toaster position="top-center" richColors/>
            {/*this is the componnet of the admin to view/edit meals */}
            {activeTab === 'Meals' && (
                <MealForm
                    selected={selected}
                    setSelectedMeal={setSelected}
                    open={open}
                    setOpen={setOpen}
                    activeTab={activeTab}
                    showAddButton={false}
                    userType={userType}
                />
            )}

            {activeTab === 'Ingredients' && (
                <IngredientForm
                    selected={selected}
                    setSelectedIng={setSelected}
                    open={open}
                    setOpen={setOpen}
                    activeTab={activeTab}
                    userType={userType}
                />
            )}

            {/*Meals Table view and actions */}
            <Tabs value={activeTab} onValueChange={setActiveTabs}>
                <TabsList>
                    <TabsTrigger value="Meals">All Meals</TabsTrigger>
                    <TabsTrigger value="Ingredients">List Ingredients</TabsTrigger>
                </TabsList>
                <TabsContent value="Meals">
                    <div className="border rounded-xl">
                        <Table>
                            <TableHeader>
                                <TableRow className="text-xs uppercase">
                                    <TableHead>Image</TableHead>
                                    <TableHead>Kitchen Name</TableHead>
                                    <TableHead>Meal Name</TableHead>
                                    <TableHead>Prep Time</TableHead>
                                    <TableHead>Meal Tags</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {meals.map(meal => (
                                    <TableRow key={meal.id} className="">
                                        <TableCell>
                                            <img
                                                src={meal.image_path}
                                                alt={meal.name}
                                                className="h-16 w-20 object-cover rounded place-content-center"
                                            />
                                        </TableCell>
                                        <TableCell>{meal.org_name}</TableCell>
                                        <TableCell>{meal.name} </TableCell>
                                        <TableCell>{meal.preparation_time}</TableCell>
                                        <TableCell>{meal.meal_tag}</TableCell>
                                        <TableCell className="space-x-2">
                                            { userType !== 'admin' && (
                                                <Button
                                                    variant='outline'
                                                    onClick={() => {setSelected(meal); setOpen(true)}}
                                                >
                                                    Edit
                                                </Button>
                                            )}

                                            <Button
                                                variant='destructive'
                                                onClick={() => {
                                                    setMealtoDelete(meal);
                                                    setOpenConfirmDialog(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="Ingredients">
                    <div className="border rounded-xl">
                        <Table>
                            <TableHeader>
                                <TableRow className="text-xs uppercase">
                                    <TableHead>ID</TableHead>
                                    <TableHead>Meal</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Stocks</TableHead>
                                    <TableHead>Date Purchased</TableHead>
                                    <TableHead>Expiration Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <IngredientsTable
                                Ingredients={ingredients}
                                setSelected={setSelected}
                                setOpen={setOpen}
                                setIngToDelete={setIngredientToDelete}
                                setOpenConfirmDialog={setOpenConfirmDialog}
                                userType={userType}
                            />
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Confirm delete dialog*/}
            <AlertDialog
                open={openConfirmDialog}
                onOpenChange={(isOpen) => {
                    setOpenConfirmDialog(isOpen);
                    if (!isOpen) {
                        setMealtoDelete(null);
                        setIngredientToDelete(null);
                    }
                }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>Are you sure you want to delete this {''}<br/>
                                <strong className="text-red-600 font-bold text-lg">
                                    {activeTab === "Meals" ? mealToDelete?.name : ingredientToDelete?.ing_name}
                                </strong>
                                ?
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isSubmitting}
                            onClick={ () => setOpenConfirmDialog(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isSubmitting}
                            onClick={() =>  deleteMeal(mealToDelete.id)}
                        > {isSubmitting ? 'Processing...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

