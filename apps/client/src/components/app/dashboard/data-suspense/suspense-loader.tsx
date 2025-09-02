import { Skeleton } from "@/components/ui/skeleton";

export const DataSuspenseLoader = () => {
  return (
    <section className="px-4 lg:px-6">
      <div className="flex flex-col mb-4">
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-12">
        <Skeleton className="w-[200px] h-[15px] rounded-xl" />
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-4">
        <Skeleton className="w-[200px] h-[15px] rounded-xl" />
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-4">
        <Skeleton className="w-[200px] h-[15px] rounded-xl" />
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-12">
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
        <Skeleton className="w-[50px] h-[15px] rounded-xl" />
        <Skeleton className="w-[25px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-4">
        <Skeleton className="w-[200px] h-[15px] rounded-xl" />
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-4">
        <Skeleton className="w-[200px] h-[15px] rounded-xl" />
        <Skeleton className="w-[50px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-12">
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
        <Skeleton className="w-[50px] h-[15px] rounded-xl" />
      </div>

      <div className="flex flex-col mb-4">
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>

      <div className="flex gap-4 mb-12">
        <Skeleton className="w-[200px] h-[15px] rounded-xl" />
        <Skeleton className="w-[100px] h-[15px] rounded-xl" />
      </div>
    </section>
  );
};
