"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Calendar,
  Heart,
  Menu,
  X,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  // Logout function
  const handleLogout = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Logout failed!");
      return;
    }
    setMenuOpen(false);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  // Get the first letter of the user's name
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";
  // Theme toggle function
  const handleThemeChange = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30 sm:size-10">
            <Heart className="size-5 fill-white text-white" />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
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
            <Popover>
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

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <UserRound className="size-4" />
                    My Profile
                  </Link>

                  <Link
                    href="/create-event"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <PlusCircle className="size-4" />
                    Create Event
                  </Link>

                  <Link
                    href="/manage-events"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <ClipboardList className="size-4" />
                    Manage Events
                  </Link>

                  <Link
                    href="/joined-events"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <Users className="size-4" />
                    Joined Events
                  </Link>

                  <div className="my-1 border-t border-border" />

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
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/log-in">
                <Button variant="ghost" className="font-semibold">
                  Log In
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="bg-emerald-600 font-semibold text-white hover:bg-emerald-700">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon-lg"
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border bg-background p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-2">

            <Link
              href="/upcoming-events"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <Calendar className="size-4" />
              Upcoming Events
            </Link>

            {!isPending && user && (
              <>
                <div className="my-2 border-t border-border" />

                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="size-10 border-2 border-emerald-500">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback className="bg-emerald-600 text-white">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
                >
                  <UserRound className="size-4" />
                  My Profile
                </Link>

                <Link
                  href="/create-event"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
                >
                  <PlusCircle className="size-4" />
                  Create Event
                </Link>

                <Link
                  href="/manage-events"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
                >
                  <ClipboardList className="size-4" />
                  Manage Events
                </Link>

                <Link
                  href="/joined-events"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
                >
                  <Users className="size-4" />
                  Joined Events
                </Link>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </>
            )}

            {!isPending && !user && (
              <>
                <Link
                  href="/log-in"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Log In
                  </Button>
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button className="w-full justify-start bg-emerald-600 text-white hover:bg-emerald-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
