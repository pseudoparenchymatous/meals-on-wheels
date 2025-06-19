import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';

export default function Verify() {
    return (
        <AuthLayout title="Waiting for verification..." description="Please wait while your account is being verified.">
            <Head title="Account Verification" />
            <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                Log out
            </TextLink>
        </AuthLayout>
    );
}
