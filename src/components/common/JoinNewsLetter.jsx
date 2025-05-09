import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import InputField from "./InputField";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
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
            }, 5000); // Delay showing by 5 seconds
        }
    }, []);

    if (!showPopup) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="fixed inset-0 bg-gray-900/50 bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
        >
            <div className="bg-white  rounded-md  w-full  max-w-4xl  h-[85%] grid grid-cols-2">
                <div className="h-full w-full overflow-hidden rounded-l-md">
                    <img
                        src="https://uomo-html.flexkitux.com/images/newsletter-popup.jpg"
                        alt="shreejan fabrics JoinNewsLetter image"
                        className="w-full  h-full object-cover"
                    />
                </div>
                <div className="flex flex-col p-8 w-full relative justify-center">
                    <span
                        className="absolute top-4 right-4 cursor-pointer text-2xl"
                        onClick={() => setShowPopup(false)}
                    >
                        <RxCross2 />
                    </span>

                    <div className="space-y-4  flex flex-col">
                        <h1 className="text-2xl font-medium capitalize">
                            Sign Up to Our Newsletter
                        </h1>
                        <h2 className="leading-relaxed text-gray-600 text-sm max-w-md">
                            Be the first to get the latest news about trends,
                            promotions, and much more!
                        </h2>

                        <form
                            onSubmit={handleSubmit((data) => alert(data))}
                            className="w-full max-w-sm"
                        >
                            <InputField
                                value={emailValue}
                                register={register}
                                name={"email"}
                                type="email"
                                label={"Your Email*"}
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
                            <div className="w-fit mx-auto mt-4">
                                <Button text="Join" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
