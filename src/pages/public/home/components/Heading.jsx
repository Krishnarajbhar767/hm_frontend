import React from "react";

function Heading({ text, color = "#533e2d" }) {
    return (
        <h1
            className={`text-center  font-medium text-xl leading-none md:text-[2rem] capitalize  text-[${color}]`}
        >
            {text}
        </h1>
    );
}

export default Heading;
