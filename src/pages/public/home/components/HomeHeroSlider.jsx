import React, { useMemo, useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

// Animation variants for text (adjusted for hero slider context)
const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

// Animation variants for the text container (stagger children)
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

// Animation variants for the image (fade and scale)
const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.4 } },
};

// Animation variants for navigation buttons (subtle movement on click)
const buttonVariants = {
    rest: { x: 0 },
    clicked: {
        x: (direction) => (direction === "left" ? -5 : 5),
        transition: { duration: 0.2, ease: "easeOut" },
    },
};

function HomeHeroSlider({ textPosition = false, sliderData = [] }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false); // For pause on hover
    const sliderLength = sliderData.length - 1;

    // Auto-slide functionality (commented out for future implementation)
    /*
    useEffect(() => {
        if (isHovered) return; // Pause auto-slide on hover
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === sliderLength ? 0 : prev + 1));
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [isHovered, sliderLength]);
    */

    const nextHandler = () => {
        if (activeSlide === sliderLength) {
            return setActiveSlide(0);
        }
        setActiveSlide((prev) => prev + 1);
    };

    const prevHandler = () => {
        if (activeSlide > 0) {
            return setActiveSlide((prev) => prev - 1);
        }
        setActiveSlide(sliderLength);
    };

    // Accessibility: Add keyboard navigation (commented out for future implementation)
    /*
    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") nextHandler();
        if (e.key === "ArrowLeft") prevHandler();
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeSlide]);
    */

    return (
        <div
            className="h-[500px] md:h-[100vh] bg-slate-500 relative overflow-hidden"
            // onMouseEnter={() => setIsHovered(true)} // Uncomment for pause on hover
            // onMouseLeave={() => setIsHovered(false)}
            // tabIndex={0} // Uncomment for keyboard navigation
            // role="region"
            // aria-label="Hero slider"
        >
            {/* Left Button */}
            <motion.div
                onClick={prevHandler}
                className="group absolute p-2 border border-white rounded-full top-[80%] left-3 cursor-pointer z-10 overflow-hidden hover:border-transparent transition-all duration-500"
                variants={buttonVariants}
                initial="rest"
                animate="rest"
                whileTap={{ animate: "clicked", direction: "left" }}
            >
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white z-30 group-hover:-translate-x-0.5 transition-all duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                </svg>
                <span className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-150 transition-transform duration-500 ease-out -z-10" />
            </motion.div>

            {/* Image with Animation */}
            <div className="overflow-hidden h-full w-full relative">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={sliderData[activeSlide].image + activeSlide} // Unique key to trigger animation
                        src={sliderData[activeSlide].image}
                        className="h-full w-full object-top object-cover"
                        alt={`Slide ${activeSlide + 1}`}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    />
                </AnimatePresence>

                {/* Animated Text */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide} // Unique key to trigger animation
                        className={`lg:w-1/3 absolute top-[40%] h-fit space-y-2 text-white flex items-center justify-center flex-col ${
                            textPosition ? "right-10" : "left-10"
                        }`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.h1
                            variants={textVariants}
                            className="text-center text-xl md:text-4xl lg:text-3xl font-medium w-fit mx-auto lg:max-w-[80%] max-w-[90%] capitalize"
                        >
                            {sliderData[activeSlide].heading}
                        </motion.h1>
                        {/* Uncomment to enable subheading with animation */}
                        {/* <motion.h2
                            variants={textVariants}
                            className="text-center text-lg md:text-3xl lg:text-5xl w-fit mx-auto md:max-w-[50%] max-w-[90%] font-medium leading-none"
                        >
                            {sliderData[activeSlide].subheading}
                        </motion.h2> */}
                        <motion.p
                            variants={textVariants}
                            className="text-center text-sm md:text-xl w-fit mx-auto max-w-[80%]"
                        >
                            {sliderData[activeSlide].paragraph}
                        </motion.p>
                        <motion.button
                            variants={textVariants}
                            className="mx-auto text-xl bg-white text-gray-800 inline-block w-52 px-4 py-2 border border-transparent hover:border hover:border-white hover:bg-transparent hover:text-white transition-all duration-200"
                        >
                            Discover
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Right Button */}
            <motion.div
                onClick={nextHandler}
                className="group absolute p-2 border border-white rounded-full top-[80%] right-3 cursor-pointer z-10 overflow-hidden hover:border-transparent transition-all duration-500"
                variants={buttonVariants}
                initial="rest"
                animate="rest"
                whileTap={{ animate: "clicked", direction: "right" }}
            >
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white z-30 group-hover:translate-x-0.5 transition-all duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                </svg>
                <span className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-150 transition-transform duration-500 ease-out -z-10" />
            </motion.div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {sliderData.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`h-3 w-3 rounded-full border border-white cursor-pointer transition-all duration-300 hover:bg-gray-600 ${
                            activeSlide === index
                                ? "bg-gray-800"
                                : "bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomeHeroSlider;
