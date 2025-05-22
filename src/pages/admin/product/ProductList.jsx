import { FiBox, FiEdit, FiTrash, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setProducts } from "../../../redux/slices/productSlice";
const ProductList = () => {
    const products = useSelector((state) => state?.product?.products);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    // Sorting logic for products
    const sortProductsByField = (field) => {
        const newSortOrder =
            sortField === field && sortOrder === "asc" ? "desc" : "asc";
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
    };

    // Placeholder for deleting a product (to be implemented by you)
    const handleDelete = (id) => {
        // Logic to be added manually
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiBox size={20} /> Products
                </h2>
                <Link
                    to="/admin/products/add"
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Product
                </Link>
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => sortProductsByField("price")}
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
                    onClick={() => sortProductsByField("stock")}
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
                    onClick={() => sortProductsByField("rating")}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products?.map((product) => (
                        <motion.div
                            key={product._id}
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
                            {/* <p className="text-sm text-gray-600">
                                Rating: {product?.reviews?.toFixed(1)}
                            </p> */}
                            <div className="flex justify-between mt-2">
                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash size={14} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ProductList;
