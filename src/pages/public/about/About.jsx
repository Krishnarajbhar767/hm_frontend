const StatsSection = () => {
    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "200+", label: "Products" },
        { number: "Yes", label: "Offline" },
        { number: "40+", label: "Years Experience" },
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
            name: "Bhupender Walia",
            role: "FOUNDER",
            image: "TEAM_PLACEHOLDER.jpg",
        },
        {
            name: "Gurander Walia",
            role: "PILLAR OF GROWTH",
            image: "TEAM_PLACEHOLDER.jpg",
        },
        {
            name: "Harvinder Walia",
            role: "PILLAR OF GROWTH",
            image: "TEAM_PLACEHOLDER.jpg",
        },
        {
            name: "Srijan Walia",
            role: "INNOVATOR",
            image: "TEAM_PLACEHOLDER.jpg",
        },
        {
            name: "Vardan Walia",
            role: "INNOVATOR",
            image: "TEAM_PLACEHOLDER.jpg",
        },
    ];

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4 text-center">
                    Our Team
                </h2>
                <p className="text-center text-foreground mb-8 italic max-w-2xl mx-auto">
                    “Each generation brings its own strengths—wisdom,
                    innovation, and passion. Together, we are not just running a
                    business, but carrying forward a legacy.”
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
                        About Us
                    </h1>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                            A Legacy of Craftsmanship, A Future of Innovation
                        </h2>
                        <p className="text-foreground mb-6">
                            Our story began over 40 years ago in the historic
                            lanes of Chowk, Varanasi, with the founding of our
                            parent company—Jeewan & Sons. Established by our
                            grandfather, Jeewan & Sons was built on a foundation
                            of integrity, quality, and a deep love for
                            traditional Indian textiles.
                        </p>
                        <p className="text-foreground mb-6">
                            As the next generation stepped in, so did a new
                            vision. To carry forward our legacy while embracing
                            modern design sensibilities, we launched Srijan
                            Fabs— a contemporary extension of our heritage.
                        </p>
                        <p className="text-foreground">
                            Inspired by the Soul of Varanasi – our collections
                            are born from the textures, colors, and stories of
                            Varanasi. We don’t just make clothes—we craft
                            experiences that honor tradition while speaking to
                            the modern spirit.
                        </p>
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
                                Our mission is to preserve the legacy of
                                traditional Indian craftsmanship while embracing
                                the spirit of modern design. Rooted in the
                                cultural heart of Varanasi, we are dedicated to
                                creating timeless clothing that reflects our
                                family values, artistic heritage, and commitment
                                to quality.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                                Our Vision
                            </h2>
                            <p className="text-foreground">
                                To be a leading voice in contemporary Indian
                                fashion by reimagining traditional craftsmanship
                                for the modern world—creating timeless, elegant
                                clothing that bridges generations and inspires
                                global appreciation for our cultural heritage.
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
                                title: "Heritage with Heart",
                                desc: "We celebrate the legacy of Indian craftsmanship, especially the timeless artistry of Varanasi.",
                            },
                            {
                                title: "Design-Led Innovation",
                                desc: "We blend tradition with modern aesthetics to craft clothing that feels both classic and contemporary.",
                            },
                            {
                                title: "Integrity in Every Thread",
                                desc: "From sourcing to stitching, we uphold honesty, transparency, and uncompromising quality.",
                            },
                            {
                                title: "Conscious Craftsmanship",
                                desc: "We respect artisans, resources, and the environment through sustainable practices.",
                            },
                            {
                                title: "Family-Driven Purpose",
                                desc: "As a third-generation family business, we are united by legacy, love, and a shared vision.",
                            },
                            {
                                title: "Customer-Centric Culture",
                                desc: "You are at the heart of our journey. We design with care, so you can wear with pride.",
                            },
                        ].map((val, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 border border-gray-200"
                            >
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

            {/* Timeline */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Our Journey
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {[
                            {
                                year: "1980",
                                title: "Jeewan & Sons Founded in Varanasi",
                                desc: "Our legacy begins in the historic lanes of Chowk, Varanasi.",
                            },
                            {
                                year: "2008",
                                title: "Srijan Fabs Launches",
                                desc: "A modern extension of our heritage focused on design-led fashion.",
                            },
                            {
                                year: "2025",
                                title: "Evolving Tradition",
                                desc: "Continuing to blend craftsmanship with innovation for future generations.",
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
                                    <p className="text-foreground">
                                        {event.desc}
                                    </p>
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
                        Join Our Journey
                    </h2>
                    <p className="text-white mb-6 max-w-2xl mx-auto">
                        We are dedicated to delivering timeless clothing that
                        reflects care, culture, and character. Thank you for
                        being part of our story.
                    </p>
                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <a
                            href="/products"
                            className="inline-block bg-white text-[rgb(83,62,45)] px-6 py-2 font-medium"
                        >
                            Explore Products
                        </a>
                        <a
                            href="/contact"
                            className="inline-block bg-transparent border border-white text-white px-6 py-2 font-medium"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
