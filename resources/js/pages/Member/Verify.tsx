import { Head, Link } from '@inertiajs/react';

import TextLink from '@/components/text-link';
import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Verify() {
    return (
        <div>
            <Head title="Account Verification" />
            <section className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex flex-col max-w-md">
                    <Card className="rounded-xl">
                        <CardHeader className="m-5 text-center">
                            <Link href={route('home')} className="flex justify-center">
                                <AppLogoIcon className="size-10" />
                            </Link>
                            <CardTitle className="text-xl">TITLE</CardTitle>
                            <CardDescription>test</CardDescription>
                        </CardHeader>
                        <CardContent className="m-2">testing</CardContent>
                    </Card>
                </div>
                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </section>
        </div>
    );
}