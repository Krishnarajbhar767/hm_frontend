import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiUser, FiEdit, FiSave, FiLock } from "react-icons/fi";
import InputField from "../../../components/common/InputField";
import { useState } from "react";
import authApis from "../../../services/api/auth/auth.apis";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../utils/handleAxiosError";

function Profile() {
    const user = useSelector((state) => state?.user?.user);

    // Profile form setup
    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profileErrors },
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            dob: user.dob,
        },
    });

    // Password form setup
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
        watch: watchPassword,
        reset: resetPassword,
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
            oldPassword: "",
        },
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const onSubmitProfile = (data) => {
        console.log("Profile updated:", data);
        setIsEditingProfile(false);
    };

    const onSubmitPasswordChange = async (data) => {
        const toastId = toast.loading("Please wait...");

        try {
            const response = await authApis.changePassword(data);
            toast.success("Password changed successfully");
            console.log("Response Of Password Change", response);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
        setIsChangingPassword(false);
        resetPassword(); // Reset password form fields
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            {/* Profile Overview Header */}
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiUser size={20} /> Profile Overview
                </h2>
            </div>

            {/* Profile Picture (Non-editable) */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                        alt="Profile"
                        className="w-24 h-24 object-cover border-2 border-gray-300"
                    />
                </div>
                <div>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                        Member since 2024-01-15
                    </p>
                </div>
            </div>

            {/* Update Profile Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold uppercase text-gray-800 tracking-wide">
                        <FiUser size={20} /> Update Profile
                    </h3>
                    <button
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                    >
                        {isEditingProfile ? (
                            <>
                                <FiSave size={16} /> Save
                            </>
                        ) : (
                            <>
                                <FiEdit size={16} /> Edit Profile
                            </>
                        )}
                    </button>
                </div>

                <form
                    onSubmit={handleSubmitProfile(onSubmitProfile)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <InputField
                            label="First Name"
                            name="firstName"
                            register={registerProfile}
                            errors={profileErrors}
                            rules={{ required: "First name is required" }}
                            readOnly={!isEditingProfile}
                        />
                        <InputField
                            label="Last Name"
                            name="lastName"
                            register={registerProfile}
                            errors={profileErrors}
                            rules={{ required: "Last name is required" }}
                            readOnly={!isEditingProfile}
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            register={registerProfile}
                            errors={profileErrors}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            }}
                            readOnly={!isEditingProfile}
                        />
                        <InputField
                            label="Phone"
                            name="phone"
                            type="tel"
                            register={registerProfile}
                            errors={profileErrors}
                            rules={{ required: "Phone number is required" }}
                            readOnly={!isEditingProfile}
                        />
                        <InputField
                            label="Gender"
                            name="gender"
                            register={registerProfile}
                            errors={profileErrors}
                            readOnly={!isEditingProfile}
                        />
                        <InputField
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            register={registerProfile}
                            errors={profileErrors}
                            rules={{ required: "Date of birth is required" }}
                            readOnly={!isEditingProfile}
                        />
                    </div>

                    {isEditingProfile && (
                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-6 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                        >
                            Update Profile
                        </button>
                    )}
                </form>
            </div>

            {/* Change Password Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold uppercase text-gray-800 tracking-wide">
                        <FiLock size={20} /> Change Password
                    </h3>
                    <button
                        onClick={() =>
                            setIsChangingPassword(!isChangingPassword)
                        }
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                    >
                        {isChangingPassword ? (
                            <>
                                <FiSave size={16} /> Save
                            </>
                        ) : (
                            <>
                                <FiLock size={16} /> Change Password
                            </>
                        )}
                    </button>
                </div>

                {isChangingPassword && (
                    <form
                        onSubmit={handleSubmitPassword(onSubmitPasswordChange)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <InputField
                                label="Your Current Password"
                                name="oldPassword"
                                type="password"
                                register={registerPassword}
                                errors={passwordErrors}
                                rules={{
                                    required: "Current password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Old Password must be at least 6 characters",
                                    },
                                }}
                            />
                            <InputField
                                label="New Password"
                                name="password"
                                type="password"
                                register={registerPassword}
                                errors={passwordErrors}
                                rules={{
                                    required: "New password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                    validate: (value) =>
                                        value !==
                                            watchPassword("oldPassword") ||
                                        "New password cannot be the same as the old password",
                                }}
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                register={registerPassword}
                                errors={passwordErrors}
                                rules={{
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === watchPassword("password") ||
                                        "Passwords do not match",
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-6 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                        >
                            Update Password
                        </button>
                    </form>
                )}
            </div>
        </motion.div>
    );
}

export default Profile;
