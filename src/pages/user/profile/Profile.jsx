import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiUser, FiEdit, FiSave, FiLock } from "react-icons/fi";
import InputField from "../../../components/common/InputField";
import { useState } from "react";

// Mock data
const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    gender: "Male",
    dob: "1990-01-15",
    avatar: "https://via.placeholder.com/150",
};

function Profile() {
    const user = useSelector((state) => state.user.user) || mockUser;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            dob: user.dob,
            password: "",
            confirmPassword: "",
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(user.avatar);

    const onSubmit = (data) => {
        console.log("Profile updated:", { ...data, avatar });
        setIsEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiUser size={20} /> Profile Overview
                </h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                >
                    {isEditing ? (
                        <>
                            <FiSave size={16} /> Save
                        </>
                    ) : (
                        <>
                            <FiEdit size={16} /> Edit
                        </>
                    )}
                </button>
            </div>

            {/* Profile Picture */}
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

            {/* Profile Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <InputField
                        label="First Name"
                        name="firstName"
                        register={register}
                        errors={errors}
                        rules={{ required: "First name is required" }}
                        readOnly={!isEditing}
                    />
                    <InputField
                        label="Last Name"
                        name="lastName"
                        register={register}
                        errors={errors}
                        rules={{ required: "Last name is required" }}
                        readOnly={!isEditing}
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
                        readOnly={!isEditing}
                    />
                    <InputField
                        label="Phone"
                        name="phone"
                        type="tel"
                        register={register}
                        errors={errors}
                        rules={{ required: "Phone number is required" }}
                        readOnly={!isEditing}
                    />
                    <InputField
                        label="Gender"
                        name="gender"
                        register={register}
                        errors={errors}
                        readOnly={!isEditing}
                    />
                    <InputField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        register={register}
                        errors={errors}
                        rules={{ required: "Date of birth is required" }}
                        readOnly={!isEditing}
                    />
                </div>

                {/* Change Password Section */}
                {isEditing && (
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold uppercase text-gray-800 tracking-wide">
                            <FiLock size={20} /> Change Password
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <InputField
                                label="New Password"
                                name="password"
                                type="password"
                                register={register}
                                errors={errors}
                                rules={{
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                }}
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                register={register}
                                errors={errors}
                                rules={{
                                    validate: (value, { password }) =>
                                        value === password ||
                                        "Passwords do not match",
                                }}
                            />
                        </div>
                    </div>
                )}

                {isEditing && (
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-6 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                    >
                        Update Profile
                    </button>
                )}
            </form>
        </motion.div>
    );
}

export default Profile;
