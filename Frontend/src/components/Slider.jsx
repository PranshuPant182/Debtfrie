import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImages from "../utils/images"; // Assuming this exports an object with CheckList
import '../index.css'

const steps = [
  {
    id: 1,
    title: "Fill Up the Form",
    description:
      "Start by providing your details through our easy-to-fill form to begin your journey.",
    image: SliderImages.Checklist,
  },
  {
    id: 2,
    title: "Financial Assessment and Consultation",
    description:
      "Next, we begin by understanding your financial situation through a comprehensive financial assessment. This involves a one-on-one discussion with our financial experts, where you can share details about your existing loans and financial obligations.",
    image: SliderImages.Checklist,
  },
  {
    id: 3,
    title: "Eligibility Check",
    description:
      "Checking a client's eligibility typically involves assessing whether they meet the required criteria or not. This includes a comprehensive review of their financial history and a thorough analysis of their credit report.",
    image: SliderImages.Checklist,
  },
  {
    id: 4,
    title: "Onboarding",
    description:
      "Sign up with us. Our onboarding process involves signing a legal agreement designed to safeguard your interest.",
    image: SliderImages.Checklist,
  },
  {
    id: 5,
    title: "Savings and Negotiations",
    description:
      "You begin setting aside a portion of your income towards loan repayment, while our team of experts negotiates with banks and financial institutions to secure favourable terms aligned with your payment capacity.",
    image: SliderImages.Checklist,
  },
  {
    id: 6,
    title: "Debt free status",
    description:
      "Once all settlements or restructuring agreements are successfully executed, you achieve a debt-free status, empowering you to take full control of your financial future.",
    image: SliderImages.Checklist,
  },
];

const StepSlider = () => {
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
      <div className="md:hidden w-full flex-1 overflow-x-auto scrollbar-hide mt-7 sm:mt-0">
        <div className="flex space-x-4 pb-8 w-max px-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="min-w-[360px] max-w-[300px] text-white rounded-2xl overflow-hidden flex flex-col justify-between px-6 py-4"
              style={{
                backgroundColor: index % 2 === 0 ? "#0B1437" : "#3369e3",
                height: "480px",
              }}
            >
              {/* Step Number */}
              <div className="bg-white text-[#0B1437] w-10 h-10 flex items-center justify-center rounded-full font-medium"
                style={{
                  fontFamily: 'gilroy',
                  fontWeight: 500,
                  alignSelf: 'flex-start', // Keep it on the top left
                }}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>

              {/* Title + Description */}
              <div className="flex-1 mt-6 mb-4">
                <h3 className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: 'Youth',
                    fontWeight: 900,
                  }}
                >
                  {step.title}
                </h3>

                <p className="text-sm text-gray-200 leading-snug"
                  style={{
                    fontFamily: 'gilroy',
                    fontWeight: 400,
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div className="flex justify-end">
                <img
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  className="max-h-[160px] object-contain"
                />
              </div>
            </div>

          ))}
        </div>
      </div>

      {/* DESKTOP DESIGN - Only shown on medium screens and above */}
      <div className="hidden md:block w-full flex-1 overflow-x-auto flex-col scrollbar-hide">
        <div className="flex space-x-4 px-4 py-4 w-max">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="min-w-[60vw] text-white rounded-3xl p-6 flex relative items-center"
              style={{
                backgroundColor: index % 2 === 0 ? "#0B1437" : "#3369e3",
                height: "68vh"
              }}
            >
              {/* Top-left Step Number */}
              <div className="absolute top-6 left-6 font-semibold text-2xl bg-white text-[#0B1437] w-12 h-12 flex items-center justify-center rounded-full"
                style={{
                  fontFamily: 'gilroy',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                {`0${index + 1}`}
              </div>

              {/* Left Section: Text */}
              <div className="flex-1 pl-6 pr-4">
                <h3 className="text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'Youth',
                    fontWeight: 900,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-2xl text-gray-300 max-w-xs"
                  style={{
                    fontFamily: 'gilroy',
                    fontWeight: 400,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Right Section: Image */}
              <div className="flex-shrink-0 h-full flex items-end">
                <img
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  className="h-[80%] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepSlider;