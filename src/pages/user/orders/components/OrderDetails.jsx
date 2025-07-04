import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiPackage,
    FiTruck,
    FiCreditCard,
    FiPlus,
} from "react-icons/fi";
import { useSelector } from "react-redux";

// Animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.4 },
    }),
};

// Status Badge Component
const StatusBadge = ({ status, type = "default" }) => {
    const getStatusColor = (status, type) => {
        const statusLower = status?.toLowerCase();

        if (type === "payment") {
            switch (statusLower) {
                case "paid":
                    return "bg-emerald-50 text-emerald-700 border-emerald-200";
                case "failed":
                case "pending":
                    return "bg-red-50 text-red-700 border-red-200";
                default:
                    return "bg-gray-50 text-gray-700 border-gray-200";
            }
        }

        switch (statusLower) {
            case "delivered":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "shipped":
            case "out for delivery":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "pending":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "canceled":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                status,
                type
            )}`}
        >
            {status}
        </span>
    );
};

// Order Header Component
const OrderHeader = ({ order }) => (
    <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
    >
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Order Details
            </h1>
            <p className="text-sm text-gray-600">
                Order ID:{" "}
                <span className="font-mono font-medium">
                    {order.razorpay_order_id}
                </span>
            </p>
        </div>
        <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
            <Link
                to="/account/orders"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-blue-600 transition-colors"
            >
                <FiArrowLeft size={16} />
                Back to Orders
            </Link>
        </motion.div>
    </motion.div>
);

// Order Overview Component
const OrderOverview = ({ order, formatINR }) => (
    <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6"
    >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Order Date
                </p>
                <p className="text-sm font-medium text-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
                <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total Amount
                </p>
                <p className="text-xl font-bold text-foreground">
                    ₹{formatINR(order.totalAmount)}
                </p>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Payment Status
                </p>
                <StatusBadge status={order.paymentStatus} type="payment" />
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Delivery Status
                </p>
                <StatusBadge status={order.deliveryStatus} />
            </div>
        </div>
    </motion.div>
);

// Product Item Component
const ProductItem = ({ item, index, formatINR }) => {
    const basePrice = item.product.price;
    const fallPicoPrice = item.withFallPico ? 300 : 0;
    const tasselsPrice = item.withTassels ? 200 : 0;
    const addonPrice = fallPicoPrice + tasselsPrice;
    const itemTotal = (basePrice + addonPrice) * item.quantity;

    return (
        <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                    <div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                            {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                            Quantity:{" "}
                            <span className="font-medium">{item.quantity}</span>
                        </p>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="text-sm font-semibold text-foreground mb-3">
                                Price Breakdown
                            </h5>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Base Price
                                    </span>
                                    <span className="font-medium">
                                        ₹{formatINR(basePrice)}
                                    </span>
                                </div>

                                {/* Addons */}
                                {(item.withFallPico || item.withTassels) && (
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                                            <FiPlus size={12} />
                                            <span>Add-ons</span>
                                        </div>

                                        {item.withFallPico && (
                                            <div className="flex justify-between pl-4">
                                                <span className="text-gray-600">
                                                    Fall Pico
                                                </span>
                                                <span className="font-medium text-blue-600">
                                                    +₹300
                                                </span>
                                            </div>
                                        )}

                                        {item.withTassels && (
                                            <div className="flex justify-between pl-4">
                                                <span className="text-gray-600">
                                                    Tassels
                                                </span>
                                                <span className="font-medium text-blue-600">
                                                    +₹200
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="border-t pt-2 flex justify-between font-semibold">
                                    <span>Per Item Total</span>
                                    <span>
                                        ₹{formatINR(basePrice + addonPrice)}
                                    </span>
                                </div>

                                {item.quantity > 1 && (
                                    <div className="flex justify-between text-lg font-bold text-foreground">
                                        <span>
                                            Total ({item.quantity} items)
                                        </span>
                                        <span>₹{formatINR(itemTotal)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Shipping Info Component
const ShippingInfo = ({ order }) => (
    <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <FiTruck size={20} />
            Shipping Information
        </h3>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Delivery Address
                    </p>
                    <div className="text-sm text-foreground space-y-1">
                        <p className="font-medium">
                            {order.shippingAddress.street}
                        </p>
                        <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}
                        </p>
                        <p>
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.country}
                        </p>
                        <p className="font-medium">
                            Phone: {order.shippingAddress.phone}
                        </p>
                    </div>
                </div>

                {order.deliveredAt && (
                    <div className="pt-4 border-t">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Delivered At
                        </p>
                        <p className="text-sm font-medium text-foreground">
                            {new Date(order.deliveredAt).toLocaleString(
                                "en-IN"
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

// Payment Info Component
const PaymentInfo = ({ order }) => (
    <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <FiCreditCard size={20} />
            Payment Information
        </h3>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Payment Method
                    </p>
                    <p className="text-sm font-medium text-foreground capitalize">
                        {order.paymentMethod}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Payment Status
                    </p>
                    <StatusBadge status={order.paymentStatus} type="payment" />
                </div>

                {order.paidAt && (
                    <div className="sm:col-span-2 pt-4 border-t">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Payment Date
                        </p>
                        <p className="text-sm font-medium text-foreground">
                            {new Date(order.paidAt).toLocaleString("en-IN")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

// Main Component
function OrderDetails() {
    const { orderId } = useParams();
    const myOrders = useSelector((state) => state.order.orders) || [];
    const order = myOrders.find((o) => o._id === orderId);

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
                className="text-center py-16"
            >
                <div className="max-w-md mx-auto">
                    <FiPackage
                        size={48}
                        className="mx-auto text-gray-400 mb-4"
                    />
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        Order Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The order you're looking for doesn't exist or may have
                        been removed.
                    </p>
                    <motion.div
                        whileHover={{ x: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            to="/account/orders"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            <FiArrowLeft size={16} />
                            Back to Orders
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <OrderHeader order={order} />
                    <OrderOverview order={order} formatINR={formatINR} />

                    {/* Products Section */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        className="space-y-4"
                    >
                        <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                            <FiPackage size={20} />
                            Products ({order.items.length})
                        </h3>

                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <ProductItem
                                    key={idx}
                                    item={item}
                                    index={idx}
                                    formatINR={formatINR}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <ShippingInfo order={order} />
                    <PaymentInfo order={order} />
                </motion.div>
            </div>
        </div>
    );
}

export default OrderDetails;
