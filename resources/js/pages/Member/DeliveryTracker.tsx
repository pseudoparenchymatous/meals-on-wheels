import { Head, useForm, usePage } from '@inertiajs/react';
import MemberLayout from '@/layouts/MemberLayout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

const statusColor = {
    pending: 'text-yellow-600',
    preparing: 'text-blue-600',
    'picked up': 'text-orange-600',
    'on the way': 'text-purple-600',
    delivered: 'text-green-600',
};

export default function DeliveryTracker({ deliveries }) {
    const [deliveryId, setDeliveryId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { data, setData, post } = useForm({
        deliveryId: 0,
        feedback: '',
    });

    const { flash } = usePage().props;
    if (flash.message) {
        setTimeout(() => {
            toast.success(flash.message);
        }, 0);
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('member.meal.feedback', deliveryId));
    };

    return (
        <MemberLayout>
            <Head title="Meal Delivery Tracker" />
            <div className="p-4 space-y-4">
                <Toaster richColors position="top-center" />
                <h1 className="text-xl font-semibold">Your Meal Deliveries</h1>
                {deliveries.length === 0 ? (
                    <p>No deliveries found.</p>
                ) : (
                    <ul className="space-y-3">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            {deliveries.map((delivery) => (
                                <li key={delivery.id} className="border rounded-md p-4 shadow">
                                    <div className="font-medium text-lg">
                                        <span>{delivery.temperature.toUpperCase()} </span>
                                        {delivery.meal}
                                    </div>
                                    <div>
                                        Status: <strong className={statusColor[delivery.status] || 'text-gray-800'}>{delivery.status.toUpperCase()}</strong>
                                    </div>
                                    <div>Day: {delivery.day}</div>
                                    <div>Week: {delivery.week}</div>
                                    <div>Kitchen Partner: {delivery.kitchen_partner}</div>
                                    <div>Rider: {delivery.rider}</div>
                                    {delivery.status === "delivered" && (
                                        <DialogTrigger asChild className="mt-2">
                                            <Button onClick={() => setDeliveryId(delivery.id)}>Submit Feedback</Button>
                                        </DialogTrigger>
                                    )}
                                </li>
                            ))}
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Feedback Form</DialogTitle>
                                    <DialogDescription>Please confirm that the submitted files are legit</DialogDescription>
                                    <form onSubmit={submit}>
                                    <div className="grid w-full gap-3">
                                        <Textarea
                                            value={data.feedback}
                                            onChange={e => setData('feedback', e.target.value)}
                                            id="feedback"
                                            placeholder="Type your feedback here."
                                        />
                                        <p className="text-muted-foreground text-sm">
                                            Your message will be copied to the support team.
                                        </p>
                                                <Button
                                                    onClick={() => setDialogOpen(false)}
                                                    type="submit"
                                                >Submit
                                                </Button>
                                    </div>
                                    </form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </ul>
                )}
            </div>
        </MemberLayout>
    );
}

