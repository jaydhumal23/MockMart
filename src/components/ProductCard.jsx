import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "./context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Clean image URL from API (sometimes has brackets)
  const cleanImageUrl = (url) => {
    if (!url) return "/placeholder.svg";
    return url.replace(/[[\]"]/g, "");
  };

  const imageUrl = cleanImageUrl(product.images?.[0]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-product product-card border border-border"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={imageError ? "/placeholder.svg" : imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className={`p-3 rounded-full transition-all transform translate-y-4 group-hover:translate-y-0 ${
              isAdding 
                ? "bg-price text-accent-foreground scale-110" 
                : "bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <div className="p-3 bg-card rounded-full text-foreground hover:bg-secondary transition-all transform translate-y-4 group-hover:translate-y-0 delay-75">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-card/90 text-foreground rounded-md backdrop-blur-sm">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-amber-500 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-500">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
