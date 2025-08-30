const Certifications = () => {
    const images = [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-6">
                    Our Certifications
                </h2>
                <div className="overflow-hidden relative max-w-3xl mx-auto">
                    <div className="flex animate-slide">
                        {images.concat(images).map((img, i) => (
                            <div key={i} className="min-w-full flex justify-center">
                                <img
                                    src={img}
                                    alt="Certification"
                                    className="w-72 h-52 object-contain mx-auto rounded-lg shadow object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Simple sliding animation */}
            <style>
                {`
                @keyframes slide {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-100%); }
                    50% { transform: translateX(-200%); }
                    75% { transform: translateX(-300%); }
                    100% { transform: translateX(-400%); }
                }
                .animate-slide {
                    display: flex;
                    animation: slide 20s linear infinite;
                }
                `}
            </style>
        </section>
    );
};

export default Certifications