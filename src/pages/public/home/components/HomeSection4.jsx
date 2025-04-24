import React from "react";

function HomeSection4() {
    return (
        <div className="grid grid-cols-2 gap-4 boxedContainer bg-blue-500">
            <div className="w-full text-center my-auto">
                <h1 className="font-medium text-4xl mb-6">Lorem, ipsum.</h1>
                <h2 className="font-normal tracking-tight text-xl leading-none">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi eius sequi accusamus quisquam excepturi, pariatur sit.
                </h2>
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
