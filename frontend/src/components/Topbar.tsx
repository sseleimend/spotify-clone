import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router";
import { SignInOAuthButtons } from "./SignInOAuthButtons";
import { Button } from "./ui/button";

export const Topbar = () => {
  const isAdmin = false;

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md text-white sticky top-0 z-50">
      <div className="flex gap-2 items-center">
        <h1 className="text-lg font-bold">Spotify Clone</h1>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className="px-4 py-2 rounded">
            <LayoutDashboardIcon />
            Admin Panel
          </Link>
        )}
        <SignedIn>
          <SignOutButton>
            <Button variant="secondary" className="px-4 py-2 rounded">
              Logout
            </Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};
