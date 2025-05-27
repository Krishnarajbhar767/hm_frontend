import React, { useState } from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations

function HomeOnlyTwoSlideGrid() {
    const [slideIndex, setSlideIndex] = useState(0);
    const slideData = [
        {
            heading: "Gulab Bari",
            subHeading:
                "The Gulab Bari collection pays homage to this heritage Banarasi music festival, translating its ethos through handwoven, hand-dyed, and brush-painted textile artistry. Light and airy Khaddi Georgettes are adorned with Chaiti roses in full bloom, lyrical drapes display serene ombrés symbolic of seasonal transitions, and cascading roseate vines come together in a silken symphony.",
            discoverLink: "href",
            image: "https://tilfi.com/cdn/shop/products/KOH0003Red_Kashi_PureKatanSilkKashiGhatSaree3_1200x.jpg?v=1689252962",
        },
        {
            heading: "Antinomy",
            subHeading:
                "Antinomy reimagines Banarasi artistry through a modern lens, where classic craftsmanship evolves into contemporary expression, bringing forth pieces that challenge convention while remaining deeply rooted in tradition.",
            discoverLink: "href2",
            image: "https://tilfi.com/cdn/shop/files/0005_037A3127.jpg?v=1689252834",
        },
    ];

    // Animation variants for text
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    // Animation variants for image
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
    };

    return (
        <div className="grid md:grid-cols-2 gap-4 boxedContainer py-4">
            <div className="w-full text-center my-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slideIndex} // Key ensures animation triggers on slide change
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div>
                            <Heading text={slideData[slideIndex].heading} />
                        </div>
                        <div className="mt-2">
                            <SubHeading
                                text={slideData[slideIndex].subHeading}
                            />
                        </div>
                        <h3 className="text-2xl font-normal mt-6 underline">
                            <a href={slideData[slideIndex].discoverLink}>
                                Discover
                            </a>
                        </h3>
                    </motion.div>
                </AnimatePresence>
                <div className="flex gap-2 w-full items-center justify-center py-4">
                    <div
                        onClick={() => setSlideIndex(0)} // Fixed order to match slideData indices
                        className={`h-4 w-4 rounded-full border border-white cursor-pointer transition-all duration-300 hover:bg-gray-600 ${
                            slideIndex === 0 ? "bg-gray-800" : "bg-gray-400"
                        }`}
                    ></div>
                    <div
                        onClick={() => setSlideIndex(1)}
                        className={`h-4 w-4 rounded-full border border-white cursor-pointer transition-all duration-300 hover:bg-gray-600 ${
                            slideIndex === 1 ? "bg-gray-800" : "bg-gray-400"
                        }`}
                    ></div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.img
                    key={slideData[slideIndex].image} // Key ensures animation triggers on image change
                    src={slideData[slideIndex].image}
                    className="h-[400px] lg:h-[600px] w-full object-cover object-top"
                    alt="hero section 4 banarasi saree"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                />
            </AnimatePresence>
        </div>
    );
}

export default HomeOnlyTwoSlideGrid;
