import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const updateApiToken = (token: string | null) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="h-screen w-full items-center justify-center">
        <Loader className="animate-spin size-8 text-emerald-500" />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthProvider;
