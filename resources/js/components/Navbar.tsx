import { Link } from '@inertiajs/react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const links = [ 'home', 'about', 'contact', ];

const navLinks = links.map((link, index) => {
    return (
        <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
                <Link href={route(link)} prefetch>{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});

export default () => {
    return (
        <NavigationMenu className="hidden w-full sm:flex">
            <NavigationMenuList className="flex gap-3">
                {navLinks}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
