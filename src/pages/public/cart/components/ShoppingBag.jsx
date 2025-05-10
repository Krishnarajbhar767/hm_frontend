import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    updateQuantity,
    clearCart,
    setStepCount,
} from "../../../../redux/slices/cartSlice"; // Adjust path
import Button from "../../../../components/common/Button";
import { AnimatePresence, motion } from "framer-motion";

function ShoppingBag() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const subtotal = useSelector((state) => state.cart.subtotal);

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
        setIsCheckingOut(true);
        dispatch(setStepCount(2));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-full py-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="col-span-1 md:col-span-2"
                >
                    <div className="grid grid-cols-2 uppercase text-gray-800 font-medium text-sm border-b border-gray-200 pb-2 mb-4">
                        <h1 className="text-left">Product</h1>
                        <div className="grid grid-cols-4 text-right">
                            <h1>Price</h1>
                            <h1>Quantity</h1>
                            <h1>Subtotal</h1>
                        </div>
                    </div>
                    {cartItems.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-center text-gray-600"
                        >
                            Your cart is empty.
                        </motion.p>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item, idx) => (
                                    <Card
                                        key={item.id}
                                        data={item}
                                        index={idx}
                                        onQuantityChange={(qty) =>
                                            dispatch(
                                                updateQuantity({
                                                    id: item.id,
                                                    quantity: qty,
                                                })
                                            )
                                        }
                                        onRemove={() =>
                                            dispatch(removeFromCart(item.id))
                                        }
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="col-span-1 p-6 border"
                >
                    <h2 className="text-sm font-medium uppercase text-gray-800 mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button text="Apply" onClick={applyCoupon} />
                            </motion.div>
                        </div>
                        {discount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-between text-sm text-green-600"
                            >
                                <span>Discount</span>
                                <span>-${discount.toFixed(2)}</span>
                            </motion.div>
                        )}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between text-lg font-semibold text-gray-800">
                                <span>Total</span>
                                <motion.span
                                    key={total}
                                    initial={{ scale: 1.2, color: "#16a34a" }}
                                    animate={{ scale: 1, color: "#1f2937" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    ${total.toFixed(2)}
                                </motion.span>
                            </div>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0 || isCheckingOut}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-neutral-950 px-6 font-light text-neutral-200 text-md tracking-wide w-full mt-2 uppercase"
                    >
                        {isCheckingOut ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                            />
                        ) : (
                            <>
                                <span>Proceed To Checkout</span>
                                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                    <div className="relative h-full w-8 bg-white/20"></div>
                                </div>
                            </>
                        )}
                    </motion.button>
                </motion.div>
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
            className="grid grid-cols-2 gap-4 items-center border-b border-gray-200 pb-4"
        >
            <div className="flex items-center gap-4">
                <motion.img
                    src={imageUrl}
                    alt={data.name}
                    className="w-20 h-20 object-cover rounded-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
                <h2 className="text-sm font-medium text-gray-800 uppercase">
                    {data.name}
                </h2>
            </div>

            <div className="grid grid-cols-4 items-center text-right gap-2">
                <span className="text-sm text-gray-600">
                    ${data.price.toFixed(2)}
                </span>

                <div className="flex items-center justify-center border border-gray-300 w-24 py-3">
                    <motion.button
                        onClick={handleDecrement}
                        whileTap={{ scale: 0.9 }}
                        className="px-2 py-1 text-gray-600 hover:text-primary"
                    >
                        -
                    </motion.button>
                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-10 text-center border-x border-gray-300 text-sm text-gray-800"
                    />
                    <motion.button
                        onClick={handleIncrement}
                        whileTap={{ scale: 0.9 }}
                        className="px-2 py-1 text-gray-600 hover:text-primary"
                    >
                        +
                    </motion.button>
                </div>

                <motion.span
                    key={subtotal}
                    initial={{ scale: 1.2, color: "#16a34a" }}
                    animate={{ scale: 1, color: "#1f2937" }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-normal text-gray-800"
                >
                    ${subtotal.toFixed(2)}
                </motion.span>

                <motion.button
                    onClick={onRemove}
                    whileHover={{ scale: 1.1, color: "#b91c1c" }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-500 text-sm"
                >
                    Remove
                </motion.button>
            </div>
        </motion.div>
    );
}

export default ShoppingBag;
