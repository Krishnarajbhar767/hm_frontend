import React from "react";
import { motion } from "motion/react";
function HomeSection2() {
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
            <div className=" ">
                <div className="bg-[url('https://placehold.co/400')] h-[500px] bg- mx-auto  rounded-xl bg-no-repeat border bg-cover bg-center flex justify-end  items-center">
                    <div className="border w-1/2 h-fit ">
                        <h1 className="text-center text-3xl capitalize font-semibold tracking-tighter">
                            Lorem ipsum dolor sit amet consectetur
                        </h1>
                        <h2 className=" text-center font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eum, exercitationem culpa? Nobis debitis qui
                            vero sint.
                        </h2>
                        <button className="border border-white  text-white py-2 px-4 rounded-sm block mx-auto mt-4 hover:border-transparent  hover:text-gray-900 transition-all duration-300 relative z-20 group overflow-hidden cursor-pointer">
                            <span className="z-30 capitalize font-medium tracking-wider">
                                {" "}
                                Know More
                            </span>
                            <span className="absolute inset-0 bg-white -z-10  w-full scale-0 group-hover:scale-100 transition-all duration-400 rounded-full "></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSection2;
