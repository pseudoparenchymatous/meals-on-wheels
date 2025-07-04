import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface WeeklyPlansProp {
    weeklyPlans: WeeklyPlan[],
}

interface WeeklyPlan {
    id: number,
    start_date: string,
}

export default function WeeklyPlans({ weeklyPlans }: WeeklyPlansProp) {
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
