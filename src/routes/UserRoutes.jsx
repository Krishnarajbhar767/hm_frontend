import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/mainLayout";

const UserRoutes = (
    <Route path="/account" element={<MainLayout />}>
        <Route index element={<h1>Protected Account Profile</h1>} />
        <Route path="dashboard" element={<h1>Admin dashboard</h1>} />
    </Route>
);

export default UserRoutes;
