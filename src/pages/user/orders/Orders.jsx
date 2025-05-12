import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiEye } from "react-icons/fi";

// Mock data with single item per order
const mockOrders = [
    {
        id: "ORD001",
        date: "2025-05-01",
        total: 150.0,
        status: "Delivered",
        item: {
            name: "Wireless Headphones",
            quantity: 1,
            price: 150.0,
            image: "https://via.placeholder.com/50",
        },
    },
    {
        id: "ORD002",
        date: "2025-05-03",
        total: 89.99,
        status: "Shipped",
        item: {
            name: "USB-C Cable",
            quantity: 1,
            price: 89.99,
            image: "https://via.placeholder.com/50",
        },
    },
];

function Orders() {
    const orders = mockOrders;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                <FiShoppingBag size={24} /> Order History
            </h2>
            {orders.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                    <p className="text-gray-600 text-base sm:text-lg mb-2">
                        No orders found
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Start shopping to see your orders here
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="border border-gray-200 bg-white rounded-md shadow-sm p-4 sm:p-6"
                        >
                            {/* Order Details Header */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                                        Order ID
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                        {order.id}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                                        Date
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                        {order.date}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                                        Total
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                        ${order.total.toFixed(2)}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                                        Status
                                    </p>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${
                                            order.status === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "Shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="sm:col-span-4 flex items-center justify-end">
                                    <Link
                                        to={`/account/orders/${order.id}`}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        <FiEye size={16} />
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

                            {/* Single Order Item */}
                            <div className="flex items-center gap-4 sm:gap-6">
                                <img
                                    src={order.item.image}
                                    alt={order.item.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200"
                                />
                                <div className="flex-1">
                                    <p className="text-sm sm:text-base font-medium text-gray-800">
                                        {order.item.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        Quantity: {order.item.quantity}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Price: ${order.item.price.toFixed(2)}
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                        Total: $
                                        {(
                                            order.item.quantity *
                                            order.item.price
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default Orders;
