import { NavLink } from "react-router-dom"; // Import for routing

function Footer() {
    // Navigation links for footer, consistent with Header
    const footerLinks = [
        { title: "Home", path: "/" },
        { title: "Product", path: "/products" },
        { title: "About Us", path: "/about" },
    ];

    // Social media links with SVG paths for icons
    const socialLinks = [
        {
            name: "Facebook",
            path: "https://facebook.com",
            icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        },
        {
            name: "Twitter",
            path: "https://twitter.com",
            icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
        },
        {
            name: "Instagram",
            path: "https://instagram.com",
            icon: "M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm-4 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4-10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
        },
    ];

    return (
        // Footer wrapper with dark background, pinned to bottom
        <footer className="bg-gray-900 text-gray-300 py-8 relative">
            {/* Constrained container for centered content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Main footer content with responsive grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Logo and description section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <img
                            src="https://themesflat.co/html/ecomus/images/logo/logo.svg"
                            alt="Footer Logo"
                            className="h-8 sm:h-10 w-20 md:w-auto mb-4"
                        />
                        <p className="text-sm text-center sm:text-left">
                            Discover elegance with our curated collection of
                            sarees, blending tradition and modernity.
                        </p>
                    </div>

                    {/* Navigation links section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            {footerLinks.map((link) => (
                                <li key={link.title}>
                                    <NavLink
                                        to={link.path}
                                        end // Ensures exact match for root path "/"
                                        className={({ isActive }) =>
                                            `hover:text-primary transition-colors ${
                                                isActive
                                                    ? "text-primary font-semibold"
                                                    : ""
                                            }`
                                        }
                                    >
                                        {link.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact information section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Contact Us
                        </h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li>Email: support@example.com</li>
                            <li>Phone: +1 (123) 456-7890</li>
                            <li>Address: 123 Elegance St, City, Country</li>
                        </ul>
                    </div>

                    {/* Social media icons section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Follow Us
                        </h3>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5"
                                    aria-label={`Follow us on ${social.name}`}
                                >
                                    <svg
                                        className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 hover:text-primary transition-all duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-6" />

                {/* Copyright notice */}
                <div className="text-center text-sm">
                    <p>
                        © {new Date().getFullYear()} Ecomus. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
