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
    { value: 'partner', label: 'Food Service Partner' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'donor', label: 'Donor/Supporter' }
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: 'member',
        phone: '',
        address: '',
        emergency_contact: '',
        dietary_requirements: '',
        medical_conditions: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Join MerryMeal" description="Create your account to get started">
            <Head title="Register" />
            
            <div className="w-full max-w-lg mx-auto">
                {/* Header */}
                

                <form className="space-y-6" onSubmit={submit}>
                    {/* Basic Information */}
                    <div className="bg-background rounded-lg border p-6">
                        <h3 className="text-fray font-semibold text-foreground mb-4">Basic Information</h3>
                        
                        <div className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="first_name" className="text-sm font-medium text-foreground">
                                        First Name *
                                    </Label>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        placeholder="First name"
                                        className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                    />
                                    <InputError message={errors.first_name} />
                                </div>

                                <div>
                                    <Label htmlFor="last_name" className="text-sm font-medium text-foreground">
                                        Last Name *
                                    </Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        required
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        placeholder="Last name"
                                        className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                    />
                                    <InputError message={errors.last_name} />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                    Email Address *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                    className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* User Type */}
                            <div>
                                <Label htmlFor="user_type" className="text-sm font-medium text-foreground">
                                    User Type *
                                </Label>
                                <Select
                                    value={data.user_type}
                                    onValueChange={(value) => setData('user_type', value)}
                                >
                                    <SelectTrigger className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]">
                                        <SelectValue placeholder="Select your role" />
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

                            {/* Password Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Password *
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                        className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation" className="text-sm font-medium text-foreground">
                                        Confirm Password *
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm"
                                        className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-background rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                        
                        <div className="space-y-4">
                            {/* Phone */}
                            <div>
                                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                                    Phone Number *
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    required
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+63 XXX XXX XXXX"
                                    className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            {/* Address */}
                            <div>
                                <Label htmlFor="address" className="text-sm font-medium text-foreground">
                                    Address *
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
                                <Label htmlFor="emergency_contact" className="text-sm font-medium text-foreground">
                                    Emergency Contact
                                </Label>
                                <Input
                                    id="emergency_contact"
                                    type="text"
                                    value={data.emergency_contact}
                                    onChange={(e) => setData('emergency_contact', e.target.value)}
                                    placeholder="Name and phone number"
                                    className="mt-1 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                />
                                <InputError message={errors.emergency_contact} />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information for Members */}
                    {data.user_type === 'member' && (
                        <div className="bg-background rounded-lg border p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Additional Information
                                <span className="text-sm text-gray-500 ml-2">(Optional)</span>
                            </h3>

                            <div className="space-y-4">
                                {/* Dietary Requirements */}
                                <div>
                                    <Label className="text-sm font-medium text-foreground">
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
                                    <Label className="text-sm font-medium text-foreground">
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
                        className="w-full bg-[#F72585] hover:bg-[#F72585]/90 text-white" 
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
                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <TextLink 
                                href={route('login')} 
                                className="text-[#4361EE] hover:text-[#F72585] font-medium"
                            >
                                Sign in here
                            </TextLink>
                        </p>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}