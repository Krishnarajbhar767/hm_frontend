const AboutUs = () => {
    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "500+", label: "Products" },
        { number: "50+", label: "Cities" },
        { number: "15+", label: "Years Experience" },
    ];

    return (
        <div className="bg-white">
            {/* Simple Header */}
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
                            Our Story
                        </h2>
                        <p className="text-foreground mb-6">
                            Founded in 2008, Srijan Fabrics has been dedicated
                            to preserving and promoting traditional Indian
                            textile craftsmanship. We work directly with skilled
                            artisans across India to bring authentic,
                            high-quality fabrics to customers worldwide.
                        </p>
                        <p className="text-foreground">
                            Our journey began with a small workshop and a big
                            dream to connect traditional craftspeople with
                            modern markets. Today, we're proud to support
                            hundreds of artisan families while delivering
                            exceptional products to our customers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
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

            {/* Mission & Vision */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                                Our Mission
                            </h2>
                            <p className="text-foreground">
                                To preserve and promote traditional Indian
                                textile craftsmanship while making authentic,
                                high-quality fabrics accessible to customers
                                worldwide. We strive to support artisan
                                communities and maintain the cultural heritage
                                embedded in every thread.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                                Our Vision
                            </h2>
                            <p className="text-foreground">
                                To become the global leader in authentic
                                traditional fabrics, bridging the gap between
                                ancient craftsmanship and contemporary fashion.
                                We envision a world where traditional arts
                                thrive alongside modern innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Our Core Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 border border-gray-200">
                            <h3 className="font-bold text-lg text-[rgb(83,62,45)] mb-2">
                                Quality Craftsmanship
                            </h3>
                            <p className="text-foreground">
                                We believe in preserving traditional art forms
                                and supporting skilled artisans who pour their
                                heart into every creation.
                            </p>
                        </div>

                        <div className="bg-white p-6 border border-gray-200">
                            <h3 className="font-bold text-lg text-[rgb(83,62,45)] mb-2">
                                Quality Assurance
                            </h3>
                            <p className="text-foreground">
                                Every product undergoes rigorous quality checks
                                to ensure you receive only the finest fabrics
                                and craftsmanship.
                            </p>
                        </div>

                        <div className="bg-white p-6 border border-gray-200">
                            <h3 className="font-bold text-lg text-[rgb(83,62,45)] mb-2">
                                Sustainable Practices
                            </h3>
                            <p className="text-foreground">
                                We're committed to eco-friendly production
                                methods that respect both our environment and
                                traditional techniques.
                            </p>
                        </div>

                        <div className="bg-white p-6 border border-gray-200">
                            <h3 className="font-bold text-lg text-[rgb(83,62,45)] mb-2">
                                Heritage & Innovation
                            </h3>
                            <p className="text-foreground">
                                Blending centuries-old traditions with modern
                                design sensibilities to create timeless pieces
                                for today's world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Our Team
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <img
                                src="/placeholder.svg?height=200&width=200"
                                alt="Rajesh Kumar"
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-bold text-[rgb(83,62,45)]">
                                Rajesh Kumar
                            </h3>
                            <p className="text-foreground">Founder & CEO</p>
                        </div>

                        <div className="text-center">
                            <img
                                src="/placeholder.svg?height=200&width=200"
                                alt="Priya Sharma"
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-bold text-[rgb(83,62,45)]">
                                Priya Sharma
                            </h3>
                            <p className="text-foreground">Head of Design</p>
                        </div>

                        <div className="text-center">
                            <img
                                src="/placeholder.svg?height=200&width=200"
                                alt="Amit Patel"
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-bold text-[rgb(83,62,45)]">
                                Amit Patel
                            </h3>
                            <p className="text-foreground">Quality Director</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Our Journey
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-bold text-[rgb(83,62,45)] mb-2 md:mb-0">
                                2008
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="font-bold text-foreground mb-1">
                                    Company Founded
                                </h3>
                                <p className="text-foreground">
                                    Started with a small workshop and a big
                                    dream to preserve traditional craftsmanship.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-bold text-[rgb(83,62,45)] mb-2 md:mb-0">
                                2012
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="font-bold text-foreground mb-1">
                                    First Major Expansion
                                </h3>
                                <p className="text-foreground">
                                    Opened our flagship store and expanded our
                                    artisan network across multiple states.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-bold text-[rgb(83,62,45)] mb-2 md:mb-0">
                                2016
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="font-bold text-foreground mb-1">
                                    Digital Transformation
                                </h3>
                                <p className="text-foreground">
                                    Launched our online platform, making
                                    authentic fabrics accessible worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-bold text-[rgb(83,62,45)] mb-2 md:mb-0">
                                2020
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="font-bold text-foreground mb-1">
                                    Sustainability Initiative
                                </h3>
                                <p className="text-foreground">
                                    Implemented eco-friendly practices and
                                    launched our green production line.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-bold text-[rgb(83,62,45)] mb-2 md:mb-0">
                                2024
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="font-bold text-foreground mb-1">
                                    Global Recognition
                                </h3>
                                <p className="text-foreground">
                                    Received international awards for preserving
                                    traditional crafts and sustainable
                                    practices.
                                </p>
                            </div>
                        </div>
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
                        Be part of our mission to preserve traditional
                        craftsmanship and bring authentic fabrics to the world.
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
