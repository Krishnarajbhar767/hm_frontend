import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";

function HomeLetsExplore() {
    return (
        <div className="boxedContainer py-4 ">
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
            <div className="h-[400px] md:h-[600px]  py-4 bg-[url('./assets/images/Home/HomeLetsExplore/SF_1920x1080.jpg')] bg-center bg-cover bg-no-repeat text-white relative">
                <div className="flex items-center justify-center flex-col h-full text-center ">
                    {/* <h1 className="max-w-1/2 uppercase text-4xl font-Thin">
                        Explore Our Premium Products
                    </h1> */}
                    <div className="max-w-1/2 space-y-4">
                        <h1 className="text-center  font-normal text-2xl leading-none md:text-3xl capitalize  ">
                            Lets Explore Oure Premium Products
                        </h1>
                        <h2 className="text-center  tracking-tight text-sm font-normal md:text-lg capitalize leading-snug ">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Illo, quos.
                        </h2>
                        <button className="mx-auto text-xl bg-white text-gray-800 inline-block w-52 px-4 py-2 border border-transparent hover:border hover:border-white hover:bg-transparent hover:text-white transition-all duration-200">
                            Explore
                        </button>
                    </div>
                    {/* <h2 className="max-w-1/2 capitalize">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Praesentium earum iusto mollitia aliquam magni
                        totam asperiores!
                    </h2> */}
                </div>
            </div>
        </div>
    );
}

export default HomeLetsExplore;
