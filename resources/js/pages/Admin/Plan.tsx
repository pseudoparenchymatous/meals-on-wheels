import AdminLayout from '@/layouts/AdminLayout';
import { Button } from "@/components/ui/button"
import { Head, Link, usePage } from '@inertiajs/react';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import WeeklyPlans from "@/components/admin/WeeklyPlans";

export default function Plan({ weeklyPlans }) {
    const { flash } = usePage().props
    if (flash.message) {
        toast.success(flash.message);
    }

    return (
        <AdminLayout>
            <Head title="Weekly Planning" />
            <Toaster position="top-center" richColors />
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-xl">Weekly Plans</h1>
                    <Button asChild className="w-fit" variant="outline">
                        <Link href={route('weekly-plans.store')} method="post">Create Weekly Plan</Link>
                    </Button>
                </div>
                <WeeklyPlans weeklyPlans={weeklyPlans} />
            </div>
        </AdminLayout>
    );
}
