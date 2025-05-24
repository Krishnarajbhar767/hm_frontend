const categoryEndpoints = {
    createCategory: `/admin/category/create`,
    updateCategory: (categoryId) => `admin/category/update/${categoryId}`,
};

export default categoryEndpoints;
