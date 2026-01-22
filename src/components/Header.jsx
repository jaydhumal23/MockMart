import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import { useSearchProducts } from "../hooks/useProducts";

export default function Header() {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const { results: searchResults, loading: searchLoading } = useSearchProducts(searchQuery);
    const cartCount = getCartCount();

    const handleLogout = async () => {
        await logout();
        setShowUserMenu(false);
        navigate("/auth");
    };

    const handleSearchSelect = (productId) => {
        setSearchQuery("");
        setShowSearchResults(false);
        navigate(`/product/${productId}`);
    };

    // Clean image URL
    const cleanImageUrl = (url) => {
        if (!url) return "/placeholder.svg";
        return url.replace(/[[\]"]/g, "");
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-100/20 border-b border-border shadow-sm backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <span className="text-xl font-bold text-foreground hidden sm:block">MockMart</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSearchResults(true);
                                }}
                                onFocus={() => setShowSearchResults(true)}
                                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg  border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground bg-gray-100/20 backdrop-blur-xl"
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        {showSearchResults && searchQuery.length >= 2 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg border border-border max-h-96 overflow-y-auto z-50 bg-gray-100/90 backdrop-blur-2xl ">
                                {searchLoading ? (
                                    <div className="p-4 text-center text-muted-foreground">Searching...</div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.slice(0, 5).map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => handleSearchSelect(product.id)}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                                        >
                                            <img
                                                src={cleanImageUrl(product.images?.[0])}
                                                alt={product.title}
                                                className="w-12 h-12 object-cover rounded"
                                                onError={(e) => { e.target.src = "/placeholder.svg"; }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                                                <p className="text-sm text-amber-500 font-semibold">${product.price}</p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-muted-foreground">No products found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                            <ShoppingCart className="w-5 h-5 text-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center cart-badge-pulse">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        <div className="relative cursor-pointer">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
                            >
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                                        <User className="w-4 h-4 text-accent-foreground" />
                                    </div>
                                )}
                                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                                    <div className="px-4 py-2 border-b border-border">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {user?.displayName || "User"}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            {showMobileMenu ? (
                                <X className="w-5 h-5 text-foreground" />
                            ) : (
                                <Menu className="w-5 h-5 text-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                {showMobileMenu && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

