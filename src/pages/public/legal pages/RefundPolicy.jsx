import React from "react";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-cream text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-8">
                    Refund & Exchange Policy
                </h1>

                {/* Introduction */}
                <p className="text-base sm:text-lg text-foreground mb-6">
                    At Srijan Fabs, we strive to ensure the highest quality for
                    our handwoven sarees. Due to the delicate nature of our
                    products, we have a strict return and exchange policy to
                    maintain their integrity. Please review the details below
                    carefully.
                </p>

                {/* Policy Details */}
                <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Return/Exchange Conditions
                    </h2>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            No returns or exchanges are accepted for products in
                            the{" "}
                            <span className="font-semibold">
                                ‘Special Price’
                            </span>{" "}
                            section.
                        </li>
                        <li>
                            Sarees cannot be exchanged if the fall, pico,
                            tassels, or blouse have been altered, detached, or
                            processed in any way.
                        </li>
                        <li>
                            Returns are only accepted for{" "}
                            <span className="font-semibold">
                                manufacturing defects
                            </span>{" "}
                            or{" "}
                            <span className="font-semibold">
                                incorrect items
                            </span>{" "}
                            dispatched.
                        </li>
                        <li>
                            Our products are handwoven and delicate, requiring
                            careful handling. Returns and exchanges are only
                            permitted in extreme circumstances.
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Return/Exchange Process
                    </h2>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            Submit your return/exchange request via email to{" "}
                            <a
                                href="mailto:srijanfabs@gmail.com"
                                className="text-foreground hover:text-primary"
                            >
                                srijanfabs@gmail.com
                            </a>{" "}
                            within{" "}
                            <span className="font-semibold">24 hours</span> of
                            receiving your shipment, including images of any
                            defects.
                        </li>
                        <li>
                            Sarees must be returned{" "}
                            <span className="font-semibold">
                                unused, unwashed, unaltered, and in their
                                original condition
                            </span>{" "}
                            with all tags intact.
                        </li>
                        <li>
                            The{" "}
                            <span className="font-semibold">
                                original invoice
                            </span>{" "}
                            must be provided with the exchange request.
                        </li>
                        <li>
                            Returns must be shipped via{" "}
                            <span className="font-semibold">Blue Dart</span>{" "}
                            only. Packages from other couriers will not be
                            accepted.
                        </li>
                        <li>
                            Srijan Fabs reserves the right to determine if the
                            saree is eligible for exchange, and this decision is
                            final and binding.
                        </li>
                        <li>
                            If a package appears tampered with, do{" "}
                            <span className="font-semibold">
                                not accept or open
                            </span>{" "}
                            it.
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Refund and Credit Notes
                    </h2>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            Refunds for defective or incorrect items will be
                            processed to your bank account (bank details
                            required) within{" "}
                            <span className="font-semibold">
                                10 to 15 working days
                            </span>
                            .
                        </li>
                        <li>
                            Purchased items are{" "}
                            <span className="font-semibold">not eligible</span>{" "}
                            for cash refunds. You may exchange the product or
                            receive a{" "}
                            <span className="font-semibold">credit note</span>{" "}
                            for future purchases.
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Return Address
                    </h2>
                    <div className="text-base sm:text-lg text-foreground bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p className="font-semibold">Srijan Fabs</p>
                        <p>2nd Floor, C.K 20/9,</p>
                        <p>Shittla Katra Thatheri Bazar,</p>
                        <p>Varanasi, Uttar Pradesh 221010,</p>
                        <p>India</p>
                        <p>
                            Phone:{" "}
                            <a
                                href="tel:+918960500991"
                                className="text-foreground hover:text-primary"
                            >
                                (+91) 89605 00991
                            </a>
                        </p>
                        <p>
                            Phone:{" "}
                            <a
                                href="tel:+916307116564"
                                className="text-foreground hover:text-primary"
                            >
                                (+91) 63071 16564
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-foreground mt-8 text-center">
                    For any questions, please contact us at{" "}
                    <a
                        href="mailto:srijanfabs@gmail.com"
                        className="text-foreground hover:text-primary"
                    >
                        srijanfabs@gmail.com
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default RefundPolicy;
