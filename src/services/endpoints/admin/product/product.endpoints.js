const productEndpoints = {
    createProduct: `/admin/product/create`,
    updateProduct: (productId) => `admin/product/update/${productId}`,
};

export default productEndpoints;
