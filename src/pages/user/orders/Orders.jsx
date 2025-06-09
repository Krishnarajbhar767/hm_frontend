import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setOrders } from "../../../redux/slices/orderSlice";
import axiosInstance from "../../../utils/apiConnector";

function Orders() {
    const orders = useSelector((state) => state.order.orders) || [];
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    // Badge color by status
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-700";
            case "shipped":
                return "bg-blue-100 text-blue-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "canceled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Format INR
    const formatINR = (amount) =>
        (amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    // Fetch on mount
    useEffect(() => {
        if (!user?._id) return;
        axiosInstance
            .get(`/user/orders/${user._id}`)
            .then((res) => dispatch(setOrders(res.data)))
            .catch((err) => console.error("Error fetching orders:", err));
    }, [user, dispatch]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase text-foreground">
                <FiShoppingBag size={24} /> Order History
            </h2>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-foreground text-lg mb-2">
                        No orders found
                    </p>
                    <p className="text-foreground/80 text-sm">
                        Start shopping to see your orders here.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-6"
                        >
                            {/* Header */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                {/* Order ID */}
                                <div className="sm:col-span-2">
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Order ID
                                    </p>
                                    <p className="text-base font-semibold text-foreground mt-1">
                                        #{order?.razorpay_order_id || "N/A"}
                                    </p>
                                </div>

                                {/* Date */}
                                <div className="sm:col-span-2">
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Date
                                    </p>
                                    <p className="text-base text-foreground mt-1">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                {/* Total */}
                                <div className="sm:col-span-2">
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Total
                                    </p>
                                    <p className="text-base text-foreground mt-1">
                                        ₹{formatINR(order.totalAmount)}
                                    </p>
                                </div>

                                {/* Delivery Status */}
                                <div className="sm:col-span-2">
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Delivery Status
                                    </p>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                                            order.deliveryStatus
                                        )}`}
                                    >
                                        {order.deliveryStatus}
                                    </span>
                                </div>

                                {/* Payment Status */}
                                <div className="sm:col-span-2">
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Payment Status
                                    </p>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                                            order.paymentStatus
                                        )}`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </div>

                                {/* View Details */}
                                <div className="sm:col-span-2 flex items-center justify-end">
                                    <Link
                                        to={`/account/orders/${order._id}`}
                                        className="flex items-center gap-1 text-foreground hover:underline text-sm font-medium"
                                    >
                                        <FiEye size={16} /> View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-6" />

                            {/* Items */}
                            <div className="space-y-4">
                                {order.items.map(({ product, quantity }) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                        />
                                        <div className="flex-1">
                                            <p className="text-base font-medium text-foreground">
                                                {product.name}
                                            </p>
                                            <div className="mt-1 text-sm text-foreground/90">
                                                Qty: {quantity} &times; ₹
                                                {formatINR(product.price)}
                                            </div>
                                            <p className="text-sm font-semibold text-foreground mt-1">
                                                Subtotal: ₹
                                                {formatINR(
                                                    quantity * product.price
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-6" />

                            {/* Shipping & Payment */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Shipping Address
                                    </p>
                                    <p className="text-sm text-foreground mt-1">
                                        {order.shippingAddress.street},{" "}
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.state} –{" "}
                                        {order.shippingAddress.postalCode},{" "}
                                        {order.shippingAddress.country}
                                    </p>
                                    <p className="text-sm text-foreground mt-1">
                                        Phone: {order.shippingAddress.phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-foreground font-medium">
                                        Payment Method
                                    </p>
                                    <p className="text-sm text-foreground mt-1">
                                        {order.paymentMethod}
                                    </p>
                                    {order.paidAt && (
                                        <p className="text-sm text-foreground mt-1">
                                            Paid on:{" "}
                                            {new Date(
                                                order.paidAt
                                            ).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
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
