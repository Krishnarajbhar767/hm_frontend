import React from "react";
import AdminLayout from "../layout/adminLayout";
import { Route } from "react-router-dom";

const AdminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<h1>Admin Dashboard</h1>} />
        <Route path="products" element={<h1>Admin Products </h1>} />
    </Route>
);

export default AdminRoutes;
