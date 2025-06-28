import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import TextLink from '@/components/text-link';

export default function Verify({ verified }) {
    return (
        <AuthLayout
            title={ verified ? "Account is verified!" : "Waiting for verification..."}
            description={ verified ? "You may now proceed." : "Please wait while your account is being verified." }
        >
            <Head title="Account Verification" />
            <div className="grid gap-2">
                {verified == true &&
                    <Button asChild>
                        <Link href={route('dashboard')}>Dashboard</Link>
                    </Button>
                }
                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </div>
        </AuthLayout>
    );
}
