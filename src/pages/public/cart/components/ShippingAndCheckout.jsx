import React from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";

// Custom InputField component
const InputField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    type = "text",
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(value);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
    };

    return (
        <div className="relative mb-6">
            <input
                id={name}
                name={name}
                type={type}
                className="w-full p-3 py-4 border-[2px] border-gray-400 focus:outline-none focus:border-gray-800 text-gray-700 transition-all duration-100 ease-linear"
                placeholder=" "
                {...register(name, rules)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                    isFocused || hasValue
                        ? "top-0 text-xs text-black"
                        : "top-1/2 text-base text-gray-600"
                } transform ${
                    errors?.[name] ? "-translate-y-1/2 " : "-translate-y-1/2"
                }`}
            >
                {label}
            </label>
            {errors?.[name] && (
                <p className="text-red-500 text-xs mt-1 absolute">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};

// List of Indian states and union territories
const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
];

function ShippingAndCheckout({ cartItems = [], onBack, onProceed }) {
    // Setup react-hook-form with validation
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    // State for payment method and submission loading
    const [paymentMethod, setPaymentMethod] = React.useState("credit-card");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Watch the state field to determine if a value is selected
    const stateValue = watch("state", "");

    // Calculate totals
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    // Handle form submission and show JSON data in alert
    const onSubmit = (data) => {
        setIsSubmitting(true);
        const formData = {
            ...data,
            paymentMethod,
        };
        setTimeout(() => {
            setIsSubmitting(false);
            alert(JSON.stringify(formData, null, 2));
            onProceed();
        }, 2000);
    };

    return (
        // Main container with entrance animation
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-full py-8 bg-white px-4 md:px-8" // Added responsive padding
        >
            {/* Responsive grid layout with adjusted gap */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {/* Shipping and payment section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="col-span-1 md:col-span-2"
                >
                    {/* Shipping form section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold uppercase text-gray-800 mb-4">
                            Shipping Information
                        </h2>
                        {/* Form with InputField components and state dropdown */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0 }}
                                >
                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{
                                            required: "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Full name must be at least 2 characters",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message:
                                                    "Full name must contain only letters and spaces",
                                            },
                                        }}
                                    />
                                </motion.div>
                                {/* Address */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <InputField
                                        label="Address"
                                        name="address"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{
                                            required: "Address is required",
                                            minLength: {
                                                value: 5,
                                                message:
                                                    "Address must be at least 5 characters",
                                            },
                                        }}
                                    />
                                </motion.div>
                                {/* City */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <InputField
                                        label="City"
                                        name="city"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{
                                            required: "City is required",
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message:
                                                    "City must contain only letters and spaces",
                                            },
                                        }}
                                    />
                                </motion.div>
                                {/* State Dropdown */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    className="relative mb-6"
                                >
                                    <select
                                        id="state"
                                        name="state"
                                        className="w-full p-3 py-4 border-[2px] border-gray-400 focus:outline-none focus:border-gray-800 text-gray-700 transition-all duration-100 ease-linear bg-white"
                                        {...register("state", {
                                            required: "State is required",
                                        })}
                                    >
                                        <option value="" disabled>
                                            Select State
                                        </option>
                                        {indianStates.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="state"
                                        className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                                            stateValue
                                                ? "top-0 text-xs text-black"
                                                : "top-1/2 text-base text-gray-600"
                                        } transform ${
                                            errors.state
                                                ? "-translate-y-1/2 "
                                                : "-translate-y-1/2"
                                        }`}
                                    >
                                        State
                                    </label>
                                    {errors.state && (
                                        <p className="text-red-500 text-xs mt-1 absolute">
                                            {errors.state.message}
                                        </p>
                                    )}
                                </motion.div>
                                {/* Zip Code */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                >
                                    <InputField
                                        label="Zip Code"
                                        name="zip"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{
                                            required: "Zip code is required",
                                            pattern: {
                                                value: /^\d{6}$/,
                                                message:
                                                    "Zip code must be exactly 6 digits",
                                            },
                                        }}
                                    />
                                </motion.div>
                                {/* Phone */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                >
                                    <InputField
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        register={register}
                                        errors={errors}
                                        rules={{
                                            required:
                                                "Phone number is required",
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message:
                                                    "Phone number must be exactly 10 digits",
                                            },
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </form>
                    </div>

                    {/* Payment method section */}
                    <div>
                        <h2 className="text-lg font-semibold uppercase text-gray-800 mb-4">
                            Payment Method
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="space-y-3"
                        >
                            {[
                                { value: "credit-card", label: "Credit Card" },
                                { value: "paypal", label: "PayPal" },
                                {
                                    value: "bank-transfer",
                                    label: "Bank Transfer",
                                },
                            ].map((method) => (
                                <motion.label
                                    key={method.value}
                                    whileHover={{ scale: 1.02 }}
                                    className={`flex items-center gap-3 p-3 border-[2px] border-gray-400 cursor-pointer transition-all duration-200 ${
                                        paymentMethod === method.value
                                            ? "border-gray-800 bg-blue-50"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.value}
                                        checked={paymentMethod === method.value}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-5 h-5 border-[2px] border-gray-400 flex items-center justify-center transition-all duration-200 ${
                                            paymentMethod === method.value
                                                ? "border-gray-950 bg-gray-950"
                                                : ""
                                        }`}
                                    >
                                        {paymentMethod === method.value && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {method.label}
                                    </span>
                                </motion.label>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Order summary section with responsive padding */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="col-span-1 p-4 md:p-6 border border-gray-200 shadow-sm bg-white"
                >
                    <h2 className="text-lg font-semibold uppercase text-gray-800 mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-3">
                        {/* Cart items in summary */}
                        {cartItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="flex justify-between text-sm text-gray-600"
                            >
                                <span>
                                    {item.name} (x{item.quantity})
                                </span>
                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </motion.div>
                        ))}
                        {/* Subtotal and shipping */}
                        <div className="flex justify-between text-sm text-gray-600 pt-2 border-t border-gray-200">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        {/* Total amount */}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between text-lg font-semibold text-gray-800">
                                <span>Total</span>
                                <motion.span
                                    key={total}
                                    initial={{ scale: 1.2, color: "#16a34a" }}
                                    animate={{ scale: 1, color: "#1f2937" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    ${total.toFixed(2)}
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Navigation buttons with responsive layout and redesigned Back button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col md:flex-row justify-between mt-8 gap-4"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 border-[2px] border-gray-400 text-gray-700 h-12 px-4 md:px-6 w-full uppercase hover:border-gray-800 hover:bg-gray-100 transition-all duration-200"
                >
                    <FaArrowLeft className="text-gray-700" />
                    <span>Back to Shopping Bag</span>
                </motion.button>
                <div className="w-full">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-neutral-950 px-4 md:px-6 font-light text-neutral-200 text-md tracking-wide w-full uppercase disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                            />
                        ) : (
                            <>
                                <span>Proceed To Confirmation</span>
                                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                    <div className="relative h-full w-8 bg-white/20"></div>
                                </div>
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ShippingAndCheckout;
