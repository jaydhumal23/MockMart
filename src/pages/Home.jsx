import { useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { products, loading, error } = useProducts(selectedCategory);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="mb-10">
                    <div className="bg-linear-to-r from-accent/10 via-accent/5 to-transparent rounded-2xl p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Welcome to MockMart
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Discover amazing products at unbeatable prices. Shop the latest trends and find exactly what you're looking for.
                        </p>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Browse Categories</h2>
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </section>

                {/* Products Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                            {selectedCategory ? "Category Products" : "All Products"}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            {!loading && `${products.length} products`}
                        </span>
                    </div>
                    <ProductGrid products={products} loading={loading} error={error} />
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                                <span className="text-white font-bold">M</span>
                            </div>
                            <span className="font-semibold text-foreground">MockMart</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 MockMart.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
