import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Home from "../pages/public/home/Home";

const PublicRoutes = (
    <Route element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/Sign-up" element={<h1>Sign Up</h1>} />
        <Route path="/About" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
    </Route>
);

export default PublicRoutes;
