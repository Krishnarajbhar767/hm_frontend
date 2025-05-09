import React, { useState } from "react";
import Heading from "../home/components/Heading";
import SubHeading from "../home/components/SubHeading";
import ShoppingBag from "./components/ShoppingBag";
import ShippingAndCheckout from "./components/ShippingAndCheckout";

function Cart() {
    const Data = [
        {
            id: 1,
            heading: "Shopping Bag",
            subHeading: " Manage Your Items list",
        },
        {
            id: 2,
            heading: "Shipping And Checkout",
            subHeading: "Checkout your item list",
        },
        {
            id: 3,
            heading: "Confirmation ",
            subHeading: "Review and submit your order",
        },
    ];
    const [stepCount, setSetCount] = useState(1);
    return (
        <div className="boxedContainer h-auto w-full py-10">
            <h1 className=" text-[35px] font-bold uppercase ">Cart</h1>
            <div className="grid w-full grid-cols-3">
                {Data.map((item, idx) => (
                    <div
                        className={`flex gap-4  py-2 ${
                            stepCount >= item.id
                                ? "border-b-2 border-gray-800"
                                : ""
                        }`}
                        key={item.id}
                    >
                        <h1 className="text-[18px] uppercase font-medium">
                            0{item.id}
                        </h1>
                        <div>
                            <h1 className="text-[18px] uppercase font-medium text-gray-800">
                                {item.heading}
                            </h1>
                            <h2 className="text-gray-600">{item.subHeading}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="">
                {/* <ShoppingBag /> */}
                <ShippingAndCheckout />
            </div>
        </div>
    );
}

export default Cart;
