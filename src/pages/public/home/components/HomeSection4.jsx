import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";

function HomeSection4() {
    return (
        <div className="grid md:grid-cols-2 gap-4 boxedContainer  py-4">
            <div className="w-full text-center my-auto">
                <div>
                    <Heading text={"Lorem, Ipsum"} />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eius sequi accusamus quisquam excepturi, pariatur sit."
                        }
                    />
                </div>
                <h3 className="text-lg font-semibold mt-6">Lorem.</h3>
            </div>
            <img
                src="https://placehold.co/600x400/orange/white"
                className="h-full w-full "
                alt="hero section 4 banarasi saree "
            />
        </div>
    );
}

export default HomeSection4;
