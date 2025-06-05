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
    
    return (
        <NavigationMenu className="hidden w-full sm:flex">
            <NavigationMenuList className="flex gap-3">
                <NavigationMenuItem>
                        {/**Set data-active to true if the current URL matches the home path.
                        This allows the CSS to style the active nav item differently. */}
                    <NavigationMenuLink asChild data-active={url === homePath}> 
                        <a href={route('home')}>Home</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={url === aboutPath}>
                        <a href={route('about')}>About</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={url === contactPath}>
                        <a href={route('contact')}>Contact</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
