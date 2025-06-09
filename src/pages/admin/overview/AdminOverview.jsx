import { useState, useEffect } from "react";
import {
    FiHome,
    FiAlertTriangle,
    FiDollarSign,
    FiShoppingCart,
    FiStar,
    FiTrendingUp,
    FiUser,
    FiClock,
    FiGrid,
    FiCalendar,
} from "react-icons/fi";
import { motion } from "framer-motion";
import axiosInstance from "../../../utils/apiConnector";

export default function AdminOverview() {
    const [data, setData] = useState(null);
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        axiosInstance
            .get("/admin/overview")
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error fetching overview:", err));
    }, []);

    if (!data) {
        return (
            <div className="text-center py-24 text-gray-600">
                Loading dashboard…
            </div>
        );
    }

    const {
        lowStockProducts,
        totalRevenue,
        pendingOrders,
        averageRating,
        totalProducts,
        activeUsers,
        orderStats,
        topSellingProducts,
    } = data;

    // unified time filter
    const filterByTime = (arr, key) => {
        return arr.filter((x) => {
            const d = new Date(x[key]);
            const monthMatch = month ? d.getMonth() + 1 === +month : true;
            const dateMatch = date
                ? d.toISOString().slice(0, 10) === date
                : true;
            return monthMatch && dateMatch;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            {/* Header + Filters */}
            <div className="flex flex-col sm:flex-row justify-between">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800">
                    <FiHome /> Dashboard Overview
                </h2>
                {/* <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-600" />
                        <select
                            className="border p-1 rounded text-gray-800"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="">All Months</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i + 1}>
                                    {new Date(0, i).toLocaleString("default", {
                                        month: "long",
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-600" />
                        <input
                            type="date"
                            className="border p-1 rounded text-gray-800"
                            max={new Date().toISOString().slice(0, 10)}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div> */}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        icon: <FiAlertTriangle className="text-red-600" />,
                        label: "Low Stock Products",
                        // now filter by createdAt
                        value: filterByTime(lowStockProducts, "createdAt")
                            .length,
                    },
                    {
                        icon: <FiDollarSign className="text-green-600" />,
                        label: "Total Revenue",
                        value: `₹${totalRevenue.toLocaleString()}`,
                    },
                    {
                        icon: <FiShoppingCart className="text-yellow-600" />,
                        label: "Pending Orders",
                        // also filter by createdAt
                        value: filterByTime(pendingOrders, "createdAt").length,
                    },
                    {
                        icon: <FiStar className="text-teal-600" />,
                        label: "Average Rating",
                        value: averageRating,
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3"
                    >
                        {card.icon}
                        <div>
                            <p className="text-xs text-gray-600 uppercase">
                                {card.label}
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                                {card.value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        icon: <FiGrid className="text-blue-600" />,
                        label: "Total Products",
                        value: totalProducts,
                    },
                    {
                        icon: <FiUser className="text-purple-600" />,
                        label: "Active Users",
                        value: activeUsers,
                    },
                    {
                        icon: <FiClock className="text-gray-600" />,
                        label: "By Delivery Status",
                        list: orderStats.map((s) => ({
                            key: s._id,
                            value: s.count,
                        })),
                    },
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border border-gray-200 rounded p-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {item.icon}
                            <h3 className="text-sm uppercase text-gray-600">
                                {item.label}
                            </h3>
                        </div>
                        {item.list ? (
                            <ul className="space-y-1 text-gray-800">
                                {item.list.map((x) => (
                                    <li
                                        key={x.key}
                                        className="flex justify-between"
                                    >
                                        <span>{x.key}</span>
                                        <span>{x.value}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-lg font-medium text-gray-800">
                                {item.value}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Top Selling */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-200 rounded p-4"
            >
                <div className="flex items-center gap-2 mb-2">
                    <FiTrendingUp className="text-green-600" />
                    <h3 className="text-sm uppercase text-gray-600">
                        Top Selling
                    </h3>
                </div>
                {topSellingProducts.length ? (
                    <ul className="space-y-1 text-gray-800">
                        {topSellingProducts.map((p) => (
                            <li key={p.name} className="flex justify-between">
                                <span>{p.name}</span>
                                <span>{p.sales} sold</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-sm">No sales data</p>
                )}
            </motion.div>
        </motion.div>
    );
}
