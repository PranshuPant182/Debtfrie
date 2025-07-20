import React, { useState, useEffect, useRef } from "react";
import images from "../utils/images";

const DebtRestructuring_card1 = () => {
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

            {/* Main Content Section - Question, Description, and Image */}
            <div className="w-full max-w-7xl sm:mb-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left Side - Question and Description */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6" style={{
                            fontFamily: 'Youth',
                            fontWeight: 900,
                            lineHeight: '120%',
                        }}>
                            Understanding <span className="text-blue-600">Debt Restructuring</span>
                        </h2>
                        
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6" style={{
                            fontFamily: 'gilroy',
                            fontWeight: 400,
                            lineHeight: '150%',
                        }}>
                            Debt restructuring involves revisiting and renegotiating the terms of your existing loans to make repayment more practical and sustainable. With the right approach, monthly obligations of EMIs can be reduced significantly—often by as much as 50%—while protecting your credit score and mental peace.
                        </p>

                        {/* Key Features Section */}
                        <div className="text-left mb-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '120%',
                            }}>
                                It can include:
                            </h3>
                            <ul className="space-y-3 text-sm sm:text-base text-gray-700" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Extending loan tenure to reduce monthly EMIs</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Lowering interest rates to ease the burden</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span><strong>Cut your monthly EMIs by up to 50%</strong>—without compromising your peace of mind.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Offering relief during financial hardship</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Realigning EMIs with current financial capacity</span>
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
                                src={images.Debt_Free} 
                                alt="Debt Restructuring Illustration" 
                                className="h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtRestructuring_card1;