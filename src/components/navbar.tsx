
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Calendar,
  Heart,
  LogOut,
  PlusCircle,
  ClipboardList,
  Users,
  UserRound,
  SunMoon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // Logout function
  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Logout failed!");
      return;
    }

    setProfileMenuOpen(false);

    toast.success("Logged out successfully!");
    router.push("/");
  };

  // Get the first letter of the user's name
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  // Theme toggle function
  const handleThemeChange = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Close profile dropdown
  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30 sm:size-10">
            <Heart className="size-5 fill-white text-white" />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
              ServeTogether
            </span>

            <span className="hidden text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Social Impact Platform
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
          >
            <Calendar className="size-4" />
            Upcoming Events
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon-lg"
            onClick={handleThemeChange}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <SunMoon className="size-5" />
          </Button>

          {/* Logged-in User */}
          {!isPending && user && (
            <Popover
              open={profileMenuOpen}
              onOpenChange={setProfileMenuOpen}
            >
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    title={user.name || "User"}
                    aria-label="Open profile menu"
                    className="rounded-full outline-none ring-offset-background transition hover:ring-2 hover:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <Avatar className="size-10 cursor-pointer border-2 border-emerald-500">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name || "User"}
                        referrerPolicy="no-referrer"
                      />

                      <AvatarFallback className="bg-emerald-600 font-semibold text-white">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent align="end" className="w-60">
                <PopoverHeader>
                  <PopoverTitle>{user.name}</PopoverTitle>
                  <PopoverDescription>
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div className="mt-3 flex flex-col gap-1">

                  {/* Upcoming Events - Mobile Only */}
                  <Link
                    href="/upcoming-events"
                    onClick={closeProfileMenu}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent md:hidden"
                  >
                    <Calendar className="size-4" />
                    Upcoming Events
                  </Link>

                  {/* Separator - Mobile Only */}
                  <div className="my-1 border-t border-border md:hidden" />

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={closeProfileMenu}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <UserRound className="size-4" />
                    My Profile
                  </Link>

                  {/* Create Event */}
                  <Link
                    href="/create-event"
                    onClick={closeProfileMenu}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <PlusCircle className="size-4" />
                    Create Event
                  </Link>

                  {/* Manage Events */}
                  <Link
                    href="/manage-events"
                    onClick={closeProfileMenu}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <ClipboardList className="size-4" />
                    Manage Events
                  </Link>

                  {/* Joined Events */}
                  <Link
                    href="/joined-events"
                    onClick={closeProfileMenu}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <Users className="size-4" />
                    Joined Events
                  </Link>

                  <div className="my-1 border-t border-border" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Logged-out User */}
          {!isPending && !user && (
            <div className="flex items-center gap-2">
              <Link href="/log-in">
                <Button variant="ghost" className="font-semibold">
                  Log In
                </Button>
              </Link>

              <Link href="/sign-up" className="hidden sm:block">
                <Button className="bg-emerald-600 font-semibold text-white hover:bg-emerald-700">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
