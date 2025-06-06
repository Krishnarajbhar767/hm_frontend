import React from "react";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShippingForm from "./ShippingForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummary from "./OrderSummary";

function ShippingAndCheckout({ onBack }) {
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const methods = useForm();

    const onSubmit = async (data) => {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // alert(JSON.stringify(data, null, 2));
        // onProceed();
        console.log(data);
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
