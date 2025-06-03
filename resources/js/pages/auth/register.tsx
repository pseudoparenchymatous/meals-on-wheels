import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock, Phone, MapPin, AlertCircle, Heart, Utensils } from 'lucide-react';
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
    { value: 'member', label: 'Member (Meal Recipient)', icon: '🍽️' },
    { value: 'caregiver', label: 'Caregiver', icon: '👥' },
    { value: 'partner', label: 'Food Service Partner', icon: '🏪' },
    { value: 'volunteer', label: 'Volunteer', icon: '🤝' },
    { value: 'donor', label: 'Donor/Supporter', icon: '💝' }
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
            
            <div className="w-full max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F72585] to-[#4361EE] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F72585] to-[#4361EE] bg-clip-text text-transparent">
                        Join MerryMeal
                    </h1>
                    <p className="text-gray-600 mt-2">Create your account to start making a difference</p>
                </div>

                <form className="space-y-8" onSubmit={submit}>
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#EBF9FF] rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-[#4361EE]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                                    First Name *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="first_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="first_name"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        disabled={processing}
                                        placeholder="first name"
                                        className="pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.first_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Last Name *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="last_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="last_name"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        disabled={processing}
                                        placeholder="last name"
                                        className="pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.last_name} />
                            </div>

                            <div className="space-y-2 w-full">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address *
                                </Label>
                                <div className="relative w-full">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="your@email.com"
                                        className="w-full pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="user_type" className="text-sm font-medium text-gray-700">
                                    User Type *
                                </Label>
                                <Select
                                    value={data.user_type}
                                    onValueChange={(value) => setData('user_type', value)}
                                >
                                    <SelectTrigger className="h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {userTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value} className="flex items-center gap-2">
                                                <span className="mr-2">{type.icon}</span>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.user_type} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Create a strong password"
                                        className="pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                    Confirm Password *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm your password"
                                        className="pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#EBF9FF] rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-[#4361EE]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone Number *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="phone"
                                        type="tel"
                                        required
                                        tabIndex={5}
                                        autoComplete="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        disabled={processing}
                                        placeholder="+63 XXX XXX XXXX"
                                        className="pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.phone} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="emergency_contact" className="text-sm font-medium text-gray-700">
                                    Emergency Contact
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="emergency_contact"
                                        type="text"
                                        tabIndex={7}
                                        value={data.emergency_contact}
                                        onChange={(e) => setData('emergency_contact', e.target.value)}
                                        disabled={processing}
                                        placeholder="Name and phone number"
                                        className="pl-10 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE]"
                                    />
                                    <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.emergency_contact} />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                    Address *
                                </Label>
                                <div className="relative">
                                    <textarea
                                        id="address"
                                        required
                                        tabIndex={6}
                                        autoComplete="address-line1"
                                        value={data.address}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('address', e.target.value)}
                                        disabled={processing}
                                        placeholder="Enter your complete address"
                                        rows={3}
                                        className="w-full pl-10 pt-3 border border-gray-200 rounded-lg focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE] focus:ring-opacity-20 resize-none"
                                    />
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.address} />
                            </div>
                        </div>
                    </div>

                    {data.user_type === 'member' && (
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#EBF9FF] rounded-lg flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-[#4361EE]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
                            <span className="text-sm text-gray-500 ml-auto">(Optional)</span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                            {/* Dietary Requirements */}
                            <div className="space-y-2">
                                <Label htmlFor="dietary_requirements" className="text-sm font-medium text-gray-700">
                                Dietary Requirements
                                </Label>
                                <select
                                id="dietary_requirements"
                                tabIndex={8}
                                value={data.dietary_requirements}
                                onChange={(e) => setData('dietary_requirements', e.target.value)}
                                disabled={processing}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE] focus:ring-opacity-20"
                                >
                                <option value="">Select a dietary preference</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Halal">Halal</option>
                                <option value="Kosher">Kosher</option>
                                <option value="Gluten-Free">Gluten-Free</option>
                                <option value="Lactose Intolerant">Lactose Intolerant</option>
                                <option value="Other">Other (specify below)</option>
                                </select>
                                <InputError message={errors.dietary_requirements} />
                            </div>

                            {/* Medical Conditions - File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="medical_conditions" className="text-sm font-medium text-gray-700">
                                Medical Conditions (Image Upload)
                                </Label>
                                <input
                                id="medical_conditions"
                                type="file"
                                accept="image/*"
                                tabIndex={10}
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
                                disabled={processing}
                                className="w-full border border-gray-200 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#4361EE] file:text-white hover:file:bg-[#334ac7] cursor-pointer"
                                />
                                <InputError message={errors.medical_conditions} />
                            </div>
                            </div>
                        </div>
                    )}

                    {/* Terms and Conditions */}

                    {/* Submit Button */}

                    <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-[#F72585] to-[#4361EE] hover:from-[#F72585]/90 hover:to-[#4361EE]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200" 
                        tabIndex={10} 
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <Heart className="w-5 h-5 mr-2" />
                                Create Account
                            </>
                        )}
                    </Button>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <TextLink 
                                href={route('login')} 
                                tabIndex={11}
                                className="text-[#4361EE] hover:text-[#F72585] font-medium transition-colors"
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