import React from "react";

function SubHeading({ text }) {
    return (
        <h2 className="text-center  tracking-tight text-sm font-medium md:text-lg capitalize leading-none text-gray-600">
            {text}
        </h2>
    );
}

export default SubHeading;
