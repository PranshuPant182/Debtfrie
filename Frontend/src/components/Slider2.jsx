import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImages from "../utils/images"; // Assuming this exports an object with CheckList
import '../index.css'


const steps = [
  {
    id: 1,
    title: "Personalized Debt Plan",
    description:
      "We assess your finances and design a repayment or settlement plan that fits your budget.",
    image: SliderImages.Financial_Assessment_and_Consultation,
  },
  {
    id: 2,
    title: "Expert Allocation",
    description:
      "From budgeting tools, on-call counsellors & Advocates, you get full dedicated team for your support.",
    image: SliderImages.Progress_Monitoring,
  },
  {
    id: 3,
    title: "Self-Save Model (No Loan)",
    description:
      "You set aside a part of your earnings and save them in your own account. This is your money, used only to settle your debts. Kindly note that we don't offer any loan. You repay the settlement amount from your savings.",
    image: SliderImages.Checklist,
  },
  {
    id: 4,
    title: "Expert Negotiation",
    description:
      "Our specialists negotiate with your banks and lenders to reduce your debt, waive interest, and secure the best settlement terms.",
    image: SliderImages.Financial_Assessment_and_Consultation,
  },
  {
    id: 5,
    title: "Legal & Harassment Support",
    description:
      "We protect you from Banks Harassment, guide you through legal notices and handle creditor communications on your behalf.",
    image: SliderImages.Progress_Monitoring,
  },
  {
    id: 6,
    title: "You Are Debt Free",
    description:
      "Congratulations! You are now completely debt-free and ready to embrace a more financially secure and empowered future.",
    image: SliderImages.Checklist,
  }
];

const StepSlider2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % steps.length;
      });
    }, 2000); // Auto-slide every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full h-screen flex flex-col md:pl-10">
      {/* Header - Responsive for both mobile and desktop */}
      <div className="w-full h-auto md:h-[20%] flex justify-center items-center mt-7 sm:mt-0 py-4 md:py-0"
        style={{
          fontFamily: 'Youth',
          fontWeight: 900,
          lineHeight: '100%',
          letterSpacing: '0%',
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center px-4">
          Just 6 Easy Steps To Start<br className="hidden md:block" />
          Your Journey Towards
          <span className="text-blue-500"> A Debt-</span>
          <span className="text-yellow-500">Free Life.</span>
        </h2>
      </div>

      {/* MOBILE DESIGN - Only shown on small screens */}
      <div className="md:hidden w-full flex-1 overflow-hidden mt-7 sm:mt-0">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="w-full flex justify-center items-center px-4 flex-shrink-0"
            >
              <div
                className="w-[360px] text-white rounded-2xl overflow-hidden flex flex-col px-6 py-4"
                style={{
                  backgroundColor: index % 2 === 0 ? "#0B1437" : "#3369e3",
                  height: "480px",
                }}
              >
                {/* Step Number */}
                <div className="bg-white text-[#0B1437] w-10 h-10 flex items-center justify-center rounded-full font-medium mb-6"
                  style={{
                    fontFamily: 'gilroy',
                    fontWeight: 500,
                    alignSelf: 'flex-start',
                  }}
                >
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>

                {/* Title - Fixed at top */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold"
                    style={{
                      fontFamily: 'Youth',
                      fontWeight: 900,
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Description - Fixed positioning */}
                <div className="mb-6 flex-1 flex items-start">
                  <p className="text-sm text-gray-200 leading-snug"
                    style={{
                      fontFamily: 'gilroy',
                      fontWeight: 400,
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Image - Fixed at bottom */}
                <div className="flex justify-end mt-auto">
                  <img
                    src={step.image}
                    alt={`Step ${index + 1}`}
                    className="max-h-[160px] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP DESIGN - Only shown on medium screens and above */}
      <div className="hidden md:block w-full flex-1 overflow-x-auto flex-col scrollbar-hide">
        <div
          className="flex space-x-4 px-4 py-4 w-max transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (55)}vw)`
          }}
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="min-w-[55vw] max-w-[60vw] text-white rounded-3xl p-6 flex relative overflow-hidden"
              style={{
                backgroundColor: index % 2 === 0 ? "#0B1437" : "#3369e3",
                height: "68vh"
              }}
            >
              {/* Top-left Step Number */}
              <div className="absolute top-6 left-6 font-semibold text-2xl bg-white text-[#0B1437] w-12 h-12 flex items-center justify-center rounded-full z-10"
                style={{
                  fontFamily: 'gilroy',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                {`0${index + 1}`}
              </div>

              {/* Left Section: Text Container */}
              <div className="flex-1 pl-6 pr-8 pt-20 flex flex-col max-w-[60%]">
                {/* Title - Fixed at top with margin */}
                <div className="mb-6">
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight"
                    style={{
                      fontFamily: 'Youth',
                      fontWeight: 900,
                      lineHeight: '110%',
                      letterSpacing: '0%',
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Description - Fixed positioning with better constraints */}
                <div className="flex-1 flex items-start overflow-hidden">
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed break-words"
                    style={{
                      fontFamily: 'gilroy',
                      fontWeight: 400,
                      lineHeight: '130%',
                      letterSpacing: '0%',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Right Section: Image */}
              <div className="flex-shrink-0 h-full flex items-end justify-end pr-4 pb-4 max-w-[40%]">
                <img
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  className="h-[80%] w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-2 py-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepSlider2;