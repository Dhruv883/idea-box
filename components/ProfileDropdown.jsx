import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LogOut, UserRound, Lightbulb, Moon, Sun } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const ProfileDropdown = () => {
  const { data, status } = useSession();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={data.user.image} />
          <AvatarFallback>{data.user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href="/profile">
          <DropdownMenuItem>
            <UserRound className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/profile">
          <DropdownMenuItem>
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>My Ideas</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {theme === "light" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <Label htmlFor="theme-toggle" className="font-normal">
                Dark mode
              </Label>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span
            onClick={() => {
              signOut();
            }}
            className="flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
