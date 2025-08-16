import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import type { Song } from "@/types";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

export const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Show all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="aspect-square shadow-lg rounded-md object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium mb-2 truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
