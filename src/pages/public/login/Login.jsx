import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
import Heading from "../home/components/Heading";
import authApis from "../../../services/api/auth/auth.apis";
import { useDispatch } from "react-redux";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { setUser } from "../../../redux/slices/userSlice";
import toast from "react-hot-toast";

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const [isLoading, setIsLoading] = useState(false);
    // Animation variants for staggered input fields
    const inputVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: i * 0.1 },
        }),
    };
    async function loginHandler(loginCredentials) {
        setIsLoading(true);
        try {
            const userData = await authApis.login(loginCredentials);
            dispatch(setUser(userData?.user));
            console.log(userData);
            toast.success(`Welcome ${userData?.user?.firstName}`);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="boxedContainer md:w-[40%] py-8 h-auto px-8"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Heading text={"Login"} />
            </motion.div>
            <form
                className="flex flex-col gap-3 mt-6"
                onSubmit={handleSubmit(loginHandler)}
            >
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={inputVariants}
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
                                message: "Please enter a valid email address",
                            },
                        }}
                    />
                </motion.div>
                <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={inputVariants}
                >
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
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="items-center flex justify-between text-gray-800"
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember_me"
                            className="h-4 w-4"
                            {...register("remember")}
                        />
                        <label htmlFor="remember_me" className="text-sm">
                            Remember me
                        </label>
                    </div>
                    <div>
                        <Link
                            to={"/reset-password"}
                            className="text-xs underline cursor-pointer"
                        >
                            Lost Password ?
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Button
                        text="Login"
                        type={"submit"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h1 className="mx-auto text-center text-gray-600 text-[16px]">
                        No account yet?{" "}
                        <Link
                            to={"/sign-up"}
                            className="text-sm capitalize underline cursor-pointer"
                        >
                            Create Account
                        </Link>
                    </h1>
                </motion.div>
            </form>
        </motion.div>
    );
}

export default Login;
