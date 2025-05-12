import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserAccountDashboard from "../pages/user/UserAccountDashboard";

function UserLayout() {
    const isLoggedIn = useSelector((state) => state?.user?.user);
    console.log(isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            return navigate("/login");
        }
    });
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />

            <main className="flex-1 overflow-x-hidden  place-content-center  overflow-y-auto ">
                <UserAccountDashboard>
                    <Outlet />
                </UserAccountDashboard>
            </main>

            <Footer />
        </div>
    );
}

export default UserLayout;
