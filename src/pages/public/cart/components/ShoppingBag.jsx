import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    updateQuantity,
    setStepCount,
} from "../../../../redux/slices/cartSlice"; // Adjust path
import Button from "../../../../components/common/Button";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ShoppingBag() {
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const subtotal = useSelector((state) => state?.cart?.subtotal);

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const total = subtotal - discount;

    const applyCoupon = () => {
        if (coupon.toLowerCase() === "save10") {
            setDiscount(subtotal * 0.1);
        } else {
            setDiscount(0);
        }
    };

    const handleCheckout = () => {
        // If Cart is Empty Then Toast.error
        if (cartItems?.length === 0) {
            return toast.error("Your cart is empty");
        }
        // check is user is loggen in or not
        if (!user) {
            navigate("/login");
            return;
        }
        setIsCheckingOut(true);
        dispatch(setStepCount(2));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8"
        >
            {/* Mobile Cart Summary Sticky Bar (shows on small screens) */}
            <div className="sticky top-0 z-10 bg-white border-b border-foreground/50 pb-3 flex justify-between items-center lg:hidden mb-4">
                <div>
                    <p className="text-xs font-medium">Cart Total:</p>
                    <p className="text-base font-bold">
                        &#x20B9;{total.toFixed(2)}
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    // disabled={cartItems.length === 0 || isCheckingOut}
                    className="bg-foreground text-white px-4 py-2 text-sm uppercase"
                >
                    {isCheckingOut ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                            }}
                            className="w-4 h-4 border-2 border-t-transparent border-foreground"
                        />
                    ) : (
                        "Checkout"
                    )}
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                {/* Cart Items Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="col-span-1 lg:col-span-2"
                >
                    {/* Cart Header - Responsive */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 uppercase text-foreground font-medium text-xs sm:text-sm border-b border-foreground/50 pb-2 mb-3 sm:mb-4">
                        <h1 className="text-left col-span-1">Product</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-4 col-span-1 sm:col-span-4 text-right gap-2">
                            <h1 className="sm:hidden">Details</h1>
                            <h1 className="hidden sm:block">Price</h1>
                            <h1 className="hidden sm:block">Quantity</h1>
                            <h1 className="hidden sm:block">Subtotal</h1>
                            <h1 className="hidden sm:block">Action</h1>
                        </div>
                    </div>

                    {/* Empty Cart State */}
                    {cartItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-center py-8 sm:py-12"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 sm:w-10 sm:h-10 text-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </div>
                            <p className="text-foreground text-sm sm:text-base mb-2">
                                Your cart is empty
                            </p>
                            <p className="text-foreground text-xs sm:text-sm mb-6">
                                Add items to your cart to continue shopping
                            </p>
                            <button className="bg-foreground text-white px-4 py-2 text-xs sm:text-sm uppercase">
                                Continue Shopping
                            </button>
                        </motion.div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item, idx) => (
                                    <Card
                                        key={item._id}
                                        data={item}
                                        index={idx}
                                        onQuantityChange={(qty) =>
                                            dispatch(
                                                updateQuantity({
                                                    id: item._id,
                                                    quantity: qty,
                                                })
                                            )
                                        }
                                        onRemove={() =>
                                            dispatch(removeFromCart(item._id))
                                        }
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

                {/* Order Summary Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="col-span-1 p-3 sm:p-4 md:p-6 border shadow-sm"
                >
                    <h2 className="text-xs sm:text-sm md:text-base font-medium uppercase text-foreground mb-3 sm:mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
                        <div className="flex justify-between foreground">
                            <span>Subtotal</span>
                            <span>&#x20B9;{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between foreground">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 border border-foreground/50 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    text="Apply"
                                    onClick={applyCoupon}
                                    className="text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4"
                                />
                            </motion.div>
                        </div>
                        {discount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-between text-green-600"
                            >
                                <span>Discount</span>
                                <span>-&#x20B9;{discount.toFixed(2)}</span>
                            </motion.div>
                        )}
                        <div className="border-t border-foreground/50 pt-2 sm:pt-3 mt-2 sm:mt-3">
                            <div className="flex justify-between text-sm sm:text-base md:text-lg font-semibold text-foreground">
                                <span>Total</span>
                                <motion.span
                                    key={total}
                                    initial={{ scale: 1.2, color: "#533e2d " }}
                                    animate={{ scale: 1, color: "#533e2d " }}
                                    transition={{ duration: 0.3 }}
                                >
                                    &#x20B9;{total.toFixed(2)}
                                </motion.span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Checkout Button (hidden on mobile) */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        // disabled={cartItems.length === 0 || isCheckingOut}
                        className="hidden lg:flex group relative h-9 sm:h-10 md:h-12 items-center justify-center overflow-hidden bg-foreground px-3 sm:px-4 md:px-6 font-light text-neutral-200 text-xs sm:text-sm md:text-base tracking-wide w-full mt-2 sm:mt-4 uppercase"
                    >
                        {isCheckingOut ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 1,
                                }}
                                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent border-white"
                            />
                        ) : (
                            <>
                                <span>Proceed To Checkout</span>
                                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                    <div className="relative h-full w-6 sm:w-8 bg-white/20"></div>
                                </div>
                            </>
                        )}
                    </motion.button>
                </motion.div>
            </div>

            {/* Mobile Sticky Checkout Bar (fixed at bottom) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-10">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || isCheckingOut}
                    className="group relative flex h-12 items-center justify-center overflow-hidden bg-foreground font-light text-neutral-200 text-sm tracking-wide w-full uppercase"
                >
                    {isCheckingOut ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                            }}
                            className="w-5 h-5 border-2 border-t-transparent border-white"
                        />
                    ) : (
                        <>
                            <span>
                                Proceed To Checkout • &#x20B9;{total.toFixed(2)}
                            </span>
                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                <div className="relative h-full w-8 bg-white/20"></div>
                            </div>
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}

function Card({ data, onQuantityChange, onRemove, index }) {
    const [quantity, setQuantity] = useState(data.quantity);

    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        onQuantityChange(newQty);
    };

    const handleDecrement = () => {
        const newQty = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQty);
        onQuantityChange(newQty);
    };

    const subtotal = data.price * quantity;
    const imageUrl = Array.isArray(data.images) ? data.images[0] : data.image;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 md:gap-6 items-start sm:items-center border-b border-foreground/50 pb-3 sm:pb-4"
        >
            {/* Product Image and Name */}
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4 col-span-1 sm:col-span-2">
                <motion.img
                    src={imageUrl}
                    alt={data.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
                <div className="flex-1">
                    <h2 className="text-xs sm:text-sm md:text-base font-medium text-foreground uppercase">
                        {data.name}
                    </h2>
                    <div className="sm:hidden flex flex-col mt-2 gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-foreground">
                                Price:
                            </span>
                            <span className="text-xs text-foreground">
                                &#x20B9;{data.price.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-foreground">
                                Quantity:
                            </span>
                            <div className="flex items-center justify-center border border-foreground/50 w-20 py-1">
                                <motion.button
                                    onClick={handleDecrement}
                                    whileTap={{ scale: 0.9 }}
                                    className="px-1 py-1 text-foreground hover:text-primary text-xs"
                                >
                                    -
                                </motion.button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-8 text-center border-x border-foreground/50 text-xs text-foreground"
                                />
                                <motion.button
                                    onClick={handleIncrement}
                                    whileTap={{ scale: 0.9 }}
                                    className="px-1 py-1 text-gray-600 hover:text-primary text-xs"
                                >
                                    +
                                </motion.button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-foreground">
                                Subtotal:
                            </span>
                            <motion.span
                                key={subtotal}
                                initial={{ scale: 1.2, color: "#16a34a" }}
                                animate={{ scale: 1, color: "#1f2937" }}
                                transition={{ duration: 0.3 }}
                                className="text-xs text-foreground"
                            >
                                &#x20B9;{subtotal.toFixed(2)}
                            </motion.span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-foreground">
                                Action:
                            </span>
                            <motion.button
                                onClick={onRemove}
                                whileHover={{ scale: 1.1, color: "#b91c1c" }}
                                whileTap={{ scale: 0.9 }}
                                className="text-red-500 text-xs"
                            >
                                Remove
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price, Quantity, Subtotal, Action (Tablet and Desktop) */}
            <div className="hidden sm:grid sm:grid-cols-4 col-span-3 items-center justify-items-center gap-2 sm:gap-4 md:gap-6">
                <span className="text-xs sm:text-sm md:text-base text-foreground">
                    &#x20B9;{data.price.toFixed(2)}
                </span>

                <div className="flex items-center justify-center border border-foreground/50 w-20 sm:w-24 py-2 sm:py-3">
                    <motion.button
                        onClick={handleDecrement}
                        whileTap={{ scale: 0.9 }}
                        className="px-1 sm:px-2 py-1 text-foreground hover:text-primary text-xs sm:text-sm"
                    >
                        -
                    </motion.button>
                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-8 sm:w-10 text-center border-x border-foreground/50 text-xs sm:text-sm text-foreground"
                    />
                    <motion.button
                        onClick={handleIncrement}
                        whileTap={{ scale: 0.9 }}
                        className="px-1 sm:px-2 py-1 text-foreground hover:text-primary text-xs sm:text-sm"
                    >
                        +
                    </motion.button>
                </div>

                <motion.span
                    key={subtotal}
                    initial={{ scale: 1.2, color: "#533e2d " }}
                    animate={{ scale: 1, color: "#533e2d" }}
                    transition={{ duration: 0.3 }}
                    className="text-sm sm:text-base md:text-lg font-normal text-foreground"
                >
                    &#x20B9;{subtotal.toFixed(2)}
                </motion.span>

                <motion.button
                    onClick={onRemove}
                    whileHover={{ scale: 1.1, color: "#b91c1c" }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-500 text-xs sm:text-sm md:text-base"
                >
                    Remove
                </motion.button>
            </div>
        </motion.div>
    );
}

export default ShoppingBag;
