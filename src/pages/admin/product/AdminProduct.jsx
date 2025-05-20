import { useForm } from "react-hook-form";
import {
    FiBox,
    FiEdit,
    FiTrash,
    FiX,
    FiArrowUp,
    FiArrowDown,
    FiImage,
} from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField"; // Import the provided InputField

// Mock data for products
const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Handwoven Saree",
        description: "A beautiful silk saree with traditional patterns",
        price: 4999,
        category: { name: "Clothing" },
        stock: 50,
        images: ["https://example.com/saree1.jpg"],
        fabric: "Silk",
        technique: "Handwoven",
        color: "Red",
        weight: "500g",
        assurance: "6 months warranty",
        hsnCode: "5208",
        reviews: [],
        rating: 4.5,
    },
    {
        id: 2,
        name: "Embroidered Kurta",
        description: "Cotton kurta with intricate embroidery",
        price: 2999,
        category: { name: "Clothing" },
        stock: 8,
        images: ["https://example.com/kurta1.jpg"],
        fabric: "Cotton",
        technique: "Embroidered",
        color: "Blue",
        weight: "400g",
        assurance: "3 months warranty",
        hsnCode: "5209",
        reviews: [],
        rating: 4.0,
    },
];

function AdminProducts() {
    const [products, setProducts] = useState(PRODUCTS_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [imagePreviews, setImagePreviews] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    // Function to handle sorting by a specific field
    const handleSortByField = (field) => {
        const newSortOrder =
            sortField === field && sortOrder === "asc" ? "desc" : "asc";
        console.log("Sorting by:", field, "Order:", newSortOrder);
        setSortField(field);
        setSortOrder(newSortOrder);

        const sortedProducts = [...products].sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];
            if (field === "category") {
                valueA = a.category.name;
                valueB = b.category.name;
            }
            return newSortOrder === "asc"
                ? valueA > valueB
                    ? 1
                    : -1
                : valueA < valueB
                ? 1
                : -1;
        });
        setProducts(sortedProducts);
        console.log("Sorted Products:", sortedProducts);
    };

    // Function to handle image uploads
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        console.log("Uploaded Images:", previews);
        setImagePreviews(previews);
        setValue("images", previews);
    };

    // Function to handle form submission
    const onSubmit = handleSubmit((data) => {
        const formattedData = {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            category: { name: data.category },
            stock: parseInt(data.stock, 10),
            images: data.images || (editProduct ? editProduct.images : []),
            fabric: data.fabric,
            technique: data.technique,
            color: data.color,
            weight: data.weight,
            assurance: data.assurance,
            hsnCode: data.hsnCode,
            reviews: editProduct ? editProduct.reviews : [],
            rating: editProduct ? editProduct.rating : 0,
        };

        if (editProduct) {
            console.log("Editing Product:", formattedData);
            setProducts(
                products.map((prod) =>
                    prod.id === editProduct.id
                        ? { ...prod, ...formattedData }
                        : prod
                )
            );
        } else {
            console.log("Adding Product:", formattedData);
            setProducts([
                ...products,
                { id: products.length + 1, ...formattedData },
            ]);
        }
        setIsModalOpen(false);
        setEditProduct(null);
        setImagePreviews([]);
        reset();
    });

    // Function to open edit modal
    const onEditProduct = (product) => {
        console.log("Opening Edit Modal for Product:", product);
        setEditProduct(product);
        setImagePreviews(product.images || []);
        reset({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category.name,
            stock: product.stock.toString(),
            images: product.images,
            fabric: product.fabric,
            technique: product.technique,
            color: product.color,
            weight: product.weight,
            assurance: product.assurance,
            hsnCode: product.hsnCode,
        });
        setIsModalOpen(true);
    };

    // Function to confirm deletion
    const confirmDelete = (id) => {
        console.log("Deleting Product ID:", id);
        setProducts(products.filter((prod) => prod.id !== id));
        setDeleteProductId(null);
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
                    <FiBox size={20} /> Products
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Product
                </button>
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleSortByField("price")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Price
                    {sortField === "price" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
                <button
                    onClick={() => handleSortByField("stock")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Stock
                    {sortField === "stock" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
                <button
                    onClick={() => handleSortByField("rating")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Rating
                    {sortField === "rating" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
            </div>

            {/* Product List */}
            {products.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No products available. Add a product to get started.
                    </p>
                </div>
            ) : (
                <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-2"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-20 h-20 object-cover mx-auto rounded-md"
                            />
                            <h3 className="text-base font-medium text-gray-800 text-center">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {product.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                Category: {product.category.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                Price: ₹{product.price}
                            </p>
                            <p className="text-sm text-gray-600">
                                Stock: {product.stock}
                            </p>
                            <p className="text-sm text-gray-600">
                                Rating: {product.rating.toFixed(1)}
                            </p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => onEditProduct(product)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() =>
                                        setDeleteProductId(product.id)
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
                className={`glass h-screen fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 ${
                    isModalOpen ? "" : "hidden"
                }`}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md md:max-w-lg shadow-lg border border-gray-300 border-opacity-20 rounded-lg overflow-y-auto max-h-[90vh] relative"
                >
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                            setEditProduct(null);
                            setImagePreviews([]);
                            reset();
                        }}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    >
                        <FiX size={20} />
                    </button>
                    <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                        {editProduct ? "Edit Product" : "Add Product"}
                    </h3>
                    <form onSubmit={onSubmit} className="space-y-4">
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
                                onChange={handleImageChange}
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
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditProduct(null);
                                    setImagePreviews([]);
                                    reset();
                                }}
                                className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Delete Confirmation Modal */}
            <div
                className={`fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 ${
                    deleteProductId ? "" : "hidden"
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
                        Are you sure you want to delete this product? This
                        action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => confirmDelete(deleteProductId)}
                            className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md w-full"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setDeleteProductId(null)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default AdminProducts;
