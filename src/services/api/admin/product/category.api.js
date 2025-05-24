import axiosInstance from "../../../../utils/apiConnector";
import categoryEndpoints from "../../../endpoints/admin/product/category.endpoints";

const categoryApis = {
    createCategory: async (categoryData) => {
        const res = await axiosInstance.post(
            categoryEndpoints.createCategory,
            categoryData
        );
        return res?.data?.data;
    },
    updateCategory: async (categoryData, categoryId) => {
        const res = await axiosInstance.put(
            categoryEndpoints.updateCategory(categoryId),
            categoryData
        );
        return res?.data?.data;
    },
};

export default categoryApis;
