/* eslint-disable react-hooks/purity */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Check, Package } from "lucide-react";
import Header from "../components/Header";
import { useCart } from "../components/context/CartContext"

export default function Checkout() {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);

    // Form states
    const [shippingInfo, setShippingInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India"
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: ""
    });

    const total = getCartTotal();
    const shipping = total > 50 ? 0 : 5.99;
    const tax = total * 0.08;
    const finalTotal = total + shipping + tax;

    // Clean image URL
    const cleanImageUrl = (url) => {
        if (!url) return "/placeholder.svg";
        return url.replace(/[\\[\]"]/g, "");
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        setStep(3);
        clearCart();
    };

    if (cartItems.length === 0 && step !== 3) {
        navigate("/cart");
        return null;
    }

    // Success Step
    if (step === 3) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 rounded-full bg-price/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-price" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
                        <p className="text-muted-foreground mb-2">
                            Thank you for your purchase. Your order has been placed successfully.
                        </p>
                        <p className="text-sm text-muted-foreground mb-8">
                            Order #MM{Date.now().toString().slice(-8)}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/"
                                className="px-6 py-3 rounded-lg text-amber-500 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => step === 1 ? navigate("/cart") : setStep(1)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {step === 1 ? "Back to Cart" : "Back to Shipping"}
                </button>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 ${step >= 1 ? "text-amber-500" : "text-muted-foreground"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                            }`}>
                            {step > 1 ? <Check className="w-4 h-4" /> : "1"}
                        </div>
                        <span className="hidden sm:inline font-medium">Shipping</span>
                    </div>
                    <div className="w-12 h-0.5 bg-border" />
                    <div className={`flex items-center gap-2 ${step >= 2 ? "text-amber-500" : "text-muted-foreground"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                            }`}>
                            {step > 2 ? <Check className="w-4 h-4" /> : "2"}
                        </div>
                        <span className="hidden sm:inline font-medium">Payment</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        {/* Shipping Form */}
                        {step === 1 && (
                            <form onSubmit={handleShippingSubmit} className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Shipping Information
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.firstName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.lastName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={shippingInfo.email}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">City</label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">State</label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.state}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">ZIP Code</label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.zipCode}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Country</label>
                                        <select
                                            value={shippingInfo.country}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        >
                                            <option>India</option>
                                            <option>United States</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-6 py-3 px-4 rounded-lg bg-amber-500 text-white cursor-pointer font-semibold hover:opacity-90 transition-opacity btn-bounce"
                                >
                                    Continue to Payment
                                </button>
                            </form>
                        )}

                        {/* Payment Form */}
                        {step === 2 && (
                            <form onSubmit={handlePaymentSubmit} className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Payment Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="1234 5678 9012 3456"
                                            value={paymentInfo.cardNumber}
                                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Name on Card</label>
                                        <input
                                            type="text"
                                            required
                                            value={paymentInfo.cardName}
                                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="MM/YY"
                                                value={paymentInfo.expiry}
                                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">CVV</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="123"
                                                value={paymentInfo.cvv}
                                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground mt-4">
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-6 py-3 px-4 rounded-lg bg-amber-500 text-white font-semibold hover:opacity-90 transition-opacity btn-bounce disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

                            {/* Items */}
                            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <img
                                            src={cleanImageUrl(item.images?.[0])}
                                            alt={item.title}
                                            className="w-14 h-14 object-cover rounded-lg"
                                            onError={(e) => { e.target.src = "/placeholder.svg"; }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium text-foreground">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium text-foreground">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium text-foreground">
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                                </div>

                                <div className="border-t border-border pt-3 mt-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-foreground">Total</span>
                                        <span className="font-bold text-lg text-foreground">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
