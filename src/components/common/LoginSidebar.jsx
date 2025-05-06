import { useEffect } from "react";
import Heading from "../../pages/public/home/components/Heading";
import { motion } from "motion/react";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { Link } from "react-router-dom";

const LoginSidebar = ({ closeHandler }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    useEffect(() => {
        // Calculate scrollbar width
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        // Lock scroll + hide scrollbar
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Prevent layout shift (compensate scrollbar width)
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            // Restore everything
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);
    const emailValue = watch("email");
    const passwordValue = watch("password");
    return (
        <div className="fixed z-[100] inset-0 w-screen h-screen flex overflow-hidden bg-gray-900/25 ">
            <motion.div
                className="absolute flex flex-col gap-7  py-4   bg-white w-1/3 h-full right-0 z-[101] "
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
            >
                <div className="flex justify-between w-full px-8">
                    <Heading text={"Login"} />
                    <svg
                        onClick={closeHandler}
                        className="w-6 h-6 text-gray-800 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                </div>
                <hr className="text-gray-300" />
                {/* Login Credentials Input Fields */}
                <div className=" px-8">
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit(
                            (data) => alert(data),
                            (err) => console.log(err)
                        )}
                    >
                        <InputField
                            register={register}
                            name={"email"}
                            type="email"
                            label={"Email Or Username*"}
                            errors={errors}
                            value={emailValue}
                            rules={{
                                required: "Email is required.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            }}
                        />
                        <InputField
                            register={register}
                            name={"password"}
                            type="password"
                            label={"Password*"}
                            errors={errors}
                            value={passwordValue}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        "Password must not exceed 20 characters",
                                },
                            }}
                        />
                        <div className=" items-center flex justify-between text-gray-800">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember_me"
                                    className="h-4 w-4"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="text-sm "
                                >
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <Link
                                    to={"/reset-password"}
                                    onClick={closeHandler}
                                    className="text-xs  underline cursor-pointer"
                                >
                                    Lost Password ?
                                </Link>
                            </div>
                        </div>
                        <Button text="Login" type={"submit"} />
                        <div>
                            <h1 className="mx-auto text-center text-gray-600 text-[16px]">
                                No account yet?{" "}
                                <Link
                                    onClick={closeHandler}
                                    to={"/sign-up"}
                                    className="text-sm capitalize underline cursor-pointer"
                                >
                                    Create Account
                                </Link>
                            </h1>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginSidebar;
