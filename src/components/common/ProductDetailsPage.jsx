import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    FiShoppingCart,
    FiCreditCard,
    FiHeart,
    FiShare2,
} from "react-icons/fi";

// ProductDetailsPage Component to display detailed product information
function ProductDetailsPage() {
    // Extract product ID from URL
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product and related products
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productResponse = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
                );
                if (!productResponse.ok)
                    throw new Error("Failed to fetch product");
                const productData = await productResponse.json();
                const product = productData?.data;
                setProduct(product);
                setSelectedImage(
                    product?.images?.[0] || "https://via.placeholder.com/400"
                );

                if (product?.category?.id) {
                    const relatedResponse = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/categories/${
                            product.category.id
                        }`
                    );
                    if (!relatedResponse.ok)
                        throw new Error("Failed to fetch related products");
                    const relatedData = await relatedResponse.json();
                    const related = (relatedData?.data?.products || [])
                        .filter((p) => p._id !== product._id)
                        .slice(0, 3);
                    setRelatedProducts(related);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Placeholder functions for buttons
    const handleAddToCart = () => {
        if (product) console.log(`Added ${product.name} to cart`);
    };

    const handleBuyNow = () => {
        if (product) console.log(`Proceeding to buy ${product.name}`);
    };

    const handleAddToWishlist = () => {
        if (product) console.log(`Added ${product.name} to wishlist`);
    };

    const handleShare = () => {
        console.log("Share functionality to be implemented");
    };

    // Skeleton loader for product details
    const ProductSkeleton = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <Skeleton height={500} />
                <div className="flex gap-2">
                    {Array(3)
                        .fill()
                        .map((_, index) => (
                            <Skeleton key={index} width={80} height={80} />
                        ))}
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton width="75%" height={40} />
                <Skeleton width="50%" height={24} />
                <Skeleton count={2} height={16} />
                <Skeleton width="60%" height={40} />
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {loading ? (
                    <ProductSkeleton />
                ) : error ? (
                    <p className="text-red-600 text-lg text-center">{error}</p>
                ) : product ? (
                    <>
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <Link
                                to={`/category/${product.category?.id}`}
                                className="text-gray-600 hover:text-black text-sm"
                            >
                                Back to {product.category?.name || "Category"}
                            </Link>
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-96 sm:h-[500px] object-cover border border-gray-300"
                                    onError={(e) =>
                                        (e.target.src =
                                            "https://via.placeholder.com/400")
                                    }
                                />
                                <div className="flex gap-2 overflow-x-auto">
                                    {product.images?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${product.name} thumbnail ${
                                                index + 1
                                            }`}
                                            className={`w-20 h-20 object-cover border cursor-pointer ${
                                                selectedImage === image
                                                    ? "border-black"
                                                    : "border-gray-300 hover:border-gray-500"
                                            }`}
                                            onClick={() =>
                                                setSelectedImage(image)
                                            }
                                            onError={(e) =>
                                                (e.target.src =
                                                    "https://via.placeholder.com/400")
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                {/* Product Title and Price */}
                                <h1 className="text-3xl font-bold text-black capitalize">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-bold text-black">
                                    ₹{product.price?.toLocaleString() || "N/A"}
                                </p>

                                {/* Rating and Stock */}
                                <div className="flex gap-4">
                                    <p className="text-sm text-gray-600">
                                        Rating: ★{" "}
                                        {product.rating || "No reviews yet"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Stock: {product.stock || "N/A"}
                                    </p>
                                </div>

                                {/* Product Description */}
                                <p className="text-base text-gray-600 leading-relaxed">
                                    {product.description ||
                                        "No description available."}
                                </p>

                                {/* Product Attributes */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-300 p-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Category:
                                            </span>{" "}
                                            {product.category?.name || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Fabric:
                                            </span>{" "}
                                            {product.fabric || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Technique:
                                            </span>{" "}
                                            {product.technique || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Color:
                                            </span>{" "}
                                            {product.color || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Weight:
                                            </span>{" "}
                                            {product.weight || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Assurance:
                                            </span>{" "}
                                            {product.assurance || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                HSN Code:
                                            </span>{" "}
                                            {product.hsnCode || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Select Size:
                                    </label>
                                    <div className="flex gap-2 mt-2">
                                        {["S", "M", "L", "XL"].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
                                                className={`px-4 py-2 border border-gray-300 text-black ${
                                                    selectedSize === size
                                                        ? "bg-black text-white"
                                                        : "bg-white hover:bg-gray-100"
                                                } transition-all duration-200`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex items-center gap-2 text-sm bg-black text-white px-6 py-3 hover:bg-gray-800 transition-all duration-200"
                                    >
                                        <FiShoppingCart />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex items-center gap-2 text-sm bg-white text-black border border-gray-300 px-6 py-3 hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <FiCreditCard />
                                        Buy Now
                                    </button>
                                    <button
                                        onClick={handleAddToWishlist}
                                        className="flex items-center gap-2 text-sm bg-white text-black border border-gray-300 px-6 py-3 hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <FiHeart />
                                        Add to Wishlist
                                    </button>
                                </div>

                                {/* Share Button */}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 text-sm text-black hover:text-gray-600 transition-all duration-200"
                                >
                                    <FiShare2 />
                                    Share
                                </button>

                                {/* Delivery Info */}
                                <div className="border-t border-gray-300 pt-4">
                                    <h3 className="text-lg font-semibold text-black">
                                        Delivery & Returns
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2">
                                        <span className="font-medium">
                                            Estimated Delivery:
                                        </span>{" "}
                                        3-5 business days
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">
                                            Return Policy:
                                        </span>{" "}
                                        Free returns within 30 days
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">
                                            Shipping:
                                        </span>{" "}
                                        Free on orders over ₹5000
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="mb-12">
                            <h3 className="text-lg font-semibold text-black mb-4">
                                Customer Reviews
                            </h3>
                            {product.reviews?.length === 0 ? (
                                <p className="text-sm text-gray-600">
                                    No reviews yet. Be the first to review this
                                    product!
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {(product.reviews || [])
                                        .slice(0, 3)
                                        .map((review, index) => (
                                            <div
                                                key={index}
                                                className="border-b border-gray-300 pb-4"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm font-medium text-black">
                                                        {review.user ||
                                                            "Anonymous"}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        ★ {review.rating || 4.5}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {review.comment ||
                                                        "Great product, highly recommend!"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {review.date ||
                                                        "May 28, 2025"}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-black mb-6">
                                    Related Products
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedProducts.map((relatedProduct) => (
                                        <div
                                            key={relatedProduct._id}
                                            className="bg-white border border-gray-300 hover:border-gray-500 transition-all duration-200"
                                        >
                                            <img
                                                src={
                                                    relatedProduct.images[0] ||
                                                    "https://via.placeholder.com/400"
                                                }
                                                alt={relatedProduct.name}
                                                className="w-full h-48 object-cover"
                                                onError={(e) =>
                                                    (e.target.src =
                                                        "https://via.placeholder.com/400")
                                                }
                                            />
                                            <div className="p-4 space-y-2">
                                                <h3 className="text-lg font-semibold text-black truncate">
                                                    {relatedProduct.name ||
                                                        "Product"}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {relatedProduct.description ||
                                                        "No description."}
                                                </p>
                                                <p className="text-lg font-bold text-black">
                                                    ₹
                                                    {relatedProduct.price?.toLocaleString() ||
                                                        "N/A"}
                                                </p>
                                                <Link
                                                    to={`/product/${relatedProduct._id}`}
                                                    className="block text-center text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-200"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-600 text-lg text-center">
                        Product not found.
                    </p>
                )}
            </div>
        </main>
    );
}

export default ProductDetailsPage;
