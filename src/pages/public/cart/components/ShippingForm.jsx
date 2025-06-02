import React from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { indianStates } from "./data"; // Assume this is exported separately
import { useSelector } from "react-redux";

const ShippingForm = () => {
    const { shippingAddress } = useSelector((state) => state?.user?.user);
    console.log("Shipping Address", shippingAddress);
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold uppercase text-foreground mb-4">
                Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Full Name"
                    name="name"
                    rules={{
                        required: "Full name is required",
                        minLength: {
                            value: 2,
                            message: "Full name must be at least 2 characters",
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                                "Full name must contain only letters and spaces",
                        },
                    }}
                />
                <InputField
                    label="Address"
                    name="address"
                    rules={{
                        required: "Address is required",
                        minLength: {
                            value: 5,
                            message: "Address must be at least 5 characters",
                        },
                    }}
                />
                <InputField
                    label="City"
                    name="city"
                    rules={{
                        required: "City is required",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                                "City must contain only letters and spaces",
                        },
                    }}
                />
                <SelectField
                    label="State"
                    name="state"
                    options={indianStates}
                    rules={{ required: "State is required" }}
                />
                <InputField
                    label="Zip Code"
                    name="zip"
                    rules={{
                        required: "Zip code is required",
                        pattern: {
                            value: /^\d{6}$/,
                            message: "Zip code must be exactly 6 digits",
                        },
                    }}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    type="tel"
                    rules={{
                        required: "Phone number is required",
                        pattern: {
                            value: /^\d{10}$/,
                            message: "Phone number must be exactly 10 digits",
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ShippingForm;
