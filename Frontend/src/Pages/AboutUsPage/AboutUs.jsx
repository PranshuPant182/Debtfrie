import React, { useState, useEffect, useRef } from 'react'
import Layout from '../Layout'
import { BookOpen, ShieldCheck, Target } from 'lucide-react'
import images from '../../utils/images'

function AboutUs() {
    const [isStatsVisible, setIsStatsVisible] = useState(false);
    const [counters, setCounters] = useState({
        clients: 0,
        success: 0,
        experts: 0,
        years: 0
    });
    const statsRef = useRef(null);

    const finalValues = {
        clients: 2000,
        success: 98,
        experts: 50,
        years: 5
    };

    const animateCounters = () => {
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 steps for smooth animation
        const stepDuration = duration / steps;

        const increments = {
            clients: finalValues.clients / steps,
            success: finalValues.success / steps,
            experts: finalValues.experts / steps,
            years: finalValues.years / steps
        };

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            
            setCounters(prev => ({
                clients: Math.min(Math.floor(increments.clients * currentStep), finalValues.clients),
                success: Math.min(Math.floor(increments.success * currentStep), finalValues.success),
                experts: Math.min(Math.floor(increments.experts * currentStep), finalValues.experts),
                years: Math.min(Math.floor(increments.years * currentStep), finalValues.years)
            }));

            if (currentStep >= steps) {
                setCounters(finalValues);
                clearInterval(interval);
            }
        }, stepDuration);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isStatsVisible) {
                    setIsStatsVisible(true);
                    animateCounters();
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [isStatsVisible]);

    return (
        <>
            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    0% {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes countPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                        color: #3369e3;
                    }
                }

                @keyframes glowEffect {
                    0%, 100% {
                        text-shadow: 0 0 5px rgba(51, 105, 227, 0.3);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(51, 105, 227, 0.6);
                    }
                }

                .animate-fade-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .animate-slide-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .animate-slide-right {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-count-pulse {
                    animation: countPulse 0.6s ease-in-out;
                }

                .animate-glow {
                    animation: glowEffect 2s ease-in-out infinite;
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

                .counter-number {
                    transition: all 0.3s ease;
                }

                .stats-card {
                    transition: all 0.3s ease;
                }

                .stats-card:hover {
                    transform: translateY(-5px);
                }

                .stats-card:hover .counter-number {
                    color: #3369e3;
                    transform: scale(1.1);
                }
            `}</style>

            <Layout>
                <div>
                    <section className="w-full px-6 md:px-12 py-12 bg-white">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div className="md:w-1/2">
                                <h2 className="text-[26px] sm:text-3xl sm:text-5xl font-bold leading-snug animate-slide-left" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    Your Trusted Partner for <br />
                                    a <span className="text-blue-600">Debt-Free</span> Future
                                </h2>
                            </div>
                            <div className="md:w-1/3 text-gray-600 text-base" style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}
                            >
                                <p>
                                    At DebtFrie, we believe financial stress shouldn't define your future. If you're struggling with overdue loans or mounting debt, our expert team of advocates and financial professionals is here to guide you with dignity and clarity.

                                    We specialize in loan settlement, debt restructuring, and advisory services—offering ethical, compliant, and empathetic solutions that ease legal and emotional strain. DebtFrie bridges the gap between borrowers and lenders, helping you restore financial stability and confidence.
                                </p>
                            </div>
                        </div>

                        {/* Card Section */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                            {/* Card 1 */}
                            <div className="p-6 rounded-lg ">
                                <div className="mb-4 flex justify-start">
                                    <img src={images.Book} alt="Our Story Icon" className="w-16 h-16 object-contain animate-fade-up animate-delay-1" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-left animate-fade-up animate-delay-1" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>Our Story</h3>
                                <p className="text-sm text-gray-600 text-left" style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    Founded in 2021 by Arushi Khanna and Vanshit Kaushik during the financial turmoil of COVID-19, Debtfrie was created to help individuals overwhelmed by unsecured debt.
                                    We specialize in Loan Settlement, Debt Restructuring, and Credit Score Rebuilding, offering compassionate, personalized support tailored to each client's needs.
                                    More than a debt resolution company, Debtfrie is a financial lifeline — empowering people to overcome debt and rebuild their financial future with dignity and confidence.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="p-6 rounded-lg ">
                                <div className="mb-4 flex justify-start">
                                    <img src={images.Target} alt="Our Mission Icon" className="w-16 h-16 object-contain animate-fade-up animate-delay-1" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-left animate-fade-up animate-delay-1" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>Our Mission</h3>
                                <p className="text-sm text-gray-600 text-left" style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    Our Vision: To be India's most trusted debt resolution platform, empowering individuals to overcome financial stress and regain control of their future.<br/><br/>
                                    Our Mission: To simplify debt settlement through transparent, legal, and personalized solutions with empathetic, judgment-free support.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="p-6 rounded-lg ">
                                <div className="mb-4 flex justify-start">
                                    <img src={images.Shield} alt="What Sets Us Apart Icon" className="w-16 h-16 object-contain animate-fade-up animate-delay-2" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-left animate-fade-up animate-delay-2" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>What Sets Us Apart</h3>
                                <p className="text-sm text-gray-600 text-left" style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    What makes DebtFrie unique is our commitment to stress-free financial solutions—no hidden fees, no selling loans, just honest guidance to help you become truly debt-free.
                                </p>
                            </div>
                        </div>

                    </section>
                    <section className="w-full px-4 sm:px-8 md:px-16 py-12 bg-white">
                        {/* Image Section */}
                        <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                            <img
                                src={images.AboutUS}
                                alt="Family Banner"
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-opacity-40 flex items-end justify-start p-6 sm:p-10">
                                <h2 className="text-white text-2xl sm:text-3xl md:text-6xl font-bold leading-tight animate-slide-left animate-delay-1" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    A Debt-Free Future
                                </h2>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div ref={statsRef} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-0 text-center">
                            <div className={`stats-card flex flex-col items-center border-r border-[#3369e3] ${isStatsVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                                <h3 className={`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${isStatsVisible ? 'animate-glow' : ''}`} style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>{counters.clients}+</h3>
                                <p className="text-sm text-gray-600 mt-2"
                                    style={{
                                        fontFamily: 'gilroy',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%',
                                    }}
                                >Clients Empowered</p>
                            </div>

                            <div className={`stats-card flex flex-col items-center border-l border-r border-gray-300 sm:border-r-2 sm:border-[#3369e3] ${isStatsVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
                                <h3 className={`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${isStatsVisible ? 'animate-glow' : ''}`} style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>{counters.success}%</h3>
                                <p className="text-sm text-gray-600 mt-2"
                                    style={{
                                        fontFamily: 'gilroy',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%',
                                    }}
                                >Successful Debt Resolutions</p>
                            </div>

                            <div className={`stats-card flex flex-col items-center sm:border-r-2 sm:border-[#3369e3] ${isStatsVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
                                <h3 className={`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${isStatsVisible ? 'animate-glow' : ''}`} style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>{counters.experts}+</h3>
                                <p className="text-sm text-gray-600 mt-2"
                                    style={{
                                        fontFamily: 'gilroy',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%',
                                    }}
                                >Financial Experts</p>
                            </div>

                            <div className={`stats-card flex flex-col items-center border-l border-r border-gray-300 sm:border-none sm:border-l sm:border-r sm:border-gray-300 ${isStatsVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
                                <h3 className={`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${isStatsVisible ? 'animate-glow' : ''}`} style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>{counters.years}+</h3>
                                <p className="text-sm text-gray-600 mt-2"
                                    style={{
                                        fontFamily: 'gilroy',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%',
                                    }}
                                >Years of Expertise</p>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default AboutUs