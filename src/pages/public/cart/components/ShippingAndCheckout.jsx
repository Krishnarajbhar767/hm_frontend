import React from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../../../utils/apiConnector";
import toast from "react-hot-toast";


import { useForm, FormProvider } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShippingForm from "./ShippingForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummary from "./OrderSummary";

function ShippingAndCheckout({ onBack }) {
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const user = useSelector((state) => state?.user?.user);
    const methods = useForm();



    const onSubmit = async (data) => {
        alert("Payment modal Open");


        console.log("user", user)
        console.log("body data", {
            userId: user?._id,
            amount: user.cart.totalPrice,
            items: user.cart.items,
            paymentMethod: data.paymentMethod,
            addressId: data.address,
        })

        try {
            const res = await axiosInstance.post("/payment/checkout", {
                userId: user?._id,
                amount: user.cart.totalPrice,
                items: user.cart.items,
                paymentMethod: data.paymentMethod,
                addressId: user?._id,
            });

            console.log(res.data)

            if (!res?.data?.razorpayOrder) {
                toast.error("Failed to initiate order");
                return;
            }

            const { razorpayOrder } = res.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Shrijanfabs",
                description: "Test Transaction",
                image: "/your-logo.png",
                order_id: razorpayOrder.id,
                // handler: function (response) {
                //     console.log("Payment Success:", response);
                //     alert("Payment Successful!");
                // },

                handler: async function (response) {
                    // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
                    console.log("Payment Success:", response);
                    console.log("userid", user._id);

                    try {
                        const verifyRes = await axiosInstance.post("/payment/verify-payment", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user._id

                        });
                        console.log("verifyRes", verifyRes)

                        if (verifyRes.data.success) {
                            alert(" Payment verified and order placed!");
                        } else {
                            alert(" Payment verified failed");
                        }
                    } catch (error) {
                        console.error("Verify Payment Error:", error);
                        alert(" Something went wrong verifying payment");
                    }
                },

                prefill: {
                    name: user?.firstName,
                    email: user?.email,
                    contact: user?.phone,
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error("❌ Payment Error:", error?.response?.data || error.message);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-full py-8 bg-white px-4 md:px-8"
        >
            <FormProvider {...methods}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <ShippingForm />
                            <PaymentMethodSelector />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex flex-col md:flex-row justify-between mt-8 gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={onBack}
                                    className="flex items-center justify-center gap-2 border-[2px] border-foreground/50 text-foreground h-12 px-4 md:px-6 w-full uppercase hover:border-foreground hover:bg-foreground/5 transition-all duration-200"
                                >
                                    <FaArrowLeft className="text-foreground" />
                                    <span>Back to Shopping Bag</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={methods.formState.isSubmitting}
                                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-foreground px-4 md:px-6 font-light text-neutral-200 text-md tracking-wide w-full uppercase disabled:opacity-50"
                                >
                                    {methods.formState.isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1,
                                            }}
                                            className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <span>Proceed To Confirmation</span>
                                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                                <div className="relative h-full w-8 bg-white/20"></div>
                                            </div>
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>
                    </div>
                    <OrderSummary cartItems={cartItems} />
                </div>
            </FormProvider>
        </motion.div>
    );
}

export default ShippingAndCheckout;
