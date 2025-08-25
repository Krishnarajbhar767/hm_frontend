import React from "react";
import { Link } from "react-router-dom";

const StatsSection = () => {
    const stats = [
        { number: "5,000+", label: "Tufted Rugs / month" },
        { number: "5,000+", label: "Handloom Rugs / month" },
        { number: "2,000+", label: "Hand-knotted / month" },
        { number: "25+", label: "Years of Craftsmanship" },
    ];

    return (
        <section className="py-8 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-4">
                            <p className="text-3xl font-bold text-[rgb(83,62,45)]">
                                {stat.number}
                            </p>
                            <p className="text-foreground">{stat.label}</p>
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
            image: "https://source.unsplash.com/200x200/?person,1",
        },
        {
            name: "Mr. Suryansh Jaiswal",
            role: "Sales Contact",
            image: "https://source.unsplash.com/200x200/?person,2",
        },
        {
            name: "Ms. Varnika Jaiswal",
            role: "Head Office Contact",
            image: "https://source.unsplash.com/200x200/?person,3",
        },
    ];

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4 text-center">
                    Our Team
                </h2>
                <p className="text-center text-foreground mb-8 italic max-w-2xl mx-auto">
                    “A family-led team combining deep domain expertise with modern
                    R&D to deliver high-quality handmade carpets for global markets.”
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-bold text-[rgb(83,62,45)]">
                                {member.name}
                            </h3>
                            <p className="text-foreground">{member.role}</p>
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
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                        About Himalaya Carpets
                    </h1>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                            Indian Craftsmanship — Global Reach
                        </h2>
                        <p className="text-foreground mb-6">
                            Himalaya Carpets is an Indian government-recognised export
                            house engaged in the manufacture and export of all types of
                            handmade carpets. Our promoters and management have a long
                            track-record of delivering excellent quality carpets that
                            reflect the latest trends in home décor.
                            <br />
                            <br />
                            We have a strong in-house R&amp;D team and designers who work
                            closely with clients to develop and deliver bespoke and
                            series-production carpets. We strive for high customer
                            satisfaction through stringent quality control, ethical
                            production and competitive pricing.
                        </p>

                        <h3 className="text-lg font-semibold text-[rgb(83,62,45)] mb-3">
                            Our Clients & Fairs
                        </h3>
                        <p className="text-foreground mb-4">
                            Himalaya Carpets has an international presence — we exhibit
                            regularly at prominent fairs including Domotex and CEPC,
                            and serve wholesalers and multi-store retailers across
                            Europe and the Americas. Notable clients include Jaunty
                            Inc., Limited Edition, Afridi Gallery and Cabib Genova
                            Saraswati Rugs.
                        </p>

                        <h3 className="text-lg font-semibold text-[rgb(83,62,45)] mb-3">
                            Factory & Capabilities
                        </h3>
                        <p className="text-foreground">
                            We operate large manufacturing campuses with in-house
                            looms, processing, finishing and drying chambers to ensure
                            consistent quality even during adverse weather. Our key
                            production capacities (approx. monthly):
                        </p>
                        <ul className="list-disc list-inside text-foreground mt-3">
                            <li>Tufted carpets: ~5000 sqm</li>
                            <li>Handloom rugs: ~5000 sqm</li>
                            <li>Hand-knotted carpets: ~2000 sqm</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <StatsSection />

            {/* Mission & Vision */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                                Our Mission
                            </h2>
                            <p className="text-foreground">
                                To craft and export high-quality handmade carpets by
                                blending traditional techniques with modern product
                                innovation — ensuring customer satisfaction through
                                consistent quality and customised solutions.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                                Our Vision
                            </h2>
                            <p className="text-foreground">
                                To be a trusted global partner for premium handmade
                                carpets—recognized for craftsmanship, timely delivery,
                                ethical practices and design leadership.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                title: "Quality First",
                                desc: "Stringent QC across weaving, processing and finishing to deliver products you can trust.",
                            },
                            {
                                title: "Design & R&D",
                                desc: "In-house designers and R&D focused on market-relevant collections and bespoke client requests.",
                            },
                            {
                                title: "Sustainable Practices",
                                desc: "Responsible sourcing and production processes to limit environmental impact.",
                            },
                            {
                                title: "Customer Collaboration",
                                desc: "Close client collaboration — from samples to final production and shipment.",
                            },
                            {
                                title: "Scale & Reliability",
                                desc: "Multiple production campuses and dedicated facilities for consistent output and delivery.",
                            },
                            {
                                title: "Export Excellence",
                                desc: "Focused on compliance and timely exports to European and American markets.",
                            },
                        ].map((val, i) => (
                            <div key={i} className="bg-white p-6 border border-gray-200">
                                <h3 className="font-bold text-lg text-[rgb(83,62,45)] mb-2">
                                    {val.title}
                                </h3>
                                <p className="text-foreground">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <TeamSection />

            {/* Timeline & Factory Features */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Our Journey & Facilities
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {[
                            {
                                year: "Started",
                                title: "Established as a family-led manufacturer",
                                desc: "Built on traditional expertise, expanding over decades to serve international markets.",
                            },
                            {
                                year: "Facilities",
                                title: "Multiple production campuses",
                                desc: "Three large campuses with dedicated looms, drying chambers and finishing godowns to ensure year-round production.",
                            },
                            {
                                year: "Exports & Fairs",
                                title: "Global participation",
                                desc: "Regular participation in Domotex and other international fairs; strong client relationships in Europe & the USA.",
                            },
                        ].map((event, i) => (
                            <div key={i} className="flex flex-col md:flex-row">
                                <div className="md:w-1/4 font-bold text-[rgb(83,62,45)] mb-2 md:mb-0">
                                    {event.year}
                                </div>
                                <div className="md:w-3/4">
                                    <h3 className="font-bold text-foreground mb-1">
                                        {event.title}
                                    </h3>
                                    <p className="text-foreground">{event.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 md:py-12 bg-[rgb(83,62,45)]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Partner with Himalaya Carpets
                    </h2>
                    <p className="text-white mb-6 max-w-2xl mx-auto">
                        For custom production, samples or export enquiries — our team
                        is ready to collaborate. We deliver quality, scale and
                        on-time exports.
                    </p>
                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <Link
                            to={'/products/all/685a6381e6c33dcf91fa54d0'}
                            className="inline-block bg-white text-[rgb(83,62,45)] px-6 py-2 font-medium"
                        >
                            Explore Products
                        </Link>
                        <Link to={'/contact'}>
                            <a

                                className="inline-block bg-transparent border border-white text-white px-6 py-2 font-medium"
                            >
                                Contact Us
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
