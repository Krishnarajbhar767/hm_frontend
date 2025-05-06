import React from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import Heading from "../home/components/Heading";
import { Link } from "react-router-dom";
function SignUp() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();
    const firstNameValue = watch("firstName");
    const lastNameValue = watch("lastName");
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const confirmPasswordValue = watch("confirmPassword");
    return (
        <div>
            <div className="boxedContainer px-8 md:w-[40%] py-8 h-auto">
                <Heading text={"Register"} />
                <form
                    className="flex flex-col gap-3 mt-6"
                    onSubmit={handleSubmit(
                        (data) => alert(data),
                        (err) => console.log(err)
                    )}
                >
                    <InputField
                        value={firstNameValue}
                        register={register}
                        name={"firstName"}
                        type="text"
                        label={"Enter your name*"}
                        errors={errors}
                        rules={{
                            required: "First name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "First name must be at least 6 characters",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "First Name must not exceed 20 characters",
                            },
                        }}
                    />
                    <InputField
                        value={lastNameValue}
                        register={register}
                        name={"lastName"}
                        type="text"
                        label={"Enter your name*"}
                        errors={errors}
                        rules={{
                            required: "Last name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Last name must be at least 6 characters",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Last Name must not exceed 20 characters",
                            },
                        }}
                    />
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
                    <InputField
                        value={passwordValue}
                        register={register}
                        name={"password"}
                        type="password"
                        label={"Password*"}
                        errors={errors}
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
                    <InputField
                        value={confirmPasswordValue}
                        register={register}
                        name={"confirmPassword"}
                        type="text"
                        label={"Confirm Password*"}
                        errors={errors}
                        rules={{
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === password.value ||
                                "Passwords must match",
                        }}
                    />
                    <Link
                        to={"/login"}
                        className="text-right underline text-sm cursor-pointer"
                    >
                        Already have an account?{" "}
                    </Link>

                    <span className="text-xs text-gray-600 ">
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        privacy policy.
                    </span>
                    <Button text="Register" type={"submit"} />
                </form>
            </div>
        </div>
    );
}

export default SignUp;
