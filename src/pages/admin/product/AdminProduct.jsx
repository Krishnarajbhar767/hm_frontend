import { useState } from "react";
import ProductList from "./ProductList";

// Mock data for products

function AdminProducts() {
    return (
        <div>
            {/* Render the ProductList component and pass products state */}
            <ProductList />
            {/* You will handle routing to AddProduct and EditProduct components */}
            {/* Example: Use React Router to render <AddProduct /> and <EditProduct products={products} /> */}
        </div>
    );
}

export default AdminProducts;
