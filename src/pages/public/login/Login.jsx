import React from "react";
import InputField from "../../../components/common/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
import Heading from "../home/components/Heading";

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const emailValue = watch("email");
    const passwordValue = watch("password");
    return (
        <div className="boxedContainer  md:w-[40%] py-8 h-auto px-8 ">
            <Heading text={"Login"} />
            <form
                className="flex flex-col gap-3 mt-6"
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
                            message: "Please enter a valid email address",
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
                            message: "Password must be at least 6 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must not exceed 20 characters",
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
                        <label htmlFor="remember_me" className="text-sm ">
                            Remember me
                        </label>
                    </div>
                    <div>
                        <Link
                            to={"/reset-password"}
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
                            to={"/sign-up"}
                            className="text-sm capitalize underline cursor-pointer"
                        >
                            Create Account
                        </Link>
                    </h1>
                </div>
            </form>
        </div>
    );
}

export default Login;
