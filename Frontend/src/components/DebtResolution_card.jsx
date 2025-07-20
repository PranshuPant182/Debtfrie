import React, { useEffect, useRef, useState } from "react";
import images from "../utils/images";

const DebtResolutionCard = () => {
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
                
                .animate-slideInRight {
                    animation: slideInRight 1s ease-out forwards;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .hidden-initially {
                    opacity: 0;
                    transform: translateX(-50px);
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(100%);
                }
            `}</style>
            
            {/* Main Content Section - Question, Description, and Image */}
            <div className="w-full max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left Side - Question and Description */}
                    {/* <div className={`flex-1 text-center lg:text-left ${
                        isVisible ? 'animate-slideInLeft' : 'hidden-initially'
                    }`}> */}
                    <div className={`flex-1 text-center lg:text-left`}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6" style={{
                            fontFamily: 'Youth',
                            fontWeight: 900,
                            lineHeight: '120%',
                        }}>
                            What Is <span className="text-blue-600">Debt Resolution?</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed" style={{
                            fontFamily: 'gilroy',
                            fontWeight: 400,
                            lineHeight: '150%',
                        }}>
                            Our Debt resolution program is a process where we negotiate
                            with your creditors to navigate the total amount you owe.
                            Instead of paying your full outstanding balance, we help
                            you settle your loan for a lower, agreed-upon amount in
                            accordance with RBI regulations and OTS schemes set by
                            the banks. This helps you avoid bankruptcy, stop collection
                            harassment, and get back on track financially.
                        </p>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className={`w-full max-w-xs sm:max-w-sm lg:max-w-lg ${
                            isVisible ? 'animate-slideInRight' : 'hidden-initially-right'
                        }`}>
                            <img 
                                src={images.debt_Settlement} 
                                alt="Debt Resolution Illustration" 
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtResolutionCard;