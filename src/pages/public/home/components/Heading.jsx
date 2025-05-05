import React from "react";

function Heading({ text }) {
    return (
        <h1 className="text-center font-medium text-xl leading-none md:text-3xl capitalize tracking-tighter text-gray-800">
            {text}
        </h1>
    );
}

export default Heading;
