import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

enum UserTypes {
    Member = "member",
    Caregiver = "caregiver",
    Partner = "partner",
    Volunteer = "volunteer",
    Admin = "admin",
};

type RegisterForm = {
    first_name: string;
    last_name: string;
    org_name: string,
    partner_service: string,
    volunteer_service: string,
    member: {
        first_name: string,
        last_name: string,
    },
    email: string;
    password: string;
    password_confirmation: string;
    user_type: UserTypes;
    phone: string;
    address: string;
    birth_date: Date;
    diet: string;
};

const userTypes: { value: UserTypes, label: string } = [
    { value: UserTypes.Member,    label: 'Member (Meal Recipient)' },
    { value: UserTypes.Caregiver, label: 'Caregiver' },
    { value: UserTypes.Partner,   label: 'Partner' },
    { value: UserTypes.Volunteer, label: 'Volunteer' },
];

const partnerServices = [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'delivery', label: 'Delivery' },
];

const volunteerServices = [
    { value: 'rider', label: 'Rider' },
    { value: 'kitchen_staff', label: 'Kitchen Staff' },
];

const availableDiets = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' },
    { value: 'lactose_intolerant', label: 'Lactose Intolerant' },
    { value: 'diabetic', label: 'Diabetic' },
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
            
            {/* Birthday - Only for Members */}
            {data.user_type === 'member' && (
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="birth_date">Birthday</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="birth_date"
                                className="w-full justify-between font-normal text-left"
                            >
                                {data.birth_date 
                                    ? new Date(data.birth_date).toLocaleDateString() 
                                    : "Select birthday"}
                                <ChevronDownIcon className="h-4 w-4 ml-2" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={data.birth_date ? new Date(data.birth_date) : undefined}
                                captionLayout="dropdown"
                                onSelect={(date) =>
                                    setData('birth_date', date?.toISOString().split('T')[0] ?? '')
                                }
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.birth_date} />
                </div>
            )}


        </div>
    );
};

const PartnerInfo = function({ data, setData, errors }) {
    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="org_name">
                    Organization Name
                </Label>
                <Input
                    id="org_name"
                    type="text"
                    value={data.org_name}
                    onChange={(e) => setData('org_name', e.target.value)}
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
        member: {
            first_name: '',
            last_name: '',
        },
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        birthday: '',
        diet: '',
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
                        required
                    >
                        <SelectTrigger id="user_type" autoFocus>
                            <SelectValue placeholder="I am a.." />
                        </SelectTrigger>
                        <SelectContent>
                            {userTypes.map((userType) => (
                                <SelectItem key={userType.value} value={userType.value}>
                                    {userType.label}
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
                        {data.user_type === 'partner' ? <PartnerInfo data={data} setData={setData} errors={errors} /> : <PersonalInfo data={data} setData={setData} errors={errors}/>}

                        {data.user_type === 'volunteer' && <VolunteerService data={data} setData={setData} errors={errors} />}

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
                        <div className="grid gap-2">
                            <Label htmlFor="phone">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                autoComplete="tel"
                                required
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+63 XXX XXX XXXX"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        {/* Address */}
                        <div className="grid gap-2">
                            <Label htmlFor="address">
                                Address
                            </Label>
                            <Textarea
                                id="address"
                                autoComplete="street-address"
                                required
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Enter your complete address"
                                rows={3}
                            />
                            <InputError message={errors.address} />
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
                            <div className="grid gap-2">
                                <Label htmlFor="diet">
                                    Diet
                                </Label>
                                <Select
                                    id="diet"
                                    value={data.diet}
                                    onValueChange={(value) => setData('diet', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Diet" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableDiets.map((dietItem) => (
                                            <SelectItem key={dietItem.value} value={dietItem.value}>
                                                {dietItem.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.diet} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Caregiver Information */}
                {data.user_type === UserTypes.Caregiver &&
                    <div className="rounded-lg border p-6">
                        <h2 className="font-semibold text-xl ">Caregiver Information</h2>
                        <span className="text-muted-foreground mb-4 text-sm">Who is the member you are responsible for?</span>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {/* Name Fields */}
                            <div className="grid gap-2">
                                <Label htmlFor="member.first_name">
                                    First Name
                                </Label>
                                <Input
                                    id="member.first_name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    value={data.member.first_name}
                                    onChange={(e) => setData('member.first_name', e.target.value)}
                                    placeholder="First Name"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="member.last_name">
                                    Last Name
                                </Label>
                                <Input
                                    id="member.last_name"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    value={data.member.last_name}
                                    onChange={(e) => setData('member.last_name', e.target.value)}
                                    placeholder="Last Name"
                                />
                            </div>
                            <InputError message={errors["member.first_name"] || errors["member.last_name"]} />
                        </div>
                    </div>
                }

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={processing || data.user_type === ''}
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
