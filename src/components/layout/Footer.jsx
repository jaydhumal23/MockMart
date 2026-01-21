import React from 'react'

export default function Footer() {

    return (
        <footer className="bg-gray-400/20 border-t border-border mt-auto px-6 w-full">
            <div className="container-tight pt-6 pb-1">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">MockMart</h3>
                        <p className="text-sm text-muted-foreground">
                            Your one-stop shop for quality products at great prices.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="/products?category=1" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Clothes
                                </a>
                            </li>
                            <li>
                                <a href="/products?category=2" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Electronics
                                </a>
                            </li>
                            <li>
                                <a href="/products?category=3" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Furniture
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Account</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Sign In
                                </a>
                            </li>
                            <li>
                                <a href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Cart
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <span className="text-muted-foreground">Contact Us</span>
                            </li>
                            <li>
                                <span className="text-muted-foreground">Shipping Info</span>
                            </li>
                            <li>
                                <span className="text-muted-foreground">Returns</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-2 pt-1 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MockMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};