import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import Map from '@/components/Map';
import { FormEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Diet = string;

interface Userable {
    first_name: string,
    last_name: string,
    org_name: string,
    diet: string,
}

interface User {
    id: number,
    userable: Userable,
    userable_type: string,
    email: string,
    location_lat: number,
    location_lng: number,
}

interface EditUserProp {
    user: User,
    diets: Diet[],
}

export default function EditUser({ user, diets }: EditUserProp) {
    const { data, setData, patch, processing, errors } = useForm({
        first_name: user.userable.first_name,
        last_name: user.userable.last_name,
        email: user.email,
        org_name: user.userable.org_name,
        location_lat: user.location_lat,
        location_lng: user.location_lng,
        diet: user.userable.diet,
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
                        <div className="flex justify-between items-center">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                className='w-fit'
                                onChange={e => setData('first_name', e.target.value)}
                                type="text"
                                value={data.first_name}
                            />
                            <InputError message={errors.first_name} />
                        </div>
                        <div className="flex justify-between items-center">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                className='w-fit'
                                onChange={e => setData('last_name', e.target.value)}
                                type="text"
                                value={data.last_name}
                            />
                            <InputError message={errors.last_name} />
                        </div>
                    </div>
                    :
                    <div className="flex justify-between items-center">
                        <Label>Organization Name</Label>
                        <Input
                            className="w-fit"
                            id="org_name"
                            onChange={e => setData('org_name', e.target.value)}
                            type="text"
                            value={data.org_name}
                        />
                        <InputError message={errors.org_name} />
                    </div>
                }
                <div className="grid my-4">
                    <div className='flex items-center justify-between'>
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
                    </div>
                    <InputError className="mt-2 text-right" message={errors.email} />
                </div>
                {user.userable_type === "member" &&
                    <div className="grid my-4">
                        <div className='flex items-center justify-between'>
                            <Label htmlFor="diet">Diet</Label>
                            <Select
                                name='selectDiet'
                                value={data.diet}
                                onValueChange={(value) => setData('diet', value)}
                            >
                                <SelectTrigger
                                    id='diet'
                                    className='w-fit'
                                >
                                    <SelectValue placeholder="Diet" />
                                </SelectTrigger>
                                <SelectContent
                                    className='z-1000'
                                >
                                    {diets.map((diet, index) => (
                                        <SelectItem key={index} value={diet}>
                                            {diet}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError className="mt-2 text-right" message={errors.diet} />
                    </div>
                }
                <div className='grid gap-4 w-100'>
                    <Label>Location</Label>
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
