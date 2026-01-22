import { useCategories } from "../hooks/useProducts";

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
    const { categories, loading } = useCategories();

    if (loading) {
        return (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-10 w-24 skeleton-shimmer rounded-full shrink-0" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide ">
            <button
                onClick={() => onSelectCategory(null)}
                className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${selectedCategory === null
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
            >
                All Products
            </button>
            {categories.slice(0, 8).map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`px-4 py-2 rounded-full  cursor-pointer text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${selectedCategory === category.id
                        ? "bg-amber-500 text-white"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
