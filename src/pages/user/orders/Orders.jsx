import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";

function Orders() {
    const orders = useSelector((state) => state?.order?.orders) || [];

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

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold uppercase text-foreground tracking-wide">
                <FiShoppingBag size={24} /> Order History
            </h2>
            {orders.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                    <p className="text-foreground text-base sm:text-lg mb-2">
                        No orders found
                    </p>
                    <p className="text-foreground/90 text-sm sm:text-base">
                        Start shopping to see your orders here
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order?._id || Math.random()}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="border border-gray-200 bg-white rounded-md shadow-sm p-4 sm:p-6"
                        >
                            {/* Order Details Header */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                                        Order ID
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                                        {order?._id?.slice(-6) || "N/A"}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                                        Date
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                                        {order?.createdAt
                                            ? new Date(
                                                  order?.createdAt
                                              ).toLocaleDateString("en-IN", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                                        Total
                                    </p>
                                    <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                                        ₹{formatINR(order?.totalAmount)}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
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
                                <div className="sm:col-span-2">
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                                        Payment Status
                                    </p>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 ${getStatusColor(
                                            order?.paymentStatus
                                        )}`}
                                    >
                                        {order?.paymentStatus || "Unknown"}
                                    </span>
                                </div>
                                <div className="sm:col-span-2 flex items-center justify-end">
                                    <Link
                                        to={`/account/orders/${order?._id}`}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        <FiEye size={16} />
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

                            {/* Order Items */}
                            <div className="space-y-4">
                                {order?.items?.length > 0 ? (
                                    order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 sm:gap-6"
                                        >
                                            <img
                                                src={`https://via.placeholder.com/80?text=${
                                                    item?.name || "Product"
                                                }`}
                                                alt={item?.name || "Product"}
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm sm:text-base font-medium text-foreground">
                                                    {item?.name || "N/A"}
                                                </p>
                                                <p className="text-xs sm:text-sm text-foreground mt-1">
                                                    Quantity:{" "}
                                                    {item?.quantity || 0}
                                                </p>
                                                <p className="text-xs sm:text-sm text-foreground">
                                                    Price: ₹
                                                    {formatINR(item?.price)}
                                                </p>
                                                <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                                                    Total: ₹
                                                    {formatINR(
                                                        (item?.quantity || 0) *
                                                            (item?.price || 0)
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-foreground">
                                        No items found in this order.
                                    </p>
                                )}
                            </div>

                            {/* Additional Details */}
                            <div className="border-t border-gray-200 my-4 sm:my-6"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                                        Shipping Address
                                    </p>
                                    <p className="text-sm sm:text-base text-foreground mt-1">
                                        {order?.shippingAddress?.street ||
                                            "N/A"}
                                        ,{" "}
                                        {order?.shippingAddress?.city || "N/A"},{" "}
                                        {order?.shippingAddress?.state || "N/A"}
                                        ,{" "}
                                        {order?.shippingAddress?.postalCode ||
                                            "N/A"}
                                        ,{" "}
                                        {order?.shippingAddress?.country ||
                                            "N/A"}
                                    </p>
                                    <p className="text-sm sm:text-base text-foreground">
                                        Phone:{" "}
                                        {order?.shippingAddress?.phone || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-foreground uppercase font-medium">
                                        Payment Method
                                    </p>
                                    <p className="text-sm sm:text-base text-foreground mt-1">
                                        {order?.paymentMethod || "N/A"}
                                    </p>
                                    {order?.paidAt && (
                                        <p className="text-sm sm:text-base text-foreground">
                                            Paid At:{" "}
                                            {new Date(
                                                order.paidAt
                                            ).toLocaleString()}
                                        </p>
                                    )}
                                    {order?.deliveredAt && (
                                        <p className="text-sm sm:text-base text-foreground">
                                            Delivered At:{" "}
                                            {new Date(
                                                order.deliveredAt
                                            ).toLocaleString()}
                                        </p>
                                    )}
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
