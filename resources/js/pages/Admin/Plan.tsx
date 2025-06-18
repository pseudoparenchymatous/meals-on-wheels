import AdminLayout from '@/layouts/AdminLayout';
import WeeklyPlanner from '@/components/admin/WeeklyPlanner';
import { Head } from '@inertiajs/react';

export default function Plan() {
    return (
        <AdminLayout>
            <Head title="Weekly Planning" />
            <div className="m-10">
                <div>
                    <WeeklyPlanner />
                </div>
            </div>
        </AdminLayout>
    );
}
