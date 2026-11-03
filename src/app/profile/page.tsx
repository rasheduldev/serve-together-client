
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserRound, Mail, Camera } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isSaving, setIsSaving] = useState(false);

  // Redirect users who are not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/log-in");
    }
  }, [isPending, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const image = String(formData.get("image") || "").trim();

    if (!name) {
      toast.error("Name cannot be empty!");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image: image || null,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile!");
        return;
      }

      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 text-muted-foreground">
            View and update your personal information.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {/* Profile picture */}
          <div className="mb-8 flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                <UserRound className="mr-2 inline h-4 w-4" />
                Full Name
              </Label>

              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="mr-2 inline h-4 w-4" />
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
              />

              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed here.
              </p>
            </div>

            {/* Profile image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">
                <Camera className="mr-2 inline h-4 w-4" />
                Profile Picture URL
              </Label>

              <Input
                id="image"
                name="image"
                type="url"
                defaultValue={user.image || ""}
                placeholder="https://example.com/profile.jpg"
              />

              <p className="text-xs text-muted-foreground">
                Enter an image URL to update your profile picture.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSaving}
              className="w-full bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
            >
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
