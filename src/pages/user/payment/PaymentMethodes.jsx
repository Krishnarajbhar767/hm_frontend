import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiCreditCard, FiTrash, FiCheck, FiDollarSign } from "react-icons/fi";
import InputField from "../../../components/common/InputField";
import { useState } from "react";

// Mock data
const mockPaymentMethods = [
    { id: 1, type: "Visa", lastFour: "1234", expiry: "12/26", isDefault: true },
    {
        id: 2,
        type: "MasterCard",
        lastFour: "5678",
        expiry: "09/25",
        isDefault: false,
    },
];

const mockPaymentHistory = [
    {
        id: "PAY001",
        orderId: "ORD001",
        method: "Visa ending in 1234",
        amount: 150.0,
        date: "2025-05-01",
        status: "Completed",
    },
    {
        id: "PAY002",
        orderId: "ORD002",
        method: "MasterCard ending in 5678",
        amount: 89.99,
        date: "2025-05-03",
        status: "Pending",
    },
];

function PaymentMethods() {
    const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const paymentHistory = mockPaymentHistory;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { type: "", lastFour: "", expiry: "" },
    });

    const onSubmit = (data) => {
        setPaymentMethods([
            ...paymentMethods,
            { id: paymentMethods.length + 1, ...data, isDefault: false },
        ]);
        reset();
        setIsFormOpen(false);
    };

    const handleDelete = (id) => {
        setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    };

    const handleSetDefault = (id) => {
        setPaymentMethods(
            paymentMethods.map((method) => ({
                ...method,
                isDefault: method.id === id,
            }))
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiCreditCard size={20} /> Payment Methods
                </h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 text-xs sm:text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                >
                    Add Payment Method
                </button>
            </div>
            {paymentMethods.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-600 text-sm sm:text-base mb-2">
                        No payment methods saved
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Add a payment method to see it here
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <motion.div
                            key={method.id}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 border border-gray-200 bg-white rounded-md shadow-sm flex items-center gap-4"
                        >
                            <FiCreditCard size={24} className="text-gray-600" />
                            <div className="flex-1">
                                <p className="text-sm sm:text-base font-medium text-gray-800">
                                    {method.type} ending in {method.lastFour}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Expires {method.expiry}
                                </p>
                                {method.isDefault && (
                                    <span className="flex items-center gap-1 text-green-600 text-xs sm:text-sm">
                                        <FiCheck size={16} /> Default
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(method.id)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash size={16} />
                                    Delete
                                </button>
                                {!method.isDefault && (
                                    <button
                                        onClick={() =>
                                            handleSetDefault(method.id)
                                        }
                                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
                                    >
                                        Set Default
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Payment History */}
            <div className="space-y-4 mt-8">
                <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiDollarSign size={20} /> Payment History
                </h3>
                {paymentHistory.length === 0 ? (
                    <p className="text-gray-600 text-sm sm:text-base">
                        No payment history found.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {paymentHistory.map((payment) => (
                            <motion.div
                                key={payment.id}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 border border-gray-200 bg-white rounded-md shadow-sm"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4">
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Payment ID:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800">
                                            {payment.id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Order ID:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800">
                                            {payment.orderId}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Method:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800 text-nowrap">
                                            {payment.method}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Amount:
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-800">
                                            ${payment.amount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-xs text-gray-600 uppercase">
                                            Status:
                                        </p>
                                        <p
                                            className={`text-sm sm:text-base ${
                                                payment.status === "Completed"
                                                    ? "text-green-600"
                                                    : payment.status ===
                                                      "Pending"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {payment.status}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                                    Date: {payment.date}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 sm:p-6 w-full max-w-md shadow-lg"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                            Add Payment Method
                        </h3>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <InputField
                                label="Card Type"
                                name="type"
                                register={register}
                                errors={errors}
                                rules={{ required: "Card type is required" }}
                            />
                            <InputField
                                label="Last Four Digits"
                                name="lastFour"
                                register={register}
                                errors={errors}
                                rules={{
                                    required: "Last four digits are required",
                                    pattern: {
                                        value: /^\d{4}$/,
                                        message: "Must be exactly 4 digits",
                                    },
                                }}
                            />
                            <InputField
                                label="Expiry Date"
                                name="expiry"
                                register={register}
                                errors={errors}
                                rules={{
                                    required: "Expiry date is required",
                                    pattern: {
                                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                        message: "Format must be MM/YY",
                                    },
                                }}
                            />
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default PaymentMethods;
