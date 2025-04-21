import { useEffect } from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import axios from "axios";
import dotenv from "dotenv";
import axiosInstance from "./utils/apiConnector";
function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <main className="flex-grow p-6"></main>
            <Footer />
        </div>
    );
}

export default App;
