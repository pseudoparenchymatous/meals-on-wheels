import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Heart, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Welcome to MerryMeal" description="Sign in to your account">
            <Head title="Sign In" />

            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#F72585] to-[#4361EE] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F72585] to-[#4361EE] bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">Sign in to continue making a difference</p>
                </div>

                {status && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-center text-sm font-medium text-green-800">{status}</p>
                    </div>
                )}

                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-11 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE] text-gray-900 placeholder:text-gray-400"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink 
                                        href={route('password.request')} 
                                        className="text-sm text-[#4361EE] hover:text-[#F72585] font-medium transition-colors" 
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="pl-11 pr-11 h-12 border-gray-200 focus:border-[#4361EE] focus:ring-[#4361EE] text-gray-900 placeholder:text-gray-400"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="data-[state=checked]:bg-[#4361EE] data-[state=checked]:border-[#4361EE]"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                                Remember me for 30 days
                            </Label>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-[#F72585] to-[#4361EE] hover:from-[#F72585]/90 hover:to-[#4361EE]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-8" 
                            tabIndex={4} 
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <Heart className="w-5 h-5 mr-2" />
                                    Sign In
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <TextLink 
                            href={route('register')} 
                            tabIndex={6}
                            className="text-[#4361EE] hover:text-[#F72585] font-medium transition-colors"
                        >
                            Register here
                        </TextLink>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <Heart className="w-4 h-4 text-[#F72585]" />
                        <span>Connecting communities through meals</span>
                        <Heart className="w-4 h-4 text-[#F72585]" />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}