import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import WeeklyPlanner from '@/components/admin/WeeklyPlanner';

export default function Plan({ weeklyPlans}) {
    return (
        <AdminLayout>
            <Head title="Weekly Planning" />
            <div className="m-10">
                <div>
                    <WeeklyPlanner weeklyPlans={weeklyPlans}/>
                </div>
            </div>
        </AdminLayout>
    );
}
