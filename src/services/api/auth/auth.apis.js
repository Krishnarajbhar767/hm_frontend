import axiosInstance from "../../../utils/apiConnector";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import authEndpoints from "../../endpoints/auth/auth.endpoints";

const authApis = {
    register: async (data) => {
        const res = await axiosInstance.post(authEndpoints.register, data);
        console.log("Register Api Call Res ->", res.data);
        return res.data.data;
    },
    sendOtp: async (data) => {
        const res = await axiosInstance.post(authEndpoints.sendOtp, data);
        return res?.data?.data;
    },
    login: async (data) => {
        const res = await axiosInstance.post(authEndpoints.login, data);
        return res.data.data;
    },
    changePassword: async () => {},
    forgotPasswordToken: async () => {},
};
export default authApis;
