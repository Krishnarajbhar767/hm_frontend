import React from "react";
import { motion } from "framer-motion";

const OrderSummary = ({ cartItems }) => {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-4 md:p-6 border border-foreground/50 shadow-sm bg-white"
        >
            <h2 className="text-lg font-semibold uppercase text-foreground mb-4">
                Order Summary
            </h2>
            <div className="space-y-3">
                {cartItems.map((item, idx) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex justify-between text-sm text-foreground"
                    >
                        <span>
                            {item.name} (x{item.quantity})
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </motion.div>
                ))}
                <div className="flex justify-between text-sm text-foreground pt-2 border-t border-gray-200">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-semibold text-foreground">
                        <span>Total</span>
                        <motion.span
                            key={total}
                            initial={{ scale: 1.2, color: "#533e2d" }}
                            animate={{ scale: 1, color: "#533e2d" }}
                            transition={{ duration: 0.3 }}
                        >
                            ₹ {total.toFixed(2)}
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;
