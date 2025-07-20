import React, { useState, useEffect, useRef } from "react";
import images from "../utils/images";

const DebtRestructuring_card2 = () => {
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

    return (
        <div 
            ref={componentRef}
            className="w-full min-h-auto px-4 py-10 flex flex-col items-center justify-center"
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
            `}</style>

            {/* Main Content Section - Image and Description */}
            <div className="w-full max-w-7xl sm:mb-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left Side - Image (Hidden on mobile, shown on desktop) */}
                    <div className="hidden lg:flex flex-1 justify-center lg:justify-start">
                        <div className={`max-w-md lg:max-w-lg ${
                            isVisible ? 'animate-slideInLeft' : 'hidden-initially-left'
                        }`}>
                            <img 
                                src={images.Debt_Free_status} 
                                alt="How Debtfrie Helps Illustration" 
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6" style={{
                            fontFamily: 'Youth',
                            fontWeight: 900,
                            lineHeight: '120%',
                        }}>
                            How <span className="text-blue-600">Debtfrie</span> Helps You Rebuild
                        </h2>
                        
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-8" style={{
                            fontFamily: 'gilroy',
                            fontWeight: 400,
                            lineHeight: '150%',
                        }}>
                            Debtfrie offers a compassionate, compliant, and results-driven model for debt relief:
                        </p>

                        {/* Services List */}
                        <div className="text-left">
                            <ul className="space-y-4 text-sm sm:text-base text-gray-700" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <div>
                                        <span className="font-bold text-blue-800">Personalized Counselling:</span>
                                        <span className="ml-1">Confidential sessions to assess your financial situation and create a tailored, actionable plan.</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <div>
                                        <span className="font-bold text-blue-800">EMI Restructuring and Negotiation:</span>
                                        <span className="ml-1">We engage directly with creditors to revise EMIs and interest terms aligned to your current repayment ability.</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <div>
                                        <span className="font-bold text-blue-800">Legal Protection and Advocacy:</span>
                                        <span className="ml-1">Our legal team shields you from harassment, negotiates on your behalf, and ensures full compliance with Indian law.</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                                    <div>
                                        <span className="font-bold text-blue-800">Progress Monitoring:</span>
                                        <span className="ml-1">Our platform helps you track payments, measure recovery milestones, and maintain active support through a dedicated advisor.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Image - Shown only on mobile below the text */}
                        <div className="flex lg:hidden justify-center mt-8">
                            <div className={`max-w-xs ${
                                isVisible ? 'animate-slideInLeft' : 'hidden-initially-left'
                            }`}>
                                <img 
                                    src={images.Debt_Free_status} 
                                    alt="How Debtfrie Helps Illustration" 
                                    className="w-full h-auto object-contain mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtRestructuring_card2;