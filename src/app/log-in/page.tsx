"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
const LogInPage = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email(user);

    if (error) {
      toast.error(error.message || "Login failed!");
      return;
    }

    if (data) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  const handleGithubLogin = async () => {
  const { error } = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
  });

  if (error) {
    toast.error(error.message || "GitHub login failed!");
  }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card px-8 py-12 shadow-sm md:px-12">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to your ServeTogether account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-emerald-600 text-base font-semibold text-white hover:bg-emerald-700"
          >
            Log In
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
  type="button"
  variant="outline"
  onClick={handleGithubLogin}
  className="h-11 w-full rounded-lg text-base font-medium"
>
  <FaGithub className="mr-2 h-5 w-5" />
  Continue with GitHub
</Button>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-emerald-600 hover:underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
