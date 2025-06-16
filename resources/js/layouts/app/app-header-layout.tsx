import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { NavItem, type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ navItems, children, breadcrumbs }: PropsWithChildren<{
    breadcrumbs?: BreadcrumbItem[],
    navItems: NavItem[],
}>) {
    return (
        <AppShell>
            <AppHeader navItems={navItems} breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
