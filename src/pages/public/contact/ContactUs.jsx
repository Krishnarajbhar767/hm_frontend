import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import axiosInstance from "../../../utils/apiConnector";
import { BsInstagram } from "react-icons/bs";

const ContactUs = () => {
    // react-hook-form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [success, setSuccess] = useState(false);

    // Submit handler with axios
    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post("/contact", data);
            if (res.data?.success) {
                setSuccess(true);
                reset();
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            alert("Message failed to send. Please try again later.");
        }
    };

    // Contact info cards data
    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            details: [
                "2nd Floor, C.K 20/9",
                "Shetla Katra Thatheri Bazar",
                "Varanasi, Uttar Pradesh 221010",
            ],
        },
        {
            icon: Phone,
            title: "Phone",
            details: ["+91 89605 00991", "+91 63071 16564"],
        },
        {
            icon: Mail,
            title: "Email",
            details: ["srijanfabs@gmail.com", "support@srijanfabs.com"],
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: [
                "Monday - Saturday: 10AM - 9PM",
                "Sunday: Closed",
            ],
        },
    ];

    return (
        <div className="bg-white">
            {/* Header */}
            <section className="bg-[rgb(83,62,45)] py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                        Contact Us
                    </h1>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 p-4"
                            >
                                <div className="flex items-center mb-3">
                                    <info.icon className="w-5 h-5 text-[rgb(83,62,45)] mr-2" />
                                    <h3 className="font-bold text-[rgb(83,62,45)]">
                                        {info.title}
                                    </h3>
                                </div>
                                <div>
                                    {info.details.map((detail, idx) => (
                                        <p
                                            key={idx}
                                            className="text-foreground text-sm mb-1"
                                        >
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                            Send us a Message
                        </h2>

                        {/* Success message */}
                        {success && (
                            <div className="bg-green-100 text-green-800 text-sm p-3 mb-4 rounded">
                                Message sent successfully! We'll get back to you
                                shortly.
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white p-6 border border-gray-200"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        {...register("name", {
                                            required: "Full Name is required",
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Enter a valid email",
                                            },
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        {...register("phone")}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Subject *
                                    </label>
                                    <select
                                        {...register("subject", {
                                            required: "Subject is required",
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                    >
                                        <option value="">
                                            Select a subject
                                        </option>
                                        <option value="general">
                                            General Inquiry
                                        </option>
                                        <option value="support">
                                            Customer Support
                                        </option>
                                        <option value="business">
                                            Business Partnership
                                        </option>
                                        <option value="feedback">
                                            Feedback
                                        </option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.subject && (
                                        <p className="text-red-500 text-xs">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Message *
                                </label>
                                <textarea
                                    {...register("message", {
                                        required: "Message is required",
                                    })}
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                    placeholder="Tell us how we can help you..."
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-xs">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[rgb(83,62,45)] text-white py-2 px-4 font-medium disabled:bg-gray-400"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Google Map */}
            <section className="py-8 md:py-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.708686065877!2d83.0116613!3d25.313989799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f5d8c42cc95%3A0xa297ce88e3ca6c74!2sSrijan%20Fabs%20-%20Banarasi%20Sarees%2C%20Banarasi%20Dupattas%20%2C%20Banarasi%20Suits!5e0!3m2!1sen!2sin!4v1751363487509!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 w-full h-[300px]"
                ></iframe>
            </section>

            {/* FAQ */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "What are your shipping options?",
                                answer: "We offer standard shipping of 4-6 working days excluding holidays and festivals.",
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer no return policy unless there is a manufacturing defect. Return or exchange is only done if the wrong product is received.",
                            },
                            {
                                question:
                                    "Is the product the same as it looks on the website?",
                                answer: "Yes—the products and fabrics are exactly as shown on the website. Some minor variations may occur due to lighting or photography.",
                            },
                            {
                                question:
                                    "Do you have Banarasi sarees with real zari? What is the cost?",
                                answer: "Yes, we do. Prices vary depending on weaving technique and fabric. For detailed options and pricing, please call us at 8960500991 or 6307116564.",
                            },
                            {
                                question: "Do sarees include the blouse piece?",
                                answer: "Yes—every saree from Srijan Fabs includes a matching blouse piece.",
                            },
                            {
                                question:
                                    "What are the dimensions of your sarees?",
                                answer: `Standard dimensions are:
                                        • Length: 5.4 – 5.6 m (212 – 236″)  
                                        • Width: 1.1 – 1.17 m (44 – 46″)  
                                        • Blouse piece: 0.8 – 1 m (31 – 39″)  
                                        There may be minor variations. For exact measurements, send us a product photo and we’ll measure it for you.`,
                            },
                            {
                                question:"How should I care for and store the sarees?",
                                answer: "Our Banarasi sarees are pure handwoven silk. We recommend professional dry-cleaning only. Avoid moisture, direct heat on zari, and any contact with perfume.",
                            },
                            {
                                question:"What are the shipping charges in India?",
                                answer: "Shipping in India is free.",
                            },
                            {
                                question: "How can I track my order?",
                                answer: "Once your order ships, you’ll receive a tracking number via email or WhatsApp. You can also check its status in your order history on our site.",
                            },
                            {
                                question:"What if I have a requirement that’s not listed here?",
                                answer: "We’re happy to help with custom needs! Call us at 8960500991 or 6307116564 and we’ll assist you.",
                            },
                            {
                                question:"Will my order take longer if I choose the Fall Pico and Tassel option?",
                                answer: "Yes—the Fall Pico & Tassel customization adds approximately 2–3 extra days, as each piece is finished with extra care.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 border border-gray-200"
                            >
                                <h3 className="font-bold text-[rgb(83,62,45)] mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Links */}
            <section className="py-8 md:py-12 bg-[rgb(83,62,45)]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Connect With Us
                    </h2>
                    <p className="text-white mb-6">
                        Follow us on social media for updates and exclusive
                        offers
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="https://www.facebook.com/share/16oA9AL3Bn/" target="_blank">
                            <FaFacebook
                                size={30}
                                className="text-white cursor-pointer"
                                
                            />
                        </a>
                        <a href="https://www.linkedin.com/company/srijan-fabs/" target="_blank">
                            <FaLinkedin
                                size={30}
                                className="text-white cursor-pointer"
                                
                            />
                        </a>
                        <a href="https://pin.it/4Y8ChoBph" target="_blank">
                            <FaPinterest
                                size={30}
                                className="text-white cursor-pointer"
                                
                            />
                        </a>

                        <a href="https://www.instagram.com/srijanfabs/" target="_blank">
                            <BsInstagram
                                size={30}
                                className="text-white cursor-pointer"
                            />
                        </a>

{/* 
                        {
                                   icon: BsInstagram,
                                   link: "https://www.instagram.com/srijanfabs/"
                                } */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
