import { FiShoppingCart, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const [deliveryFilter, setDeliveryFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(
                    "/admin/orders/all-orders"
                );
                setOrders(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        let filtered = [...orders];

        if (deliveryFilter !== "all") {
            filtered = filtered.filter(
                (order) =>
                    order.deliveryStatus?.toLowerCase() ===
                    deliveryFilter.toLowerCase()
            );
        }

        if (paymentFilter !== "all") {
            filtered = filtered.filter(
                (order) =>
                    order.paymentStatus?.toLowerCase() ===
                    paymentFilter.toLowerCase()
            );
        }

        setFilteredOrders(filtered);
    }, [orders, deliveryFilter, paymentFilter]);

    const handleSortByField = (field) => {
        const newSortOrder =
            sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(newSortOrder);

        const sorted = [...filteredOrders].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];
            return newSortOrder === "asc"
                ? valueA > valueB
                    ? 1
                    : -1
                : valueA < valueB
                ? 1
                : -1;
        });
        setFilteredOrders(sorted);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/admin/orders/order/${id}/status`, {
                status: newStatus,
            });
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === id
                        ? { ...order, deliveryStatus: newStatus }
                        : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
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
            <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                <FiShoppingCart size={20} /> Orders
            </h2>

            <div className="flex flex-wrap gap-2">
                {/* Sorting Buttons */}
                <button
                    onClick={() => handleSortByField("totalAmount")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Total
                    {sortField === "totalAmount" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
                <button
                    onClick={() => handleSortByField("createdAt")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Date
                    {sortField === "createdAt" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>

                {/* Filters */}
                <select
                    value={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                >
                    <option value="all">All Delivery Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                </select>

                <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                >
                    <option value="all">All Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="refunded">Refunded</option>
                    <option value="failed">Failed</option>
                </select>

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

            {filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No orders available.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOrders.map((order) => (
                        <motion.div
                            key={order._id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col justify-between min-h-[300px] w-full"
                        >
                            <div
                                className="flex-grow flex flex-col gap-2 cursor-pointer"
                                onClick={() =>
                                    navigate(`/admin/orders/order/${order._id}`)
                                }
                            >
                                <h3 className="text-base font-medium text-gray-800">
                                    Order #{order._id}
                                </h3>
                                <p className="text-sm text-gray-600 capitalize">
                                    Customer: {order?.user?.firstName}{" "}
                                    {order?.user?.lastName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Total: ₹{order.totalAmount} <br />
                                    Date:{" "}
                                    {
                                        new Date(order?.createdAt)
                                            ?.toISOString()
                                            ?.split("T")[0]
                                    }
                                </p>
                                <p className="text-sm text-gray-500 capitalize">
                                    Payment: {order.paymentStatus || "Unknown"}
                                </p>
                            </div>

                            <div className="mt-4 flex flex-col gap-2 capitalize">
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded w-fit ${getStatusColor(
                                        order.deliveryStatus
                                    )}`}
                                >
                                    {order.deliveryStatus}
                                </span>

                                <select
                                    value={order.deliveryStatus}
                                    onChange={(e) =>
                                        handleStatusUpdate(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="mt-2 p-1 text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="out for delivery">
                                        Out for Delivery
                                    </option>
                                    <option value="delivered">Delivered</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default AdminOrders;
