import React from "react";

function Heading({ text, color = "#4a5565" }) {
    return (
        <h1
            className={`text-center  font-medium text-xl leading-none md:text-3xl capitalize  text-[${color}]`}
        >
            {text}
        </h1>
    );
}

export default Heading;
