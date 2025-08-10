import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const AuthCallback = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      // Handle the authentication callback logic here
      try {
        if (!isLoaded || !user || syncAttempted.current) return;

        syncAttempted.current = true; // Prevent multiple sync attempts
        await api.post(`/auth/callback`, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.error("Error syncing user:", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, navigate, user]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center text-white">
      <Card className="w-[90%] max-w-md bg-zinc-900/75 backdrop-blur-md border border-zinc-800">
        <CardContent className="flex flex-col gap-4 items-center justify-center ">
          <Loader className="animate-spin size-6 text-emerald-500" />
          <h1 className="text-xl text-zinc-400 font-bold">Logging you in</h1>
          <p className="text-sm text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};
