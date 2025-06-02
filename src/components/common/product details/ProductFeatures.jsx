import { Sparkles, Scissors, Award, Leaf, Zap, Gift } from "lucide-react";

/**
 * ProductFeatures Component
 * Displays key product features with icons and descriptions
 */
function ProductFeatures({ product }) {
    const features = [
        {
            icon: Sparkles,
            title: "Premium Quality Fabric",
            description: `Made from the finest ${
                product?.fabric || "fabric"
            } sourced from traditional artisans, ensuring exceptional comfort and durability.`,
        },
        {
            icon: Scissors,
            title: "Expert Craftsmanship",
            description:
                "Each piece is meticulously crafted by skilled artisans with decades of experience in traditional techniques.",
        },
        {
            icon: Award,
            title: "Authentic Design",
            description: `Features authentic ${
                product?.technique || "traditional"
            } designs that celebrate cultural heritage and timeless aesthetics.`,
        },
        {
            icon: Leaf,
            title: "Eco-Friendly",
            description:
                "Produced using sustainable practices that minimize environmental impact and support ethical manufacturing.",
        },
        {
            icon: Zap,
            title: "Versatile Styling",
            description:
                "Perfect for both traditional occasions and contemporary settings, offering versatile styling options.",
        },
        {
            icon: Gift,
            title: "Gift-Ready Packaging",
            description:
                "Comes in elegant packaging, making it a perfect gift for special occasions and celebrations.",
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
                Product Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <h3 className="font-medium text-lg text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-foreground">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductFeatures;
