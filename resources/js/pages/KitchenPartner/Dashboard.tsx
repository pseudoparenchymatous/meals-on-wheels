import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import KitchenPartnerLayout from '@/layouts/KitchenPartnerLayout';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@inertiajs/react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from 'react';

export default function Dashboard({ mealAssignments }) {
    const [assignmentId, setAssignmentId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [status, setStatus] = useState(0);

    return (
        <KitchenPartnerLayout>
            <div className="m-10">
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Week</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Meal</TableHead>
                                <TableHead>Rider</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mealAssignments.map(assignment => (
                                <TableRow key={assignment.id}>
                                    <TableCell>{assignment.id}</TableCell>
                                    <TableCell>{assignment.weekly_plan_id}</TableCell>
                                    <TableCell>{assignment.day}</TableCell>
                                    <TableCell>{assignment.meal.name}</TableCell>
                                    <TableCell>{assignment.rider.first_name} {assignment.rider.first_name}</TableCell>
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
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </KitchenPartnerLayout>
    );
}
