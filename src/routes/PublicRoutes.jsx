import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Home from "../pages/public/home/Home";
import SignUp from "../pages/public/signup/SignUp";
import Login from "../pages/public/login/Login";
import ResetPassword from "../pages/public/reset password/ResetPassword";
import Cart from "../pages/public/cart/Cart";
import VerifyOtp from "../pages/public/verify otp/VerifyOtp";
import NotFound from "../components/common/NotFound";

const PublicRoutes = (
    <Route element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/About" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
    </Route>
);

export default PublicRoutes;
