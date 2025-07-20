import React, { useState, useEffect, useRef } from "react";
import images from "../utils/images";

const WhyChooseDebtfrie = () => {
    const [isVisible, setIsVisible] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { 
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);

    const benefits = [
        { key: "No New Loans:", text: "You pay your debt with your own savings." },
        { key: "Affordable plans:", text: "Get your loans settled at affordable rates with our personalized plans according to your affordability." },
        { key: "Collection Harassment Support:", text: "We handle tough calls and protect your rights." },
        { key: "Legal Guidance:", text: "Our team supports you through every legal step." },
        { key: "Transparent Process:", text: "Track your progress through your personal dashboard." }
    ];

    return (
        <div 
            ref={componentRef}
            className="w-full min-h-auto px-4 py-16 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50"
        >
            <style jsx>{`
                @keyframes slideInLeft {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out forwards;
                }

                .hidden-initially-left {
                    opacity: 0;
                    transform: translateX(-100%);
                }

                @keyframes pulse-gentle {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .animate-pulse-gentle {
                    animation: pulse-gentle 2s ease-in-out infinite;
                }

                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>

            {/* Main Content Section - Image and Why Choose DEBTFRIE */}
            <div className="w-full max-w-7xl mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left Side - Image */}
                    <div className="flex-1 flex justify-center lg:justify-start">
                        <div className={`w-full max-w-md lg:max-w-lg ${
                            isVisible ? 'animate-slideInLeft' : 'hidden-initially-left'
                        }`}>
                            <img
                                src={images.Financial_Assessment_and_Consultation}
                                alt="Why Choose DEBTFRIE Illustration"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Side - Why Choose DEBTFRIE Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8" style={{
                            fontFamily: 'Youth',
                            fontWeight: 900,
                            lineHeight: '120%',
                        }}>
                            Why Choose <span className="text-blue-600">DEBTFRIE?</span>
                        </h3>
                        
                        <ul className="space-y-4 text-sm sm:text-base lg:text-lg text-gray-700" style={{
                            fontFamily: 'gilroy',
                            fontWeight: 400,
                            lineHeight: '150%',
                        }}>
                            {benefits.map((benefit, index) => (
                                <li 
                                    key={index}
                                    className="flex items-start"
                                >
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <span>
                                        <strong className="text-blue-800">{benefit.key}</strong> {benefit.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Call to Action Section - Bottom Center */}
            <div className={`w-full max-w-lg transform transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
            }`}>
                <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-blue-800" style={{
                        fontFamily: 'Youth',
                        fontWeight: 900,
                        lineHeight: '120%',
                    }}>
                        Ready for Real Freedom?
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium mb-3" style={{
                        fontFamily: 'gilroy',
                        fontWeight: 500,
                        lineHeight: '150%',
                    }}>
                        Check if you qualify—apply for a consultation <span className="text-blue-600 font-bold">@Rs.49/-</span> today. Let's resolve your debt together.
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 animate-pulse-gentle">
                        Apply for Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseDebtfrie;