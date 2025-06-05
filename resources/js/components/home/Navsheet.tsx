import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';


import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from 'lucide-react';

const routes = [ 'home', 'about', 'contact' ];
const routeLinks = routes.map((r, index) => {
    return (
        <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
                <Link href={route(r)}>{r.charAt(0).toUpperCase() + r.slice(1)}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});

export default function Navsheet() {
    return (
        <div className="md:hidden max-w-max">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className="max-w-sm grid content-start">
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <NavigationMenu orientation="vertical" className="max-w-full">
                        <NavigationMenuList className="grid grid-col-1 ">
                            {routeLinks}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Button asChild>
                                        <a href={route('login')}>Login</a>
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Button asChild variant="secondary">
                                        <a href={route('register')}>Register</a>
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuIndicator />
                        </NavigationMenuList>
                    </NavigationMenu>
                </SheetContent>
            </Sheet>
        </div>
    );
}
