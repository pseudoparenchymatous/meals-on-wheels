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
import { TableRow, TableCell, Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    Row,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface UnverifiedMember {
    id: number,
    name: string,
    birth_date: string,
    proof_of_identity: string,
    medical_condition: string,
}

export default function Unverified({ unverifiedMembers }: { unverifiedMembers: UnverifiedMember[] }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [toVerify, setToVerify] = useState(0);
    const [proofPath, setProofPath] = useState('');
    const [conditionPath, setConditionPath] = useState('');

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = [
        {
            accessorKey: 'id',
            header: 'Member ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'birth_date',
            header: 'Birthdate',
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }: { row: Row<UnverifiedMember> }) => (
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setToVerify(row.original.id);
                            setProofPath(row.original.proof_of_identity);
                            setConditionPath(row.original.medical_condition);
                        }}
                    >
                        Check
                    </Button>
                </DialogTrigger>
            ),
        },
    ];

    const table = useReactTable({
        data: unverifiedMembers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        },
    })

    return (
        <div>
            <div className="border rounded-xl">
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
                                    <DialogTitle>Verify User?</DialogTitle>
                                    <DialogDescription>Please confirm that the submitted files are legit</DialogDescription>
                                    <div>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="identity">
                                                <AccordionTrigger>Proof of Identity</AccordionTrigger>
                                                <AccordionContent>
                                                    <img src={"/api/images/"+proofPath}/>
                                                </AccordionContent>
                                            </AccordionItem>
                                            {conditionPath && (
                                                <AccordionItem value="condition">
                                                    <AccordionTrigger>Medical Condition</AccordionTrigger>
                                                    <AccordionContent>
                                                        <img src={"/api/images/"+conditionPath} />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )}
                                        </Accordion>
                                    </div>
                                    <Button asChild onClick={()=>setDialogOpen(false)}>
                                        <Link href={route('members.verify', toVerify)} method="patch">Verify</Link>
                                    </Button>
                                </DialogHeader>
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
    );
}
