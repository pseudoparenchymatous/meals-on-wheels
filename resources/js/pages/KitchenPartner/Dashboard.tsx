import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import KitchenPartnerLayout from '@/layouts/KitchenPartnerLayout';
import { Link, router } from "@inertiajs/react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from 'react';
import KitchenCard from '@/components/KitchenCard';
import { toast, Toaster } from 'sonner';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { differenceInDays, parseISO } from 'date-fns';
import { ShieldAlert } from 'lucide-react';

export default function Dashboard({ orgName, mealAssignments }) {
    const [assignmentId, setAssignmentId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingStatus, setPendingStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function getExpiringIngredients(assignments) {
        let expiring = [];

        assignments.forEach(assignment => {
            const ingredients = assignment.meal?.ingredients || [];

            ingredients.forEach( ing => {
                const daysLeft = differenceInDays(parseISO(ing.expiration_date), new Date());

                if (daysLeft >= 0 && daysLeft <= 3){
                    expiring.push(ing);
                }
            });
        });
        return expiring;
    }

    function handleSaveChanges() {
        if (!selectedAssignment) return;

        const expiredIngredients = selectedAssignment.meal?.ingredients?.filter(ing =>
            ing.expiration_date && differenceInDays(parseISO(ing.expiration_date), new Date()) < 0
        );

        const expiringSoonIngredients = selectedAssignment.meal?.ingredients?.filter(ing =>
            ing.expiration_date && differenceInDays(parseISO(ing.expiration_date), new Date()) >= 0 &&
            differenceInDays(parseISO(ing.expiration_date), new Date()) <= 3
        );

        if (expiredIngredients.length > 0) {
            toast.error('You cannot prepare this meal, please edit the expired ingredient to a brand-new ingredient.');
            return;
        }

        if (status === 'preparing' && expiringSoonIngredients.length > 0) {
            setDialogOpen(false);
            setPendingStatus(status);
            setShowConfirmDialog(true);
            return;
        }

        updateMealStatus(status);
    }

    function updateMealStatus(status) {
        setIsSubmitting(true);

        router.patch(route('kitchen-partner.meal-assignments.update', assignmentId), { status: status }, {
            onSuccess: () => {
                setDialogOpen(false);
                setShowConfirmDialog(false);
                setIsSubmitting(false);
                toast.success('Meal status updated successfully.');
            },
            onError: () => {
                setIsSubmitting(false);
                toast.error('Something went wrong.');
            }
        });
    }

    return (
        <KitchenPartnerLayout>
            <Toaster position="top-center" richColors />
            <div className="m-10">
                <h2 className="font-semibold mb-4 text-2xl">Hello, {orgName}!</h2>
                <KitchenCard assignments={mealAssignments} expiringIngredients={getExpiringIngredients(mealAssignments)}/>
                

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Week</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Member</TableHead>
                                <TableHead>Meal</TableHead>
                                <TableHead>Rider</TableHead>
                                <TableHead>Ingredients</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mealAssignments.map(assignment => {

                                return (
                                    <TableRow key={assignment.id}>
                                        <TableCell>{assignment.id}</TableCell>
                                        <TableCell>{assignment.weekly_plan_id}</TableCell>
                                        <TableCell>{assignment.day}</TableCell>
                                        <TableCell>{assignment.member?.last_name}</TableCell>
                                        <TableCell>{assignment.meal?.name}</TableCell>
                                        <TableCell>{assignment.rider.first_name} {assignment.rider.last_name}</TableCell>
                                        <TableCell>{assignment.meal?.ingredients?.length > 0 ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">View Ingredients</Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-100">
                                                    <DropdownMenuLabel>Ingredients</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {assignment.meal.ingredients.map((ing) => (
                                                        <DropdownMenuCheckboxItem key={ing.id}>
                                                            <div className="flex justify-between items-center">
                                                                <span title={`Purchased on: ${ing.date_arrive}`}>
                                                                    {ing.ing_name} - {ing.unit} | Exp: {ing.expiration_date || 'No Expiration Date'}
                                                                </span>
                                                                {ing.expiration_date && differenceInDays(parseISO(ing.expiration_date), new Date()) >= 0 &&
                                                                    differenceInDays(parseISO(ing.expiration_date), new Date()) <= 3 && (
                                                                        <ShieldAlert className="text-yellow-500 w-4 h-4 ml-2" />
                                                                    )}
                                                                {ing.expiration_date && differenceInDays(parseISO(ing.expiration_date), new Date()) < 0 && (
                                                                    <span className="bg-red-500 text-white text-xs rounded px-2 py-0.5 ml-2">
                                                                        Expired
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </DropdownMenuCheckboxItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <span className="text-gray-500 italic">No ingredients</span>
                                        )}
                                        </TableCell>
                                        <TableCell>{assignment.status}</TableCell>
                                        <TableCell>
                                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {setAssignmentId(assignment.id); setSelectedAssignment(assignment);}} 
                                                    >
                                                        Update Status
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-80">
                                                    <DialogHeader>
                                                        <DialogTitle>Update status</DialogTitle>
                                                        <DialogDescription>
                                                            What is the current status of the meal?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="">
                                                        <Select onValueChange={value => setStatus(value)}>
                                                            <SelectTrigger className="">
                                                                <SelectValue placeholder="Status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="pending">Pending</SelectItem>
                                                                    <SelectItem value="preparing">Preparing</SelectItem>
                                                                    <SelectItem value="picked up">Picked-up</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <Button onClick={handleSaveChanges} disabled={isSubmitting}>
                                                        Save changes
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                            <DialogContent className="w-80">
                                <DialogHeader>
                                    <div className="flex w-65 items-center bg-yellow-100 text-yellow-700 p-4 rounded-lg">
                                        <ShieldAlert className="w-5 h-5 mr-2 text-yellow-500" />
                                        <DialogTitle className="text-yellow-700">Warning</DialogTitle>
                                    </div>
                                    <DialogDescription className="text-sm text-yellow-700 font-medium">
                                        Ingredient will expire soon. Are you sure you want to prepare this meal?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={() => updateMealStatus(pendingStatus)} disabled={isSubmitting}>
                                        Yes, Prepare
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Table>
                </div>
            </div>
        </KitchenPartnerLayout>
    );
}
