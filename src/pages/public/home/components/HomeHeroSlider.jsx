import React, { useMemo, useState } from "react";
import Slide1 from "../../../../assets/images/slider/Slider Placeholder.svg";
import { motion } from "framer-motion";

// This WIll Changes Its,  AI Generated
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
};

// This WIll Changes Its,  AI Generated
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

function HomeHeroSlider() {
    const sliderData = useMemo(
        () => [
            {
                image: Slide1,
                heading: "Grace in Every Thread",
                subheading: "Handwoven Elegance",
                paragraph:
                    "Celebrate timeless tradition with sarees that carry the legacy of skilled artisans. Every fold speaks of heritage.",
            },
            {
                image: Slide1,
                heading: "Drape Your Story",
                subheading: "Modern Roots in Classic Weaves",
                paragraph:
                    "From boardrooms to banquets, our sarees blend contemporary chic with cultural richness, made for every woman’s journey.",
            },
            {
                image: Slide1,
                heading: "Crafted with Heart",
                subheading: "From Loom to Love",
                paragraph:
                    "Each piece is more than fabric — it’s an emotion. Woven by hands, worn with pride. Discover sarees that feel like home.",
            },
        ],
        []
    );

    const [activeSlide, setActiveSlide] = useState(0);
    const sliderLength = sliderData.length - 1;
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
    console.log("Active Slide -->", activeSlide);
    return (
        <div className="h-[600px] bg-slate-500 relative overflow-hidden">
            {/* Left Button */}
            <div
                onClick={prevHandler}
                className="group absolute p-2 border border-gray-600 rounded-full top-1/2 left-3 cursor-pointer z-10 overflow-hidden hover:border-transparent transition-all duration-500"
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
            </div>

            {/* Image */}
            <div className="overflow-hidden h-full w-full relative">
                <img
                    src={sliderData[activeSlide].image}
                    className="h-full w-full object-center object-cover"
                    alt="Slide"
                />

                {/* Animated Text */}
                <motion.div
                    className="w-full absolute top-[30%] h-fit space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={textVariants}
                        className="text-center text-6xl font-semibold uppercase w-fit mx-auto max-w-[60%]"
                    >
                        {sliderData[activeSlide].heading}
                    </motion.h1>
                    <motion.h2
                        variants={textVariants}
                        className="text-center text-5xl w-fit mx-auto max-w-[50%] font-medium"
                    >
                        {sliderData[activeSlide].subheading}
                    </motion.h2>
                    <motion.p
                        variants={textVariants}
                        className="text-center text-xl w-fit mx-auto max-w-[40%]"
                    >
                        {sliderData[activeSlide].paragraph}
                    </motion.p>
                </motion.div>
            </div>

            {/* Right Button */}
            <div
                onClick={nextHandler}
                className="group absolute p-2 border border-gray-600 rounded-full top-1/2 right-3 cursor-pointer z-10 overflow-hidden hover:border-transparent transition-all duration-500"
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
            </div>
        </div>
    );
}

export default HomeHeroSlider;
