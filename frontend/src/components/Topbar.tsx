import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router";
import { SignInOAuthButtons } from "./SignInOAuthButtons";
import { Button, buttonVariants } from "./ui/button";
import useAuth from "@/stores/useAuth";
import { cn } from "@/lib/utils";

export const Topbar = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md text-white sticky top-0 z-50">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify Logo" />
        <h1 className="text-lg">Spotify</h1>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon />
            Admin Panel
          </Link>
        )}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};
