import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Banner1 from "../../../../assets/images/Home/Home3Grid/SF_1080x1350_1.jpg";
import Banner2 from "../../../../assets/images/Home/Home3Grid/SF_1080x1350_2.jpg";
import Banner3 from "../../../../assets/images/Home/Home3Grid/SF_1080x1350_3.jpg";
function Home3Grid() {
    const data = [
        { image: Banner1, link: "#" },
        { image: Banner2, link: "#" },
        { image: Banner3, link: "#" },
    ];
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <motion.img
                        whileTap={{ scale: 0.8 }}
                        key={index}
                        src={item.image}
                        alt="Sarees"
                        className="w-full h-[500px] object-cover object-top md:object-center  hover:scale-[101%] transition-all ease-linear duration-200 shadow-sm  border border-gray-200 hover:grayscale-75"
                    />
                ))}
            </div>
        </div>
    );
}

export default Home3Grid;
