import { Check } from "lucide-react";

/**
 * CareInstructions Component
 * Displays product care and maintenance instructions
 */
function CareInstructions() {
    const careCategories = [
        {
            title: "Washing",
            instructions: [
                "Dry clean only for best results",
                "If hand washing, use cold water with mild detergent",
                "Do not soak for extended periods",
            ],
        },
        {
            title: "Drying & Ironing",
            instructions: [
                "Air dry in shade, away from direct sunlight",
                "Iron on medium heat with a cloth barrier",
                "Steam ironing recommended for best results",
            ],
        },
        {
            title: "Storage",
            instructions: [
                "Store folded in a cool, dry place",
                "Use acid-free tissue paper between folds",
                "Avoid hanging for long periods to maintain shape",
            ],
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Care Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {careCategories.map((category, index) => (
                    <div key={index} className="p-5 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-lg text-gray-900 mb-3">
                            {category.title}
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            {category.instructions.map((instruction, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                >
                                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CareInstructions;
