import useAuth from "@/stores/useAuth";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusic } from "@/stores/useMusic";

function Admin() {
  const { isAdmin, isLoading } = useAuth();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusic();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) {
    return <div>Access Denied</div>;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <Header />
      <DashboardStats />
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger value="songs">
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger value="albums">
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Admin;
