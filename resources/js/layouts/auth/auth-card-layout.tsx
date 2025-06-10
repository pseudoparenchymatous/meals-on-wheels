import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <section className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex flex-col max-w-md">
                <Card className="rounded-xl">
                    <CardHeader className="m-5 text-center">
                        <Link href={route('home')} className="flex justify-center">
                            <AppLogoIcon className="size-10" />
                        </Link>
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent className="m-2">{children}</CardContent>
                </Card>
            </div>
        </section>
    );
}
