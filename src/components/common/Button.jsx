import React from "react";

const Button = ({ icon, text = "", onSubmitHandler = () => {}, type }) => {
    console.log(type, onSubmitHandler);
    return (
        <button
            type={type ? type : "button"}
            onSubmit={onSubmitHandler}
            class="group relative inline-flex h-12 items-center justify-center overflow-hidden  bg-neutral-950 px-6 font-light text-neutral-200 text-lg tracking-wide w-full"
        >
            <span>{text ? text : "Submit"}</span>
            <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div class="relative h-full w-8 bg-white/20"></div>
            </div>
        </button>
    );
};

export default Button;
