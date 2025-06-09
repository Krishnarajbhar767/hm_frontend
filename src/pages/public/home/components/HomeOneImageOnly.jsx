import React from "react";
import Image from "../../../../assets/images/Home/HomeOneImageOnly/SF_1920x800.jpg";
function HomeOneImageOnly() {
    return (
        <div className="h-[300px] md:h-[550px] w-full boxedContainer py-4 px-8 overflow-hidden">
            <img
                src={Image}
                className="object-cover h-full w-full cursor-pointer px-8"
                alt="background"
            />
        </div>
    );
}

export default HomeOneImageOnly;
