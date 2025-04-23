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
                path: "/about",
            },
        ],
        []
    );

    return (
        // Due To Overflow Of Website getting bad
        <header className="bg-[#FFFFFF] text-gray-800 px-4 py-6 shadow ">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <img
                        src="https://themesflat.co/html/ecomus/images/logo/logo.svg"
                        alt=""
                    />
                </div>
                <nav className="flex gap-6 text-gray-950 font-normal text-[16px] tracking-wider capitalize">
                    {Links.map((link) => {
                        return (
                            <div className=" flex items-center justify-center gap-1 group">
                                <NavLink
                                    to={link.path}
                                    className={
                                        "headerLinks group-hover:text-primary"
                                    }
                                >
                                    {link.title}
                                </NavLink>
                                {link.subLinks && (
                                    <div className="relative">
                                        <div>
                                            <svg
                                                class="w-4 h-4 text-gray-800 group-hover:rotate-180 transition-all duration-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m19 9-7 7-7-7"
                                                />
                                            </svg>
                                        </div>

                                        <div className="px-4 py-5 absolute -left-38 top-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            <div className="bg-white shadow-sm border border-gray-200 rounded-sm flex flex-col gap-2 p-4  w-fit text-nowrap min-w-[200px] text-sm">
                                                {link.subLinks.map(
                                                    (sublink) => (
                                                        <NavLink
                                                            to={link.path}
                                                            className={
                                                                " hover:text-primary"
                                                            }
                                                        >
                                                            {link.title}
                                                        </NavLink>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
                <div className="flex gap-6">
                    {/* Search */}
                    <div>
                        <svg
                            class="w-6 h-6 text-gray-800 hover:text-primary transition-all duration-300 cursor-pointer"
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
