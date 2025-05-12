import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import UserLayout from "../layout/UserLayout";
import Dashboard from "../pages/user/dashboard/Dashboard";
import Profile from "../pages/user/profile/Profile";
import Orders from "../pages/user/orders/Orders";
import Addresses from "../pages/user/addresses/Addresses";
import Settings from "../pages/user/setting/Setting";
import PaymentMethods from "../pages/user/payment/PaymentMethodes";
import OrderDetails from "../pages/user/orders/components/OrderDetails";

const UserRoutes = (
    <Route path="/account" element={<UserLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="payment-methods" element={<PaymentMethods />} />
        <Route path="settings" element={<Settings />} />
    </Route>
);

export default UserRoutes;
