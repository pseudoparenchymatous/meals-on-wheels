import AdminLayout from '@/layouts/AdminLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Head, Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useState } from 'react';
import { UsersTable } from '@/components/admin/users/UsersTable';

export default function Users({ unverifiedMembers, users }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [toVerify, setToVerify] = useState(0);
    const [proofPath, setProofPath] = useState('');
    const [conditionPath, setConditionPath] = useState('');

    return (
        <AdminLayout>
            <Head title="Users" />
            <Toaster richColors position="top-center"/>
            <div>
                <h1 className="font-semibold mb-4 text-2xl">Users</h1>
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Users</TabsTrigger>
                        <TabsTrigger value="unverified">Needs Verification</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <UsersTable data={users} />
                    </TabsContent>
                    <TabsContent value="unverified">
                        <div className="border rounded-xl">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Birthdate</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                        {unverifiedMembers.map(member => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">{member.id}</TableCell>
                                                <TableCell>{member.first_name} {member.last_name}</TableCell>
                                                <TableCell>{member.birth_date}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" onClick={() => {
                                                            setToVerify(member.id);
                                                            setProofPath(member.proof_of_identity);
                                                            setConditionPath(member.medical_condition);
                                                        }}>Check</Button>
                                                    </DialogTrigger>
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
