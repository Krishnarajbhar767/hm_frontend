import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPackage, FiTruck, FiCreditCard } from "react-icons/fi";
import { useSelector } from "react-redux";

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

function OrderDetails() {
    const { orderId } = useParams();
    const myOrders = useSelector((state) => state?.order?.orders) || [];

    const order = myOrders.find((o) => o?._id === orderId);

    // Status badge color mapping
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-700";
            case "shipped":
            case "out for delivery":
                return "bg-blue-100 text-blue-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "canceled":
                return "bg-red-100 text-red-700";
            case "paid":
                return "bg-green-100 text-green-700";
            case "failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Format amount in Indian style
    const formatINR = (amount) => {
        return (amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

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
                    <FiPackage size={24} /> Order Details -{" "}
                    {order?._id?.slice(-6) || "N/A"}
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
                            {order?.createdAt
                                ? new Date(order.createdAt).toLocaleString()
                                : "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                            Total
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                            ₹{formatINR(order?.totalAmount)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium">
                            Delivery Status
                        </p>
                        <span
                            className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${getStatusColor(
                                order?.deliveryStatus
                            )}`}
                        >
                            {order?.deliveryStatus || "Unknown"}
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
                    <FiPackage size={20} /> Products
                </h3>
                {order?.items?.length > 0 ? (
                    order.items.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6"
                        >
                            <img
                                src={`https://via.placeholder.com/80?text=${
                                    item?.name || "Product"
                                }`}
                                alt={item?.name || "Product"}
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200"
                            />
                            <div className="flex-1">
                                <p className="text-sm sm:text-base font-medium text-gray-800">
                                    {item?.name || "N/A"}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                    Quantity: {item?.quantity || 0} @ ₹
                                    {formatINR(item?.price)} each
                                </p>
                                <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                    Total: ₹
                                    {formatINR(
                                        (item?.quantity || 0) *
                                            (item?.price || 0)
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                        <p className="text-gray-600">
                            No items found in this order.
                        </p>
                    </div>
                )}
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
                        {order?.shippingAddress?.street || "N/A"},{" "}
                        {order?.shippingAddress?.city || "N/A"},{" "}
                        {order?.shippingAddress?.state || "N/A"},{" "}
                        {order?.shippingAddress?.postalCode || "N/A"},{" "}
                        {order?.shippingAddress?.country || "N/A"}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                        Phone: {order?.shippingAddress?.phone || "N/A"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                        Tracking Number
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                        N/A
                    </p>
                    {order?.deliveredAt && (
                        <>
                            <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                                Delivery Date
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                {new Date(order.deliveredAt).toLocaleString()}
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
                        {order?.paymentMethod || "N/A"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                        Payment Status
                    </p>
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${getStatusColor(
                            order?.paymentStatus
                        )}`}
                    >
                        {order?.paymentStatus || "Unknown"}
                    </span>
                    {order?.paidAt && (
                        <>
                            <p className="text-xs sm:text-sm text-gray-500 uppercase font-medium mt-4">
                                Paid At
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                                {new Date(order.paidAt).toLocaleString()}
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default OrderDetails;
