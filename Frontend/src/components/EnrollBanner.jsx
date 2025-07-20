import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function EnrollBanner() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideInBounce {
          0% {
            transform: translateY(50px) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateY(-10px) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-slide-bounce {
          animation: slideInBounce 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            #3b82f6,
            #60a5fa,
            #3730a3,
            #4338ca,
            #3b82f6
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>

      <div 
        ref={bannerRef}
        className="w-full flex justify-center items-center py-6 bg-gradient-to-r from-white to-blue-50"
      >
        <div
          onClick={() => navigate('/contactus')}
          className={`
            cursor-pointer text-white text-center px-8 py-4 rounded-xl shadow-lg 
            hover:scale-105 transition-all duration-300 
            shimmer-effect glow-effect
            ${isVisible ? 'animate-slide-bounce animate-pulse-slow' : 'opacity-0'}
          `}
          style={{ fontFamily: 'gilroy', fontWeight: 500 }}
        >
          <span className="relative z-10 text-lg font-semibold">
            Enroll today for just ₹49
          </span>
        </div>
      </div>
    </>
  );
}

export default EnrollBanner;