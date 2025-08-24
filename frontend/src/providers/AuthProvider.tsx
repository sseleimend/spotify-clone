import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import useAuth from "@/stores/useAuth";
import { useChat } from "@/stores/useChat";

const updateApiToken = (token: string | null) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useClerkAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuth();
  const { initSocket, disconnectSocket } = useChat();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
          initSocket(userId!);
        }
      } catch (error) {
        updateApiToken(null);
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      disconnectSocket();
    };
  }, [checkAdminStatus, disconnectSocket, getToken, initSocket, userId]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin size-8 text-emerald-500" />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthProvider;
