import { Topbar } from "@/components/Topbar";
import { useMusic } from "@/stores/useMusic";
import { useEffect } from "react";
import { FeaturedSection } from "./components/FeaturedSection";
import { SectionGrid } from "./components/SectionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayer } from "@/stores/usePlayer";

export const Home = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
  } = useMusic();
  const { initQueue } = usePlayer();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      featuredSongs.length &&
      madeForYouSongs.length &&
      trendingSongs.length
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initQueue(allSongs);
    }
  }, [featuredSongs, madeForYouSongs, trendingSongs, initQueue]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              isLoading={isLoading}
              title="Made For You"
              songs={madeForYouSongs}
            />
            <SectionGrid
              isLoading={isLoading}
              title="Trending"
              songs={trendingSongs}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
