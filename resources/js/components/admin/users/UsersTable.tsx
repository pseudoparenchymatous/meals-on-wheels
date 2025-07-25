import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface User {
    id: number,
    name: string,
    email: string,
    type: string,
}

export function UsersTable({ data }: { data: User[] }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [columnFilters, setColumnFilters] = useState([]);
    const [userId, setUserId] = useState(0);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

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
            header: () => (
                <Select
                    onValueChange={value => {
                        if (value === "none") {
                            table.resetColumnFilters(true);
                        } else {
                            table.getColumn("type")?.setFilterValue(value)
                        }
                    }}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">All</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="caregiver">Caregiver</SelectItem>
                        <SelectItem value="kitchen partner">Kitchen Partner</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="rider">Rider</SelectItem>
                    </SelectContent>
                </Select>
            ),
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <div className="space-x-2">
                    <Button asChild variant="outline">
                        <Link href={route('admin.users.edit', row.original.id)}>Edit</Link>
                    </Button>
                    {row.original.type !== 'admin' && (
                        <DialogTrigger asChild>
                            <Button variant="destructive" onClick={() => setUserId(row.original.id)}>Delete</Button>
                        </DialogTrigger>
                    )}
                </div>),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination
        },
    })

    return (
        <div>
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
                                <Button
                                    asChild
                                    variant="destructive"
                                    onClick={() => setDialogOpen(false)}
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    First
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon />
                </Button>
                <span className="text-sm text-muted-foreground">{pagination.pageIndex + 1} / {table.getPageCount()}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Last
                </Button>
            </div>
        </div>
    )
}
