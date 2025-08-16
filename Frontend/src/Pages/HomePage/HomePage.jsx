import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import images from '../../utils/images'
import { ShieldCheck } from 'lucide-react'
import Footer from '../../components/Footer'
import FAQAccordion from '../../components/Faq'
import TestimonialsSection from '../../components/Testimonial'
import BlogSection from '../../components/BlogSection'
import StepSlider from '../../components/Slider'
import DebtCalculator from '../../components/Calculator'
import HeroSection from '../../components/Top'
import { useNavigate } from 'react-router-dom'
import EnrollBanner from '../../components/EnrollBanner'
import VideoMarqueeSection from '../../components/VideoMarqueeSection'
import AnimatedCardsSection from '../../components/AnimatedCardsSection'
import Banner from '../../components/Banner'


function HomePage() {
    const [showPopup, setShowPopup] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);
    const featuresRef = useRef(null);
    const textRef = useRef(null);
    const navigate = useNavigate();

    const scrollToMiddle = () => {
        targetRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Layout>
            <div className=''>
                {/* Add CSS for animations */}
                <style jsx>{`
                    @keyframes slideInFromRight {
                        0% {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }

                    @keyframes slideInFromLeft {
                        0% {
                            transform: translateX(-100%);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }

                    @keyframes slideInFromTop {
                        0% {
                            transform: translateY(-100%);
                            opacity: 0;
                        }
                        100% {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    @keyframes slideInFromBottom {
                            100% {
                            transform: translateY(0);
                            opacity: 1;
                        }
                        0% {
                            transform: translateY(-100%);
                            opacity: 0;
                        }
                    }
                        

                    .animate-slide-right {
                        animation: slideInFromRight 0.8s ease-out forwards;
                    }

                    .animate-slide-left {
                        animation: slideInFromLeft 0.8s ease-out forwards;
                    }
                    .animate-slide-top {
                        animation: slideInFromTop 0.8s ease-out forwards;
                    }

                    .animate-slide-bottom {
                        animation: slideInFromBottom 0.8s ease-out forwards;
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

                    .opacity-0 {
                        opacity: 0;
                    }
                `}</style>

                {/*FRONT HEADING */}
                <HeroSection scrollToMiddle={scrollToMiddle} />

                {/* MOBILE IMAGE */}
                {/* HOW WE CAN HELP YOU */}
                <div ref={targetRef} className="w-full  bg-[#3369e3]">
                    {/* Desktop Layout - 3 columns */}
                    <div className="hidden sm:grid sm:grid-cols-3 sm:h-[90%]">
                        {/* COL 1 HEADING - Desktop only */}
                        <div className="flex justify-center items-center">
                            <div className={`w-[100%] flex justify-center items-center ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
                                <span className="text-5xl text-white font-bold" style={{
                                    fontFamily: 'Youth',
                                    fontWeight: 900,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    How Debtfrie Can <br /> Help You?
                                </span>
                            </div>
                        </div>

                        {/* COL 2 IMAGE - Visible on both */}
                        <div className="relative py-12 flex justify-center items-center -mt-[228px]">
                            {/* Phone Image */}
                            <img
                                src={images.phone}
                                alt="Header"
                                className="h-auto max-w-xs object-contain rounded-lg"
                            />

                            {/* Overlayed Content - full height layout inside phone */}
                            <div className="absolute top-1/2 left-1/2 w-[80%] max-w-[240px] h-[550px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center px-4 py-5 text-center">
                                <div
                                    ref={textRef}
                                    className={`absolute bottom-[230px] ${isVisible ? 'animate-slide-top' : 'opacity-0'}`}
                                    style={{
                                        fontFamily: 'gilroy',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%',
                                    }}
                                >
                                    <p className="text-xl text-white font-medium leading-snug">
                                        Here to heal your<br />
                                        financial worries with<br />
                                        care and a smile, one<br />
                                        solution at a time.
                                    </p>
                                </div>

                                <div className="w-full flex flex-col gap-3 absolute bottom-8">
                                    <button className="bg-white text-[#3369e3] py-2 rounded-full text-sm font-semibold w-full cursor-pointer"
                                        onClick={() => navigate('/contactus')}>
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* COL 3 FEATURES - Desktop only */}
                        <div
                            ref={featuresRef}
                            className="flex flex-col justify-center space-y-16 text-white p-20"
                            style={{
                                fontFamily: 'gilroy',
                                fontWeight: 400,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}
                        >
                            <div className={`flex items-center ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
                                <div className="w-12 flex-shrink-0">
                                    <img src={images.Auction} className="w-full h-full" alt="Auction Icon" />
                                </div>
                                <div className="ml-6">
                                    <span className="text-3xl">Expert Legal Guidance</span>
                                </div>
                            </div>
                            <div className={`flex items-center ${isVisible ? 'animate-slide-right animate-delay-1' : 'opacity-0'}`}>
                                <div className="w-12 flex-shrink-0">
                                    <ShieldCheck size={50} />
                                </div>
                                <div className="ml-6">
                                    <span className="text-3xl">Protection from Harassment</span>
                                </div>
                            </div>
                            <div className={`flex items-center ${isVisible ? 'animate-slide-right animate-delay-2' : 'opacity-0'}`}>
                                <div className="w-12 flex-shrink-0">
                                    <img src={images.Idea} className="w-full h-full" alt="Idea Icon" />
                                </div>
                                <div className="ml-6">
                                    <span className="text-3xl">Tailored Debt Solutions</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout - Stack vertically */}
                    <div className="sm:hidden relative flex flex-col items-center px-4 py-8">
                        {/* Mobile Image */}
                        <div className="bg-[#3369e3] py-4 flex justify-center">
                            <img
                                src={images.phone}
                                alt="Header"
                                className="h-auto max-w-44 object-contain rounded-lg relative bottom-36"
                            />
                        </div>
                        <div className="b absolute top-18 left-1/2 w-[80%] max-w-[240px] h-[550px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center px-4 py-5 text-center z-50">
                            <div
                                className={`absolute bottom-[230px] ${isVisible ? 'animate-slide-top' : 'opacity-0'}`}
                                style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}
                            >
                                <p className="text-sm text-white font-medium leading-snug">
                                    Here to heal your<br />
                                    financial worries with<br />
                                    care and a smile, one<br />
                                    solution at a time.
                                </p>
                            </div>

                            <div className="w-full flex justify-center items-center gap-2 absolute bottom-30">
                                <button className="bg-white w-1/2 text-[#3369e3] py-1 rounded-full text-sm font-semibold cursor-pointer"
                                    onClick={() => navigate('/contactus')}>
                                    Enroll Now
                                </button>
                            </div>
                        </div>

                        {/* Main Heading - Below image */}
                        <div className={`-mt-36 text-center ${isVisible ? 'animate-slide-top' : 'opacity-0'}`}>
                            <span className="text-2xl text-white font-bold" style={{
                                fontFamily: 'Youth',
                                fontWeight: 900,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                            }}>
                                How Debtfrie Can Help You?
                            </span>
                        </div>

                        {/* Feature Items - Below main heading */}
                        <div className="w-full mt-10 flex flex-col space-y-8 text-white">
                            <div className="w-full text-white">
                                {/* First row - All icons */}
                                <div className={`flex flex-row justify-around items-center ${isVisible ? 'animate-slide-bottom' : 'opacity-0'}`}>
                                    <div className="w-10 flex-shrink-0">
                                        <img src={images.Auction} className="w-full h-full" alt="Auction Icon" />
                                    </div>
                                    <div className="w-10 flex-shrink-0">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <div className="w-10 flex-shrink-0">
                                        <img src={images.Idea} className="w-full h-full" alt="Idea Icon" />
                                    </div>
                                </div>

                                {/* Second row - All headings */}
                                <div className={`flex flex-row justify-around items-start text-center mt-4  ${isVisible ? 'animate-slide-bottom' : 'opacity-0'}`} style={{
                                    fontFamily: 'gilroy',
                                    fontWeight: 400,
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                }}>
                                    <div className="w-1/3 px-2">
                                        <span className="text-base">Expert Legal Guidance</span>
                                    </div>
                                    <div className="w-1/3 px-2">
                                        <span className="text-base">Protection from Harassment</span>
                                    </div>
                                    <div className="w-1/3 px-2">
                                        <span className="text-base">Tailored Debt Solutions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <EnrollBanner />

                <Banner />

                {/* CALCULATOR */}
                <DebtCalculator />

                <div className="w-full sm:min-h-screen bg-white relative overflow-hidden">
                    <VideoMarqueeSection />
                </div>

                <AnimatedCardsSection />

                {/* TESTIMONIAL */}
                <TestimonialsSection />

                <EnrollBanner />

                {/* 6 STEPS SLIDE */}
                <StepSlider />

                {/* BLOG */}
                <BlogSection title={true} />

                {/* FAQ */}
                <FAQAccordion limit={3} showButton={true} />
                {showPopup && (
                    <div className="fixed inset-0 bg-transparent backdrop-blur-md backdrop-saturate-150 flex justify-center items-center z-[9999] animate-fade-in">
                        <div className="bg-white p-8 rounded-2xl max-w-md w-[90%] text-center shadow-2xl relative">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Youth' }}>
                                Quick Question
                            </h2>
                            <p className="text-md text-gray-600 mb-2" style={{ fontFamily: 'gilroy' }}>
                                Are you facing difficulties in paying off your <span className="font-semibold text-blue-600">EMIs</span>?
                            </p>
                            <p className="text-blue-600 font-semibold text-sm mb-6" style={{ fontFamily: 'gilroy' }}>
                                Register now for just ₹49!
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => navigate('/contactus')}
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-full font-semibold shadow"
                                >
                                    Yes, I need help
                                </button>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="bg-gray-200 hover:bg-gray-300 transition text-gray-800 px-5 py-2 rounded-full font-medium shadow"
                                >
                                    No, I'm good
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default HomePage