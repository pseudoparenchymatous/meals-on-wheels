import { useState } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
    ChevronDown,
    Menu,
    User,
    X,
} from 'lucide-react';

const navLinks = [
    {
        'name': 'Home',
        'link': 'home',
    },
    {
        'name': 'About',
        'link': 'about',
    },
    {
        'name': 'Contact',
        'link': 'contact',
    },
];
const mobileNavLinks = navLinks.map((navLink, index) => {
    return (
        <NavigationMenuItem key={index} className="">
            <NavigationMenuLink asChild className="text-md text-center">
                <Link href={route(navLink.link)}>{navLink.name}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});


export default () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

    return (
        <div className="mx-5 sm:mx-20 grid sticky top-5 gap-3 justify-stretch">
            <header className="border-2 rounded-full flex justify-around items-center bg-background">
                <a href={route('home')} >
                    <img src="storage/images/meals-on-wheels-logo.svg" className="size-12" />
                </a>
                <Navbar />
                <div className="hidden sm:inline">
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <User />
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <a href={route('login')}>Login</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={route('register')}>Register</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button className="sm:hidden" variant="ghost" onClick={toggleMobileNav}>
                    {isMobileNavOpen ? <X /> : <Menu />}
                </Button>
            </header>
            {isMobileNavOpen && (
                <NavigationMenu orientation="vertical" className="bg-background border-2 grid max-w-full rounded-md justify-stretch p-5">
                    <NavigationMenuList className="grid justify-stretch">
                        {mobileNavLinks}
                        <NavigationMenuItem className="">
                            <NavigationMenuLink asChild className="text-md text-center">
                                <Button asChild>
                                    <a href={route('login')}>Login</a>
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="">
                            <NavigationMenuLink asChild className="text-md text-center">
                                <Button asChild variant="secondary">
                                    <a href={route('register')}>Register</a>
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}
        </div>
    );
};
