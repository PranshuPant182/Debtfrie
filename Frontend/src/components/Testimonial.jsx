import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../utils/images';

const TestimonialsSection = () => {
    const navigate = useNavigate()
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [slideDirection, setSlideDirection] = useState('left');
    const [showModal, setShowModal] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Sample testimonial data
    const testimonials = [
        {
            id: 1,
            name: "Subhajit Mandal",
            image: images.Subhajit_Mandal,
            quote: `I don't usually write reviews, but I felt compelled to share my experience with Debt Frie because they've genuinely changed my life.

When I first approached them, I was overwhelmed by debt — credit cards, personal loans, and the constant stress that comes with financial uncertainty. I'll admit, I was skeptical. I'd seen too many companies promise relief only to charge hidden fees or make matters worse. But Debt Frie proved to be different.

Every advisor I spoke with demonstrated a deep, practical understanding of financial freedom and stability — not just in theory, but in how they approached every conversation and solution. I never felt judged or pressured, only supported.

If you're struggling with debt and want genuine help from people who truly get it, I can't recommend Debt Frie enough. They don't just solve the problem — they guide you toward a stronger, more confident financial future.`,
        },
        {
            id: 2,
            name: "Rakesh Rawat",
            image: images.Rakesh_Rawat,
            quote: "सर मैडम बहुत अच्छा लगा। आप लोगों से मुझे बहुत मदद मिल रही है। Very good! बहुत-बहुत धन्यवाद आप लोगों का।",
        },
        {
            id: 3,
            name: "Sahil Gautam",
            image: images.Sahil_Gautam,
            quote: `I recently had the pleasure of working with Aditi Ma'am and Yash Sir from Debt Frie for a loan against my credit card and personal loan.

Their professionalism and expertise were truly impressive. They guided me through the entire process with clarity and care, ensuring a seamless and stress-free experience.

Their deep knowledge of loan structures, prompt communication, and exceptional negotiation skills led to highly favorable terms. I'm sincerely grateful for the efforts of the Debt Frie team and wholeheartedly recommend their services to anyone seeking trusted, effective assistance with loan recovery or restructuring.`,
        },
        {
            id: 4,
            name: "Omshanker Pandey",
            image: images.Omshanker_Pandey,
            quote: `My name is Om Shanker Pandey, and I am currently working with Debt Frie for my loan solution. I was deeply trapped in multiple loans and felt overwhelmed by the burden of financial obligations. From the very beginning, the Debt Frie team has supported me with care, professionalism, and genuine concern. Their guidance has given me hope and confidence that I'll soon be free from this financial trap. I am truly grateful to the entire supporting staff and the company for standing by me during this critical phase. Once I overcome my situation with their help, I will always remain thankful for their support.`,
        },
        {
            id: 5,
            name: "Sanjeev Kumar",
            image: images.Sanjeev_Kumar,
            quote: `I had been struggling with credit card issues for a long time, unable to even manage the minimum payments. The constant harassment through calls and messages had become overwhelming. But ever since I joined Debt Frie, everything changed. With your guidance and support, those troubling days are finally behind me.
                    No one harasses me anymore, and I'm incredibly grateful for your help in settling my credit card. Thank you so much to the entire Debt Frie team for standing by me—I truly appreciate your support.
                    `,
        },
        {
            id: 6,
            name: "Prem Jha",
            image: images.Prem_Jha,
            quote: `I had a genuinely positive experience with Debtfrie. Their approach was professional, responsive, and grounded in a clear understanding of my requirements. Every
interaction reflected a commitment to integrity and client satisfaction. I truly appreciate the clarity and support
throughout the process and would be glad to recommend their services to others seeking reliable and ethical guidance
`,
        }
    ];

    // For desktop view - positioned testimonials
    const positionedTestimonials = [
        {
            id: 1,
            name: "Subhajit Mandal",
            image: images.Subhajit_Mandal,
            quote: testimonials[0].quote,
            position: { top: '15%', left: '7%' }
        },
        {
            id: 2,
            name: "Rakesh Rawat",
            image: images.Rakesh_Rawat,
            quote: testimonials[1].quote,
            position: { top: '1%', right: '40%' }
        },
        {
            id: 3,
            name: "Sahil Gautam",
            image: images.Sahil_Gautam,
            quote: testimonials[2].quote,
            position: { top: '20%', right: '5%' }
        },
        {
            id: 4,
            name: "Omshanker Pandey",
            image: images.Omshanker_Pandey,
            quote: testimonials[3].quote,
            position: { top: '70%', right: '13%' }
        },
        {
            id: 5,
            name: "Sanjeev Kumar",
            image: images.Sanjeev_Kumar,
            quote: testimonials[4].quote,
            position: { top: '60%', left: '5%' }
        },
        {
            id: 6,
            name: "Prem Jha",
            image: images.Prem_Jha,
            quote: testimonials[5].quote,
            position: { top: '72%', left: '35%' }
        }
    ];

    const nextTestimonial = () => {
        setSlideDirection('left');
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setSlideDirection('right');
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Handle testimonial navigation
    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const truncateWords = (text, wordLimit) => {
        const words = text.trim().split(/\s+/);
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };

    // Custom indicator component
    const Indicators = () => {
        return (
            <div className="flex justify-center space-x-2 mt-4">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all ${currentTestimonial === index ? "w-6 bg-white" : "w-2 bg-white bg-opacity-50"
                            }`}
                        onClick={() => {
                            setSlideDirection(index > currentTestimonial ? 'left' : 'right');
                            setCurrentTestimonial(index);
                        }}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div ref={sectionRef} className="relative w-[100%] min-h-screen bg-[#3369e3] overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Orbs */}
                <div className={`floating-orb orb-1 ${isVisible ? 'animate-float' : 'opacity-0'}`}></div>
                <div className={`floating-orb orb-2 ${isVisible ? 'animate-float-reverse' : 'opacity-0'}`}></div>
                <div className={`floating-orb orb-3 ${isVisible ? 'animate-pulse-custom' : 'opacity-0'}`}></div>
                <div className={`floating-orb orb-4 ${isVisible ? 'animate-float' : 'opacity-0'}`}></div>
                <div className={`floating-orb orb-5 ${isVisible ? 'animate-float-reverse' : 'opacity-0'}`}></div>
                
                {/* Animated Lines */}
                <div className={`animated-line line-1 ${isVisible ? 'animate-line-move' : 'opacity-0'}`}></div>
                <div className={`animated-line line-2 ${isVisible ? 'animate-line-move' : 'opacity-0'}`}></div>
                <div className={`animated-line line-3 ${isVisible ? 'animate-line-move' : 'opacity-0'}`}></div>
                
                {/* Particles */}
                {isVisible && Array.from({ length: 20 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="particle animate-particle-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Central content */}
            <div className="flex flex-col items-center justify-start md:justify-center h-screen text-center px-4 pt-16 md:pt-0 z-50 relative">
                <h1 className={`text-3xl md:text-4xl lg:text-md xl:text-2xl 2xl:text-3xl text-white font-bold mb-4 z-50 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{
                    fontFamily: 'Youth',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                }}>
                    A name India trusts across <br />
                    every state and sectors
                </h1>
                <p className={`text-lg md:text-xl text-white max-w-2xl mb-8 z-50 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`} style={{
                    fontFamily: 'gilroy',
                    fontWeight: 400,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                }}>
                    Empowering Individuals Across Diverse Sectors <br />
                    With Proven Expertise And Results
                </p>
                <button className={`flex items-center bg-white text-black px-6 py-3 rounded-xl font-medium transition-all hover:bg-opacity-90 hover:transform hover:scale-105 z-50 ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}
                    onClick={() => {
                        navigate('/testimonial')
                    }}>
                    Read Success Stories
                    <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Desktop testimonial layout - hidden on mobile */}
            <div className="hidden md:block">
                {positionedTestimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={`
                            ${testimonial.id === 1 ? 'lg:top-[44%] lg:left-[1%] xl:top-[44%] xl:left-[8%] 2xl:top-[44%] 2xl:left-[8%]' : ''}
                            ${testimonial.id === 2 ? 'lg:hidden xl:block xl:bottom-[22%] xl:right-[5%] 2xl:bottom-[22%] 2xl:right-[8%]' : ''}
                            ${testimonial.id === 3 ? 'lg:top-[-10%] lg:left-[5%] xl:top-[0%] xl:left-[5%] 2l:top-[0%] 2xl:left-[5%]' : ''}
                            ${testimonial.id === 4 ? 'lg:bottom-[18%] lg:right-[2%] xl:top-[7%] xl:right-[2%] 2xl:top-[10%] 2xl:right-[5%]' : ''}
                            ${testimonial.id === 5 ? 'lg:bottom-[2%] lg:left-[35%] xl:bottom-[0%] xl:left-[40%] 2xl:bottom-[2%] 2xl:left-[40%]' : ''}
                            ${testimonial.id === 6 ? 'lg:top-[-10%] lg:right-[1%] xl:top-[-13%] xl:right-[35%] 2xl:top-[-8%] 2xl:right-[35%]' : ''}
                            absolute sm:mt-20 cursor-pointer ${isVisible ? 'testimonial-card' : 'opacity-0'}
                        `}
                        style={{
                            animationDelay: `${0.8 + (index * 0.3)}s`
                        }}
                        onClick={() => {
                            if (testimonial.quote) {
                                setSelectedTestimonial(testimonial);
                                setShowModal(true);
                            }
                        }}
                    >
                        {testimonial.quote ? (
                            <div className="flex max-w-xs bg-white rounded-lg p-4 mb-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:rotate-1 testimonial-hover">
                                <div className="mr-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-600 mb-2">
                                        {truncateWords(testimonial.quote, 35)}
                                        {testimonial.quote.split(/\s+/).length > 35 && (
                                            <span className="text-blue-500 ml-1 underline cursor-pointer">Read more</span>
                                        )}
                                    </p>
                                    <p className="text-xs font-semibold">- {testimonial.name}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-20 h-20 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile testimonial card - positioned at bottom */}
            <div className="md:hidden absolute bottom-16 left-4 right-4">
                {/* Navigation buttons */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10">
                    {/* Left arrow button */}
                    <button
                        onClick={prevTestimonial}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 pointer-events-auto ml-2"
                        aria-label="Previous testimonial"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>

                    {/* Right arrow button */}
                    <button
                        onClick={nextTestimonial}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 pointer-events-auto mr-2"
                        aria-label="Next testimonial"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Testimonial content with sliding effect */}
                    <div
                        className="relative h-full w-full transition-all duration-500 ease-in-out"
                        style={{
                            transform: `translateX(0)`,
                            opacity: 1
                        }}
                    >
                        <div
                            className={`transition-all duration-500 ease-in-out transform ${slideDirection === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                                }`}
                        >
                            <div className="flex p-4">
                                <div className="mr-4">
                                    <img
                                        src={testimonials[currentTestimonial].image}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">
                                        {testimonials[currentTestimonial].name}
                                    </h3>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <p
                                    className="text-gray-600 mb-2 cursor-pointer"
                                    onClick={() => {
                                        setSelectedTestimonial(testimonials[currentTestimonial]);
                                        setShowModal(true);
                                    }}
                                >
                                    {truncateWords(testimonials[currentTestimonial].quote, 75)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Indicators />
            </div>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
                /* Existing slide animations */
                @keyframes slideRight {
                    0% { transform: translateX(-100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideLeft {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                .animate-slide-right {
                    animation: slideRight 0.5s forwards;
                }
                
                .animate-slide-left {
                    animation: slideLeft 0.5s forwards;
                }

                /* Background Animations with class-based triggers */
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }

                .animate-float-reverse {
                    animation: floatReverse 6s ease-in-out infinite;
                }

                .animate-pulse-custom {
                    animation: pulse 4s ease-in-out infinite;
                }

                .animate-line-move {
                    animation: lineMove 15s linear infinite;
                }

                .animate-particle-float {
                    animation: particleFloat linear infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes floatReverse {
                    0%, 100% { transform: translateY(-10px); }
                    50% { transform: translateY(10px); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }

                @keyframes lineMove {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100vw) rotate(45deg); }
                }

                @keyframes slideRight {
                    0% { transform: translateX(-100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideLeft {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                .animate-slide-right {
                    animation: slideRight 0.5s forwards;
                }
                
                .animate-slide-left {
                    animation: slideLeft 0.5s forwards;
                }

                @keyframes particleFloat {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                }

                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes cardEntry {
                    0% { opacity: 0; transform: translateY(50px) scale(0.8); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* Floating Orbs */
                .floating-orb {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                }

                .orb-1 {
                    width: 120px;
                    height: 120px;
                    top: 10%;
                    left: 10%;
                    animation: float 8s ease-in-out infinite;
                }

                .orb-2 {
                    width: 80px;
                    height: 80px;
                    top: 20%;
                    right: 15%;
                    animation: floatReverse 6s ease-in-out infinite;
                    animation-delay: -2s;
                }

                .orb-3 {
                    width: 60px;
                    height: 60px;
                    bottom: 30%;
                    left: 20%;
                    animation: pulse 4s ease-in-out infinite;
                    animation-delay: -1s;
                }

                .orb-4 {
                    width: 100px;
                    height: 100px;
                    bottom: 10%;
                    right: 10%;
                    animation: float 10s ease-in-out infinite;
                    animation-delay: -3s;
                }

                .orb-5 {
                    width: 40px;
                    height: 40px;
                    top: 50%;
                    left: 50%;
                    animation: floatReverse 5s ease-in-out infinite;
                    animation-delay: -4s;
                }

                /* Animated Lines */
                .animated-line {
                    position: absolute;
                    height: 2px;
                    width: 200px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
                }

                .line-1 {
                    top: 25%;
                    animation: lineMove 15s linear infinite;
                    animation-delay: 0s;
                }

                .line-2 {
                    top: 65%;
                    animation: lineMove 12s linear infinite;
                    animation-delay: -5s;
                }

                .line-3 {
                    top: 85%;
                    animation: lineMove 18s linear infinite;
                    animation-delay: -10s;
                }

                /* Particles */
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255,255,255,0.6);
                    border-radius: 50%;
                    animation: particleFloat linear infinite;
                }

                /* Content Animations */
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }

                .animation-delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                }

                /* Testimonial Card Animations */
                .testimonial-card {
                    animation: cardEntry 0.8s ease-out forwards;
                    opacity: 0;
                }

                .testimonial-hover:hover {
                    transform: translateY(-5px) scale(1.05) rotate(1deg);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }

                .testimonial-hover:hover img {
                    transform: scale(1.1) rotate(-1deg);
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .floating-orb {
                        display: none;
                    }
                    
                    .animated-line {
                        display: none;
                    }
                }
            `}</style>

            {showModal && selectedTestimonial && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[80vh] max-h-[600px] relative overflow-hidden transform transition-all animate-fade-in flex flex-col">
                        {/* Header with gradient - Fixed */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative flex-shrink-0">
                            <button
                                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                                onClick={() => setShowModal(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <div className="flex items-center">
                                <div className="relative">
                                    <img
                                        src={selectedTestimonial.image}
                                        alt={selectedTestimonial.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-2xl font-bold mb-1">{selectedTestimonial.name}</h3>
                                    <div className="flex items-center mb-2">
                                        <div className="flex mr-3">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-blue-100 text-sm">Verified Customer</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8">
                                <div className="mb-6">
                                    <svg className="w-8 h-8 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>

                                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic relative">
                                    <span className="text-4xl text-blue-200 absolute -top-2 -left-2">"</span>
                                    <p className="pl-6 whitespace-pre-wrap">{selectedTestimonial.quote}</p>
                                    <span className="text-4xl text-blue-200 absolute -bottom-4 right-0">"</span>
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
            @keyframes fade-in {
                0% { opacity: 0; transform: scale(0.9) translateY(20px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>
                </div>
            )}
        </div>
    );
};

export default TestimonialsSection;
