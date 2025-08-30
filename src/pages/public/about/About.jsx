import React from "react";
import { Link } from "react-router-dom";
import Certifications from "../../../components/common/Certification";


const StatsSection = () => {
    const stats = [
        { number: "5,000+", label: "Tufted Rugs / month" },
        { number: "5,000+", label: "Handloom Rugs / month" },
        { number: "2,000+", label: "Hand-knotted / month" },
        { number: "25+", label: "Years of Craftsmanship" },
    ];

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-4xl font-extrabold text-[rgb(83,62,45)]">
                                {stat.number}
                            </p>
                            <p className="text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const TeamSection = () => {
    const teamMembers = [
        {
            name: "Mr. Sandeep Jaiswal",
            role: "Sales Contact",
            phone: "+91-9335723032",
            image: "/team/sandeep.jpg", // Replace with actual image path
        },
        {
            name: "Mr. Suryansh Jaiswal",
            role: "Sales Contact",
            phone: "+91-7007596907",
            image: "/team/suryansh.jpg",
        },
        {
            name: "Ms. Varnika Jaiswal",
            role: "Head Office Contact",
            phone: "+91-9918022212",
            image: "/team/varnika.jpg",
        },
    ];
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[rgb(83,62,45)] mb-4 text-center">
                    Meet Our Team
                </h2>
                <p className="text-center text-gray-600 mb-12 italic max-w-2xl mx-auto">
                    “A family-led team combining deep domain expertise with modern
                    R&D to deliver high-quality handmade carpets for global markets.”
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 shadow-md rounded-xl p-6 text-center transform transition hover:-translate-y-2 hover:shadow-xl"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-[rgb(83,62,45)]"
                            />
                            <h3 className="font-bold text-lg text-[rgb(83,62,45)]">
                                {member.name}
                            </h3>
                            <p className="text-gray-600">{member.role}</p>
                            <p className="text-sm text-gray-500 mt-1">{member.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};






const AboutUs = () => {
    return (
        <div className="bg-white">
            {/* Header */}
            <section className="bg-[rgb(83,62,45)] py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white text-center">
                        About Himalaya Carpets
                    </h1>
                </div>
            </section>

            {/* About */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Who We Are
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Himalaya Carpets is an Indian government-recognised export
                        house engaged in the manufacture and export of all types of
                        handmade carpets. With decades of experience, our promoters
                        have built a reputation for delivering excellent quality
                        products that reflect the latest trends in home décor.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Backed by a strong R&D team and in-house designers, we work
                        closely with clients to create both bespoke and series
                        production carpets. Our commitment is to ensure high customer
                        satisfaction through stringent quality control, ethical
                        manufacturing, and competitive pricing.
                    </p>
                </div>
            </section>

            {/* Clients */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Our Clients & Fairs
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Himalaya Carpets has an international presence and actively
                        participates in Indian Carpet Fairs and prestigious
                        international events like Domotex and CEPC. Our primary
                        markets include Europe and America, where we collaborate with
                        wholesalers and multi-store retailers.
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Jaunty Inc.</li>
                        <li>Limited Edition</li>
                        <li>Afridi Gallery</li>
                        <li>Cabib Genova Saraswati Rugs</li>
                    </ul>
                </div>
            </section>

            {/* Factory */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Our Factory & Capabilities
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>3 campuses spread over 2 acres for different carpet qualities</li>
                        <li>In-house looms of multiple types</li>
                        <li>Dedicated drying chambers for all-weather production</li>
                        <li>In-house weaving, processing & finishing</li>
                        <li>Strong R&D and design team</li>
                    </ul>
                    <h3 className="mt-6 text-xl font-semibold text-[rgb(83,62,45)]">
                        Production Capacity (per month)
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Tufted carpets – 5000 sqm</li>
                        <li>Handloom rugs – 5000 sqm</li>
                        <li>Hand-knotted carpets – 2000 sqm</li>
                    </ul>
                </div>
            </section>

            {/* Stats */}
            <StatsSection />

            {/* Products */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Our Product Range
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Hand knotted – 3/20 to 10/50 quality</li>
                        <li>Hand woven rugs</li>
                        <li>Hand tufted rugs</li>
                        <li>Handloom rugs</li>
                        <li>Flatweaves</li>
                        <li>Dhurries</li>
                        <li>Louri back & Gabbeh</li>
                        <li>Indoor/Outdoor Polyester Rugs</li>
                    </ul>
                </div>
            </section>

            {/* Certifications */}
            <Certifications />

            {/* Team */}
            <TeamSection />

            {/* CTA */}
            <section className="py-12 bg-[rgb(83,62,45)] text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">
                        Partner with Himalaya Carpets
                    </h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        For custom production, samples or export enquiries, our team
                        is ready to collaborate. We deliver quality, scale and
                        on-time exports.
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/products/all/685a6381e6c33dcf91fa54d0"
                            className="bg-white text-[rgb(83,62,45)] px-6 py-2 font-medium rounded"
                        >
                            Explore Products
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-white px-6 py-2 font-medium rounded"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
