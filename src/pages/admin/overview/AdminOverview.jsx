import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
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
    FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import axiosInstance from "../../../utils/apiConnector";

function AdminOverview() {
    const [overviewData, setOverviewData] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // Fetch data from the API
    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const response = await axiosInstance.get("/admin/overview");
                setOverviewData(response.data);
            } catch (error) {
                console.error("Error fetching overview data:", error);
            }
        };

        fetchOverviewData();
    }, []);

    // Filter data by time (month or specific date)
    const filterDataByTime = (data = [], key = "date") => {
        return data.filter((item) => {
            const itemDate = new Date(item[key]);
            const matchesMonth = selectedMonth
                ? itemDate.getMonth() + 1 === parseInt(selectedMonth, 10)
                : true;
            const matchesDate = selectedDate
                ? itemDate.toISOString().split("T")[0] === selectedDate
                : true;
            return matchesMonth && matchesDate;
        });
    };

    // If data isn't fetched yet, show a loading message
    if (!overviewData) {
        return (
            <div className="text-center py-20 text-gray-600">
                Loading dashboard overview…
            </div>
        );
    }

    // Calculate the average rating for products
    const averageRating = overviewData.averageRating || 0;

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
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md text-sm text-gray-800"
                        >
                            <option value="">All Months</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {new Date(0, i).toLocaleString("default", {
                                        month: "long",
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCalendar size={16} className="text-gray-600" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
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
                            {overviewData.lowStockProducts.length}
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
                            ₹{overviewData.totalRevenue.toLocaleString()}
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
                            {overviewData.pendingOrders.length}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Products */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiGrid size={20} className="text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Total Products
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            {overviewData.totalProducts}
                        </p>
                    </div>
                </motion.div>
                {/* Active Users */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiUser size={20} className="text-purple-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Active Users
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            {overviewData.activeUsers}
                        </p>
                    </div>
                </motion.div>
                {/* Order Status */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center gap-3"
                >
                    <FiClock size={20} className="text-gray-600" />
                    <div>
                        <p className="text-sm text-gray-600 uppercase">
                            Order Status
                        </p>
                        <ul className="text-lg font-medium text-gray-800">
                            {overviewData.orderStats.map((status, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <span>{status._id}</span>
                                    <span>{status.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Top Selling Products */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
            >
                <h3 className="text-lg font-semibold uppercase text-gray-800 flex items-center gap-2 mb-3">
                    <FiTrendingUp size={18} /> Top Selling Products
                </h3>
                {overviewData.topSellingProducts.length === 0 ? (
                    <p className="text-sm text-gray-600">No data available</p>
                ) : (
                    <ul className="space-y-2">
                        {overviewData.topSellingProducts.map((p, i) => (
                            <li
                                key={i}
                                className="flex justify-between text-sm"
                            >
                                <span className="text-gray-600">{p.name}</span>
                                <span className="font-medium text-gray-800">
                                    {p.sales} sold
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </motion.div>
    );
}

export default AdminOverview;
