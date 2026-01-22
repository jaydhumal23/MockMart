import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Minus, Plus, Check } from "lucide-react";
import Header from "../components/Header";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../components/context/CartContext";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product, loading, error } = useProduct(id);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    // Clean image URL
    const cleanImageUrl = (url) => {
        if (!url) return "/placeholder.svg";
        return url.replace(/[\\[\]"]/g, "");
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="aspect-square skeleton-shimmer rounded-2xl" />
                        <div className="space-y-4">
                            <div className="h-8 skeleton-shimmer rounded w-3/4" />
                            <div className="h-6 skeleton-shimmer rounded w-1/4" />
                            <div className="h-24 skeleton-shimmer rounded" />
                            <div className="h-12 skeleton-shimmer rounded w-1/2" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-16 text-center">
                    <p className="text-destructive text-lg mb-4">Product not found</p>
                    <Link to="/" className="text-accent hover:underline">
                        Return to Home
                    </Link>
                </main>
            </div>
        );
    }

    const images = product.images?.filter(img => img && !img.includes("[")) || [];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center cursor-pointer gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
                            <img
                                src={cleanImageUrl(images[selectedImage] || product.images?.[0])}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = "/placeholder.svg"; }}
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                                            ? "border-accent"
                                            : "border-border hover:border-muted-foreground"
                                            }`}
                                    >
                                        <img
                                            src={cleanImageUrl(img)}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = "/placeholder.svg"; }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category Badge */}
                        {product.category && (
                            <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full">
                                {product.category.name}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-amber-500">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center text-lg font-semibold text-foreground">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className={` cursor-pointer w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all btn-bounce flex items-center justify-center gap-2 ${isAdded
                                ? "bg-green-400 text-white"
                                : "bg-amber-500 text-white hover:opacity-90"
                                }`}
                        >
                            {isAdded ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

