import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function WeeklyPlans({ weeklyPlans }) {
    return (
        <div className="border m-5 rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Week Number</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {weeklyPlans.map(plan => (
                        <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.id}</TableCell>
                            <TableCell>{plan.start_date}</TableCell>
                            <TableCell>
                                <Button variant="outline" className="mr-2">Edit</Button>
                                <Button variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}