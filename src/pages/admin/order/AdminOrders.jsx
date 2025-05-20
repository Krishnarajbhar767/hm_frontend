import { FiShoppingCart, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock data for orders
const ORDERS_DATA = [
    {
        id: "ORD001",
        customer: "John Doe",
        products: [
            { name: "Handwoven Saree", quantity: 1, price: 4999 },
            { name: "Embroidered Kurta", quantity: 1, price: 2999 },
        ],
        total: 7998,
        status: "Delivered",
        date: "2025-05-18",
    },
    {
        id: "ORD002",
        customer: "Jane Smith",
        products: [{ name: "Embroidered Kurta", quantity: 2, price: 2999 }],
        total: 5998,
        status: "Pending",
        date: "2025-05-19",
    },
];

function AdminOrders() {
    const [orders, setOrders] = useState(ORDERS_DATA);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    // Function to handle sorting by a specific field
    const handleSortByField = (field) => {
        const newSortOrder =
            sortField === field && sortOrder === "asc" ? "desc" : "asc";
        console.log("Sorting by:", field, "Order:", newSortOrder);
        setSortField(field);
        setSortOrder(newSortOrder);

        const sortedOrders = [...orders].sort((a, b) => {
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
        setOrders(sortedOrders);
        console.log("Sorted Orders:", sortedOrders);
    };

    // Function to handle status updates
    const handleStatusUpdate = (id, newStatus) => {
        console.log(
            "Updating Status for Order ID:",
            id,
            "New Status:",
            newStatus
        );
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    // Function to determine status color
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

            {/* Sorting Controls */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleSortByField("total")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Total
                    {sortField === "total" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
                <button
                    onClick={() => handleSortByField("date")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Date
                    {sortField === "date" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
            </div>

            {/* Order List */}
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No orders available.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col justify-between min-h-[360px] w-full"
                        >
                            {/* Top content */}
                            <div className="flex-grow flex flex-col gap-2">
                                <h3 className="text-base font-medium text-gray-800">
                                    Order #{order.id}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Customer: {order.customer}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Products:
                                    {order.products.map((prod, idx) => (
                                        <span
                                            key={idx}
                                            className="block line-clamp-1"
                                        >
                                            {prod.name} (Qty: {prod.quantity}, ₹
                                            {prod.price})
                                        </span>
                                    ))}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Total: ₹{order.total}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Date: {order.date}
                                </p>
                            </div>

                            {/* Bottom section: Status + Select */}
                            <div className="mt-4 flex flex-col gap-2">
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded w-fit ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>

                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusUpdate(
                                            order.id,
                                            e.target.value
                                        )
                                    }
                                    className="p-2 border border-gray-300 rounded-md text-sm text-gray-800 w-full"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">
                                        Out for Delivery
                                    </option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
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
