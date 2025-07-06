import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Head, Link, usePage } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast, Toaster } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MealAssignmentsProps {
    mealAssignments: MealAssignment[],
}

interface MealAssignment {
    day: string,
    id: string,
    member: Member,
    kitchen_partner: KitchenPartner,
    weekly_plan_id: number,
    meal: Meal,
    rider: Rider,
    status: string,
    temperature: string,
    meal_feedback: MealFeedback,
}

interface Member {
    first_name: string,
    last_name: string,
}

interface KitchenPartner {
    org_name: string,
}

interface Meal {
    name: string,
}

interface Rider {
    first_name: string,
    last_name: string,
}

interface MealFeedback {
    feedback: string,
}

interface FlashProps {
    message?: string,
}

type UsePageProp = {
    flash: FlashProps,
};

// Add types to fix Typescript errors
export default function MealAssignments({ mealAssignments }: MealAssignmentsProps) {
    const { flash } = usePage<UsePageProp>().props
    if (flash.message) {
        setTimeout(() => {
            toast.success(flash.message);
        }, 0)
    }

    return (
        // Use layout for all admin pages to reduce repetition
        <AdminLayout>
            <Head title="Meal Assignments" />
            <Toaster position="top-center" richColors />
            <div className="flex justify-between items-center">
                <Button asChild variant="outline" className="my-3">
                <h1 className="font-semibold mb-4 text-3xl">Meal Assignments</h1>
                        {/* Use route() method to avoid hard-coding routes as strings */}
                    <Link href={route("admin.meal-assignments.create")}>Assign Meal</Link>
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
                        {/* Use map() method to avoid repeating code for each table row */}
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
