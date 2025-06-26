import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function WeeklyPlans({ weeklyPlans }) {
    return (
        <div className="border rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Week Number</TableHead>
                        <TableHead>Start Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {weeklyPlans.map(plan => (
                        <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.id}</TableCell>
                            <TableCell>{plan.start_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
