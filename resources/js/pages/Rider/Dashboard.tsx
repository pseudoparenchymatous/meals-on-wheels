import RiderLayout from '@/layouts/RiderLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <RiderLayout>
            <Head title="Rider Dashboard" />
            <div>
                Rider!
            </div>
        </RiderLayout>
    );
}

