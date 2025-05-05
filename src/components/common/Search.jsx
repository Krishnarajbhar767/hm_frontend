import { useEffect } from "react";
import Heading from "../../pages/public/home/components/Heading";
import { AnimatePresence, motion } from "motion/react";
const Search = ({ closeHandler }) => {
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
        <div className="fixed z-[100] inset-0 w-screen h-screen flex overflow-hidden bg-gray-900/25 ">
            <motion.div
                className="absolute flex flex-col gap-7  py-4   bg-white w-1/3 h-full right-0 z-[101] "
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
            >
                <div className="flex justify-between w-full px-8">
                    <Heading text={"Search"} />
                    <svg
                        onClick={closeHandler}
                        className="w-6 h-6 text-gray-800 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                </div>

                {/* Search Input */}
                <div className="px-8">
                    <div className=" relative  pl-10 rounded-md border border-gray-300 ">
                        <input
                            placeholder="Search..."
                            type="text"
                            className=" outline-none w-full border-none py-2 text-gray-800 "
                        />
                        <svg
                            class="w-5 h-5 text-gray-800 absolute left-2 top-1/2  -translate-y-[50%]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                </div>
                {/* HR */}
                <hr className="text-gray-300" />
                <div
                    className="px-8 overflow-y-scroll"
                    id="searchItemsContainer"
                >
                    <h1 className="font-medium text-xl tracking-wide text-gray-800">
                        Quick Links
                    </h1>
                    <ul className="text-gray-800 mt-2 space-y-1 text-[15px] tracking-wide capitalize">
                        <li className="cursor-pointer">Category1</li>
                        <li className="cursor-pointer">Category1</li>
                        <li className="cursor-pointer">Category1</li>
                    </ul>

                    <h1 className="font-medium text-lg  text-gray-800 mt-4">
                        Need some inspiration?
                    </h1>
                    {/* Product Cards */}
                    <div className="px-8 border mt-3"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Search;

function Card(data) {
    return <div></div>;
}
