import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useState } from 'react';

export function UsersTable({ data }) {
    const columns = [
        {
            accessorKey: 'id',
            header: 'User ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'type',
            header: 'Type',
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <div className="space-x-2">
                    <Button asChild variant="outline">
                        <Link href={route('admin.users.edit', row.original.id)}>Edit</Link>
                    </Button>
                    <DialogTrigger asChild>
                        <Button variant="destructive" onClick={() => setUserId(row.original.id)}>Delete</Button>
                    </DialogTrigger>

                </div>),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const [dialogOpen, setDialogOpen] = useState(false);
    const [userId, setUserId] = useState(0);

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete this user.
                                </DialogDescription>
                            </DialogHeader>
                            <Toaster richColors position="top-center" />
                            <Button
                                asChild
                                variant="destructive"
                                onClick={() => {
                                    setDialogOpen(false);
                                    toast.success("User has been deleted");
                                }}
                            >
                                <Link href={route('admin.users.destroy', userId)} method="delete">
                                    Confirm Delete
                                </Link>
                            </Button>
                        </DialogContent>
                    </Dialog>
                </TableBody>
            </Table>
        </div>
    )
}