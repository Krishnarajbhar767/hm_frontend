import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom"; // Import for routing
import Search from "./Search";
import { AnimatePresence } from "framer-motion"; // Import for sidebar animations
import LoginSidebar from "./LoginSidebar";
import CartSidebar from "./CartSidebar";

function Header() {
    // Memoize navigation links to prevent re-renders
    const Links = useMemo(
        () => [
            { title: "Home", path: "/" },
            {
                title: "Product",
                path: "#", // Not a real route, used for dropdown
                subLinks: [
                    {
                        title: "Banarasi Sarees",
                        path: "/products/banarasi-sarees",
                    }, // Valid paths for active state
                    {
                        title: "Wedding Sarees",
                        path: "/products/wedding-sarees",
                    },
                ],
            },
            { title: "About Us", path: "/about" },
        ],
        []
    );

    // State for sidebar and mobile menu visibility
    const [isSearching, setIsSearching] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
    const [openSubmenu, setOpenSubmenu] = useState(null); // Track open submenu in mobile

    // Toggle submenu in mobile menu
    const toggleSubmenu = (title) => {
        setOpenSubmenu(openSubmenu === title ? null : title);
    };

    return (
        // Relative wrapper for header and sidebars
        <div className="relative">
            {/* Header with white background, shadow, and responsive padding */}
            <header className="bg-white text-gray-800 px-4 sm:px-6 py-4 shadow">
                {/* Constrained container for centered content */}
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo with responsive width and height */}
                    <div className="flex-shrink-0">
                        <img
                            src="https://themesflat.co/html/ecomus/images/logo/logo.svg"
                            alt="Logo"
                            className="h-8 sm:h-10 w-20 md:w-auto"
                        />
                    </div>

                    {/* Desktop navigation (hidden on mobile) */}
                    <nav className="hidden md:flex gap-4 lg:gap-6 text-gray-800 font-medium text-sm lg:text-[14px] tracking-wide uppercase">
                        {Links.map((link) => (
                            // Navigation link or dropdown container
                            <div key={link.title} className="relative group">
                                {link.subLinks ? (
                                    // Dropdown for "Product" (not a NavLink to avoid active styling)
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        <span className="hover:text-primary transition-colors headerLinks">
                                            {link.title}
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-800 group-hover:rotate-180 transition-all duration-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 9-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    // Regular NavLink for "Home" and "About Us"
                                    <NavLink
                                        to={link.path}
                                        end // Ensures exact match for root path "/"
                                        className={({ isActive }) =>
                                            `hover:text-primary transition-colors headerLinks ${
                                                isActive ? "text-primary" : ""
                                            }`
                                        }
                                    >
                                        {link.title}
                                    </NavLink>
                                )}
                                {link.subLinks && (
                                    // Submenu dropdown, positioned below link
                                    <div className="absolute left-0 top-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="bg-white shadow-sm border border-gray-200 rounded-md flex flex-col gap-2 p-4 w-48 text-sm ">
                                            {link.subLinks.map((sublink) => (
                                                // Submenu link with active styling
                                                <NavLink
                                                    key={sublink.title}
                                                    to={sublink.path}
                                                    className={({ isActive }) =>
                                                        `hover:text-primary headerLinks ${
                                                            isActive
                                                                ? "text-primary font-semibold"
                                                                : ""
                                                        }`
                                                    }
                                                >
                                                    {sublink.title}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Action icons and hamburger menu */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Search icon with touch-friendly padding */}
                        <button
                            onClick={() => setIsSearching(true)}
                            className="p-1.5"
                            aria-label="Open search"
                        >
                            <svg
                                className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 hover:text-primary transition-all duration-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>

                        {/* User account icon */}
                        <button
                            onClick={() => setIsLogin(true)}
                            className="p-1.5"
                            aria-label="Open login"
                        >
                            <svg
                                className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 hover:text-primary transition-all duration-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </button>

                        {/* Cart icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-1.5"
                            aria-label="Open cart"
                        >
                            <svg
                                className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 hover:text-primary transition-all duration-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                                />
                            </svg>
                        </button>

                        {/* Hamburger menu button (visible on mobile) */}
                        <button
                            className="md:hidden p-1.5 focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 hover:text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16m-7 6h7"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile navigation (visible when hamburger menu is open) */}
                {isMenuOpen && (
                    <nav className="md:hidden bg-white  mt-2  ">
                        <div className="flex flex-col ">
                            {Links.map((link) => (
                                // Mobile navigation link with collapsible submenu
                                <div key={link.title} className="py-2">
                                    <div className="flex justify-between items-center">
                                        {link.subLinks ? (
                                            // Dropdown toggle for "Product" in mobile menu
                                            <span className="text-gray-950 text-sm tracking-wider capitalize">
                                                {link.title}
                                            </span>
                                        ) : (
                                            // Regular NavLink for "Home" and "About Us"
                                            <NavLink
                                                to={link.path}
                                                end // Ensures exact match for root path "/"
                                                className={({ isActive }) =>
                                                    `text-gray-950 text-sm tracking-wider capitalize ${
                                                        isActive
                                                            ? "text-primary font-semibold"
                                                            : ""
                                                    }`
                                                }
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                } // Close menu on link click
                                            >
                                                {link.title}
                                            </NavLink>
                                        )}
                                        {link.subLinks && (
                                            // Toggle submenu button
                                            <button
                                                onClick={() =>
                                                    toggleSubmenu(link.title)
                                                }
                                                className="p-1"
                                                aria-label={`Toggle ${link.title} submenu`}
                                            >
                                                <svg
                                                    className={`w-4 h-4 transition-transform duration-300 ${
                                                        openSubmenu ===
                                                        link.title
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    {link.subLinks &&
                                        openSubmenu === link.title && (
                                            // Mobile submenu with full-width layout
                                            <div className="mt-2 flex flex-col gap-2">
                                                {link.subLinks.map(
                                                    (sublink) => (
                                                        <NavLink
                                                            key={sublink.title}
                                                            to={sublink.path}
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                `text-xs text-gray-700 hover:text-primary bg-gray-100 px-4 py-2 rounded-md ${
                                                                    isActive
                                                                        ? "text-primary font-semibold"
                                                                        : ""
                                                                }`
                                                            }
                                                            onClick={() =>
                                                                setIsMenuOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            {sublink.title}
                                                        </NavLink>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </nav>
                )}
            </header>

            {/* Sidebars with animation for Search, Login, and Cart */}
            <AnimatePresence>
                {isSearching && (
                    <Search
                        closeHandler={() => setIsSearching(false)}
                        isOpen={isSearching}
                    />
                )}
                {isLogin && (
                    <LoginSidebar
                        closeHandler={() => setIsLogin(false)}
                        isOpen={isLogin}
                    />
                )}
                {isCartOpen && (
                    <CartSidebar
                        closeHandler={() => setIsCartOpen(false)}
                        isOpen={isCartOpen}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Header;
