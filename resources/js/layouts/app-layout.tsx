import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { NavItem, type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    navItems: NavItem[];
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, navItems, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate navItems={navItems} breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
