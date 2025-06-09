import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    user_type: string;
    phone: string;
    address: string;
    emergency_contact: string;
    dietary_requirements: string;
    medical_conditions: string;
};

const userTypes = [
    { value: 'member', label: 'Member (Meal Recipient)' },
    { value: 'caregiver', label: 'Caregiver' },
    { value: 'partner', label: 'Partner' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'donor', label: 'Donor/Supporter' }
];

const partnerServices = [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'delivery', label: 'Delivery' },
];

const volunteerServices = [
    { value: 'rider', label: 'Rider' },
    { value: 'kitchen_staff', label: 'Kitchen Staff' },
];

const PersonalInfo = function({ data, setData, errors }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Name Fields */}
            <div className="grid gap-2">
                <Label htmlFor="first_name">
                    First Name
                </Label>
                <Input
                    id="first_name"
                    type="text"
                    autoComplete="given-name"
                    autoFocus
                    required
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    placeholder="First Name"
                />
                <InputError message={errors.first_name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="last_name">
                    Last Name
                </Label>
                <Input
                    id="last_name"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    placeholder="Last Name"
                />
                <InputError message={errors.last_name} />
            </div>
        </div>
    );
};

const PartnerInfo = function({ data, setData, errors }) {
    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="org_name" className="text-sm font-medium text-foreground">
                    Organization Name
                </Label>
                <Input
                    id="org_name"
                    type="text"
                    autoComplete="organization"
                    value={data.org_name}
                    onChange={(value) => setData('org_name', value)}
                    required
                    placeholder="Organization"
                />
                <InputError message={errors.org_name} />
            </div>

            {/* Partner Service */}
            <div className="grid gap-2">
                <Label htmlFor="partner_service" className="">
                    Type of service
                </Label>
                <Select
                    id="partner_service"
                    value={data.partner_service}
                    onValueChange={(value) => setData('partner_service', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="We provide..." />
                    </SelectTrigger>
                    <SelectContent>
                        {partnerServices.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.partner_service} />
            </div>
        </div>
    );
};

const VolunteerService = function({ data, setData, errors }) {
    return (
        <div>
            <Label htmlFor="volunteer_service">
                Type of service
            </Label>
            <Select
                id="volunteer_service"
                value={data.volunteer_service}
                onValueChange={(value) => setData('volunteer_service', value)}
                autoFocus
            >
                <SelectTrigger className="my-1">
                    <SelectValue placeholder="I volunteer as..." />
                </SelectTrigger>
                <SelectContent>
                    {volunteerServices.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                            {service.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={errors.volunteer_service} />
        </div>
    );
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        user_type: '',
        first_name: '',
        last_name: '',
        org_name: '',
        partner_service: '',
        volunteer_service: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        emergency_contact: '',
        dietary_requirements: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Join Us" description="Create your account to get started">
            <Head title="Register" />
            {/* Register form */}
            <form className="flex flex-col gap-5" onSubmit={submit}>
                {/* User Type */}
                <div className="border grid gap-2 p-6 rounded-lg">
                    <Label htmlFor="user_type">
                        Register as
                    </Label>
                    <Select
                        id="user_type"
                        value={data.user_type}
                        onValueChange={(value) => setData('user_type', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="I am a.." />
                        </SelectTrigger>
                        <SelectContent>
                            {userTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.user_type} />
                </div>

                {/* Account Information */}
                <div className="rounded-lg border p-6">
                    <h2 className="font-semibold mb-4 text-xl">Account Information</h2>
                    <div className="flex flex-col gap-4">
                        {/* Names */}
                        {data.user_type == 'partner' ? <PartnerInfo data={data} setData={setData} errors={errors} /> : <PersonalInfo data={data} setData={setData} errors={errors}/>}

                        {data.user_type == 'volunteer' && <VolunteerService data={data} setData={setData} errors={errors} />}

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                placeholder="Email"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Fields */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm Password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="rounded-lg border p-6">
                    <h2 className="font-semibold mb-4 text-xl ">Contact Information</h2>

                    <div className="space-y-4">
                        {/* Phone */}
                        <div>
                            <Label htmlFor="phone" className="text-sm text-foreground">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+63 XXX XXX XXXX"
                                className="mt-1"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        {/* Address */}
                        <div>
                            <Label htmlFor="address" className="text-sm text-foreground">
                                Address
                            </Label>
                            <textarea
                                id="address"
                                required
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Enter your complete address"
                                rows={3}
                                className="mt-1 w-full border border-gray-300 rounded-md p-3 focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585] focus:ring-opacity-20 resize-none"
                            />
                            <InputError message={errors.address} />
                        </div>

                        {/* Emergency Contact */}
                        <div>
                            <Label htmlFor="emergency_contact" className="text-sm text-foreground">
                                Emergency Contact
                            </Label>
                            <Input
                                id="emergency_contact"
                                type="text"
                                value={data.emergency_contact}
                                onChange={(e) => setData('emergency_contact', e.target.value)}
                                placeholder="Name and phone number"
                                className="mt-1"
                            />
                            <InputError message={errors.emergency_contact} />
                        </div>
                    </div>
                </div>

                {/* Additional Information for Members */}
                {data.user_type === 'member' && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Additional Information
                            <span className="text-sm text-muted-foreground ml-2">(Optional)</span>
                        </h3>

                        <div className="space-y-4">
                            {/* Dietary Requirements */}
                            <div>
                                <Label className="text-sm">
                                    Dietary Requirements
                                </Label>
                                <select
                                    value={data.dietary_requirements}
                                    onChange={(e) => setData('dietary_requirements', e.target.value)}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-3 focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585] focus:ring-opacity-20"
                                >
                                    <option value="">Select dietary preference</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Halal">Halal</option>
                                    <option value="Kosher">Kosher</option>
                                    <option value="Gluten-Free">Gluten-Free</option>
                                    <option value="Lactose Intolerant">Lactose Intolerant</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.dietary_requirements} />
                            </div>

                            {/* Medical Conditions */}
                            <div>
                                <Label className="text-sm text-foreground">
                                    Medical Conditions (Image Upload)
                                </Label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                setData('medical_conditions', event.target?.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        } else {
                                            setData('medical_conditions', '');
                                        }
                                    }}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#4361EE] file:text-white hover:file:bg-[#4361EE]/90"
                                />
                                <InputError message={errors.medical_conditions} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={processing}
                >
                    {processing ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                            Creating Account...
                        </>
                    ) : (
                            'Create Account'
                        )}
                </Button>

                {/* Login Link */}
                <div className="text-center text-muted-foreground text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} className="hover:text-primary">
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
