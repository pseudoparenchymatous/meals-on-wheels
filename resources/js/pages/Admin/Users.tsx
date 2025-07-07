import AdminLayout from '@/layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { UsersTable } from '@/components/admin/users/UsersTable';
import Unverified from '@/components/admin/users/Unverified';

interface UsersProp {
    unverifiedMembers: Unverified[],
    users: User[],
}

interface User {}

interface Unverified {
    id: number,
    name: string,
    birth_date: string,
    proof_of_identity: string,
    medical_condition: string,
}

interface FlashProps {
    message?: string,
}

type UsePageProp = {
    flash: FlashProps,
};

export default function Users({ unverifiedMembers, users }: UsersProp) {
    const { flash } = usePage<UsePageProp>().props

    if (flash.message) {
        setTimeout(() => {
            toast.success(flash.message);
            flash.message = '';
        }, 0)
    }


    return (
        // Use layout template to reduce code repetition
        <AdminLayout>
            <Head title="Users" />
            <Toaster richColors position="top-center"/>
            <div>
                <h1 className="font-semibold mb-4 text-3xl">Users</h1>
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Users</TabsTrigger>
                        <TabsTrigger value="unverified">Needs Verification</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        {/* Handle rendering of all users in a separate component */}
                        <UsersTable data={users} />
                    </TabsContent>
                    <TabsContent value="unverified">
                        <Unverified unverifiedMembers={unverifiedMembers} />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
