import React from "react";

function SubHeading({ text, color = "#4a5565" }) {
    return (
        <h2
            className={`text-center  tracking-tight text-sm font-medium md:text-lg capitalize leading-snug text-[${color}]`}
        >
            {text}
        </h2>
    );
}

export default SubHeading;
