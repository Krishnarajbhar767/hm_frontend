import { useEffect } from "react";
import Heading from "../../pages/public/home/components/Heading";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import slugify from "slugify";
const Search = ({ isOpen, closeHandler }) => {
    useEffect(() => {
        // Calculate scrollbar width
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        // Lock scroll + hide scrollbar
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Prevent layout shift (compensate scrollbar width)
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            // Restore everything
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);
    
    const categories = useSelector(
        (state) => state?.category?.categories || []
    );
    const products = useSelector((state) => state?.product?.products || []);
    return (
        <div
            className="fixed z-[100] inset-0 w-screen h-screen flex bg-gray-900/25"
            onClick={closeHandler}
        >
            <motion.div
                className="absolute flex flex-col bg-white w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-full right-0 z-[101]"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header (Pinned to Top) */}
                <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4">
                    <Heading text="Search" />
                    <button
                        onClick={closeHandler}
                        className="p-2"
                        aria-label="Close search"
                    >
                        <svg
                            className="w-7 h-7 text-foreground hover:text-foreground/80"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>
                    </button>
                </div>
                <hr className="border-foreground/50 mx-4 sm:mx-6" />

                {/* Search Input (Pinned Below Header) */}
                <div className="px-4 sm:px-6 py-4">
                    <div className="relative pl-8 sm:pl-10 rounded-md border border-foreground/80">
                        <input
                            placeholder="Search..."
                            type="text"
                            className="outline-none w-full border-none py-2 text-sm sm:text-base text-foreground"
                        />
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-foreground absolute left-2 top-1/2 -translate-y-1/2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                </div>
                <hr className="text-foreground/80 mx-4 sm:mx-6" />

                {/* Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
                    <h1 className="font-medium text-base sm:text-lg text-foreground tracking-wide mt-2">
                        Quick Links
                    </h1>
                    <ul className="text-foreground mt-2 space-y-1 text-xs sm:text-sm tracking-wide capitalize flex flex-col ">
                        {categories?.map((item, idx) => {
                            const slug = slugify(item.name, {
                                lower: true,
                                strict: true,
                            });

                            if (idx < 3) {
                                return (
                                    <Link
                                        onClick={closeHandler}
                                        to={`/products/${slug}/${item._id}`}
                                        className="cursor-pointer hover:text-foreground/80"
                                    >
                                        {item?.name}
                                    </Link>
                                );
                            }
                        })}
                    </ul>

                    <h1 className="font-medium text-base sm:text-lg text-foreground mt-4">
                        Need some inspiration?
                    </h1>
                    <div className="mt-3 space-y-3">
                        {products.map((item, idx) => (
                            <Card
                                key={item?._id}
                                item={item}
                                closeHandler={closeHandler}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Search;

function Card({ item, closeHandler }) {
    console.log("Item Data ->", item);
    return (
        <Link to={`/product/${item?._id}`} onClick={closeHandler}>
            <div className="flex h-20 sm:h-24 gap-3 border-b last:border-b-0 border-foreground/40 pb-3">
                {/* Image Container */}
                <div className="w-16 sm:w-20">
                    <img
                        src={item.images[0]}
                        className="h-full w-full object-cover cursor-pointer "
                        alt={item?.name}
                    />
                </div>
                {/* Price And Title Container */}
                <div className="flex-1 space-y-1 mt-1">
                    <h1 className="capitalize text-xs sm:text-sm cursor-pointer line-clamp-1">
                        {item?.name}
                    </h1>
                    <h2 className="text-xs sm:text-sm cursor-pointer">
                        {item?.price}
                    </h2>
                </div>
            </div>
        </Link>
    );
}
