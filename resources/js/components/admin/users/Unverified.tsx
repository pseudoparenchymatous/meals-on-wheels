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

    return (
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
                                <TableCell>{member.name}</TableCell>
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
    );
}
