import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPackage, FiTruck, FiCreditCard } from "react-icons/fi";

// Animation variants for sections
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.4,
        },
    }),
};

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
            category: "Electronics",
        },
        tracking: "TRK123456",
        shippingAddress: "123 Main St, New York, NY 10001, USA",
        shippingDate: "2025-05-02",
        deliveryDate: "2025-05-05",
        paymentMethod: "Visa ending in 1234",
        paymentStatus: "Completed",
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
            category: "Accessories",
        },
        tracking: "TRK654321",
        shippingAddress: "456 Office Rd, Los Angeles, CA 90001, USA",
        shippingDate: "2025-05-04",
        deliveryDate: null,
        paymentMethod: "MasterCard ending in 5678",
        paymentStatus: "Pending",
    },
];

function OrderDetails() {
    const { orderId } = useParams();
    const order = mockOrders.find((o) => o.id === orderId);

    if (!order) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 sm:py-16"
            >
                <p className="text-gray-600 text-base sm:text-lg mb-2">
                    Order not found
                </p>
                <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        to="/account/orders"
                        className="flex items-center gap-2 justify-center text-gray-950 hover:text-blue-700 text-sm sm:text-base font-medium"
                    >
                        <FiArrowLeft size={16} /> Back to Orders
                    </Link>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            {/* Header */}
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="flex justify-between items-center"
            >
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiPackage size={24} /> Order Details - {order.id}
                </h2>
                <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        to="/account/orders"
                        className="flex items-center gap-2 text-gray-950 hover:text-blue-700 text-sm sm:text-base font-medium"
                    >
                        <FiArrowLeft size={16} /> Back to Orders
                    </Link>
                </motion.div>
            </motion.div>

            {/* Order Overview */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6"
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                            Order Date
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                            {order.date}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                            Total
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                            ${order.total.toFixed(2)}
                        </p>
                    </div>
                    <div>
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
                </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiPackage size={20} /> Product
                </h3>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6"
                >
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
                            Category: {order.item.category}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Quantity: {order.item.quantity} @ $
                            {order.item.price.toFixed(2)} each
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                            Total: $
                            {(order.item.quantity * order.item.price).toFixed(
                                2
                            )}
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Shipping Information */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiTruck size={20} /> Shipping Information
                </h3>
                <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                        Shipping Address
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                        {order.shippingAddress}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                        Tracking Number
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                        {order.tracking}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                        Shipping Date
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                        {order.shippingDate}
                    </p>
                    {order.deliveryDate && (
                        <>
                            <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                                Delivery Date
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                {order.deliveryDate}
                            </p>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiCreditCard size={20} /> Payment Information
                </h3>
                <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                        Payment Method
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                        {order.paymentMethod}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                        Payment Status
                    </p>
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${
                            order.paymentStatus === "Completed"
                                ? "bg-green-100 text-green-700"
                                : order.paymentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {order.paymentStatus}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default OrderDetails;
