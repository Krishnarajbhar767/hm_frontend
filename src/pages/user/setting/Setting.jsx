import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiSettings, FiMail, FiBell, FiTrash } from "react-icons/fi";
import InputField from "../../../components/common/InputField";
import { useState } from "react";

// Mock data
const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
};

function Settings() {
    const user = useSelector((state) => state.user.user) || mockUser;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            emailNotifications: true,
            pushNotifications: false,
        },
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const onSubmit = (data) => {
        console.log("Settings updated:", data);
    };

    const handleDeleteAccount = () => {
        console.log("Account deletion requested");
        setIsDeleteModalOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                <FiSettings size={20} /> Profile Settings
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 max-w-lg"
            >
                {/* Profile Info */}
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold uppercase text-gray-800 tracking-wide">
                        <FiMail size={20} /> Account Information
                    </h3>
                    <InputField
                        label="Name"
                        name="name"
                        register={register}
                        errors={errors}
                        rules={{ required: "Name is required" }}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                            },
                        }}
                    />
                </div>

                {/* Notification Settings */}
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold uppercase text-gray-800 tracking-wide">
                        <FiBell size={20} /> Notification Settings
                    </h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("emailNotifications")}
                            className="h-4 w-4 text-gray-800 border-gray-300 focus:ring-gray-800"
                        />
                        <label className="text-sm text-gray-600 uppercase">
                            Email Notifications
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("pushNotifications")}
                            className="h-4 w-4 text-gray-800 border-gray-300 focus:ring-gray-800"
                        />
                        <label className="text-sm text-gray-600 uppercase">
                            Push Notifications
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-gray-800 text-white px-6 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                >
                    Save Settings
                </button>
            </form>

            {/* Delete Account */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold uppercase text-gray-800 tracking-wide">
                    <FiTrash size={20} /> Delete Account
                </h3>
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md"
                >
                    Delete My Account
                </button>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 sm:p-6 w-full max-w-md shadow-lg"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                            Confirm Account Deletion
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                            Are you sure you want to delete your account? This
                            action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default Settings;
