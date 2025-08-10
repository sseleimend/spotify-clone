import { Skeleton } from "../ui/skeleton";

export const PlaylistSkeleton = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div key={index} className="p-2 rounded-md flex items-center gap-3">
      <Skeleton className="w-12 h-12 rounded-md flex-shrink-0" />
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        <Skeleton className="h-4 rounded" />
        <Skeleton className="h-4 rounded" />
      </div>
    </div>
  ));
};
