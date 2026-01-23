import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  variant?: "default" | "featured" | "horizontal";
}

export const SkeletonCard = ({ variant = "default" }: SkeletonCardProps) => {
  if (variant === "featured") {
    return (
      <div className="grid md:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-card">
        <Skeleton className="w-full h-64 md:h-80" />
        <div className="flex flex-col justify-center p-6 md:p-8 md:pr-12 space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-3 pt-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="flex gap-4 bg-card rounded-xl overflow-hidden shadow-card">
        <Skeleton className="w-1/3 min-w-[120px] h-24" />
        <div className="flex-1 py-4 pr-4 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card">
      <Skeleton className="w-full h-48" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
