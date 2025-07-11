import AdminLayout from '@/layouts/AdminLayout';
import { Button } from "@/components/ui/button"
import { Head, Link, usePage } from '@inertiajs/react';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import WeeklyPlans from "@/components/admin/WeeklyPlans";

interface PlanProps {
    weeklyPlans: WeeklyPlan[],
}

interface WeeklyPlan {
    id: number,
    start_date: string,
}

interface FlashProps {
    message?: string,
}

type UsePageProp = {
    flash: FlashProps,
};

// Add types to fix Typescript errors
export default function Plan({ weeklyPlans }: PlanProps) {
    const { flash } = usePage<UsePageProp>().props;
    if (flash.message) {
        toast.success(flash.message);
    }

    return (
        // Use layout for all admin pages to reduce repetition
        <AdminLayout>
            <Head title="Weekly Planning" />
            <Toaster position="top-center" richColors />
            {/* This is the main content container */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-3xl">Weekly Plans</h1>
                    <Button asChild className="w-fit" variant="outline">
                        {/* Use route() method to avoid hard-coding routes as strings */}
                        <Link href={route('admin.weekly-plans.store')} method="post">Create Weekly Plan</Link>
                    </Button>
                </div>
                <WeeklyPlans weeklyPlans={weeklyPlans} />
            </div>
        </AdminLayout>
    );
}
