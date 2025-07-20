import React, { useState, useEffect, useRef } from 'react';
import images from '../utils/images'; // adjust path as needed
import Waves from './Waves';

const AnimatedCardsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const cardData = [
        {
            image: images.PigiBank,
            title: "Self-Savings\nModel",
            description: "Save while settling your debts.\nFor a secure financial future.",
            alt: "Savings"
        },
        {
            image: images.Calendar,
            title: "Consumer-\nFeasible Plan",
            description: "Personalized And Practical Plans Designed For Your Financial Ease.",
            alt: "Calendar"
        },
        {
            image: images.Note,
            title: "Settle Now, Pay\nLater",
            description: "We Settle Your Debts First, And Pay After - No Upfront Costs.",
            alt: "Document"
        },
        {
            image: images.Arrow,
            title: "Result-Oriented\nServices",
            description: "Focused On Reducing Your Debt And Improving Your Financial Stability.",
            alt: "Target"
        }
    ];

    return (
        <>
            <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes cardGlow {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 20px 40px rgba(51, 105, 227, 0.2);
          }
        }

        @keyframes imageRotate {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes titleGlow {
          0%, 100% {
            text-shadow: none;
          }
          50% {
            text-shadow: 0 0 20px rgba(51, 105, 227, 0.5);
          }
        }

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .animate-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }

        .animate-card-glow {
          animation: cardGlow 2s ease-in-out infinite;
        }

        .animate-image-rotate {
          animation: imageRotate 0.6s ease-in-out;
        }

        .animate-title-glow {
          animation: titleGlow 1.5s ease-in-out;
        }

        .animate-delay-1 {
          animation-delay: 0.2s;
        }

        .animate-delay-2 {
          animation-delay: 0.4s;
        }

        .animate-delay-3 {
          animation-delay: 0.6s;
        }

        .animate-delay-4 {
          animation-delay: 0.8s;
        }

        .opacity-0 {
          opacity: 0;
        }

        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card-hover-effect:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 25px 50px rgba(51, 105, 227, 0.25);
        }

        .card-image-hover {
          transition: all 0.3s ease-in-out;
        }

        .card-image-hover:hover {
          transform: scale(1.15) rotate(5deg);
        }

        .background-pattern {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(252, 212, 58, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(69, 117, 254, 0.1) 0%, transparent 50%);
        }
      `}</style>

            <div
                ref={sectionRef}
                className="w-full min-h-screen flex flex-col items-center justify-center bg-[#3369e3] relative overflow-hidden bg-hero-image"
            >
                {/* <Waves
                    lineColor="#c9c9c9"
                    waveSpeedX={0.02}
                    waveSpeedY={0.01}
                    waveAmpX={60}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                /> */}
                {/* Header section */}
                <div className="flex justify-center text-center py-10 md:py-16 px-4 z-10 sm:mb-16">
                    <h1
                        className={`text-3xl sm:text-4xl md:text-5xl text-white font-medium leading-tight ${isVisible ? 'animate-fade-up' : 'opacity-0'
                            }`}
                        style={{
                            fontFamily: 'Youth',
                            fontWeight: 900,
                            lineHeight: '100%',
                            letterSpacing: '0%',
                        }}
                    >
                        Your Path To <span className="text-yellow-400">Financial Freedom</span> With <br className="hidden sm:block" />Tailored Solutions
                    </h1>
                </div>

                {/* Cards section */}
                <div
                    className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 px-4 sm:px-8 pb-10 md:pb-20 z-10 w-full max-w-7xl"
                    style={{
                        fontFamily: 'Youth',
                        fontWeight: 900,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}
                >
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className={`
                flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 w-full sm:w-64 text-center mb-6 md:mb-0
                card-hover-effect animate-float
                ${isVisible ?
                                    (index % 2 === 0 ? `animate-slide-left animate-delay-${index + 1}` : `animate-slide-right animate-delay-${index + 1}`)
                                    : 'opacity-0'
                                }
                ${hoveredCard === index ? 'animate-card-glow' : ''}
              `}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationFillMode: 'both'
                            }}
                        >
                            <div className="mb-4 flex items-center justify-center h-24">
                                <img
                                    src={card.image}
                                    alt={card.alt}
                                    className={`
                    h-20 w-auto card-image-hover
                    ${hoveredCard === index ? 'animate-image-rotate' : ''}
                  `}
                                />
                            </div>

                            <span
                                className={`
                  text-xl sm:text-2xl font-bold mb-3
                  ${hoveredCard === index ? 'animate-title-glow' : ''}
                `}
                                style={{
                                    background: hoveredCard === index ?
                                        'linear-gradient(45deg, #3369e3, #4575FE)' : 'inherit',
                                    WebkitBackgroundClip: hoveredCard === index ? 'text' : 'unset',
                                    WebkitTextFillColor: hoveredCard === index ? 'transparent' : 'inherit',
                                    backgroundClip: hoveredCard === index ? 'text' : 'unset'
                                }}
                            >
                                {card.title.split('\n').map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                        {line}
                                        {lineIndex < card.title.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </span>

                            <span
                                className="text-sm transition-colors duration-300"
                                style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                    color: hoveredCard === index ? '#3369e3' : 'inherit'
                                }}
                            >
                                {card.description.split('\n').map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                        {line}
                                        {lineIndex < card.description.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AnimatedCardsSection;