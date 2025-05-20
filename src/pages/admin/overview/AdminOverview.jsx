import {
    FiHome,
    FiAlertTriangle,
    FiDollarSign,
    FiShoppingCart,
    FiStar,
    FiTrendingUp,
    FiClock,
    FiGrid,
    FiCalendar,
} from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock data with timestamps
const OVERVIEW_DATA = {
    lowStockProducts: [
        {
            id: 1,
            name: "Handwoven Saree",
            stock: 5,
            lastUpdated: "2025-05-18T10:00:00Z",
        },
        {
            id: 2,
            name: "Embroidered Kurta",
            stock: 8,
            lastUpdated: "2025-04-15T14:30:00Z",
        },
    ],
    totalRevenue: [
        { amount: 800000, date: "2025-05-18T10:00:00Z" },
        { amount: 700000, date: "2025-04-10T09:00:00Z" },
    ],
    pendingOrders: [
        { id: "ORD001", date: "2025-05-19T12:00:00Z" },
        { id: "ORD002", date: "2025-04-20T15:00:00Z" },
    ],
    averageRating: [
        { rating: 4.3, date: "2025-05-18T10:00:00Z" },
        { rating: 4.5, date: "2025-04-12T11:00:00Z" },
    ],
    topSellingProducts: [
        { name: "Handwoven Saree", sales: 150, date: "2025-05-18T10:00:00Z" },
        { name: "Embroidered Kurta", sales: 120, date: "2025-04-15T14:30:00Z" },
    ],
    recentOrders: [
        {
            id: "ORD001",
            customer: "John Doe",
            total: 7998,
            date: "2025-05-18T10:00:00Z",
        },
        {
            id: "ORD002",
            customer: "Jane Smith",
            total: 5998,
            date: "2025-04-20T15:00:00Z",
        },
    ],
    categoryStock: [
        { name: "Clothing", stock: 58, lastUpdated: "2025-05-18T10:00:00Z" },
        { name: "Accessories", stock: 0, lastUpdated: "2025-04-15T14:30:00Z" },
    ],
};

function AdminOverview() {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // Function to filter data by month and date
    const filterDataByTime = (data, key = "date") => {
        console.log("Filtering data by:", { selectedMonth, selectedDate, key });
        const filtered = data.filter((item) => {
            const itemDate = new Date(item[key]);
            const matchesMonth = selectedMonth
                ? itemDate.getMonth() + 1 === parseInt(selectedMonth)
                : true;
            const matchesDate = selectedDate
                ? itemDate.toISOString().split("T")[0] === selectedDate
                : true;
            return matchesMonth && matchesDate;
        });
        console.log("Filtered Data:", filtered);
        return filtered;
    };

    // Apply filters to all data
    const filteredLowStockProducts = filterDataByTime(
        OVERVIEW_DATA.lowStockProducts,
        "lastUpdated"
    );
    const filteredTotalRevenue = filterDataByTime(
        OVERVIEW_DATA.totalRevenue
    ).reduce((sum, item) => sum + item.amount, 0);
    const filteredPendingOrders = filterDataByTime(OVERVIEW_DATA.pendingOrders);
    const filteredAverageRating = filterDataByTime(OVERVIEW_DATA.averageRating);
    const filteredTopSellingProducts = filterDataByTime(
        OVERVIEW_DATA.topSellingProducts
    );
    const filteredRecentOrders = filterDataByTime(OVERVIEW_DATA.recentOrders);
    const filteredCategoryStock = filterDataByTime(
        OVERVIEW_DATA.categoryStock,
        "lastUpdated"
    );

    // Calculate average rating
    const averageRating = filteredAverageRating.length
        ? (
              filteredAverageRating.reduce(
                  (sum, item) => sum + item.rating,
                  0
              ) / filteredAverageRating.length
          ).toFixed(1)
        : 0;

    // Generate months for the filter dropdown
    const months = Array.from({ length: 12 }, (_, i) => ({
        value: (i + 1).toString(),
        label: new Date(0, i).toLocaleString("default", { month: "long" }),
    }));

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiHome size={20} /> Dashboard Overview
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2">
                        <FiCalendar size={16} className="text-gray-600" />
                        <select
                            value={selectedMonth}
                            onChange={(e) => {
                                setSelectedMonth(e.target.value);
                                console.log("Selected Month:", e.target.value);
                            }}
                            className="p-2 border border-gray-300 rounded-md text-sm text-gray-800"
                        >
                            <option value="">All Months</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCalendar size={16} className="text-gray-600" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                console.log("Selected Date:", e.target.value);
                            }}
                            className="p-2 border border-gray-300 rounded-md text-sm text-gray-800"
                            max="2025-05-20"
                        />
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiAlertTriangle size={20} className="text-red-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Low Stock Products
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            {filteredLowStockProducts.length}
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiDollarSign size={20} className="text-green-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Total Revenue
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            ₹{filteredTotalRevenue.toLocaleString()}
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiShoppingCart size={20} className="text-yellow-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Pending Orders
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            {filteredPendingOrders.length}
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiStar size={20} className="text-teal-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Average Rating
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            {averageRating}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Selling Products */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
                >
                    <h3 className="text-lg font-semibold uppercase text-gray-800 flex items-center gap-2 mb-3">
                        <FiTrendingUp size={18} /> Top Selling Products
                    </h3>
                    {filteredTopSellingProducts.length === 0 ? (
                        <p className="text-sm text-gray-600">
                            No data available
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {filteredTopSellingProducts.map(
                                (product, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between text-sm"
                                    >
                                        <span className="text-gray-600">
                                            {product.name}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {product.sales} sold
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </motion.div>

                {/* Recent Orders */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
                >
                    <h3 className="text-lg font-semibold uppercase text-gray-800 flex items-center gap-2 mb-3">
                        <FiClock size={18} /> Recent Orders
                    </h3>
                    {filteredRecentOrders.length === 0 ? (
                        <p className="text-sm text-gray-600">
                            No recent orders
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {filteredRecentOrders.map((order, index) => (
                                <li key={index} className="text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            #{order.id}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            ₹{order.total}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">
                                        {order.customer} -{" "}
                                        {order.date.split("T")[0]}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>

                {/* Category Stock */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
                >
                    <h3 className="text-lg font-semibold uppercase text-gray-800 flex items-center gap-2 mb-3">
                        <FiGrid size={18} /> Category Stock
                    </h3>
                    {filteredCategoryStock.length === 0 ? (
                        <p className="text-sm text-gray-600">
                            No data available
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {filteredCategoryStock.map((category, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="text-gray-600">
                                        {category.name}
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {category.stock} items
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default AdminOverview;
