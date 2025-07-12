import axios from "axios";
import axiosInstance from "./apiConnector";
import { handleAxiosError } from "./handleAxiosError";




const uploadMedia = async (files , information) => {
    console.log("information-----------",  information); // undefined 
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    formData.append("type", "products");
    formData.append("identifier", "12345");

    try {
        console.log("formData ------------- ", formData)
        const res = await axiosInstance.post("/upload", formData);
        return res.data?.data;

    } catch (err) {
        console.error("Upload failed:", err);
        handleAxiosError(err);
        return null;
    }
};

export default uploadMedia;
