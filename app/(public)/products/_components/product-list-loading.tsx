import { Skeleton } from "@/components/ui/skeleton";

export const ProductListLoading = () => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(325px,350px))]   w-full">
      {Array.from({ length: 15 }).map((_, i) => (
        <Skeleton className="w-full h-64" key={`skeleton_${i}`} />
      ))}
    </div>
  );
};
