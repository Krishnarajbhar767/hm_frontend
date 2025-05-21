import axiosInstance from "../../../utils/apiConnector";
import productEndpoints from "../../endpoints/public/product.endpoints";

const productApis = {
    getAllProduct: async () => {
        const res = await axiosInstance.get(productEndpoints.getAllProducts);
        return res?.data?.data;
    },
    getProductById: async (productId) => {
        const res = await axiosInstance.get(
            productEndpoints.getProductById(productId)
        );
        return res.data?.data;
    },
};

export default productApis;
