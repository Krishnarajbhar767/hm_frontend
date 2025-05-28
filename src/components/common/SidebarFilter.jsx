import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// SidebarFilter Component for filtering products
function SidebarFilter({ onFilterChange, isOpen, toggleSidebar }) {
    // State for filter values
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [fabric, setFabric] = useState("");
    const [color, setColor] = useState("");
    const [technique, setTechnique] = useState("");

    // State for accordion sections (open/close)
    const [openSections, setOpenSections] = useState({
        price: true,
        fabric: true,
        color: true,
        technique: true,
    });

    // Calculate active filter count for indicator
    const activeFilters = [
        priceRange[0] !== 0 || priceRange[1] !== 10000,
        fabric !== "",
        color !== "",
        technique !== "",
    ].filter(Boolean).length;

    // Toggle accordion section
    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Handle applying filters
    const handleApplyFilters = () => {
        onFilterChange({ priceRange, fabric, color, technique });
        if (isOpen && toggleSidebar) toggleSidebar(); // Close sidebar on mobile
    };

    // Handle clearing filters
    const handleClearFilters = () => {
        setPriceRange([0, 10000]);
        setFabric("");
        setColor("");
        setTechnique("");
        onFilterChange({
            priceRange: [0, 10000],
            fabric: "",
            color: "",
            technique: "",
        });
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-300 z-50 transform transition-transform duration-300 h-full flex flex-col ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:w-1/4 md:min-h-[calc(100vh-4rem)]`}
        >
            {/* Sidebar Header (Mobile Only) */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 md:hidden">
                <h3 className="text-lg font-semibold text-black">
                    Filters {activeFilters > 0 && `(${activeFilters})`}
                </h3>
                <button
                    onClick={toggleSidebar}
                    className="text-black hover:text-gray-600"
                    aria-label="Close filters"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Filter Sections (Scrollable Content) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Price Range Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("price")}
                        className="flex justify-between items-center w-full text-left text-sm font-semibold text-black py-2 px-3 hover:bg-gray-100"
                    >
                        Price Range
                        {openSections.price ? (
                            <FiChevronUp className="w-5 h-5" />
                        ) : (
                            <FiChevronDown className="w-5 h-5" />
                        )}
                    </button>
                    {openSections.price && (
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            Number(e.target.value),
                                            priceRange[1],
                                        ])
                                    }
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:border-black text-black"
                                    placeholder="Min ₹0"
                                />
                                <span className="text-gray-600">-</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            priceRange[0],
                                            Number(e.target.value),
                                        ])
                                    }
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:border-black text-black"
                                    placeholder="Max ₹10,000"
                                />
                            </div>
                            <div>
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            Number(e.target.value),
                                            priceRange[1],
                                        ])
                                    }
                                    className="w-full h-1 bg-gray-300 rounded"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            priceRange[0],
                                            Number(e.target.value),
                                        ])
                                    }
                                    className="w-full h-1 bg-gray-300 rounded"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Fabric Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("fabric")}
                        className="flex justify-between items-center w-full text-left text-sm font-semibold text-black py-2 px-3 hover:bg-gray-100"
                    >
                        Fabric
                        {openSections.fabric ? (
                            <FiChevronUp className="w-5 h-5" />
                        ) : (
                            <FiChevronDown className="w-5 h-5" />
                        )}
                    </button>
                    {openSections.fabric && (
                        <select
                            value={fabric}
                            onChange={(e) => setFabric(e.target.value)}
                            className="mt-2 w-full p-2 border border-gray-300 focus:outline-none focus:border-black text-black"
                        >
                            <option value="">All Fabrics</option>
                            <option value="Silk">Silk</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Georgette">Georgette</option>
                        </select>
                    )}
                </div>

                {/* Color Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("color")}
                        className="flex justify-between items-center w-full text-left text-sm font-semibold text-black py-2 px-3 hover:bg-gray-100"
                    >
                        Color
                        {openSections.color ? (
                            <FiChevronUp className="w-5 h-5" />
                        ) : (
                            <FiChevronDown className="w-5 h-5" />
                        )}
                    </button>
                    {openSections.color && (
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="mt-2 w-full p-2 border border-gray-300 focus:outline-none focus:border-black text-black"
                        >
                            <option value="">All Colors</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Gray">Gray</option>
                        </select>
                    )}
                </div>

                {/* Technique Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("technique")}
                        className="flex justify-between items-center w-full text-left text-sm font-semibold text-black py-2 px-3 hover:bg-gray-100"
                    >
                        Technique
                        {openSections.technique ? (
                            <FiChevronUp className="w-5 h-5" />
                        ) : (
                            <FiChevronDown className="w-5 h-5" />
                        )}
                    </button>
                    {openSections.technique && (
                        <select
                            value={technique}
                            onChange={(e) => setTechnique(e.target.value)}
                            className="mt-2 w-full p-2 border border-gray-300 focus:outline-none focus:border-black text-black"
                        >
                            <option value="">All Techniques</option>
                            <option value="Handwoven">Handwoven</option>
                            <option value="Embroidered">Embroidered</option>
                            <option value="Printed">Printed</option>
                        </select>
                    )}
                </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 p-4 bg-white border-t border-gray-300">
                <div className="flex gap-3">
                    <button
                        onClick={handleApplyFilters}
                        className="flex-1 text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-200"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={handleClearFilters}
                        className="flex-1 text-sm bg-white text-black border border-gray-300 px-4 py-2 hover:bg-gray-100 transition-all duration-200"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarFilter;
