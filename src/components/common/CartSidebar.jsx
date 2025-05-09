import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Heading from "../../pages/public/home/components/Heading";
import Button from "./Button";

const CartSidebar = ({ isOpen, closeHandler }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Zessi Dresses",
            color: "Yellow",
            size: "L",
            quantity: 1,
            price: 99,
            image: "https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
            id: 86,
            name: "Beckko",
            color: "Black",
            size: "XS",
            quantity: 4,
            price: 89,
            image: "https://images.pexels.com/photos/2922442/pexels-photo-2922442.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
            id: 653,
            name: "Hekko",
            color: "Black",
            size: "XS",
            quantity: 4,
            price: 89,
            image: "https://images.pexels.com/photos/2922442/pexels-photo-2922442.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
            id: 2,
            name: "Kirby T-Shirt",
            color: "Black",
            size: "XS",
            quantity: 4,
            price: 89,
            image: "https://images.pexels.com/photos/2922442/pexels-photo-2922442.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
    ]);

    const updateQuantity = (id, change) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div
            className="fixed z-[100] inset-0 w-screen h-screen flex bg-gray-900/25"
            onClick={closeHandler}
        >
            <motion.div
                className="absolute flex flex-col bg-white w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-full right-0 z-[101]"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4">
                    <Heading text={`Shopping Bag (${cartItems.length})`} />
                    <button
                        onClick={closeHandler}
                        className="p-2"
                        aria-label="Close cart"
                    >
                        <svg
                            className="w-5 h-5 text-gray-800 hover:text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>
                    </button>
                </div>
                <hr className="border-gray-300 mx-4 sm:mx-6 mb-2" />

                {/* Cart Items (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
                    {cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-3 mb-4 pb-4 border-b border-gray-300"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-light text-sm sm:text-base text-gray-800 line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-gray-600 text-base p-1"
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        ×
                                    </button>
                                </div>
                                <p className="text-gray-600 text-xs">
                                    Color: {item.color}
                                </p>
                                <p className="text-gray-600 text-xs">
                                    Size: {item.size}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, -1)
                                            }
                                            className="w-7 h-7 flex items-center justify-center border rounded text-gray-800 hover:bg-gray-100 text-sm"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs sm:text-sm">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, 1)
                                            }
                                            className="w-7 h-7 flex items-center justify-center border rounded text-gray-800 hover:bg-gray-100 text-sm"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="font-medium text-xs sm:text-sm">
                                        ${item.price}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer (Fixed to Bottom) */}
                <div className="sticky bottom-0 bg-white border-t border-gray-300 px-4 sm:px-6 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-light text-sm sm:text-base">
                            SUBTOTAL:
                        </span>
                        <span className="font-light text-sm sm:text-base">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                    <button
                        className="w-full mb-2 py-2 px-4 bg-gray-100 text-gray-800 font-light text-sm sm:text-base hover:bg-gray-200 transition-colors rounded"
                        aria-label="View cart"
                    >
                        View Cart
                    </button>
                    <Button
                        text="Checkout"
                        className="w-full py-2 text-sm sm:text-base rounded"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default CartSidebar;
