import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
function HomeSection2() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading
                        text={" Lorem ipsum dolor sit amet consectetur."}
                    />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, quis!"
                        }
                    />
                </div>
            </div>
            <div className=" ">
                <div className="bg-[url('https://placehold.co/400')] h-[300px] md:h-[500px] bg- mx-auto  rounded-xl bg-no-repeat  bg-cover bg-center flex justify-end  md:items-center items-end md:mb-0">
                    <div className=" md:w-1/2 h-fit mb-2 md:mb-0">
                        <div>
                            <Heading
                                text={"Lorem ipsum dolor sit amet consectetur"}
                            />
                        </div>
                        <div className="mt-2">
                            <SubHeading
                                text={
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, exercitationem culpa? Nobis debitis qui vero sint."
                                }
                            />
                        </div>
                        <motion.button className="border border-white  text-white py-2 px-4 rounded-sm block mx-auto mt-4 hover:border-transparent  hover:text-gray-900 transition-all duration-300 relative z-20 group overflow-hidden cursor-pointer">
                            <span className="z-30 capitalize font-medium tracking-wider">
                                {" "}
                                Know More
                            </span>
                            <span className="absolute inset-0 bg-white -z-10  w-full scale-0 group-hover:scale-100 transition-all duration-400 rounded-full "></span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSection2;
