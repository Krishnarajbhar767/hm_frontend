import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
function HomeSection1() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden  ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading text={"Lorem ipsum dolor sit amet consectetur."} />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, quis!"
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {Array(8)
                    .fill()
                    .map((_, index) => (
                        <motion.img
                            whileTap={{ scale: 0.8 }}
                            key={index}
                            src="https://placehold.co/400"
                            alt="Sarees"
                            className="w-full h-[250px] object-cover object-center rounded hover:scale-[102%] transition-all ease-linear duration-200 shadow-sm  border border-gray-200 hover:grayscale-75"
                        />
                    ))}
            </div>
        </div>
    );
}

export default HomeSection1;
