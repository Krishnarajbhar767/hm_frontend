import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPinterest,
    FaChevronUp,
    FaChevronDown,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#E4E4E4] pt-12 pb-4 text-gray-800">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-3 content-center md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Logo and Contact Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <div className="text-2xl font-bold">
                                Sr
                                <span className="relative">
                                    Ij
                                    <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </span>
                                A<span className="relative">N</span>
                            </div>
                        </div>

                        <p className="text-sm mb-2">
                            1418 River Drive, Suite 35 Cottonhall,
                            <br />
                            CA 9622 United States
                        </p>

                        <p className="text-sm mb-2">sale@uomo.com</p>
                        <p className="text-sm mb-6">+1 246-345-0695</p>

                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <FaYoutube />
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <FaPinterest />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-lg mb-4">COMPANY</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm  headerLinks">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Affiliates
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Shop Links */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-lg mb-4">SHOP</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Accessories
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Men
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Women
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Shop All
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-lg mb-4">HELP</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Customer Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    My Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Find a Store
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Legal & Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm headerLinks">
                                    Gift Card
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-lg mb-4">SUBSCRIBE</h3>
                        <p className="text-sm mb-4">
                            Be the first to get the latest news about trends,
                            promotions, and much more!
                        </p>

                        <div className="flex mb-6">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow p-2 border border-gray-300 focus:outline-none"
                            />
                            <button className="bg-gray-800 text-white px-4 py-2 font-medium">
                                JOIN
                            </button>
                        </div>

                        <p className="text-sm font-medium mb-3">
                            Secure payments
                        </p>
                        <div className="flex space-x-2">
                            <img
                                src="https://uomo-html.flexkitux.com/images/payment-options.png"
                                alt="Discover"
                                className="h-6"
                            />
                            {/* <img
                                src="https://uomo-html.flexkitux.com/images/payment-options.png"
                                alt="Mastercard"
                                className="h-6"
                            />
                            <img
                                src="https://uomo-html.flexkitux.com/images/payment-options.png"
                                alt="PayPal"
                                className="h-6"
                            />
                            <img
                                src="https://uomo-html.flexkitux.com/images/payment-options.png"
                                alt="Skrill"
                                className="h-6"
                            />
                            <img
                                src="https://uomo-html.flexkitux.com/images/payment-options.png"
                                alt="Visa"
                                className="h-6"
                            /> */}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-300 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm">©2025 Srijan Fabrics</p>
                        </div>

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                            <div className="flex items-center">
                                <span className="text-sm mr-2">Language</span>
                                <button className="flex items-center text-sm">
                                    United Kingdom | English
                                    {/* <FaChevronDown className="ml-1" /> */}
                                </button>
                            </div>

                            <div className="flex items-center">
                                <span className="text-sm mr-2">Currency</span>
                                <button className="flex items-center text-sm">
                                    ₹ INR
                                    {/* <FaChevronDown className="ml-1" /> */}
                                </button>
                            </div>
                        </div>

                        <a
                            href="#top"
                            className="hidden md:flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full mt-4 md:mt-0"
                        >
                            <FaChevronUp />
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Back to Top */}
            <div className="flex justify-center md:hidden mt-6">
                <a
                    href="#top"
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full"
                >
                    <FaChevronUp />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
