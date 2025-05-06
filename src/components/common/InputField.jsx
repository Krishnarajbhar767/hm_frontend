import React, { useState } from "react";

const InputField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    type = "text",
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(value);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
    };

    return (
        <div className="relative mb-6">
            <input
                id={name}
                name={name}
                type={type}
                className="w-full p-3 py-4 border-[2px] border-gray-400  focus:outline-none  focus:border-gray-800 text-gray-700 transition-all duration-100 ease-linear "
                placeholder=" "
                {...register(name, rules)} // Passing validation rules here
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                    isFocused || hasValue
                        ? "top-0 text-xs text-black"
                        : "top-1/2 text-base text-gray-600 "
                } transform ${
                    errors?.[name] ? "-translate-y-1/2 " : "-translate-y-1/2"
                }`}
            >
                {label}
            </label>
            {errors?.[name] && (
                <p className="text-red-500 text-xs mt-1 absolute">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;
