import { useEffect } from "react";
import Heading from "../../pages/public/home/components/Heading";
import { AnimatePresence, motion } from "framer-motion";

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
                            className="w-7 h-7 text-gray-800 hover:text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>
                    </button>
                </div>
                <hr className="border-gray-300 mx-4 sm:mx-6" />

                {/* Search Input (Pinned Below Header) */}
                <div className="px-4 sm:px-6 py-4">
                    <div className="relative pl-8 sm:pl-10 rounded-md border border-gray-300">
                        <input
                            placeholder="Search..."
                            type="text"
                            className="outline-none w-full border-none py-2 text-sm sm:text-base text-gray-800"
                        />
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 absolute left-2 top-1/2 -translate-y-1/2"
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
                <hr className="border-gray-300 mx-4 sm:mx-6" />

                {/* Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
                    <h1 className="font-medium text-base sm:text-lg text-gray-800 tracking-wide">
                        Quick Links
                    </h1>
                    <ul className="text-gray-800 mt-2 space-y-1 text-xs sm:text-sm tracking-wide capitalize">
                        <li className="cursor-pointer hover:text-gray-600">
                            Category1
                        </li>
                        <li className="cursor-pointer hover:text-gray-600">
                            Category2
                        </li>
                        <li className="cursor-pointer hover:text-gray-600">
                            Category3
                        </li>
                    </ul>

                    <h1 className="font-medium text-base sm:text-lg text-gray-800 mt-4">
                        Need some inspiration?
                    </h1>
                    <div className="mt-3 space-y-3">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Search;

function Card() {
    return (
        <div className="flex h-20 sm:h-24 gap-3 border-b last:border-b-0 border-neutral-300 pb-3">
            {/* Image Container */}
            <div className="w-16 sm:w-20">
                <img
                    src="https://themesflat.co/html/ecomus/images/products/white-3.jpg"
                    className="h-full w-full object-cover cursor-pointer rounded"
                    alt="Product"
                />
            </div>
            {/* Price And Title Container */}
            <div className="flex-1 space-y-1 mt-1">
                <h1 className="capitalize text-xs sm:text-sm cursor-pointer line-clamp-1">
                    Product Name
                </h1>
                <h2 className="text-xs sm:text-sm cursor-pointer">$299</h2>
            </div>
        </div>
    );
}
