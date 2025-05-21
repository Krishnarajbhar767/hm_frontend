import { useForm } from "react-hook-form";
import { FiImage } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import { useSelector } from "react-redux";

const EditProduct = () => {
    const products = useSelector((state) => state?.product?.products) || [];
    // You will need to get the product ID from the route params
    // Example: const { id } = useParams();
    // For now, I'll assume the ID is passed or you will handle it
    const id = null; // Replace with your logic to get the ID
    const product = products?.find((p) => p.id === parseInt(id));

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: product
            ? {
                  name: product.name,
                  description: product.description,
                  price: product.price.toString(),
                  category: product.category.name,
                  stock: product.stock.toString(),
                  fabric: product.fabric,
                  technique: product.technique,
                  color: product.color,
                  weight: product.weight,
                  assurance: product.assurance,
                  hsnCode: product.hsnCode,
              }
            : {},
    });

    const [imagePreviews, setImagePreviews] = useState(
        product ? product.images || [] : []
    );

    // Placeholder for handling image uploads (to be implemented by you)
    const handleImageUpload = (e) => {
        // Logic to be added manually
    };

    // Placeholder for form submission (to be implemented by you)
    const handleFormSubmit = handleSubmit((data) => {
        // Logic to be added manually
        // After submission, you may want to navigate back to the product list
        // Example: navigate("/admin/products");
    });

    // Handle cancel action
    const handleCancel = () => {
        reset();
        setImagePreviews([]);
        // You can add navigation logic here
        // Example: navigate("/admin/products");
    };

    if (!product) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 text-sm">Product not found.</p>
                {/* You can add a link or navigation back to the product list */}
                {/* Example: <Link to="/admin/products" className="text-blue-600 hover:text-blue-700 text-sm">Back to Products</Link> */}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-4 sm:p-6 max-w-2xl mx-auto"
        >
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                Edit Product
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    rules={{ required: "Product name is required" }}
                />
                <InputField
                    label="Description"
                    name="description"
                    register={register}
                    errors={errors}
                    rules={{ required: "Description is required" }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Price"
                        name="price"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price must be positive",
                            },
                        }}
                    />
                    <InputField
                        label="Stock"
                        name="stock"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Stock is required",
                            min: {
                                value: 0,
                                message: "Stock must be positive",
                            },
                        }}
                    />
                </div>
                <InputField
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    rules={{ required: "Category is required" }}
                />
                <div>
                    <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <FiImage size={16} /> Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-800"
                    />
                    {errors.images && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.images.message}
                        </p>
                    )}
                    {imagePreviews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Fabric"
                        name="fabric"
                        register={register}
                        errors={errors}
                        rules={{ required: "Fabric is required" }}
                    />
                    <InputField
                        label="Technique"
                        name="technique"
                        register={register}
                        errors={errors}
                        rules={{ required: "Technique is required" }}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Color"
                        name="color"
                        register={register}
                        errors={errors}
                        rules={{ required: "Color is required" }}
                    />
                    <InputField
                        label="Weight"
                        name="weight"
                        register={register}
                        errors={errors}
                        rules={{ required: "Weight is required" }}
                    />
                </div>
                <InputField
                    label="Assurance"
                    name="assurance"
                    register={register}
                    errors={errors}
                    rules={{ required: "Assurance is required" }}
                />
                <InputField
                    label="HSN Code"
                    name="hsnCode"
                    register={register}
                    errors={errors}
                    rules={{ required: "HSN Code is required" }}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditProduct;
