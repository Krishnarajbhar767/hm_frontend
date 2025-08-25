import React from 'react';

function HomeTeam() {
    const teamMembers = [
        {
            name: "Mr. Sandeep Jaiswal",
            role: "Sales Contact",
            description: "Deep domain expertise in carpet sales and client relations.",
            image: "https://placehold.co/150x150/F0E6D8/5A4B40?text=Sandeep", // Placeholder image
        },
        {
            name: "Mr. Suryansh Jaiswal",
            role: "Sales Contact",
            description: "Dedicated to fostering strong client relationships and driving global outreach.",
            image: "https://placehold.co/150x150/F0E6D8/5A4B40?text=Suryansh", // Placeholder image
        },
        {
            name: "Ms. Varnika Jaiswal",
            role: "Head Office Contact",
            description: "Manages core operations, ensuring smooth coordination and efficient processes.",
            image: "https://placehold.co/150x150/F0E6D8/5A4B40?text=Varnika", // Placeholder image
        },
    ];

    return (
        <div className="container mx-auto px-4 py-0 md:py-0 max-w-7xl">
            <div className="bg-cream rounded-lg p-6 md:p-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                    Meet Our Team
                </h2>
                <p className="text-base sm:text-lg text-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                    A family-led team combining deep domain expertise with modern R&D to deliver high-quality handmade carpets for global markets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center p-4 rounded-md">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                            <h3 className="font-semibold text-xl text-foreground mb-1">
                                {member.name}
                            </h3>
                            <p className="text-foreground text-opacity-80 mb-2">{member.role}</p>
                            <p className="text-foreground text-sm leading-relaxed">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeTeam;
