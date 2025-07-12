import { useForm } from "react-hook-form";
import { FiImage, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import uploadMedia from "../../../utils/uploadMedia";
import productApis from "../../../services/api/admin/product/product.api";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { setProducts } from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";
import { useEffect } from "react";
import { setFabrics } from "../../../redux/slices/fabricSlice";

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.categories || []);
    const fabrics = useSelector((s) => s.fabrics);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const dispatch = useDispatch();
    // Fetch Fabrics  on First load

    // Handle file input and generate preview
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    // Remove a single image from preview & file list
    const handleRemoveImage = (index) => {
        const newFiles = [...imageFiles];
        const newPreviews = [...imagePreviews];
        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);
        setImageFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    // Form submit handler
    const onSubmit = async (data) => {
        if (imageFiles.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        const toastId = toast.loading("Please wait...");

        try {
            const information = {
                type: "products",
                identifier: data.productId || data.name,
            };

            const imagesUrls = await uploadMedia(imageFiles, information);

            if (!imagesUrls) return;
            data.images = imagesUrls;

            const products = await productApis.createProduct(data);
            dispatch(setProducts(products));

            reset();
            setImageFiles([]);
            setImagePreviews([]);
            toast.success("Product created successfully");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleCancel = () => {
        reset();
        setImageFiles([]);
        setImagePreviews([]);
        navigate(-1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-4 sm:p-6 max-w-2xl mx-auto"
        >
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                Add Product
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Basic Fields */}
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
                            min: { value: 0, message: "Must be positive" },
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
                            min: { value: 0, message: "Must be positive" },
                        }}
                    />
                </div>
                <SelectField
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    rules={{ required: "Category is required" }}
                    options={categories.map((cat) => ({
                        value: cat._id || cat.value,
                        label: cat.name || cat.label,
                        disabled: cat.name == "all" ? true : false,
                    }))}
                />

                {/* Image Upload with Remove/Edit */}
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
                    {imagePreviews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews.map((src, i) => (
                                <div key={i} className="relative w-16 h-16">
                                    <img
                                        src={src}
                                        alt={`Preview ${i}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute top-0 right-0 bg-white rounded-full p-0.5 shadow-md"
                                    >
                                        <FiX size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectField
                        label="Fabric"
                        name="fabric"
                        register={register}
                        errors={errors}
                        rules={{ required: "Fabric is required" }}
                        options={fabrics?.map((cat) => ({
                            value: cat._id || cat.value,
                            label: cat.title || cat.label,
                        }))}
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
                        label="Weight (KG)"
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
                    value="5507"
                    errors={errors}
                    rules={{
                        required: "HSN Code is required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "HSN Code must contain only numbers",
                        },
                    }}
                />

                {/* Submit & Cancel Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        className="bg-neutral-950 h-12 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full"
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

export default AddProduct;
