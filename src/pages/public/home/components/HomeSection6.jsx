import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
function HomeSection6() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading text={"Lorem ipsum dolor sit amet consectetur."} />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, quis!"
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 ">
                {Array(1)
                    .fill()
                    .map((_, index) => (
                        <motion.img
                            whileTap={{ scale: 0.9 }}
                            key={index}
                            src="https://placehold.co/400"
                            alt="Sarees"
                            className="w-full h-[300px] md:h-[400px] object-cover object-center rounded hover:scale-[101%] transition-all ease-linear duration-200 shadow-sm  border border-gray-200 hover:grayscale-75"
                        />
                    ))}
            </div>
        </div>
    );
}

export default HomeSection6;
