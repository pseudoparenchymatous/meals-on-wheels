import { cn } from "@/lib/utils"
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
import Map from '@/components/Map';
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react';
import * as PhoneInput from "react-phone-number-input/input";

enum UserTypes {
    Member = "member",
    Caregiver = "caregiver",
    KitchenPartner = "kitchen partner",
    Rider = "rider",
    Admin = "admin",
};

type RegisterForm = {
    first_name: string;
    last_name: string;
    org_name: string,
    member: {
        first_name: string,
        last_name: string,
    },
    email: string;
    password: string;
    password_confirmation: string;
    user_type: UserTypes;
    phone: string;
    location_lat: number;
    location_lng: number;
    birth_date: Date;
    proof_of_identity: File | null;
    medical_condition?: File | null;
    diet: string;
};

const userTypes: { value: UserTypes, label: string }[] = [
    { value: UserTypes.Member,    label: 'Member (Meal Recipient)' },
    { value: UserTypes.Caregiver, label: 'Caregiver' },
    { value: UserTypes.KitchenPartner,   label: 'Kitchen Partner' },
    { value: UserTypes.Rider, label: 'Rider' },
];

type Diet = string;
type AvailableDiets = Diet[];
interface RegisterProp {
    availableDiets:  AvailableDiets,
}

export default function Register(registerProp: RegisterProp) {
    const [calendarOpen, setCalendarOpen] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        user_type: '',
        first_name: '',
        last_name: '',
        org_name: '',
        member: {
            first_name: '',
            last_name: '',
        },
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        location_lat: 10.338509,
        location_lng: 123.912008,
        birthday: '',
        diet: '',
    });

    function getLocation(lat: number, lng: number) {
        setData('location_lat', lat);
        setData('location_lng', lng);
    }

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
                    <Label htmlFor="userType">
                        Register as
                    </Label>
                    <Select
                        name="userType"
                        value={data.user_type}
                        onValueChange={(value) => setData('user_type', value)}
                        required
                    >
                        <SelectTrigger id="userType" autoFocus>
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

                        {/* Personal Information */}
                        {data.user_type !== 'kitchen partner' && (
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

                                {/* Birthday */}
                                {data.user_type === 'member' && (
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="birth-date">Birthday</Label>
                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="birth-date"
                                                    variant="outline"
                                                    data-empty={!data.birth_date}
                                                    className={cn(
                                                        "justify-start text-left font-normal",
                                                        !data.birth_date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.birth_date ? format(data.birth_date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    today={ new Date(2000, 0, 1) }
                                                    selected={data.birth_date}
                                                    onSelect={date => {
                                                        setData('birth_date', format(date, 'yyyy-MM-dd'));
                                                        setCalendarOpen(false);
                                                    }}
                                                    disabled={[
                                                        { after: new Date(2005, 11, 31) }
                                                    ]}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.birth_date} />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Kitchen Partner Info */}
                        {data.user_type === 'kitchen partner' && (
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
                        </div>
                        )}

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
                                autoComplete="new-password"
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
                                autoComplete="new-password"
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
                            <PhoneInput.default
                                inputComponent={Input}
                                country="PH"
                                international
                                withCountryCallingCode
                                value={data.phone}
                                onChange={value => setData("phone", value)}
                            />
                            <InputError message={errors.phone} />
                        </div>

                        {/* Address */}
                        <div className="grid gap-2">
                            <Label htmlFor="location">
                                Address
                            </Label>
                            <Map id="location" markAt={{ lat: data.location_lat, lng: data.location_lng }} sendLocation={getLocation} />
                        </div>
                    </div>
                </div>

                {/* Additional Information for Members */}
                {data.user_type === 'member' && (
                    <div className="rounded-lg border p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Additional Information
                        </h3>
                        <div className="grid gap-3">
                            <div className="grid gap-2">
                                <Label htmlFor="proof_of_identity">
                                    Proof of Identity
                                </Label>
                                <Input id="proof_of_identity" required type="file" accept="image/png, image/jpeg" onChange={(e) => setData('proof_of_identity', e.target.files?.[0])} />
                                <InputError message={errors.proof_of_identity} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="medical_condition">
                                    Medical Condition
                                </Label>
                                <Input id="medical_condition" type="file" accept="image/png, image/jpeg" onChange={(e) => setData('medical_condition', e.target.files?.[0])}/>
                                <InputError message={errors.medical_condition} />
                            </div>
                            {/* Dietary Requirements */}
                            <div className="grid gap-2">
                                <Label htmlFor="diet">
                                    Diet
                                    <span className="text-sm text-muted-foreground ml-1">(Optional)</span>
                                </Label>
                                <Select
                                    value={data.diet}
                                    onValueChange={(value) => setData('diet', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Diet" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {registerProp.availableDiets.map((diet, index) => (
                                            <SelectItem key={index} value={diet}>
                                                {diet}
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
