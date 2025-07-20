import React, { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import images from "../utils/images"; // adjust this path as necessary
import { useNavigate } from "react-router-dom";

const HeaderData = [
  {
    HeadingTop: (
      <>
        Achieve Financial Freedom With <span className="text-[#3369e3]">Debt</span>
        <span className="text-[#fcd43a]">Frie</span>
      </>
    ),
    HeadingBottom: (
      <>India's trusted solution for debt relief, loan settlement and financial freedom.</>),
    Image: images.HomePageBottom,
  },
  {
    HeadingTop: (<>
      Expert <span className="text-[#4575FE]">Legal Assistance</span> at Every Step
    </>),
    HeadingBottom: (
      <>
        Our team works with legal experts to ensure a smooth and compliant debt resolution.
      </>
    ),
    Image: images.HomePageBottom3,
  },
  {
    HeadingTop: (
      <>
        <span className="text-[#4575FE]">Trusted Advocates</span> for Your Debt Relief
      </>
    ),
    HeadingBottom: (<>
      Our experienced legal team ensures fair settlements and protects your rights.
    </>),
    Image: images.HomePageBottom4,
  },
  {
    HeadingTop: (<>
      <span className="text-[#4575FE]">Debt-Free</span>, Stress-Free, Worry-Free!
    </>),
    HeadingBottom: (<>
      Settle your loans, regain control, and start a financially secure future today.
    </>),
    Image: images.HomePageBottom5,
  },
];

const HeroSection = ({scrollToMiddle}) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setIsAnimating(false);
      
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % HeaderData.length);
        setIsFading(false);
        
        // Trigger new animations after content change
        setTimeout(() => {
          setIsAnimating(true);
        }, 100);
      }, 500); // fade out before switching
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = HeaderData[index];

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromTop {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes buttonGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes buttonShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-slide-top {
          animation: slideInFromTop 0.8s ease-out forwards;
        }

        .animate-slide-bottom {
          animation: slideInFromBottom 0.6s ease-out forwards;
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.7s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInFromRight 0.7s ease-out forwards;
        }

        .animate-fade-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-button-gradient {
          background: linear-gradient(45deg, #3369e3, #4575FE, #2563eb, #3369e3);
          background-size: 300% 300%;
          animation: buttonGradient 3s ease-in-out infinite;
        }

        .animate-button-shimmer {
          background: linear-gradient(
            90deg,
            #3369e3,
            #4575FE,
            #60a5fa,
            #3369e3
          );
          background-size: 200% 100%;
          animation: buttonShimmer 2s ease-in-out infinite;
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

        .text-gradient {
          background: linear-gradient(45deg, #3369e3, #4575FE, #fcd43a);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <div className="w-full flex flex-col items-center min-h-[600px] sm:min-h-[650px] lg:min-h-[700px]" >
        {/* FRONT HEADING */}
        <div className={`transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"
          }  w-full py-6 md:py-8 flex flex-col justify-center items-center sm:mt-15 px-2`}>
          
          <h1 
            className={`text-4xl sm:text-5xl text-center ${
              isAnimating && !isFading ? 'animate-slide-top' : 'opacity-0'
            }`}
            style={{
              fontFamily: 'Youth',
              fontWeight: 900,
              lineHeight: '100%',
              letterSpacing: '0%',
            }}
          >
            {current.HeadingTop}
          </h1>
          
          <br />
          
          <p 
            className={`text-[16px] sm:text-2xl text-center ${
              isAnimating && !isFading ? 'animate-slide-bottom animate-delay-1' : 'opacity-0'
            }`}
            style={{
              fontFamily: 'gilroy',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}
          >
            {current.HeadingBottom}
          </p>
        </div>

        {/* FRONT BUTTONS */}
        <div 
          className='w-full flex flex-row justify-center items-center space-x-4'
          style={{
            fontFamily: 'gilroy',
            lineHeight: '100%',
            fontWeight: 400,
            letterSpacing: '0%',
          }}
        >
          <button 
            className='animate-button-shimmer text-white px-3 font-medium py-3 sm:py-2 md:px-4 md:py-3 rounded-2xl text-sm flex items-center gap-2 hover:scale-105 transition-transform duration-300'
            onClick={() => navigate("/contactus")}
          >
            <span>GET DEBT FREE</span>
            <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <button 
            className='text-sm bg-gray-200 px-3 font-medium py-3 sm:py-2 md:px-4 md:py-3 rounded-2xl hover:bg-gray-300 hover:scale-105 transition-all duration-300' 
            onClick={scrollToMiddle}
          >
            LEARN HOW IT WORKS
          </button>
        </div>

        {/* FRONT IMAGE */}
        <div className="w-full max-w-[400px] sm:max-w-[600px] h-[350px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] relative overflow-hidden">
          <img
            src={current.Image}
            alt="Header"
            className={`absolute inset-0 h-full w-full object-cover rounded-lg transition-opacity duration-500 ease-in-out ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;