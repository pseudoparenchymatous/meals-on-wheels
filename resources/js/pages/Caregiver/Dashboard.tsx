import CaregiverLayout from '@/layouts/CaregiverLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <CaregiverLayout>
            <Head title="Caregiver Dashboard" />
            <div>
                Caregiver!
            </div>
        </CaregiverLayout>
    );
}