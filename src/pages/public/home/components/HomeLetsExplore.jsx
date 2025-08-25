import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import { Link, useNavigate } from "react-router-dom";

function HomeLetsExplore() {
    const navigate = useNavigate();

    return (
        <div className=" py-4">
            {/* Heading Section */}
            <div className="md:mb-14 mb-10 mt-4 text-center md:text-left">
                <Heading text={"Elevate Every Step"} />

                <div className="mt-2">
                    <SubHeading
                        text={
                            "Discover handcrafted carpets that blend comfort, culture, and contemporary style — made to transform your space."
                        }
                    />
                </div>
            </div>

            {/* Background Image with CTA */}
            <div className="relative h-[400px] md:h-[600px] py-4 bg-[url('./assets/images/Home/HomeLetsExplore/HC_1920x1080.jpg')] bg-fixed bg-center bg-cover bg-no-repeat text-white">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] space-y-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight capitalize">
                            Ready for something special?
                        </h1>
                        <h2 className="text-md sm:text-base md:text-lg font-normal tracking-tight leading-snug capitalize">
                            Explore our full collection and find your perfect
                            piece today.
                        </h2>
                        <Link
                            to={'/products/all/685a6381e6c33dcf91fa54d0'}
                            className="text-lg md:text-xl bg-white text-gray-800 w-44 md:w-52 px-4 py-2 border border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all duration-200"
                        >
                            Explore
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLetsExplore;
