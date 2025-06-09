import React from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import Heading from "../home/components/Heading";
import { Link } from "react-router-dom";

function ResetPassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();
    const emailValue = watch("email");
    return (
        <div>
            <div className="boxedContainer px-8 md:w-[40%]  h-auto py-6">
                <Heading text={"Reset Password"} />
                <form
                    className="flex flex-col gap-2 mt-6"
                    onSubmit={handleSubmit(
                        (data) => alert(data),
                        (err) => console.log(err)
                    )}
                >
                    <h1 className="text-sm text-gray-400 mb-3 text-center">
                        We will send you an email to reset your password
                    </h1>
                    <InputField
                        value={emailValue}
                        register={register}
                        name={"email"}
                        type="email"
                        label={"Email Or Username*"}
                        errors={errors}
                        rules={{
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Please enter a valid email address",
                            },
                        }}
                    />
                    <Button text="Send Link" type={"submit"} />
                </form>
                <h1 className="text-sm text-center mt-3">
                    Back to{" "}
                    <Link
                        to={"/login"}
                        className="underline text-xs text-gray-600 cursor-pointer"
                    >
                        Login
                    </Link>
                </h1>
            </div>
        </div>
    );
}

export default ResetPassword;
