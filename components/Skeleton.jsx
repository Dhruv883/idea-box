import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="w-96 px-6 py-4 flex flex-col justify-between gap-4">
      <Skeleton className="h-10 rounded-xl" />
      <Skeleton className="h-12 rounded-xl" />

      <Skeleton className="h-6 w-2/3" />

      <div className="flex gap-2 items-center justify-between">
        <div className="space-x-2 flex">
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}
