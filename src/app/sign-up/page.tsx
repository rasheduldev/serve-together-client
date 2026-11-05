"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    // Password validation
    if (!/[A-Z]/.test(user.password)) {
      toast.error("Password must contain an uppercase letter");
      return;
    }

    if (!/[a-z]/.test(user.password)) {
      toast.error("Password must contain a lowercase letter");
      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const { data, error } = await authClient.signUp.email(user);

    if (error) {
      toast.error(error.message || "Registration failed!");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card px-8 py-12 shadow-sm md:px-12">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join ServeTogether volunteer platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="image">Photo URL</Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/profile.jpg"
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters, uppercase and lowercase"
              required
            />
            <p className="text-xs text-muted-foreground">
              Must contain at least one uppercase letter, one lowercase letter,
              and 6 characters.
            </p>
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-emerald-600 text-base font-semibold text-white hover:bg-emerald-700"
          >
            Register Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link
            href="/log-in"
            className="font-semibold text-emerald-600 hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
