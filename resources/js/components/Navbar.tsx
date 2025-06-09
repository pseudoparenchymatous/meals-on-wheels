import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default () => {
    const { url } = usePage(); // Get the current page URL path (e.g., "/about", "/")

    // Extract only the path part from the full URL returned by route('home')
    // For example, if route('home') returns "http://127.0.0.1:8000",
    // new URL(...).pathname will extract "/"
    const homePath = new URL(route('home')).pathname;       // e.g. "/"
    const aboutPath = new URL(route('about')).pathname;     // e.g. "/about"
    const contactPath = new URL(route('contact')).pathname; // e.g. "/contact"

    const links = [ 'home', 'about', 'contact', ];

    const navLinks = links.map((link, index) => {
        return (
            <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild data-active={url === homePath}>
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
