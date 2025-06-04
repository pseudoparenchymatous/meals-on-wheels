import Navbar from '@/components/Navbar';
import Navsheet from '@/components/home/Navsheet';

import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    ChevronDown,
    User,
} from 'lucide-react';

export default () => {
    return (
        <header className="flex justify-around items-center p-3 sticky top-0 bg-background">
                <img src="storage/images/meals-on-wheels-logo.svg" className="max-h-8" />
            <a href={route('home')} >
                <img src="storage/images/meals-on-wheels-logo.svg" className="size-12" />
            </a>
            <Navbar />
            <div className="hidden md:inline">
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
            <Navsheet />
        </header>
    );
};
