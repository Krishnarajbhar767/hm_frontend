import axios from "axios";
import axiosInstance from "./apiConnector";
import { handleAxiosError } from "./handleAxiosError";

const uploadMedia = async (files) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    try {
        const res = await axiosInstance.post("/upload", formData);
        return res.data?.data;
    } catch (err) {
        console.error("Upload failed:", err);
        handleAxiosError(err);
        return null;
    }
};

export default uploadMedia;
