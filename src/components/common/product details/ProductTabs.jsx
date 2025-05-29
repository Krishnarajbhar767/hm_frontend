import { useState } from "react";
import {
    Package,
    Star,
    Truck,
    User,
    Calendar,
    RotateCcw,
    Shield,
} from "lucide-react";

/**
 * ProductTabs Component
 * Displays product information in tabbed interface (specifications, reviews, shipping)
 */
function ProductTabs({ product, reviews = [] }) {
    const [activeTab, setActiveTab] = useState("specifications");

    // Render star rating
    const renderStars = (rating) => {
        return Array(5)
            .fill()
            .map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${
                        index < Math.floor(rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    }`}
                />
            ));
    };

    const tabs = [
        { id: "specifications", label: "Specifications", icon: Package },
        { id: "reviews", label: `Reviews (${reviews.length})`, icon: Star },
        { id: "shipping", label: "Shipping & Returns", icon: Truck },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                                activeTab === tab.id
                                    ? "border-gray-900 text-gray-900"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {/* Specifications Tab */}
                {activeTab === "specifications" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Product Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {[
                                    {
                                        label: "Category",
                                        value: product?.category?.name || "N/A",
                                    },
                                    {
                                        label: "Fabric",
                                        value: product?.fabric || "N/A",
                                    },
                                    {
                                        label: "Color",
                                        value: product?.color || "N/A",
                                    },
                                    {
                                        label: "Technique",
                                        value: product?.technique || "N/A",
                                    },
                                ].map((spec, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between py-2 border-b border-gray-100"
                                    >
                                        <span className="font-medium text-gray-700">
                                            {spec.label}
                                        </span>
                                        <span className="text-gray-900">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        label: "Weight",
                                        value: product?.weight || "N/A",
                                    },
                                    {
                                        label: "HSN Code",
                                        value: product?.hsnCode || "N/A",
                                    },
                                    {
                                        label: "Assurance",
                                        value: product?.assurance || "N/A",
                                    },
                                    {
                                        label: "Stock",
                                        value: product?.stock || "N/A",
                                    },
                                ].map((spec, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between py-2 border-b border-gray-100"
                                    >
                                        <span className="font-medium text-gray-700">
                                            {spec.label}
                                        </span>
                                        <span className="text-gray-900">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Customer Reviews
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {renderStars(product?.rating || 4.5)}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product?.rating || 4.5} out of 5 (
                                    {reviews.length} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-100 pb-6 last:border-b-0"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">
                                                    {review.user}
                                                </span>
                                                {review.verified && (
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(
                                                        review.date
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Shipping Tab */}
                {activeTab === "shipping" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Shipping & Returns
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">
                                    Shipping Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                Free Standard Shipping
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                On orders over ₹5,000
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                Express Delivery
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                1-2 business days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">
                                    Returns & Exchanges
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <RotateCcw className="w-5 h-5 text-orange-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                30-Day Returns
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Free returns on all orders
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                Quality Guarantee
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                100% authentic products
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductTabs;
