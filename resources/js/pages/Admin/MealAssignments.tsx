import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MealAssignments({ mealAssignments }) {
    return (
        <AdminLayout>
            <Head title="Meal Assignments" />
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
                            <TableHead>Rider</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mealAssignments.map(assignment => (
                            <TableRow>
                                <TableCell>{assignment.id}</TableCell>
                                <TableCell>{assignment.member.first_name} {assignment.member.last_name}</TableCell>
                                <TableCell>{assignment.weekly_plan_id}</TableCell>
                                <TableCell>{assignment.day}</TableCell>
                                <TableCell>{assignment.meal.name}</TableCell>
                                <TableCell>{assignment.kitchen_partner.org_name}</TableCell>
                                <TableCell>{assignment.rider.first_name} {assignment.rider.first_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}