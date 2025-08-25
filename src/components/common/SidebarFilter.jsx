"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, Filter, RotateCcw } from "lucide-react";
import { useSelector } from "react-redux";

// Reusable FilterSection component for accordion-style sections
const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            onClick={onToggle}
        >
            <span className="font-medium text-foreground">{title}</span>
            {isOpen ? (
                <ChevronUp className="w-4 h-4 text-foreground" />
            ) : (
                <ChevronDown className="w-4 h-4 text-foreground" />
            )}
        </button>
        {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
);

// Main SidebarFilter component
const SidebarFilter = ({ onFilterChange, isOpen, toggleSidebar }) => {
    const fabrics = useSelector((s) => s.fabrics);
    const fabricTitles = ["All Meterial", ...fabrics.map((f) => f.title)];
    const [minInput, setMinInput] = useState("0");
    const [maxInput, setMaxInput] = useState("200000");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [fabric, setFabric] = useState("");
    const [color, setColor] = useState("");
    const [technique, setTechnique] = useState("");
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [texture, setTexture] = useState('');
    const [openSections, setOpenSections] = useState({
        price: true,
        fabric: true,
        color: true,
        size: true,
        style: true,
        technique: false,
        texture: false
    });

    // Calculate active filter count
    const activeFilters = [
        priceRange[0] !== 0 || priceRange[1] !== 200000,
        fabric !== "",
        color !== "",
        technique !== "",
        size !== "",
        style !== '',
        texture !== ''
    ].filter(Boolean).length;

    // Toggle accordion section
    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Handle applying filters with validation
    const handleApplyFilters = () => {
        let min = Math.max(0, Number(minInput) || 0);
        let max = Math.min(200000, Number(maxInput) || 200000);
        if (min > max) [min, max] = [max, min]; // Swap if min > max
        setPriceRange([min, max]);
        setMinInput(min.toString());
        setMaxInput(max.toString());
        onFilterChange({ priceRange: [min, max], fabric, color, technique, size, style, texture });
        if (isOpen && toggleSidebar) toggleSidebar();
    };

    // Handle clearing filters
    const handleClearFilters = () => {
        setMinInput("0");
        setMaxInput("200000");
        setPriceRange([0, 200000]);
        setFabric("");
        setColor("");
        setTechnique("");
        setSize('')
        setStyle('')
        setTexture('')
        onFilterChange({
            priceRange: [0, 200000],
            fabric: "",
            color: "",
            technique: "",
            size: '',
            style: '',
            texture: ''
        });
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-foreground bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-80 bg-white z-40 transform transition-transform duration-300 shadow-xl lg:relative lg:translate-x-0 lg:w-72 lg:shadow-none lg:border-r lg:border-gray-200 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-foreground" />
                        <h3 className="text-lg font-semibold text-foreground">
                            Filters
                            {activeFilters > 0 && (
                                <span className="ml-2 bg-foreground text-white text-xs px-2 py-1 rounded-full">
                                    {activeFilters}
                                </span>
                            )}
                        </h3>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        <X className="w-5 h-5 text-foreground" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Price Range Filter */}
                    <FilterSection
                        title="Price Range"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection("price")}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-foreground mb-1">
                                        Min Price
                                    </label>
                                    <input
                                        type="text"
                                        value={minInput}
                                        onChange={(e) =>
                                            setMinInput(
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                )
                                            )
                                        }
                                        placeholder="₹0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm transition-all duration-200"
                                    />
                                </div>
                                <div className="text-foreground mt-6">-</div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-foreground mb-1">
                                        Max Price
                                    </label>
                                    <input
                                        type="text"
                                        value={maxInput}
                                        onChange={(e) =>
                                            setMaxInput(
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                )
                                            )
                                        }
                                        placeholder="₹200000"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm transition-all duration-200"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-sm text-foreground">
                                <span>
                                    ₹{Number(minInput || 0).toLocaleString()}
                                </span>
                                <span>
                                    ₹
                                    {Number(
                                        maxInput || 200000
                                    ).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </FilterSection>

                    {/* Fabric Filter */}
                    <FilterSection
                        title="Fabric"
                        isOpen={openSections.fabric}
                        onToggle={() => toggleSection("fabric")}
                    >
                        <div className="space-y-2">
                            {fabricTitles.map((fabricOption) => (
                                <label
                                    key={fabricOption}
                                    className="flex items-center space-x-3 cursor-pointer capitalize"
                                >
                                    <input
                                        type="radio"
                                        name="fabric"
                                        value={
                                            fabricOption === "All Meterial"
                                                ? ""
                                                : fabricOption
                                        }
                                        checked={
                                            fabric ===
                                            (fabricOption === "All Meterial"
                                                ? ""
                                                : fabricOption)
                                        }
                                        onChange={(e) =>
                                            setFabric(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {fabricOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Color Filter */}
                    <FilterSection
                        title="Color"
                        isOpen={openSections.color}
                        onToggle={() => toggleSection("color")}
                    >
                        <div className="space-y-2">
                            {[
                                "All Colors",
                                "Black",
                                "White",
                                "Red",
                                "Blue",
                                "Green",
                                "Yellow",
                                "Pink",
                            ].map((colorOption) => (
                                <label
                                    key={colorOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="color"
                                        value={
                                            colorOption === "All Colors"
                                                ? ""
                                                : colorOption
                                        }
                                        checked={
                                            color ===
                                            (colorOption === "All Colors"
                                                ? ""
                                                : colorOption)
                                        }
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <div className="flex items-center gap-2">
                                        {colorOption !== "All Colors" && (
                                            <div
                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                style={{
                                                    backgroundColor:
                                                        colorOption.toLowerCase(),
                                                }}
                                            />
                                        )}
                                        <span className="text-sm text-gray-700">
                                            {colorOption}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Size Filter Section */}
                    <FilterSection
                        title="Size"
                        isOpen={openSections.size}
                        onToggle={() => toggleSection("size")}
                    >

                        <div className="space-y-2">
                            {[
                                "All Size",
                                "3x5 ft",
                                "4x6 ft",
                                "5x8 ft",
                                "6x9 ft",
                                "8x10 ft",
                                "others"
                            ].map((sizeOption) => (
                                <label
                                    key={sizeOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="size"
                                        value={
                                            sizeOption === "All Size"
                                                ? ""
                                                : sizeOption
                                        }
                                        checked={
                                            size ===
                                            (sizeOption ===
                                                "All Size"
                                                ? ""
                                                : sizeOption)
                                        }
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {sizeOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* STyle Filter */}
                    <FilterSection
                        title="Style"
                        isOpen={openSections.style}
                        onToggle={() => toggleSection("style")}
                    >


                        <div className="space-y-2">
                            {[
                                "All Style",
                                "Modern",
                                "Persian",
                                "Traditional",
                                "Contemporary",

                            ].map((styleOption) => (
                                <label
                                    key={styleOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="style"
                                        value={
                                            styleOption === "All Style"
                                                ? ""
                                                : styleOption
                                        }
                                        checked={
                                            style ===
                                            (styleOption ===
                                                "All Style"
                                                ? ""
                                                : styleOption)
                                        }
                                        onChange={(e) =>
                                            setStyle(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {styleOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Texture  */}
                    {/* STyle Filter */}
                    <FilterSection
                        title="Texture"
                        isOpen={openSections.texture}
                        onToggle={() => toggleSection("texture")}
                    >


                        <div className="space-y-2">
                            {[
                                "All Texture",
                                "Soft",
                                "Medium",
                                "Rough",


                            ].map((textureOption) => (
                                <label
                                    key={textureOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="texture"
                                        value={
                                            textureOption === "All Texture"
                                                ? ""
                                                : textureOption
                                        }
                                        checked={
                                            texture ===
                                            (textureOption ===
                                                "All Texture"
                                                ? ""
                                                : textureOption)
                                        }
                                        onChange={(e) =>
                                            setTexture(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {textureOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-3">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full bg-foreground text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={handleClearFilters}
                            className="w-full bg-white text-foreground py-3 px-4 rounded-lg border border-foreground hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Clear All Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarFilter;
