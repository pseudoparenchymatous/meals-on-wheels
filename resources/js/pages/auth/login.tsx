import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
        <AuthLayout title="Welcome Back" description="Sign in to your account">
            <Head title="Sign In" />



                {/* Status Message */}
                {status && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-center text-sm text-green-800">{status}</p>
                    </div>
                )}

                {/* Form */}
                <div className="bg-background rounded-lg border p-6">
                    <form className="space-y-4" onSubmit={submit}>
                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email
                            </Label>
                            <div className="mt-1 relative">
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-10 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink 
                                        href={route('password.request')} 
                                        className="text-sm text-[#4361EE] hover:text-[#F72585]"
                                    >
                                        Forgot?
                                    </TextLink>
                                )}
                            </div>
                            <div className="mt-1 relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10 h-10 focus:border-[#F72585] focus:ring-[#F72585]"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                className="data-[state=checked]:bg-[#F72585] data-[state=checked]:border-[#F72585]"
                            />
                            <Label htmlFor="remember" className="text-sm text-foreground">
                                Remember me
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-[#F72585] hover:bg-[#F72585]/90 text-white mt-6" 
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </div>

                {/* Register Link */}
                <div className="text-center mt-6">
                    <p className="text-foreground">
                        Don't have an account?{' '}
                        <TextLink 
                            href={route('register')} 
                            className="text-[#4361EE] hover:text-[#F72585] font-medium"
                        >
                            Register here
                        </TextLink>
                    </p>
                </div>
        </AuthLayout>
    );
}