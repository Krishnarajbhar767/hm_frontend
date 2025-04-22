import React from "react";
import { Outlet } from "react-router-dom";
function AdminLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <main className="flex-grow p-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AdminLayout;
