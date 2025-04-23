import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 ">
            <Header />
            <main className="flex-grow bg-orange-300 ">
                <div className=" ">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
