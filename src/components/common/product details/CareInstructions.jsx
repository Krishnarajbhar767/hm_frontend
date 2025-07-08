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
                "Do not iron at home",
                "No machine wash",
            ],
        },
        {
            title: "Care",
            instructions: [
                "Avoid direct contact with perfumes or deodorants to preserve the fabric's sheen and fragrance.",
                "Refold every few months",
            ],
        },
        {
            title: "Storage",
            instructions: [
                "Store folded in a cool, dry place",
                "Use cotton Or muslin cloth",
                "Avoid hanging for long periods to maintain shape",
                "Avoid plastic covers",
                "Avoid  naphthalene balls ",
            ],
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Care Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {careCategories.map((category, index) => (
                    <div key={index} className="p-5 bg-foreground/5 rounded-sm">
                        <h3 className="font-semibold text-lg text-foreground mb-3">
                            {category.title}
                        </h3>
                        <ul className="space-y-2 text-foreground">
                            {category.instructions.map((instruction, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                >
                                    <Check className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
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
