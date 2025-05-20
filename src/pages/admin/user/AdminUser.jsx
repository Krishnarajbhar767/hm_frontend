import { useForm } from "react-hook-form";
import { FiUsers, FiEdit, FiTrash, FiX, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";

// Mock data for users
const USERS_DATA = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Customer",
        joined: "2025-05-18",
        ordersCount: 3,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Admin",
        joined: "2025-05-19",
        ordersCount: 0,
    },
];

function AdminUsers() {
    const [users, setUsers] = useState(USERS_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Function to handle form submission
    const onSubmit = handleSubmit((data) => {
        if (editUser) {
            console.log("Editing User:", data);
            setUsers(
                users.map((user) =>
                    user.id === editUser.id ? { ...user, ...data } : user
                )
            );
        } else {
            console.log("Adding User:", data);
            setUsers([
                ...users,
                {
                    id: users.length + 1,
                    ...data,
                    joined: new Date().toISOString().split("T")[0],
                    ordersCount: 0,
                },
            ]);
        }
        setIsModalOpen(false);
        setEditUser(null);
        reset();
    });

    // Function to open edit modal
    const onEditUser = (user) => {
        console.log("Opening Edit Modal for User:", user);
        setEditUser(user);
        reset({ name: user.name, email: user.email, role: user.role });
        setIsModalOpen(true);
    };

    // Function to confirm deletion
    const confirmDelete = (id) => {
        console.log("Deleting User ID:", id);
        setUsers(users.filter((user) => user.id !== id));
        setDeleteUserId(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiUsers size={20} /> Users
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto flex items-center gap-2"
                >
                    <FiPlus size={16} /> Add User
                </button>
            </div>

            {/* User List */}
            {users.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">No users available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <motion.div
                            key={user.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-2"
                        >
                            <h3 className="text-base font-medium text-gray-800">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Email: {user.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                Role: {user.role}
                            </p>
                            <p className="text-sm text-gray-600">
                                Joined: {user.joined}
                            </p>
                            <p className="text-sm text-gray-600">
                                Orders: {user.ordersCount}
                            </p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => onEditUser(user)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => setDeleteUserId(user.id)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash size={14} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <div
                className={`glass h-screen fixed inset-0 bg-opacity-30 flex items-center items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto ${
                    isModalOpen ? "" : "hidden"
                }`}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-md sm:max-w-lg my-4 sm:my-0 shadow-lg border border-gray-300 border-opacity-20 rounded-lg relative"
                >
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                            setEditUser(null);
                            reset();
                        }}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    >
                        <FiX size={20} />
                    </button>
                    <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                        {editUser ? "Edit User" : "Add User"}
                    </h3>
                    <form onSubmit={onSubmit} className="space-y-4">
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
                            rules={{ required: "Email is required" }}
                        />
                        <InputField
                            label="Role"
                            name="role"
                            register={register}
                            errors={errors}
                            rules={{ required: "Role is required" }}
                        />
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditUser(null);
                                    reset();
                                }}
                                className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Delete Confirmation Modal */}
            <div
                className={`glass fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 ${
                    deleteUserId ? "" : "hidden"
                }`}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-sm shadow-lg border border-gray-300 border-opacity-20 rounded-lg"
                >
                    <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                        Confirm Deletion
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete this user? This action
                        cannot be undone.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => confirmDelete(deleteUserId)}
                            className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setDeleteUserId(null)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default AdminUsers;
