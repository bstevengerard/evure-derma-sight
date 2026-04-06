import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const PageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Skeleton */}
      <div className="h-14 shrink-0 border-b border-border px-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-9 w-48" />
        <div className="flex gap-1.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative p-6 rounded-xl border border-border animate-pulse"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Skeleton className="h-5 w-16 px-2 py-1 rounded-full" />
                </div>
                {/* Icon + Content */}
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;

