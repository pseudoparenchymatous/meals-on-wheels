import Navbar from '@/components/Navbar';

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
            <a href={route('home')} className="flex items-center gap-2">
                <img src="storage/images/meals-on-wheels-logo.svg" className="max-h-8" />
                <span>Meals on Wheels</span>
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
        </header>
    );
};
