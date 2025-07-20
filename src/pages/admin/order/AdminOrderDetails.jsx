import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiPackage,
    FiTruck,
    FiCreditCard,
    FiUser,
    FiPlus,
    FiMail,
    FiPhone,
    FiHash,
    FiPrinter,
    FiUpload,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/apiConnector";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import UploadReceiptModal from "./UploadReceiptModal";
import PrintableComponent from "./PrintableComponent";
import { FALLPICO_PRICE, TASSELLS_PRICE } from "../../../Constant";
import ReceiptPreview from "../../../components/common/ReceiptPreview";
// Animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.4 },
    }),
};

// Status Badge Component
const StatusBadge = ({ status, type = "default" }) => {
    const getStatusColor = (status, type) => {
        const statusLower = status?.toLowerCase();

        if (type === "payment") {
            switch (statusLower) {
                case "paid":
                    return "bg-emerald-50 text-emerald-700 border-emerald-200";
                case "failed":
                case "pending":
                    return "bg-red-50 text-red-700 border-red-200";
                default:
                    return "bg-gray-50 text-gray-700 border-gray-200";
            }
        }

        switch (statusLower) {
            case "delivered":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "shipped":
            case "out for delivery":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "pending":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "canceled":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                status,
                type
            )}`}
        >
            {status}
        </span>
    );
};

const AdminOrderHeader = ({ order, onPrint }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Admin Order Management
                    </h1>
                    <p className="text-sm text-gray-600">
                        Order ID:{" "}
                        <span className="font-mono font-medium">
                            {order?.razorpay_order_id || "N/A"}
                        </span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <button
                        onClick={onPrint}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors border rounded-sm bg-gray-100"
                    >
                        <FiPrinter size={18} />
                        Print Receipt
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors border rounded-sm bg-gray-100"
                    >
                        <FiUpload size={18} />
                        Upload Delhivery Receipt
                    </button>

                    <Link
                        to="/admin/orders"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        <FiArrowLeft size={16} />
                        Back to Orders
                    </Link>
                </div>
            </motion.div>

            {/* Import and Render Modal */}
            <UploadReceiptModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                orderId={order?._id}
            />
        </>
    );
};

// Customer Info Component
const CustomerInfo = ({ user }) => (
    <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <FiUser size={20} />
            Customer Information
        </h3>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <FiUser size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">
                                Customer Name
                            </p>
                            <p className="font-semibold text-gray-800 capitalize">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FiMail size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">
                                Email Address
                            </p>
                            <p className="font-medium text-gray-800 lowercase">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <FiPhone size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">
                                Phone Number
                            </p>
                            <p className="font-semibold text-gray-800">
                                {user.phone}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <FiHash size={20} className="text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Customer ID</p>
                            <p className="font-mono text-sm text-gray-800">
                                {user._id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

// Admin Order Overview Component
const AdminOrderOverview = ({ order, formatINR }) => (
    <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6"
    >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Order Date
                </p>
                <p className="text-sm font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
                <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total Amount
                </p>
                {console.log("Details from checkout", order)}
                <p className="text-xl font-bold text-gray-800">
                    ₹{formatINR(order.totalAmount)}
                </p>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Payment Status
                </p>
                <StatusBadge status={order.paymentStatus} type="payment" />
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Delivery Status
                </p>
                <StatusBadge status={order.deliveryStatus} />
            </div>
        </div>
    </motion.div>
);

const AdminProductItem = ({ item, index, formatINR, order }) => {
    const navigate = useNavigate();

    const basePrice = item.product.price;
    const isOfferAplied = item.product.isOfferAplied;
    const offerPercent = order?.offer || 0;
    const couponDiscountAmount = order?.discount || 0;

    const fallPicoPrice = item.withFallPico ? FALLPICO_PRICE : 0;
    const tasselsPrice = item.withTassels ? TASSELLS_PRICE : 0;
    const addonPrice = fallPicoPrice + tasselsPrice;

    const baseOfferDiscount = isOfferAplied
        ? (basePrice * offerPercent) / 100
        : 0;
    const discountedBasePrice = basePrice - baseOfferDiscount;
    const finalUnitPrice = discountedBasePrice + addonPrice;
    const grossTotal = finalUnitPrice * item.quantity;
    const netPayableTotal = grossTotal - couponDiscountAmount;

    const couponPercent = couponDiscountAmount
        ? ((couponDiscountAmount / grossTotal) * 100).toFixed(2)
        : 0;

    return (
        <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md"
        >
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                    <img
                        onClick={() =>
                            navigate(`/product/${item.product?._id}`)
                        }
                        src={
                            item.product.images[0] ||
                            "/Product_Placeholder.webp"
                        }
                        alt={item.product.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm cursor-pointer"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4 text-sm text-gray-700">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 capitalize">
                            {item.product.name}
                        </h4>
                        <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>
                                Product ID: <code>{item.product._id}</code>
                            </span>
                            <span>
                                Qty: <strong>{item.quantity}</strong>
                            </span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <h5 className="text-sm font-bold text-gray-900">
                            🧾 Price Calculation Summary
                        </h5>

                        {/* Step 1: Base Price */}
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-700">
                                Step 1: Base Price
                            </p>
                            <div className="flex justify-between">
                                <span>Base Price (per unit)</span>
                                <span>₹{formatINR(basePrice)}</span>
                            </div>
                            {isOfferAplied && offerPercent > 0 && (
                                <>
                                    <div className="flex justify-between text-green-600">
                                        <span>
                                            Offer Discount ({offerPercent}%)
                                        </span>
                                        <span>
                                            -₹{formatINR(baseOfferDiscount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span>Price After Offer</span>
                                        <span>
                                            ₹{formatINR(discountedBasePrice)}
                                        </span>
                                    </div>
                                </>
                            )}

                            {!isOfferAplied && (
                                <div className="flex justify-between font-medium text-gray-600">
                                    <span>Offer Not Applied</span>
                                    <span>
                                        ₹{formatINR(discountedBasePrice)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Step 2: Add-ons */}
                        {(item.withFallPico || item.withTassels) && (
                            <div className="space-y-1 pt-2">
                                <p className="font-semibold text-gray-700">
                                    Step 2: Add-ons
                                </p>
                                {item.withFallPico && (
                                    <div className="flex justify-between">
                                        <span>+ Fall Pico</span>
                                        <span>+₹{FALLPICO_PRICE}</span>
                                    </div>
                                )}
                                {item.withTassels && (
                                    <div className="flex justify-between">
                                        <span>+ Tassels</span>
                                        <span>+₹{TASSELLS_PRICE}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 3: Final Unit Price */}
                        <div className="border-t pt-2 space-y-1">
                            <p className="font-semibold text-gray-700">
                                Step 3: Final Price (Per Unit)
                            </p>
                            <div className="flex justify-between font-medium">
                                <span>Final Price per Unit</span>
                                <span>₹{formatINR(finalUnitPrice)}</span>
                            </div>
                        </div>

                        {/* Step 4: Gross Total */}
                        <div className="space-y-1 pt-2">
                            <p className="font-semibold text-gray-700">
                                Step 4: Gross Total
                            </p>
                            <div className="flex justify-between font-bold text-gray-800">
                                <span>
                                    {item.quantity} × ₹
                                    {formatINR(finalUnitPrice)}
                                </span>
                                <span>₹{formatINR(grossTotal)}</span>
                            </div>
                        </div>

                        {/* Step 5: Coupon Discount */}
                        {couponDiscountAmount > 0 && (
                            <div className="space-y-1 pt-2 text-red-600">
                                <p className="font-semibold text-red-700">
                                    Step 5: Coupon Discount
                                </p>
                                <div className="flex justify-between">
                                    <span>
                                        Coupon Discount ({couponPercent}%)
                                    </span>
                                    <span>
                                        -₹{formatINR(couponDiscountAmount)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Net Payable */}
                        <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                            <span>Net Payable</span>
                            <span>₹{formatINR(netPayableTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Admin Shipping Info Component
const AdminShippingInfo = ({ order }) => (
    <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <FiTruck size={20} />
            Shipping & Delivery
        </h3>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Delivery Address
                    </p>
                    <div className="text-sm text-gray-800 space-y-1">
                        <p className="text-sm text-foreground leading-relaxed">
                            {order?.shippingAddress?.street ||
                                order?.shippingAddressSnapshot?.street}
                            <br />
                            {order?.shippingAddress?.city ||
                                order?.shippingAddressSnapshot?.city}
                            ,{" "}
                            {order?.shippingAddress?.state ||
                                order?.shippingAddressSnapshot?.state}
                            <br />
                            {order?.shippingAddress?.postalCode ||
                                order?.shippingAddressSnapshot?.postalCode}
                            ,{" "}
                            {order?.shippingAddress?.country ||
                                order?.shippingAddressSnapshot?.country}
                            <br />
                            <span className="font-medium">
                                Phone:{" "}
                                {order?.shippingAddress?.phone ||
                                    order?.shippingAddressSnapshot?.phone}
                            </span>
                        </p>
                    </div>
                </div>

                {order.deliveredAt && (
                    <div className="pt-4 border-t">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Delivery Completed
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {new Date(order.deliveredAt).toLocaleString(
                                "en-IN"
                            )}
                        </p>
                    </div>
                )}

                {/* Admin Actions Section */}
                {/* <div className="pt-4 border-t">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Admin Actions
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
                            Update Status
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors">
                            Mark Delivered
                        </button>
                        <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors">
                            Generate Label
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    </motion.div>
);

// Admin Payment Info Component
const AdminPaymentInfo = ({ order }) => (
    <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <FiCreditCard size={20} />
            Payment Details
        </h3>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Payment Method
                    </p>
                    <p className="text-sm font-medium text-gray-800 capitalize">
                        {order.paymentMethod}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Payment Status
                    </p>
                    <StatusBadge status={order.paymentStatus} type="payment" />
                </div>

                {order.razorpay_order_id && (
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Razorpay Order ID
                        </p>
                        <p className="text-sm font-mono text-gray-800">
                            {order.razorpay_order_id}
                        </p>
                    </div>
                )}

                {order.paidAt && (
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Payment Date
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {new Date(order.paidAt).toLocaleString("en-IN")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

// Main Admin Component
function AdminOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("Order From ADMINORDERDE", order);
    const printRef = useRef();

    // Print Reciept Options
    const receiptOption = {
        id: order?.razorpay_order_id || "",
        date: order?.createdAt || "",
        customerName: `${order?.user?.firstName || ""} ${
            order?.user?.lastName || ""
        }`,
        email: order?.user?.email || "",
        phone: order?.shippingAddressSnapshot?.phone || "",

        shippingAddress: {
            street: order?.shippingAddressSnapshot?.street || "",
            city: order?.shippingAddressSnapshot?.city || "",
            state: order?.shippingAddressSnapshot?.state || "",
            country: order?.shippingAddressSnapshot?.country || "",
            postalCode: order?.shippingAddressSnapshot?.postalCode || "",
        },

        items: (order?.items || []).map((item) => ({
            name: item?.product?.name || "Product",
            quantity: item?.quantity || 0,
            price: item?.product?.price || 0,
            withFallPico: item?.withFallPico || false,
            withTassels: item?.withTassels || false,
        })),

        subtotal: order?.finalPrice || 0, // already includes GST
        shipping: "Free",
        paymentMethod: order?.paymentMethod || "N/A",
    };

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/admin/orders/order/${id}`)
            .then((res) => {
                setOrder(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching order:", err);
                setOrder(null);
                setLoading(false);
            });
    }, [id]);

    const formatINR = (amount) =>
        (amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                        <div className="h-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (order === null) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
            >
                <div className="max-w-md mx-auto">
                    <FiPackage
                        size={48}
                        className="mx-auto text-gray-400 mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Order Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The order you're looking for doesn't exist or may have
                        been removed.
                    </p>
                    <motion.div
                        whileHover={{ x: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            to="/admin/orders"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            <FiArrowLeft size={16} />
                            Back to Orders
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    // Print Function
    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // optional
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <AdminOrderHeader
                        order={order}
                        onPrint={() => handlePrint()}
                    />
                    <CustomerInfo user={order.user} />
                    <AdminOrderOverview order={order} formatINR={formatINR} />

                    {/* Products Section */}
                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        className="space-y-4"
                    >
                        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                            <FiPackage size={20} />
                            Order Items ({order.items.length})
                        </h3>

                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <AdminProductItem
                                    key={item._id}
                                    item={item}
                                    index={idx}
                                    formatINR={formatINR}
                                    order={order}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <AdminShippingInfo order={order} />
                    <AdminPaymentInfo order={order} />
                    {/* Section Of Print Items  */}
                    <PrintableComponent
                        receipt={receiptOption}
                        printRef={printRef}
                    />
                    <ReceiptPreview imageUrl={order?.delhiveryReceipt} />
                </motion.div>
            </div>
        </div>
    );
}

export default AdminOrderDetails;
