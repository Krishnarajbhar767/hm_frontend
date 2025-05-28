import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarFilter from "../../../components/common/SidebarFilter"; // Adjust path as needed
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// CategoryPage Component to display products in a category
function CategoryPage() {
    // Extract category ID from URL
    const { id, category } = useParams();
    const displayCategory = category?.replace(/-/g, " ") || "Category"; // Convert to display format

    // State management
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState("default");

    // Fetch products and category details
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/categories/${id}`
                );
                if (!response.ok)
                    throw new Error("Failed to fetch category data");
                const data = await response.json();
                setProducts(data?.data?.products || []);
                setFilteredProducts(data?.data?.products || []);
                setCategoryDetails({
                    name: data?.data?.name || displayCategory,
                    description:
                        data?.data?.description ||
                        "Explore our curated collection of products.",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [id, displayCategory]);

    // Handle filter changes
    const handleFilterChange = (filters) => {
        const { priceRange, fabric, color, technique } = filters;
        let filtered = products.filter((product) => {
            const inPriceRange =
                product.price >= priceRange[0] &&
                product.price <= priceRange[1];
            const matchesFabric = fabric ? product.fabric === fabric : true;
            const matchesColor = color ? product.color === color : true;
            const matchesTechnique = technique
                ? product.technique === technique
                : true;
            return (
                inPriceRange &&
                matchesFabric &&
                matchesColor &&
                matchesTechnique
            );
        });

        filtered = sortProducts(filtered, sortOption);
        setFilteredProducts(filtered);
    };

    // Sort products based on selected option
    const sortProducts = (productsToSort, option) => {
        const sorted = [...productsToSort];
        if (option === "price-low-to-high") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (option === "price-high-to-low") {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    };

    // Handle sort option change
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
        const sorted = sortProducts(filteredProducts, option);
        setFilteredProducts(sorted);
    };

    // Skeleton loader for product cards
    const ProductSkeleton = () => (
        <div className="bg-white border border-gray-300">
            <Skeleton height={256} />
            <div className="p-4 space-y-2">
                <Skeleton width="75%" height={24} />
                <Skeleton width="100%" height={16} />
                <Skeleton width="50%" height={24} />
                <Skeleton width="30%" height={16} />
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Category Title and Description */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black capitalize">
                        {categoryDetails?.name || displayCategory}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {categoryDetails?.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        {filteredProducts.length} Products Found
                    </p>
                </div>

                {/* Filter and Sort Controls */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 border-b border-gray-300 pb-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-200"
                    >
                        Filter Products
                    </button>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-black">
                            Sort By:
                        </label>
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="p-2 border border-gray-300 focus:outline-none focus:border-black text-black"
                        >
                            <option value="default">Default</option>
                            <option value="price-low-to-high">
                                Price: Low to High
                            </option>
                            <option value="price-high-to-low">
                                Price: High to Low
                            </option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <SidebarFilter
                        onFilterChange={handleFilterChange}
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array(3)
                                    .fill()
                                    .map((_, index) => (
                                        <ProductSkeleton key={index} />
                                    ))}
                            </div>
                        ) : error ? (
                            <p className="text-red-600 text-lg text-center">
                                Error: {error}
                            </p>
                        ) : filteredProducts.length === 0 ? (
                            <p className="text-gray-600 text-lg">
                                No products found in this category.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-white border border-gray-300 hover:border-gray-500 transition-all duration-200"
                                    >
                                        {/* Product Image */}
                                        <img
                                            src={
                                                product.images[0] ||
                                                "https://via.placeholder.com/400"
                                            }
                                            alt={product.name}
                                            className="w-full h-64 object-cover"
                                            onError={(e) =>
                                                (e.target.src =
                                                    "https://via.placeholder.com/400")
                                            }
                                        />
                                        <div className="p-4 space-y-2">
                                            {/* Product Title */}
                                            <h3 className="text-lg font-semibold text-black truncate">
                                                {product.name}
                                            </h3>
                                            {/* Product Description */}
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {product.description ||
                                                    "No description available."}
                                            </p>
                                            {/* Product Price and Rating */}
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-bold text-black">
                                                    ₹
                                                    {product.price?.toLocaleString() ||
                                                        "N/A"}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    ★ {product.rating || "N/A"}
                                                </p>
                                            </div>
                                            {/* Additional Details */}
                                            <div className="text-sm text-gray-600">
                                                <p>
                                                    Fabric:{" "}
                                                    {product.fabric || "N/A"}
                                                </p>
                                                <p>
                                                    Stock:{" "}
                                                    {product.stock || "N/A"}
                                                </p>
                                                {product.stock < 10 && (
                                                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1">
                                                        Low Stock
                                                    </span>
                                                )}
                                            </div>
                                            {/* View Details Button */}
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="block text-center text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CategoryPage;
