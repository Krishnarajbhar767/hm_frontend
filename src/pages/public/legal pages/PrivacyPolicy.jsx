import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-cream text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-8">
                    Privacy Policy
                </h1>

                {/* Introduction */}
                <p className="text-base sm:text-lg text-foreground mb-6">
                    This Privacy Policy describes how your personal information
                    is collected, used, and shared when you visit or make a
                    purchase from{" "}
                    <a
                        href="https://srijanfabs.com"
                        className="text-foreground hover:text-primary"
                    >
                        srijanfabs.com
                    </a>{" "}
                    (the “Site”). By using our Site, you agree to the terms of
                    this Privacy Policy.
                </p>

                <p className="text-base sm:text-lg text-foreground mb-6">
                    To enhance your browsing experience, you consent to third
                    parties processing your IP address to determine your
                    location for regional pricing purposes within India. You
                    also agree to have this preference stored in a session
                    cookie in your browser (a temporary cookie that is
                    automatically removed when you close your browser). This
                    ensures consistent pricing during your visit.
                </p>

                {/* Personal Information We Collect */}
                <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Personal Information We Collect
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        When you visit the Site, we automatically collect
                        certain information about your device, including your
                        web browser, IP address, time zone, and cookies
                        installed on your device. As you browse, we collect data
                        about the web pages or products you view, referring
                        websites or search terms, and how you interact with the
                        Site. We refer to this as{" "}
                        <span className="font-semibold">
                            Device Information
                        </span>
                        .
                    </p>
                    <p className="text-base sm:text-lg text-foreground">
                        We collect Device Information using:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            <span className="font-semibold">Cookies</span>: Data
                            files placed on your device, often with a unique
                            identifier. For more information, visit{" "}
                            <a
                                href="http://www.allaboutcookies.org"
                                className="text-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.allaboutcookies.org
                            </a>
                            .
                        </li>
                        <li>
                            <span className="font-semibold">Log files</span>:
                            Track actions on the Site, collecting data like IP
                            address, browser type, Internet service provider,
                            referring/exit pages, and date/time stamps.
                        </li>
                        <li>
                            <span className="font-semibold">
                                Web beacons, tags, and pixels
                            </span>
                            : Electronic files that record how you browse the
                            Site.
                        </li>
                    </ul>
                    <p className="text-base sm:text-lg text-foreground">
                        When you make or attempt a purchase, we collect your
                        name, billing address, shipping address, payment
                        information, email address, and phone number. We refer
                        to this as{" "}
                        <span className="font-semibold">Order Information</span>
                        .
                    </p>
                    <p className="text-base sm:text-lg text-foreground">
                        In this Privacy Policy,{" "}
                        <span className="font-semibold">
                            Personal Information
                        </span>{" "}
                        refers to both Device Information and Order Information.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        How We Use Your Personal Information
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We use{" "}
                        <span className="font-semibold">Order Information</span>{" "}
                        to:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            Fulfill orders (processing payments, arranging
                            shipping, providing invoices/confirmations).
                        </li>
                        <li>Communicate with you.</li>
                        <li>Screen orders for potential risk or fraud.</li>
                        <li>
                            Provide information or advertising about our
                            products or services, based on your preferences.
                        </li>
                    </ul>
                    <p className="text-base sm:text-lg text-foreground">
                        We use{" "}
                        <span className="font-semibold">
                            Device Information
                        </span>{" "}
                        to:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            Screen for potential risk and fraud (e.g., using
                            your IP address).
                        </li>
                        <li>
                            Improve and optimize the Site (e.g., via analytics
                            on customer browsing behavior and marketing campaign
                            success).
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Sharing Your Personal Information
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We share your Personal Information with third parties to
                        support the operations of our platform, as described
                        above. For example, we use Google Analytics to
                        understand Site usage. Read more at{" "}
                        <a
                            href="https://www.google.com/intl/en/policies/privacy/"
                            className="text-foreground hover:text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Privacy Policy
                        </a>
                        . Opt out at{" "}
                        <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            className="text-foreground hover:text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Analytics Opt-out
                        </a>
                        .
                    </p>
                    <p className="text-base sm:text-lg text-foreground">
                        We may also share Personal Information to comply with
                        applicable laws, respond to legal requests (e.g.,
                        subpoenas), or protect our rights.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Behavioral Advertising
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We use your Personal Information for targeted
                        advertisements or marketing communications we believe
                        may interest you. Learn more at{" "}
                        <a
                            href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
                            className="text-foreground hover:text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Network Advertising Initiative
                        </a>
                        . You can opt out of targeted advertising via:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            <a
                                href="https://www.facebook.com/settings/?tab=ads"
                                className="text-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Facebook Ads Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.google.com/settings/ads/anonymous"
                                className="text-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Ads Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                                className="text-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Bing Ads Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://optout.aboutads.info/"
                                className="text-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Digital Advertising Alliance Opt-out Portal
                            </a>
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Do Not Track
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We do not alter our Site’s data collection and use
                        practices when we detect a Do Not Track signal from your
                        browser.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Data Retention
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        When you place an order through the Site, we retain your
                        Order Information in our database unless you request its
                        deletion by contacting us.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Changes
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We may update this Privacy Policy to reflect changes in
                        our practices or for operational, legal, or regulatory
                        reasons. Updates will be posted on the Site.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Contact Us
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
                    For questions about our privacy practices or to make a
                    complaint, please contact us at{" "}
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

export default PrivacyPolicy;
