import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import InputField from "./InputField";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export default function JoinNewsLetter() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPopup, setShowPopup] = useState(false);
    const emailValue = watch("email");

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("newsletterShown");
        if (!hasSeenPopup) {
            setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem("newsletterShown", "true");
            }, 5000);
        }
    }, []);

    return (
        <AnimatePresence>
            {showPopup && (
                // Backdrop
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-[500000] overflow-auto p-4"
                >
                    {/* Popup Container */}
                    <motion.div
                        key="modal"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-md w-full max-w-md md:max-w-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-auto hidden md:block">
                            <img
                                src="https://demoapus-wp.com/uomo/wp-content/uploads/2020/12/banner-mail.jpg"
                                alt="Join Newsletter"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-1/2 overflow-y-auto p-4 md:p-6 flex flex-col">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowPopup(false)}
                                className="self-end text-2xl text-gray-600 hover:text-gray-800 transition-colors"
                                aria-label="Close newsletter popup"
                            >
                                <RxCross2 />
                            </button>

                            <div className="mt-2 flex-1 flex flex-col justify-center space-y-4">
                                <h1 className="text-2xl font-medium capitalize text-foreground">
                                    Sign Up to Our Newsletter
                                </h1>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-full">
                                    Be the first to get the latest news about
                                    trends, promotions, and much more!
                                </p>

                                <form
                                    onSubmit={handleSubmit((data) =>
                                        alert(JSON.stringify(data))
                                    )}
                                    className="w-full"
                                >
                                    <InputField
                                        value={emailValue}
                                        register={register}
                                        name="email"
                                        type="email"
                                        label="Your Email*"
                                        errors={errors}
                                        rules={{
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message:
                                                    "Please enter a valid email address",
                                            },
                                        }}
                                    />
                                    <div className="mt-4">
                                        <Button text="Join" type="submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
