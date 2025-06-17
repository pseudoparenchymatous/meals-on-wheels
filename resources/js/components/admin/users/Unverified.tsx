import { Button } from "@/components/ui/button";
import { 
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription 
 } from "@/components/ui/dialog";
import { Link } from "@inertiajs/react";
import { TableRow, TableCell } from "@/components/ui/table";
import { useState } from "react";

export default function Unverified({ users }) {
    const [userId, setUserId] = useState(null);

    return (
        <Dialog>
            {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.userable_type}</TableCell>
                    <TableCell className="flex gap-2">
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={()=>setUserId(user.id)}>Check</Button>
                        </DialogTrigger>
                    </TableCell>
                </TableRow>
            ))}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    <Button asChild>
                        <Link href={route('members.verify')} method="post" data={{ user_id: userId }}>Verify</Link>
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}