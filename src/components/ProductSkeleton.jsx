export default function ProductSkeleton() {
    return (
        <div className="bg-card rounded-xl overflow-hidden shadow-product border border-border">
            <div className="aspect-square skeleton-shimmer" />
            <div className="p-4 space-y-3">
                <div className="h-4 skeleton-shimmer rounded w-3/4" />
                <div className="h-4 skeleton-shimmer rounded w-1/2" />
                <div className="h-6 skeleton-shimmer rounded w-1/3" />
            </div>
        </div>
    );
}
