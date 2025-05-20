import React from "react";

import { Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminOverview from "../pages/admin/overview/AdminOverview";
import AdminProducts from "../pages/admin/product/AdminProduct";
import AdminCategories from "../pages/admin/category/AdminCategories";
import AdminUsers from "../pages/admin/user/AdminUser";
import AdminOrders from "../pages/admin/order/AdminOrders";

const AdminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route path="overview" element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="" element={<AdminOverview />} />
    </Route>
);

export default AdminRoutes;
