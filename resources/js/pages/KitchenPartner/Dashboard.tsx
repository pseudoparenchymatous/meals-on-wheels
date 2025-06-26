import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import KitchenPartnerLayout from '@/layouts/KitchenPartnerLayout';
import { Link } from "@inertiajs/react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from 'react';
import KitchenCard from '@/components/KitchenCard';
import { Toaster } from 'sonner';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { differenceInDays, parseISO } from 'date-fns';
import { ShieldAlert } from 'lucide-react';

export default function Dashboard({ orgName, mealAssignments }) {
    const [assignmentId, setAssignmentId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [status, setStatus] = useState(0);

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
                                                                    )
                                                                }
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
                                                        onClick={() => setAssignmentId(assignment.id)}
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
                                                        <Button >
                                                            <Link
                                                                href={route('kitchen-partner.meal-assignments.update', assignmentId)} method="patch" data={{ status: status }}
                                                                onClick={() => setDialogOpen(false)}
                                                            >
                                                                Save changes
                                                            </Link>
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </KitchenPartnerLayout>
    );
}
