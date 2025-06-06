import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

function AppRoutes() {
    return (
        <Routes>
            {PublicRoutes}
            {/* User Routes */}
            {UserRoutes}
            {/* Admin Routes */}
            {AdminRoutes}
            {/* Fallbacks */}
            <Route path="/unauthorized" element={<h1>🚫 Unauthorized</h1>} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
    );
}

export default AppRoutes;
