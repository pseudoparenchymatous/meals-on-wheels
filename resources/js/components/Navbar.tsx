import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default () => {
    const { url } = usePage();
    const links = [ 'home', 'about', 'contact', ];

    const navLinks = links.map((link, index) => {
        const path = new URL(route(link)).pathname;

        return (
            <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild data-active={url === path}>
                    <Link href={route(link)} prefetch>{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        );
    });

    return (
        <NavigationMenu className="hidden w-full sm:flex">
            <NavigationMenuList className="flex gap-3">
                {navLinks}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
