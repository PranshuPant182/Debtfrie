import React, { useEffect, useRef, useState } from "react";
import images from "../utils/images";

const DebtResolutionCard2 = () => {
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
                threshold: 0.3, // Trigger when 30% of component is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
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
                
                @keyframes slideInRight {
                    0% {
                        transform: translateX(50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    0% {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards 0.3s;
                }

                .hidden-initially-left {
                    opacity: 0;
                    transform: translateX(-100%);
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(50px);
                }

                .hidden-initially-up {
                    opacity: 0;
                    transform: translateY(30px);
                }
            `}</style>

            {/* Main Content Section - Image and Description */}
            <div className="w-full max-w-7xl">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* Left Side - Image (Hidden on mobile, shown on desktop) */}
                    <div className="hidden lg:flex flex-1 justify-center lg:justify-start">
                        <div className={`w-full max-w-md lg:max-w-lg ${
                            isVisible ? 'animate-slideInLeft' : 'hidden-initially-left'
                        }`}>
                            <img
                                src={images.debt_Settlement_2}
                                alt="Debt Resolution Illustration"
                                className="h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Side - Question and Description */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* <div className={`${
                            isVisible ? 'animate-slideInRight' : 'hidden-initially-right'
                        }`}> */}
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '120%',
                            }}>
                                What is <span className="text-blue-600">Debt Settlement?</span>
                            </h2>
                            
                            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-8" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                Debt settlement is a specific form of debt resolution. In a debt settlement, we work with your lender to reach an agreement where you pay a lump sum or structured payments that are less than what you originally owed. The lender then considers your debt "settled" or "resolved," and forgives the remaining balance. Debt settlement can stop further interest and penalty charges, collection calls, and even legal action. It's a legal and widely accepted way to resolve unsecured debts when you're unable to pay in full.
                            </p>
                        </div>

                        {/* Key Points Section */}
                        {/* <div className={`text-left ${
                            isVisible ? 'animate-fadeInUp' : 'hidden-initially-up'
                        }`}> */}
                        <div className={`text-left`}>
                            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '120%',
                            }}>
                                Key points about Debt settlement:
                            </h3>
                            <ul className="space-y-3 text-sm sm:text-base text-gray-700" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>It is not a loan; you pay off debt with your own savings.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>The settlement amount and terms depend on Reserve Bank of India policies, OTS schemes set by the banks & NBFCs, your financial situation and the lender's policies.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Settlement may be a one-time payment, structured over a term, or include special terms like a moratorium period.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Our advocates ensure the settlement is documented and protects you from future claims.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Image - Shown only on mobile below the text */}
                        <div className={`flex lg:hidden justify-center mt-8 ${
                            isVisible ? 'animate-fadeInUp' : 'hidden-initially-up'
                        }`}>
                            <div className="w-full max-w-xs">
                                <img
                                    src={images.debt_Settlement_2_2}
                                    alt="Debt Resolution Illustration"
                                    className="h-auto object-contain mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtResolutionCard2;