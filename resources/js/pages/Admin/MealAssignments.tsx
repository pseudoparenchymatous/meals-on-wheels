import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Head, Link, usePage } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast, Toaster } from "sonner";

export default function MealAssignments({ mealAssignments }) {
    const { flash } = usePage().props
    if (flash.message) {
        setTimeout(() => {
            toast.success(flash.message);
        }, 0)
    }

    return (
        <AdminLayout>
            <Head title="Meal Assignments" />
            <Toaster position="top-center" richColors />
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">Meal Assignments</h1>
                <Button asChild variant="outline" className="my-3">
                    <Link href={route('admin.meal-assignments.create')}>Assign Meal</Link>
                </Button>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Member</TableHead>
                            <TableHead>Week</TableHead>
                            <TableHead>Day</TableHead>
                            <TableHead>Meal</TableHead>
                            <TableHead>Kitchen Partner</TableHead>
                            <TableHead>Temperature</TableHead>
                            <TableHead>Rider</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Feedback</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mealAssignments.map(assignment => (
                            <TableRow id={assignment.id} key={assignment.id}>
                                <TableCell>{assignment.id}</TableCell>
                                <TableCell>{assignment.member.first_name} {assignment.member.last_name}</TableCell>
                                <TableCell>{assignment.weekly_plan_id}</TableCell>
                                <TableCell>{assignment.day}</TableCell>
                                <TableCell>{assignment.meal?.name}</TableCell>
                                <TableCell>{assignment.kitchen_partner.org_name}</TableCell>
                                <TableCell>{assignment.temperature}</TableCell>
                                <TableCell>{assignment.rider.first_name} {assignment.rider.last_name}</TableCell>
                                <TableCell>{assignment.status}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Show</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="p-2 text-xs">
                                            {assignment.meal_feedback ? (
                                                <p>{assignment.meal_feedback.feedback}</p>
                                            ) : (
                                                <p>Nothing</p>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}
