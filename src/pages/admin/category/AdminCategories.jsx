import { useForm } from "react-hook-form";
import { FiGrid, FiEdit, FiTrash, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";

// Mock data for categories
const CATEGORIES_DATA = [
    {
        id: 1,
        name: "Clothing",
        description: "Apparel and accessories",
        productCount: 2,
    },
    {
        id: 2,
        name: "Accessories",
        description: "Jewelry and bags",
        productCount: 0,
    },
];

function AdminCategories() {
    const [categories, setCategories] = useState(CATEGORIES_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Function to handle form submission
    const onSubmit = handleSubmit((data) => {
        if (editCategory) {
            console.log("Editing Category:", data);
            setCategories(
                categories.map((cat) =>
                    cat.id === editCategory.id ? { ...cat, ...data } : cat
                )
            );
        } else {
            console.log("Adding Category:", data);
            setCategories([
                ...categories,
                { id: categories.length + 1, ...data, productCount: 0 },
            ]);
        }
        setIsModalOpen(false);
        setEditCategory(null);
        reset();
    });

    // Function to open edit modal
    const onEditCategory = (category) => {
        console.log("Opening Edit Modal for Category:", category);
        setEditCategory(category);
        reset({ name: category.name, description: category.description });
        setIsModalOpen(true);
    };

    // Function to confirm deletion
    const confirmDelete = (id) => {
        console.log("Deleting Category ID:", id);
        setCategories(categories.filter((cat) => cat.id !== id));
        setDeleteCategoryId(null);
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
                    <FiGrid size={20} /> Categories
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Category
                </button>
            </div>

            {/* Category List */}
            {categories.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No categories available. Add a category to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-2"
                        >
                            <h3 className="text-base font-medium text-gray-800">
                                {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {category.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                Products: {category.productCount}
                            </p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => onEditCategory(category)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() =>
                                        setDeleteCategoryId(category.id)
                                    }
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
                className={`glass h-screen fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto ${
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
                            setEditCategory(null);
                            reset();
                        }}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    >
                        <FiX size={20} />
                    </button>
                    <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                        {editCategory ? "Edit Category" : "Add Category"}
                    </h3>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <InputField
                            label="Name"
                            name="name"
                            register={register}
                            errors={errors}
                            rules={{ required: "Category name is required" }}
                        />
                        <InputField
                            label="Description"
                            name="description"
                            register={register}
                            errors={errors}
                            rules={{ required: "Description is required" }}
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
                                    setEditCategory(null);
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
                    deleteCategoryId ? "" : "hidden"
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
                        Are you sure you want to delete this category? This
                        action cannot be undone.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => confirmDelete(deleteCategoryId)}
                            className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setDeleteCategoryId(null)}
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

export default AdminCategories;
