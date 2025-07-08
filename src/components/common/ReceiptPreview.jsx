// ReceiptPreview.jsx
import React from "react";
import { FiImage } from "react-icons/fi";

/**
 * ReceiptPreview
 *
 * Props:
 *  - imageUrl: string | null
 *
 * Renders:
 *  - Section heading "Delhivery Receipt"
 *  - Dashed-border placeholder if no imageUrl
 *  - Responsive image preview if imageUrl provided
 */
const ReceiptPreview = ({ imageUrl }) => {
    return (
        <section className="my-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Delhivery Receipt
            </h3>

            {!imageUrl ? (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
                    <FiImage size={48} className="mb-4" />
                    <p className="text-sm">
                        No Delhivery receipt uploaded yet.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <img
                        src={imageUrl}
                        alt="Delhivery Receipt"
                        className="w-full h-auto object-contain"
                    />
                </div>
            )}
        </section>
    );
};

export default ReceiptPreview;
