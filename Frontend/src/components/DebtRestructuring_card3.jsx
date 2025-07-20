import React, { useState, useEffect, useRef } from "react";
import images from "../utils/images";
import { useNavigate } from "react-router-dom";

const DebtRestructuring_card3 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const componentRef = useRef(null);
    const navigate = useNavigate();

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

    return (
        <div 
            ref={componentRef}
            className="w-full min-h-auto px-4 py-10 flex flex-col items-center justify-center"
        >
            <style jsx>{`
                @keyframes slideInRight {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInRight {
                    animation: slideInRight 1s ease-out forwards;
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(100%);
                }
            `}</style>

            {/* Main Content Section - Content and Image */}
            <div className="w-full max-w-7xl mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left Side - Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-8" style={{
                            fontFamily: 'Youth',
                            fontWeight: 900,
                            lineHeight: '120%',
                        }}>
                            Why Choose <span className="text-blue-600">Debtfrie</span>
                        </h2>

                        {/* Benefits List */}
                        <div className="text-left">
                            <ul className="space-y-4 text-sm sm:text-base lg:text-lg text-gray-700" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <span>Deep expertise in RBI-compliant restructuring strategies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <span>Committed legal advocacy and ethical debt negotiation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <span>Technology that provides transparent financial oversight</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <span>Compassionate case management, treated with confidentiality and care</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className={`w-full max-w-md lg:max-w-lg ${
                            isVisible ? 'animate-slideInRight' : 'hidden-initially-right'
                        }`}>
                            <img 
                                src={images.Savings_and_Negotiations} 
                                alt="Why Choose Debtfrie Illustration" 
                                className="h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section - Bottom Center */}
            <div className={`w-full max-w-lg transform transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
            }`}>
                <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-blue-800" style={{
                        fontFamily: 'Youth',
                        fontWeight: 900,
                        lineHeight: '120%',
                    }}>
                        Start Your Journey Towards Financial Stability
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-700 font-medium mb-3" style={{
                        fontFamily: 'gilroy',
                        fontWeight: 500,
                        lineHeight: '150%',
                    }}>
                        Your financial past doesn't define you—your decision to restructure and recover does. With Debtfrie, you don't just manage debt—you regain peace of mind & protect your credit score.<br/> Book consultation <span className="text-blue-600 font-bold">@Rs.49/-</span> today.
                    </p>
                    
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" onClick={() => navigate('/contactus')}>
                        Book Consultation Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DebtRestructuring_card3;