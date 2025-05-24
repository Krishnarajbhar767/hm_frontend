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
import EditCategory from "../pages/admin/category/EditCategory";
import AddCategory from "../pages/admin/category/AddCategory";
import AdminOrderDetails from "../pages/admin/order/AdminOrderDetails";

const AdminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route path="overview" element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/add/" element={<AddProduct />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/order/:id" element={<AdminOrderDetails />} />
        <Route path="" element={<AdminOverview />} />
    </Route>
);

export default AdminRoutes;
