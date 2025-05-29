import { Clock, Package, Truck, Check } from "lucide-react";

/**
 * DeliveryTimeline Component
 * Shows the delivery process timeline
 */
function DeliveryTimeline() {
    const timelineSteps = [
        {
            icon: Clock,
            title: "Order Confirmation",
            description: "Within 24 hours of placing your order",
            bgColor: "bg-gray-900",
            textColor: "text-white",
        },
        {
            icon: Package,
            title: "Processing & Packaging",
            description: "1-2 business days",
            bgColor: "bg-gray-200",
            textColor: "text-gray-700",
        },
        {
            icon: Truck,
            title: "Shipping",
            description:
                "3-5 business days (standard) or 1-2 business days (express)",
            bgColor: "bg-gray-200",
            textColor: "text-gray-700",
        },
        {
            icon: Check,
            title: "Delivery",
            description: "Signature required upon delivery",
            bgColor: "bg-gray-200",
            textColor: "text-gray-700",
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Delivery Timeline
            </h2>
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8 relative">
                    {timelineSteps.map((step, index) => (
                        <div key={index} className="flex gap-6">
                            <div
                                className={`w-8 h-8 rounded-full ${step.bgColor} ${step.textColor} flex items-center justify-center flex-shrink-0 relative z-10`}
                            >
                                <step.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeliveryTimeline;
