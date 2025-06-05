import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default () => {
    return (
        <NavigationMenu className="hidden w-full sm:flex">
            <NavigationMenuList className="flex gap-3">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <a href={route('home')}>Home</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <a href={route('about')}>About</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <a href={route('contact')}>Contact</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
