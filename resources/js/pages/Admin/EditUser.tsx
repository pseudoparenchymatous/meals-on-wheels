import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import Map from '@/components/Map';
import { FormEvent } from 'react';

interface Userable {
    first_name: string,
    last_name: string,
    org_name: string,
}

interface User {
    id: number,
    userable: Userable,
    userable_type: string,
    email: string,
    location_lat: number,
    location_lng: number,
}

interface UserData {
    user: User,
}

export default function EditUser({ user }: UserData) {
    const { data, setData, patch, processing, errors } = useForm({
        first_name: user.userable.first_name,
        last_name: user.userable.last_name,
        email: user.email,
        org_name: user.userable.org_name,
        location_lat: user.location_lat,
        location_lng: user.location_lng,
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        patch(route('admin.users.update', user.id));
    }

    function getLocation(lat: number, lng: number) {
        setData('location_lat', lat);
        setData('location_lng', lng);
    }

    return (
        <AdminLayout>
            <Head title="Edit User" />
            <h1 className="font-semibold text-2xl mb-5">Edit User</h1>
            <form className="border p-10 rounded-xl w-fit" onSubmit={submit}>
                {user.userable_type !== 'kitchen partner' ?
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                onChange={e => setData('first_name', e.target.value)}
                                type="text"
                                value={data.first_name}
                            />
                            <InputError message={errors.first_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                onChange={e => setData('last_name', e.target.value)}
                                type="text"
                                value={data.last_name}
                            />
                            <InputError message={errors.last_name} />
                        </div>
                    </div>
                    :
                    <div>
                        <Label>Organization Name</Label>
                        <Input
                            id="org_name"
                            onChange={e => setData('org_name', e.target.value)}
                            type="text"
                            value={data.org_name}
                        />
                        <InputError message={errors.org_name} />
                    </div>
                }
                <div className='w-100'>
                    <Label className="mt-4">Location</Label>
                <div className="flex items-center justify-between my-4">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        className="w-fit"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="Email address"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                    <Map markAt={{ lat: data.location_lat, lng: data.location_lng }} sendLocation={getLocation} />
                </div>
                <div className="flex gap-3 justify-end mt-4">
                    <Button asChild variant="outline">
                        <Link href={route('admin.users.index')}>
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        disabled={processing}
                        type="submit"
                    >
                        Update
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
