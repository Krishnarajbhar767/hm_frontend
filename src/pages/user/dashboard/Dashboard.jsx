import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiShoppingBag, FiMapPin, FiCreditCard } from "react-icons/fi";

function Dashboard() {
    const user = useSelector((state) => state?.user?.user);
    const orders = useSelector((state) => state?.order?.orders);
    const addresses = user?.shippingAddress;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            {/* Welcome Section */}
            <div className="bg-gray-800 text-white p-6 shadow-lg rounded-md">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wide">
                    Welcome, {user?.firstName} {user?.lastName}!
                </h2>
                <p className="text-sm sm:text-base text-gray-200 mt-2">
                    Member since {user?.createdAt}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-4 border border-gray-200 bg-white rounded-md shadow-sm">
                    <p className="text-sm sm:text-base text-gray-600 uppercase tracking-wide">
                        Total Orders
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                        {orders?.length - 1 || 0}
                    </p>
                </div>
                <div className="p-4 border border-gray-200 bg-white rounded-md shadow-sm">
                    <p className="text-sm sm:text-base text-gray-600 uppercase tracking-wide">
                        Total Spent
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                        &#8377;
                        {user?.totalSpent
                            ? user?.totalSpent?.toFixed(2)
                            : "0.00"}
                    </p>
                </div>
                <div className="p-4 border border-gray-200 bg-white rounded-md shadow-sm">
                    <p className="text-sm sm:text-base text-gray-600 uppercase tracking-wide">
                        Saved Addresses
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                        {addresses?.length}
                    </p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiShoppingBag size={20} /> Recent Orders
                </h3>
                {orders.length === 0 ? (
                    <p className="text-gray-600 text-sm sm:text-base">
                        No recent orders found.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {orders?.slice(0, 2)?.map((order) => (
                            <motion.div
                                key={order._id}
                                whileHover={{ scale: 1.02 }}
                                className=" p-4 border border-gray-200 bg-white rounded-md shadow-sm"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Order ID:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800">
                                            {order?._id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Date:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800">
                                            {order?.createdAt}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Total:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800">
                                            &#8377;{order?.totalAmount}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Status:
                                        </p>
                                        <p
                                            className={`text-sm sm:text-base capitalize ${
                                                order?.deliveryStatus ===
                                                "Delivered"
                                                    ? "text-green-600"
                                                    : order?.deliveryStatus ===
                                                      "Shipped"
                                                    ? "text-blue-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                                            {order?.deliveryStatus}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                                    Items:{" "}
                                    {order?.items
                                        ?.map((item) => item?.name)
                                        ?.join(", ")}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default Dashboard;
