import React, { useState, useEffect, useRef } from 'react';
import images from '../utils/images';

const DebtRestructuringHero = ({ onGetStarted }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animateText, setAnimateText] = useState(false);
    const [animateSubtext, setAnimateSubtext] = useState(false);
    const [animateButton, setAnimateButton] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    // Staggered animation sequence
                    setTimeout(() => setAnimateText(true), 200);
                    setTimeout(() => setAnimateSubtext(true), 800);
                    setTimeout(() => setAnimateButton(true), 1200);
                }
            },
            { threshold: 0.2 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    // Split text animation component
    const AnimatedText = ({ text, className, delay = 0 }) => {
        const words = text.split(' ');

        return (
            <span className={className}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={`inline-block transform transition-all duration-800 ease-out ${animateText
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-10 opacity-0'
                            }`}
                        style={{
                            transitionDelay: `${delay + index * 100}ms`
                        }}
                    >
                        {word}
                        {index < words.length - 1 && '\u00A0'}
                    </span>
                ))}
            </span>
        );
    };

    // Character animation for subtitle with enhanced effects
    const AnimatedSubtext = ({ text, className }) => {
        const words = text.split(' ');

        return (
            <span className={className}>
                {words.map((word, wordIndex) => (
                    <span
                        key={wordIndex}
                        className={`inline-block transform transition-all duration-800 ease-out ${animateSubtext
                                ? 'translate-y-0 opacity-100 rotate-0 scale-100'
                                : 'translate-y-12 opacity-0 rotate-3 scale-95'
                            }`}
                        style={{
                            transitionDelay: `${wordIndex * 150}ms`
                        }}
                    >
                        {word.split('').map((char, charIndex) => (
                            <span
                                key={charIndex}
                                className={`inline-block transform transition-all duration-600 ease-out ${animateSubtext
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-8 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: `${wordIndex * 150 + charIndex * 50}ms`
                                }}
                            >
                                {char}
                            </span>
                        ))}
                        {wordIndex < words.length - 1 && (
                            <span
                                className={`inline-block transform transition-all duration-600 ease-out ${animateSubtext ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: `${wordIndex * 150 + word.length * 50}ms`
                                }}
                            >
                                &nbsp;
                            </span>
                        )}
                    </span>
                ))}
            </span>
        );
    };

    return (
        <div
            ref={heroRef}
            className="w-full min-h-screen bg-[#fff9da] flex flex-col lg:flex-row items-center justify-between overflow-hidden"
        >
            {/* Left Section: Text */}
            <div className="flex-1 space-y-6 px-6 sm:px-12 py-10 lg:pl-30 mt-10 sm:mt-0">
                {/* Badge */}
                {/* <div className={`transform transition-all duration-800 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}>
                    <p
                        className="text-sm text-[#3369E3] font-medium mb-2"
                        style={{ fontFamily: 'gilroy' }}
                    >
                        Best Debt Relief Solution
                    </p>
                </div> */}

                {/* Main Heading */}
                <h1
                    className="text-3xl sm:text-6xl font-extrabold text-[#111827] mb-4 leading-tight"
                    style={{ fontFamily: 'Youth' }}
                >
                    <div className="mb-2">
                        <AnimatedText
                            text="DEBT RESTRUCTURING"
                            className="text-4xl sm:text-5xl block"
                            delay={0}
                        />
                    </div>
                    <div>
                        <AnimatedText
                            text="Break Free from Debt with Debtfrie"
                            className="text-4xl sm:text-4xl text-[#3369E3] block"
                            delay={400}
                        />
                    </div>
                </h1>

                {/* Subtitle */}
                <div className="mb-6 overflow-hidden">
                    <div className={`transform transition-all duration-1000 ease-out ${animateSubtext
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-10 opacity-0'
                        }`}>
                        <p
                            className="text-[#4B5563] text-sm sm:text-base w-full"
                            style={{ fontFamily: 'gilroy' }}
                        >
                            <AnimatedSubtext
                                text="Are rising EMIs and escalating interest charges keeping you financially confined? You’re not alone. Millions across India face similar challenges. Debtfrie, one of the country’s fastest-growing fintech platforms in debt management, is committed to helping individuals regain control of their finances with dignity. We offer expert guidance, legal support, and technology-driven solutions to help you restructure your debt and rebuild your financial future."
                                className="text-lg sm:text-xl font-semibold"
                            />
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className={`transform transition-all duration-1000 ease-out ${animateButton
                        ? 'translate-y-0 opacity-100 scale-100 rotate-0'
                        : 'translate-y-10 opacity-0 scale-90 rotate-2'
                    }`}>
                    <button
                        className="bg-[#3369e3] hover:bg-[#2558d6] text-white text-sm px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl transform hover:rotate-1 active:scale-95 group"
                        style={{ fontFamily: 'gilroy' }}
                        onClick={onGetStarted || (() => console.log('Navigate to contact us'))}
                    >
                        <span className="transition-all duration-300 group-hover:tracking-wider">GET STARTED</span>
                        <span className="text-white text-lg transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125">
                            →
                        </span>
                    </button>
                </div>
            </div>

            {/* Right Section: Image */}
            <div className="flex-1 w-full h-full p-0 relative overflow-hidden">
                <div className={`transform transition-all duration-1200 ease-out ${isVisible
                        ? 'translate-x-0 opacity-100 scale-100'
                        : 'translate-x-20 opacity-0 scale-105'
                    }`}>
                    <img
                        src={images.Men}
                        alt="Hero Visual"
                        className="w-full h-full object-cover p-0 m-0 mt-9 sm:mt-32 hover:scale-105 transition-transform duration-700"
                    />

                    {/* Floating elements for visual enhancement */}
                    <div className={`absolute top-20 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-20 transition-all duration-1000 ${isVisible ? 'animate-bounce' : ''
                        }`}></div>
                    <div className={`absolute bottom-32 left-10 w-12 h-12 bg-orange-200 rounded-full opacity-30 transition-all duration-1000 delay-500 ${isVisible ? 'animate-pulse' : ''
                        }`}></div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default DebtRestructuringHero;