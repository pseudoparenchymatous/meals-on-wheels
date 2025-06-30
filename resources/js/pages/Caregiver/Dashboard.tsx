import CaregiverLayout from '@/layouts/CaregiverLayout';
import { Head } from '@inertiajs/react';

const InfoCard = ({ label, value }) => {
    return (
        <div className="border flex flex-col gap-3 justify-items-center m-10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg">{label}</h3>
            <span>{value}</span>
        </div>
    );
}

export default function Dashboard({ memberData }) {
    const cardData = [
        {
            label: "Full Name",
            value: memberData.fullName,
        },
        {
            label: "Age",
            value: memberData.age,
        },
        {
            label: "Dietary Restriction",
            value: memberData.diet || "None",
        },
    ];

    return (
        <CaregiverLayout>
            <Head title="Caregiver Dashboard" />
            <h2 className="font-semibold text-2xl">Member Information</h2>
            <div className="grid lg:grid-cols-3">
                {cardData.map(data => <InfoCard label={data.label} value={data.value} />)}
            </div>
        </CaregiverLayout>
    );
}
