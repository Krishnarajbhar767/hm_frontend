import React from "react";

import { Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminOverview from "../pages/admin/overview/AdminOverview";
import AdminProducts from "../pages/admin/product/AdminProduct";
import AdminCategories from "../pages/admin/category/AdminCategories";
import AdminUsers from "../pages/admin/user/AdminUser";
import AdminOrders from "../pages/admin/order/AdminOrders";
import EditProduct from "../pages/admin/product/EditProduct";
import AddProduct from "../pages/admin/product/AddProduct";

const AdminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route path="overview" element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/add/" element={<AddProduct />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="" element={<AdminOverview />} />
    </Route>
);

export default AdminRoutes;
