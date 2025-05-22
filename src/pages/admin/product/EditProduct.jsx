import { useForm } from "react-hook-form";
import { FiImage } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import uploadMedia from "../../../utils/uploadMedia";
import productApis from "../../../services/api/admin/product/product.api";
import { setProducts } from "../../../redux/slices/productSlice";

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { products } = useSelector((state) => state.product);
    const categories = useSelector((state) => state.category.categories || []);
    const product = products?.find((p) => p._id === id);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [initialData, setInitialData] = useState(null);

    const watchedFields = watch();
    const dispatch = useDispatch();
    useEffect(() => {
        if (product) {
            const init = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category._id || product.category,
                fabric: product.fabric,
                technique: product.technique,
                color: product.color,
                weight: product.weight,
                assurance: product.assurance,
                hsnCode: product.hsnCode,
            };
            reset(init);
            setInitialData(init);
            setImagePreviews(product.images || []);
        }
    }, [product, reset]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...previews]);
    };

    const isFormChanged = () => {
        if (!initialData) return false;
        for (let key in initialData) {
            if (String(watchedFields[key]) !== String(initialData[key])) {
                return true;
            }
        }
        if (imageFiles.length > 0) return true;
        return false;
    };

    const onSubmit = async (data) => {
        if (!isFormChanged()) {
            toast.error("No changes detected.");
            return;
        }
        setIsSubmitting((prev) => true);
        const toastId = toast.loading("Please wait...");
        let uploadedImageUrls = [];
        if (imageFiles.length > 0) {
            const formData = new FormData();
            imageFiles.forEach((file) => formData.append("files", file));

            try {
                const response = await uploadMedia(formData);

                uploadedImageUrls = Array.isArray(response)
                    ? response
                    : [response];
            } catch (error) {
                toast.error("Failed to upload images");
                return;
            }
        }

        const finalImages = [...(product.images || []), ...uploadedImageUrls];

        const updatedData = {
            ...data,
            images: finalImages,
        };

        try {
            console.log("Updated product data:", updatedData);
            const updatedProducts = await productApis.updateProduct(
                updatedData,
                id
            );
            dispatch(setProducts(updatedProducts));
            toast.success("Product updated");
            navigate(-1);
        } catch (error) {
            toast.error("Failed to update product");
        } finally {
            toast.dismiss(toastId);
            setIsSubmitting((prev) => false);
        }
    };

    const handleCancel = () => navigate(-1);

    if (!product) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 text-sm">Product not found.</p>
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    value={product?.name}
                    register={register}
                    errors={errors}
                    rules={{ required: "Product name is required" }}
                />
                <InputField
                    label="Description"
                    name="description"
                    value={product?.description}
                    register={register}
                    errors={errors}
                    rules={{ required: "Description is required" }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Price"
                        name="price"
                        value={product?.price}
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
                        value={product?.stock}
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
                    value={product?.category}
                    register={register}
                    errors={errors}
                    rules={{ required: "Category is required" }}
                    options={categories.map((cat) => ({
                        value: cat._id || cat.value,
                        label: cat.name || cat.label,
                    }))}
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
                    {imagePreviews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Preview ${i}`}
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
                        value={product?.fabric}
                        register={register}
                        errors={errors}
                        rules={{ required: "Fabric is required" }}
                    />
                    <InputField
                        label="Technique"
                        name="technique"
                        value={product?.technique}
                        register={register}
                        errors={errors}
                        rules={{ required: "Technique is required" }}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Color"
                        name="color"
                        value={product?.color}
                        register={register}
                        errors={errors}
                        rules={{ required: "Color is required" }}
                    />
                    <InputField
                        label="Weight"
                        name="weight"
                        value={product?.weight}
                        register={register}
                        errors={errors}
                        rules={{ required: "Weight is required" }}
                    />
                </div>

                <InputField
                    label="Assurance"
                    name="assurance"
                    value={product?.assurance}
                    register={register}
                    errors={errors}
                    rules={{ required: "Assurance is required" }}
                />
                <InputField
                    label="HSN Code"
                    name="hsnCode"
                    value={product?.hsnCode}
                    register={register}
                    errors={errors}
                    rules={{ required: "HSN Code is required" }}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        style={{
                            cursor: `${
                                isSubmitting ? "not-allowed" : "pointer"
                            }`,
                        }}
                        disabled={isSubmitting}
                        className="bg-neutral-950 text-white px-4 py-2 h-12 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full "
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
