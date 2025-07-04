import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilLine } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

export default function IngredientsTable({ Ingredients, setSelected, setOpen, userType }) {

    return (
        <TableBody>
            {Ingredients.map(ing => {
                // Calculate how many days left before expiration
                const daysLeft = differenceInDays(parseISO(ing.expiration_date), new Date());

                let status = '';
                let statusColor = '';

                if (daysLeft < 0) {
                    status = 'Expired';
                    statusColor = 'text-red-600 font-semibold';
                } else if (daysLeft <= 3) {
                    status = `Expiring in ${daysLeft} day(s)`;
                    statusColor = 'text-yellow-500 font-semibold';
                } else {
                    status = 'Safe';
                    statusColor = 'text-green-600 font-semibold';
                }

                return (
                    <TableRow key={ing.id} className="">
                        <TableCell>{ing.id}</TableCell>
                        <TableCell>{ing.meal_name}</TableCell>
                        <TableCell>{ing.ing_name}</TableCell>
                        <TableCell>{ing.ing_type}</TableCell>
                        <TableCell>{ing.unit}</TableCell>
                        <TableCell>{ing.date_arrive}</TableCell>
                        <TableCell>{ing.expiration_date}</TableCell>

                        {/* Status Column */}
                        <TableCell>
                            <span className={statusColor}>{status}</span>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="space-x-2">
                            <PencilLine
                                onClick={() => {
                                    setSelected(ing);
                                    setOpen(true)
                                }}
                                className="text-blue-600 hover:underline cursor-pointer ml-2"
                            />
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}
