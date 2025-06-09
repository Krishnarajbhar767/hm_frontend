import React from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import VIDEO from "../../../../assets/SB_1920x854_vdo.mp4";
function HomeVideo() {
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
                <video
                    playsInline
                    loop
                    className="h-[100vh] object-cover w-full"
                    muted
                    controls
                    autoPlay
                    src={VIDEO}
                ></video>
            </div>
        </div>
    );
}

export default HomeVideo;
