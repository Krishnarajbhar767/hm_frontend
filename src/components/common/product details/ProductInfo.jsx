import { useEffect, useState } from "react";
import {
    ShoppingCart,
    CreditCard,
    Heart,
    Share2,
    Star,
    Truck,
    Shield,
    RotateCcw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";
import { setWishList } from "../../../redux/slices/wishListSlice";
import slugify from "slugify";
import BookVideoCallModal from "../BookVideoCall";

/**
 * ProductInfo Component
 * Displays product details, two independent add-ons, and action buttons.
 */
export default function ProductInfo({ product, onAddToCart, onShare }) {
    // Redux & router hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((s) => s.cart);
    const { user } = useSelector((s) => s.user || {});
    const wishlistItems = useSelector((s) => s.wishlist);

    // Local state
    const [qty, setQty] = useState(1);
    const [inCart, setInCart] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [callModalOpen, setCallModalOpen] = useState(false);
    const [withFallPico, setWithFallPico] = useState(false);
    const [withTassels, setWithTassels] = useState(false);

    // Prices for add-ons
    const FALL_PICO_PRICE = 300;
    const TASSELS_PRICE = 200;

    const basePrice = product?.price || 0;
    const totalPrice =
        basePrice +
        (withFallPico ? FALL_PICO_PRICE : 0) +
        (withTassels ? TASSELS_PRICE : 0);

    // Sync "already in cart" state
    useEffect(() => {
        setInCart(cartItems.some((i) => i._id === product?._id));
    }, [cartItems, product?._id]);

    // Sync wishlist state
    useEffect(() => {
        setWishlisted(wishlistItems.some((i) => i._id === product?._id));
    }, [wishlistItems, product?._id]);

    // Rating stars renderer
    const renderStars = (rating = 0) =>
        Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-foreground"
                }`}
            />
        ));

    // Handlers
    const handleAddToCart = async () => {
        if (inCart) return navigate("/cart");
        await onAddToCart?.({
            ...product,
            quantity: qty,
            addons: { withFallPico, withTassels },
            finalPrice: totalPrice,
        });
        setInCart(true);
    };

    const handleBuyNow = async () => {
        navigate("/cart", {
            state: {
                buyNowItem: {
                    ...product,
                    quantity: qty,
                    addons: { withFallPico, withTassels },
                    finalPrice: totalPrice,
                },
            },
        });
    };

    const toggleWishlist = async () => {
        if (!user) return navigate("/login");
        const url = wishlisted ? "user/wishlist/remove" : "user/wishlist/add";
        const res = await axiosInstance.post(url, {
            userId: user._id,
            productId: product._id,
        });
        if (res.data) {
            dispatch(setWishList(res.data));
            setWishlisted(!wishlisted);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-4 space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-medium">
                            {product?.name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            {renderStars(product?.rating)}
                            <span>({product?.reviewCount || 0} reviews)</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleWishlist}
                            className={`p-2 rounded-full transition ${
                                wishlisted
                                    ? "bg-red-50 text-red-600"
                                    : "bg-gray-50 text-foreground hover:text-red-600"
                            }`}
                        >
                            <Heart
                                className={wishlisted ? "fill-current" : ""}
                            />
                        </button>
                        <button
                            onClick={onShare}
                            className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
                        >
                            <Share2 />
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setCallModalOpen(true)}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-100 border border-gray-600"
                >
                    Book A Video Call
                </button>
                {callModalOpen && (
                    <BookVideoCallModal
                        isOpen
                        onClose={() => setCallModalOpen(false)}
                    />
                )}
            </div>

            {/* Price & Stock */}
            <div className="flex items-center gap-4">
                <span className="text-3xl font-medium">
                    ₹{basePrice.toLocaleString()}
                </span>

                {/* Optional */}
                {product?.originalPrice > basePrice && (
                    <>
                        <span className="line-through text-gray-500">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                            {Math.round(
                                ((product.originalPrice - basePrice) /
                                    product.originalPrice) *
                                    100
                            )}
                            % OFF
                        </span>
                    </>
                )}
            </div>
            <div className="flex items-center gap-2 text-sm">
                {product?.stock > 0 ? (
                    <>
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        In Stock ({product.stock})
                    </>
                ) : (
                    <>
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Out of Stock
                    </>
                )}
            </div>

            {/* Details */}
            <div className="space-y-1 text-sm">
                <p>
                    <strong>Overview:</strong> {product?.description}
                </p>
                <p>
                    <strong>Color:</strong> {product?.color}
                </p>
                <p>
                    <strong>Technique:</strong> {product?.technique}
                </p>
                <p>
                    <strong>Fabric:</strong> {product?.fabric}
                </p>
                {product?.note && (
                    <p>
                        <strong>Note:</strong> {product.note}
                    </p>
                )}
                {product?.assurance && (
                    <p>
                        <strong>Assurance:</strong> {product.assurance}
                    </p>
                )}
            </div>

            {/* Add-Ons */}
            <div className="border-t pt-4 space-y-3">
                <h2 className="text-lg font-medium">Customizations</h2>

                <label className="flex justify-between items-center">
                    <span>Fall & Pico</span>
                    <div className="flex items-center gap-2">
                        <span>+₹{FALL_PICO_PRICE}</span>
                        <input
                            type="checkbox"
                            checked={withFallPico}
                            onChange={() => setWithFallPico((v) => !v)}
                        />
                    </div>
                </label>

                <label className="flex justify-between items-center">
                    <span>Tassels</span>
                    <div className="flex items-center gap-2">
                        <span>+₹{TASSELS_PRICE}</span>
                        <input
                            type="checkbox"
                            checked={withTassels}
                            onChange={() => setWithTassels((v) => !v)}
                        />
                    </div>
                </label>

                {(withFallPico || withTassels) && (
                    <div className="bg-green-50 p-3 rounded text-sm">
                        {withFallPico && (
                            <p>
                                • Added Fall & Pico for an elegant, premium
                                finish.
                            </p>
                        )}
                        {withTassels && (
                            <p>• Added Tassels for extra flair and movement.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 border rounded"
                    >
                        –
                    </button>
                    <span className="w-8 text-center">{qty}</span>
                    <button
                        onClick={() =>
                            setQty((q) => Math.min(product.stock || 10, q + 1))
                        }
                        className="w-8 h-8 border rounded"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
                <button
                    onClick={handleBuyNow}
                    disabled={!product.stock}
                    className="w-full py-3 rounded text-white bg-foreground hover:bg-foreground/90 disabled:bg-gray-300"
                >
                    <CreditCard className="inline-block mr-2" />
                    Buy Now
                </button>
                <button
                    onClick={handleAddToCart}
                    disabled={!product.stock}
                    className="w-full py-3 rounded border border-foreground text-foreground hover:bg-gray-50 disabled:bg-gray-100"
                >
                    <ShoppingCart className="inline-block mr-2" />
                    {inCart ? "Go To Cart" : "Add To Cart"}
                </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 text-center text-xs pt-4">
                <div>
                    <Truck className="mx-auto mb-1" />
                    Free Shipping
                </div>
                <div>
                    <Shield className="mx-auto mb-1" />
                    Authenticated
                </div>
                <div>
                    <RotateCcw className="mx-auto mb-1" />7 Days Easy Returns
                </div>
            </div>
        </div>
    );
}
