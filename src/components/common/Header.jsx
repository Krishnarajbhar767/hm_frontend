import { useMemo } from "react";
import { NavLink } from "react-router";
function Header() {
    const Links = useMemo(
        () => [
            {
                title: "Home",
                path: "/",
            },
            {
                title: "Product",
                subLinks: [
                    {
                        title: "Banarasi Sarees",
                        path: "#",
                    },
                    {
                        title: "Wedding Sarees",
                        path: "#",
                    },
                ],
            },
            {
                title: "About Us",
                path: "/about-us",
            },
        ],
        []
    );

    return (
        <header className="bg-[#FFFFFF] text-gray-800 px-4 py-6 shadow ">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <img
                        src="https://themesflat.co/html/ecomus/images/logo/logo.svg"
                        alt=""
                    />
                </div>
                <nav className="flex gap-6 text-gray-950 font-medium text-[16px] tracking-wider capitalize">
                    {Links.map((link) => {
                        return (
                            <div className="">
                                <a href="">Home</a>
                            </div>
                        );
                    })}
                </nav>
                <div className="flex gap-6">
                    {/* Search */}
                    <div>
                        <svg
                            class="w-6 h-6 text-gray-800 hover:text-red-500 transition-all duration-300 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <div>
                        <svg
                            class="w-6 h-6 text-gray-800 hover:text-red-500 transition-all duration-300 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </div>
                    <div>
                        <svg
                            class="w-6 h-6 text-gray-800 hover:text-red-500 transition-all duration-300 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
