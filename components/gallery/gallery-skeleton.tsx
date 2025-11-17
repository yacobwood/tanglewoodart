/**
 * Tanglewood Art Gallery - Gallery Loading Skeleton
 * Skeleton states for gallery grid during loading
 */

export default function GallerySkeleton() {
  // Create array of skeleton items with varying heights for masonry effect
  const skeletonItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    height: i % 3 === 0 ? "h-80" : i % 3 === 1 ? "h-64" : "h-72",
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skeletonItems.map((item) => (
        <div key={item.id} className="animate-pulse">
          <div
            className={`${item.height} bg-museum-charcoal rounded-lg mb-3`}
          />
          <div className="space-y-2">
            <div className="h-4 bg-museum-charcoal rounded w-3/4" />
            <div className="h-3 bg-museum-charcoal rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Single artwork card skeleton
 */
export function ArtworkCardSkeleton({ height = "h-72" }: { height?: string }) {
  return (
    <div className="animate-pulse">
      <div className={`${height} bg-museum-charcoal rounded-lg mb-3`} />
      <div className="space-y-2">
        <div className="h-4 bg-museum-charcoal rounded w-3/4" />
        <div className="h-3 bg-museum-charcoal rounded w-1/2" />
        <div className="h-3 bg-museum-charcoal rounded w-2/3" />
      </div>
    </div>
  );
}
