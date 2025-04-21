const authEndpoints = {
    register: "/auth/register",
    sendOtp: "/auth/send-otp",
    login: "/auth/login",
    changePassword: "/auth/change-password",
    forgotPasswordToken: (token) => `/auth/forgot-password/${token}`,
};

export default authEndpoints;
