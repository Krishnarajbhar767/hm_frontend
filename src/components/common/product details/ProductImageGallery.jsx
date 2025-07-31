import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

function ProductImageGallery({ images = [], productName = "", stock }) {
    const [selectedImage, setSelectedImage] = useState(
        images[0] || "/placeholder.svg"
    );
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

    const nextImage = () => {
        if (images.length > 1) {
            const currentIndex = images.indexOf(selectedImage);
            const nextIndex = (currentIndex + 1) % images.length;
            setSelectedImage(images[nextIndex]);
        }
    };

    const prevImage = () => {
        if (images.length > 1) {
            const currentIndex = images.indexOf(selectedImage);
            const prevIndex =
                (currentIndex - 1 + images.length) % images.length;
            setSelectedImage(images[prevIndex]);
        }
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:h-[500px] md:w-30 pb-2 md:pb-0 md:pr-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={`flex-shrink-0 w-26 md:w-full h-26 md:h-46 overflow-hidden border-2 transition-all duration-200 ${
                                selectedImage === image
                                    ? "border-foreground shadow-md"
                                    : "border-gray-200 hover:border-foreground/50"
                            }`}
                        >
                            <img
                                src={image || "/Product_Placeholder.webp"}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover object-top"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Image */}
            <div className="order-1 md:order-2 flex-1 relative group">
                <div
                    className="h-[400px] sm:h-[600px] overflow-hidden bg-gray-50 border relative cursor-zoom-in"
                    ref={containerRef}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleMouseMove}
                >
                    <img
                        src={selectedImage || "/Product_Placeholder.webp"}
                        alt={productName}
                        className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                            stock >= 1
                                ? isZooming
                                    ? "scale-[2] cursor-zoom-out"
                                    : "group-hover:scale-105"
                                : ""
                        }`}
                        style={
                            isZooming
                                ? {
                                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                      transition: "transform 0.1s ease-out",
                                  }
                                : {}
                        }
                    />

                    {/* Centered Out of Stock Badge */}
                    {stock === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="px-6 py-2 text-xl font-bold text-white rounded-md bg-red-600 shadow-lg animate-pulse">
                                Out of Stock
                            </div>
                        </div>
                    )}

                    {/* Navigation Arrows */}
                    {images.length > 1 && stock >= 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    {/* Zoom Icon */}
                </div>
            </div>
        </div>
    );
}

export default ProductImageGallery;
