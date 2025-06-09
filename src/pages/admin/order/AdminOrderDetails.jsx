import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiPackage,
    FiTruck,
    FiCreditCard,
    FiUser,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/apiConnector";

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.4 },
    }),
};

function AdminOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axiosInstance
            .get(`/admin/orders/order/${id}`)
            .then((res) => setOrder(res.data.data))
            .catch((err) => {
                console.error("Error fetching order:", err);
                setOrder(null);
            });
    }, [id]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
            case "paid":
                return "bg-green-100 text-green-700";
            case "shipped":
            case "out for delivery":
                return "bg-blue-100 text-blue-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "canceled":
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

    if (order === null) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 sm:py-16"
            >
                <p className="text-gray-800 text-base sm:text-lg mb-2">
                    Order not found
                </p>
                <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        to="/admin/orders"
                        className="flex items-center gap-2 justify-center text-gray-800 hover:text-blue-700 text-sm font-medium"
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
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold uppercase text-gray-800">
                    <FiPackage size={24} /> Order Details -{" "}
                    {order?.razorpay_order_id || "N/A"}
                </h2>
                <Link
                    to="/admin/orders"
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-700 text-sm font-medium"
                >
                    <FiArrowLeft size={16} /> Back to Orders
                </Link>
            </motion.div>

            {/* User Info */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6"
            >
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FiUser size={20} /> Customer Information
                </h3>
                <div className="mt-2 space-y-1 text-sm sm:text-base text-gray-800 capitalize">
                    <p>
                        <strong>Name:</strong> {order.user.firstName}{" "}
                        {order.user.lastName}
                    </p>
                    <p className="uppercase">
                        <strong>Email:</strong> {order.user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {order.user.phone}
                    </p>
                    <p>
                        <strong>User ID:</strong> {order.user._id}
                    </p>
                </div>
            </motion.div>

            {/* Order Overview */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                <div>
                    <p className="text-xs text-gray-800 uppercase font-medium">
                        Order Date
                    </p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-800 uppercase font-medium">
                        Total
                    </p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                        ₹{formatINR(order.totalAmount)}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-800 uppercase font-medium">
                        Delivery Status
                    </p>
                    <span
                        className={`inline-block capitalize px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                            order.deliveryStatus
                        )}`}
                    >
                        {order.deliveryStatus}
                    </span>
                </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FiPackage size={20} /> Products
                </h3>
                {order.items.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-start gap-4 border border-gray-200 bg-white rounded-lg shadow-sm p-4"
                    >
                        <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-md border"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">
                                {item.product.name}
                            </p>
                            <p className="text-sm text-gray-800 mt-1">
                                Qty: {item.quantity} × ₹
                                {formatINR(item.product.price)} each
                            </p>
                            <p className="text-sm text-gray-800 font-semibold mt-1">
                                Total: ₹
                                {formatINR(item.quantity * item.product.price)}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Shipping Info */}
            <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FiTruck size={20} /> Shipping Information
                </h3>
                <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <p className="text-xs text-gray-800 uppercase font-medium">
                        Shipping Address
                    </p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                    </p>
                    <p className="text-sm text-gray-800 font-medium mt-1">
                        Phone: {order.shippingAddress.phone}
                    </p>
                    {order.deliveredAt && (
                        <p className="text-sm text-gray-800 font-medium mt-2">
                            Delivered At:{" "}
                            {new Date(order.deliveredAt).toLocaleString()}
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div
                custom={5}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FiCreditCard size={20} /> Payment Information
                </h3>
                <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <p className="text-xs text-gray-800 uppercase font-medium">
                        Payment Method
                    </p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                        {order.paymentMethod}
                    </p>
                    <p className="text-xs text-gray-800 uppercase font-medium mt-4">
                        Payment Status
                    </p>
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                            order.paymentStatus
                        )}`}
                    >
                        {order.paymentStatus}
                    </span>
                    {order.paidAt && (
                        <p className="text-sm text-gray-800 font-semibold mt-2">
                            Paid At: {new Date(order.paidAt).toLocaleString()}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AdminOrderDetails;
