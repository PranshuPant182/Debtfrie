import React, { useEffect, useRef, useState } from "react";
import images from "../utils/images";

const DebtResolutionCard3 = () => {
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
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
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
                    animation: slideInLeft 0.8s ease-out forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 1s ease-out forwards;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards 0.2s;
                }

                .hidden-initially-left {
                    opacity: 0;
                    transform: translateX(-50px);
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(100%);
                }

                .hidden-initially-up {
                    opacity: 0;
                    transform: translateY(30px);
                }

                .stagger-1 {
                    animation-delay: 0.1s;
                }
                .stagger-2 {
                    animation-delay: 0.2s;
                }
                .stagger-3 {
                    animation-delay: 0.3s;
                }
                .stagger-4 {
                    animation-delay: 0.4s;
                }
                .stagger-5 {
                    animation-delay: 0.5s;
                }
                .stagger-6 {
                    animation-delay: 0.6s;
                }
            `}</style>

            {/* Main Content Section - Description and Image */}
            <div className="w-full max-w-7xl mb-5">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* Left Side - All Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Types of Settlements Section */}
                        <div className="text-left mb-8">
                            {/* <div className={`${
                                isVisible ? 'animate-slideInLeft' : 'hidden-initially-left'
                            }`}> */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold mb-4" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '120%',
                                }}>
                                    Types of Settlements We Can Negotiate
                                </h3>
                            </div>
                            
                            {/* <ul className="space-y-2 text-sm sm:text-base text-gray-700 mb-4" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                <li className={`flex items-start ${
                                    isVisible ? 'animate-fadeInUp stagger-1' : 'hidden-initially-up'
                                }`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>One-time settlement</span>
                                </li>
                                <li className={`flex items-start ${
                                    isVisible ? 'animate-fadeInUp stagger-2' : 'hidden-initially-up'
                                }`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Settlement with credit clearance</span>
                                </li>
                                <li className={`flex items-start ${
                                    isVisible ? 'animate-fadeInUp stagger-3' : 'hidden-initially-up'
                                }`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Settlement over a term (installments)</span>
                                </li>
                                <li className={`flex items-start ${
                                    isVisible ? 'animate-fadeInUp stagger-4' : 'hidden-initially-up'
                                }`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Moratorium period before payments start</span>
                                </li>
                                <li className={`flex items-start ${
                                    isVisible ? 'animate-fadeInUp stagger-5' : 'hidden-initially-up'
                                }`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Time-barred debt solutions</span>
                                </li>
                                <li className={`flex items-start ${
                                    isVisible ? 'animate-fadeInUp stagger-6' : 'hidden-initially-up'
                                }`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Foreclosure</span>
                                </li>
                            </ul> */}

                                                        <ul className="space-y-2 text-sm sm:text-base text-gray-700 mb-4" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}>
                                <li className={`flex items-start `}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>One-time settlement</span>
                                </li>
                                <li className={`flex items-start `}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Settlement with credit clearance</span>
                                </li>
                                <li className={`flex items-start`}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Settlement over a term (installments)</span>
                                </li>
                                <li className={`flex items-start `}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Moratorium period before payments start</span>
                                </li>
                                <li className={`flex items-start `}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Time-barred debt solutions</span>
                                </li>
                                <li className={`flex items-start `}>
                                    <span className="text-blue-600 mr-2 mt-1">•</span>
                                    <span>Foreclosure</span>
                                </li>
                            </ul>

                            
                            <div style={{ animationDelay: '0.7s' }}>
                                <p className="text-sm sm:text-base text-gray-700 font-medium" style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 500,
                                    lineHeight: '150%',
                                }}>
                                    Our advocates ensure your settlement letter matches the agreed terms and protects you from future claims.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className={`w-full max-w-md lg:max-w-lg ${
                            isVisible ? 'animate-slideInRight' : 'hidden-initially-right'
                        }`}>
                            <img
                                src={images.debt_Settlement_3_2}
                                alt="Debt Settlement Illustration"
                                className="h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtResolutionCard3;