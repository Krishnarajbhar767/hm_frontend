import React from "react";
import { motion } from "motion/react";
function HomeSection3() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden bg-primary ">
            <div className="mb-14 mt-4">
                <h1 className="text-center font-medium text-3xl capitalize tracking-tighter">
                    Lorem ipsum dolor sit amet consectetur.
                </h1>
                <h2 className="text-center font-normal tracking-tight text-md leading-none">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Autem, quis!
                </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
                {Array(2)
                    .fill()
                    .map((_, index) => (
                        <motion.img
                            whileTap={{ scale: 0.8 }}
                            key={index}
                            src="https://placehold.co/400"
                            alt="Sarees"
                            className="w-full h-[400px] object-cover object-center rounded hover:scale-[101%] transition-all ease-linear duration-200 shadow-sm  border border-gray-200 hover:grayscale-75"
                        />
                    ))}
            </div>
        </div>
    );
}

export default HomeSection3;
