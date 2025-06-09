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
        transition: { delay: i * 0.2, duration: 0.4 },
    }),
};

function OrderDetails() {
    const { orderId } = useParams();
    const myOrders = useSelector((state) => state.order.orders) || [];
    const order = myOrders.find((o) => o._id === orderId);

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

    const formatINR = (amount) =>
        (amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    if (!order) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 sm:py-16"
            >
                <p className="text-foreground text-base sm:text-lg mb-2">
                    Order not found
                </p>
                <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        to="/account/orders"
                        className="flex items-center gap-2 justify-center text-foreground hover:text-blue-700 text-sm sm:text-base font-medium"
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
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold uppercase text-foreground tracking-wide">
                    <FiPackage size={24} /> Order Details -{" "}
                    {order.razorpay_order_id}
                </h2>
                <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        to="/account/orders"
                        className="flex items-center gap-2 text-foreground hover:text-blue-700 text-sm sm:text-base font-medium"
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
                        <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                            Order Date
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                            Total
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                            ₹{formatINR(order.totalAmount)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                            Delivery Status
                        </p>
                        <span
                            className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${getStatusColor(
                                order.deliveryStatus
                            )}`}
                        >
                            {order.deliveryStatus}
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
                <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold uppercase text-foreground tracking-wide">
                    <FiPackage size={20} /> Products
                </h3>
                {order.items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6"
                    >
                        <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200"
                        />
                        <div className="flex-1">
                            <p className="text-sm sm:text-base font-medium text-foreground">
                                {item.product.name}
                            </p>
                            <p className="text-xs sm:text-sm text-foreground mt-1">
                                Quantity: {item.quantity} @ ₹
                                {formatINR(item.product.price)} each
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                                Total: ₹
                                {formatINR(item.quantity * item.product.price)}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Shipping Information */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold uppercase text-foreground tracking-wide">
                    <FiTruck size={20} /> Shipping Information
                </h3>
                <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                        Shipping Address
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} –{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                        Phone: {order.shippingAddress.phone}
                    </p>
                    {order.deliveredAt && (
                        <p className="text-sm sm:text-base font-semibold text-foreground mt-2">
                            Delivered At:{" "}
                            {new Date(order.deliveredAt).toLocaleString()}
                        </p>
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
                <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold uppercase text-foreground tracking-wide">
                    <FiCreditCard size={20} /> Payment Information
                </h3>
                <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                        Payment Method
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                        {order.paymentMethod}
                    </p>
                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium mt-4">
                        Payment Status
                    </p>
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${getStatusColor(
                            order.paymentStatus
                        )}`}
                    >
                        {order.paymentStatus}
                    </span>
                    {order.paidAt && (
                        <>
                            <p className="text-xs sm:text-sm text-foreground uppercase font-medium mt-4">
                                Paid At
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
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
