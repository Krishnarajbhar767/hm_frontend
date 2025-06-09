import {
    FiShoppingCart,
    FiArrowUp,
    FiArrowDown,
    FiSearch,
} from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [deliveryFilter, setDeliveryFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const navigate = useNavigate();

    // Fetch orders once
    useEffect(() => {
        axiosInstance
            .get("/admin/orders/all-orders")
            .then((res) => setOrders(res.data.data || []))
            .catch((err) => console.error("Error fetching orders:", err));
    }, []);

    // derive displayedOrders
    const displayedOrders = useMemo(() => {
        let result = [...orders];

        // 1) search by name / email / razorpay_order_id
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            result = result.filter((o) => {
                const name = `${o.user?.firstName || ""} ${
                    o.user?.lastName || ""
                }`.toLowerCase();
                const email = (o.user?.email || "").toLowerCase();
                const razId = (o.razorpay_order_id || "").toLowerCase();
                return (
                    name.includes(term) ||
                    email.includes(term) ||
                    razId.includes(term)
                );
            });
        }

        // 2) delivery filter
        if (deliveryFilter !== "all") {
            result = result.filter(
                (o) => o.deliveryStatus?.toLowerCase() === deliveryFilter
            );
        }

        // 3) payment filter
        if (paymentFilter !== "all") {
            result = result.filter(
                (o) => o.paymentStatus?.toLowerCase() === paymentFilter
            );
        }

        // 4) sorting
        if (sortField) {
            result.sort((a, b) => {
                const aVal = a[sortField];
                const bVal = b[sortField];
                if (aVal == null || bVal == null) return 0;
                if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
                else return aVal < bVal ? 1 : -1;
            });
        }

        return result;
    }, [
        orders,
        searchTerm,
        deliveryFilter,
        paymentFilter,
        sortField,
        sortOrder,
    ]);

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleDeliveryUpdate = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/admin/orders/order/${id}/status`, {
                status: newStatus,
            });
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === id ? { ...o, deliveryStatus: newStatus } : o
                )
            );
        } catch (err) {
            console.error("Error updating delivery status:", err);
        }
    };

    const handlePaymentUpdate = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/payment/${id}/payment-status`, {
                paymentStatus: newStatus,
            });
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === id ? { ...o, paymentStatus: newStatus } : o
                )
            );
        } catch (err) {
            console.error("Error updating payment status:", err);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-800";
            case "shipped":
            case "out for delivery":
                return "bg-teal-100 text-teal-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "canceled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                <FiShoppingCart size={20} /> Orders
            </h2>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 items-center">
                {/* Search */}
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                    <FiSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search name, email, order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-1 py-1 text-sm outline-none"
                    />
                </div>

                {/* Sort Buttons */}
                <button
                    onClick={() => toggleSort("totalAmount")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Total
                    {sortField === "totalAmount" &&
                        (sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />)}
                </button>
                <button
                    onClick={() => toggleSort("createdAt")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Date
                    {sortField === "createdAt" &&
                        (sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />)}
                </button>

                {/* Delivery Filter */}
                <select
                    value={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                >
                    <option value="all">All Delivery</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                </select>

                {/* Payment Filter */}
                <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                >
                    <option value="all">All Payment</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                </select>

                {/* Clear Filters */}
                {(deliveryFilter !== "all" || paymentFilter !== "all") && (
                    <button
                        onClick={() => {
                            setDeliveryFilter("all");
                            setPaymentFilter("all");
                        }}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Orders Grid */}
            {displayedOrders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No orders available.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedOrders.map((order) => (
                        <motion.div
                            key={order._id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col justify-between min-h-[300px]"
                        >
                            <div
                                className="cursor-pointer"
                                onClick={() =>
                                    navigate(`/admin/orders/order/${order._id}`)
                                }
                            >
                                <h3 className="text-base font-medium text-gray-800">
                                    Order #{order.razorpay_order_id}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {order.user?.firstName}{" "}
                                    {order.user?.lastName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    ₹{order.totalAmount} |{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Payment: {order.paymentStatus}
                                </p>
                            </div>

                            <div className="mt-4 flex flex-col gap-2 capitalize">
                                {/* Delivery Status */}
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(
                                        order.deliveryStatus
                                    )}`}
                                >
                                    {order.deliveryStatus}
                                </span>
                                <select
                                    value={order.deliveryStatus}
                                    onChange={(e) =>
                                        handleDeliveryUpdate(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="p-1 text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">
                                        Out for Delivery
                                    </option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                </select>

                                {/* Payment Status */}
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(
                                        order.paymentStatus
                                    )}`}
                                >
                                    {order.paymentStatus}
                                </span>
                                <select
                                    value={order.paymentStatus}
                                    onChange={(e) =>
                                        handlePaymentUpdate(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="p-1 text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
