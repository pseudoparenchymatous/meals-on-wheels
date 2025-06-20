import React from 'react';
import DonorManagementCom from '@/components/admin/DonorManagementCom';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function DonorsPage({ donors }) {
    return (
        <AdminLayout>
            <Head title="Donors" />
            <div className="m-10">
                <DonorManagementCom donors={donors} />
            </div>
        </AdminLayout>
    );
}