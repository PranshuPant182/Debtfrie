import React from "react";
import images from "../utils/images";

const CardSection = () => {
    return (
        <div className="w-full min-h-screen px-4 py-10 flex flex-col items-center justify-center">
            {/* Heading Section */}
            <div className="text-center max-w-3xl px-4 mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{
                    fontFamily: 'Youth',
                    fontWeight: 900,
                    lineHeight: '120%',
                }}>
                    What Is <span className="text-blue-600">Debt Consolidation?</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-gray-700" style={{
                    fontFamily: 'gilroy',
                    fontWeight: 400,
                    lineHeight: '150%',
                }}>
                    Debt Consolidation Allows You To Combine Multiple Debts Into One—Reducing The Hassle Of
                    Managing Various Payments And Often Lowering Your Interest Rate. With Debtlife’s Expert
                    Assistance, You Can:
                </p>
            </div>

            {/* Cards Section */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 px-4 sm:px-8 pb-10 md:pb-20 z-10 w-full max-w-7xl" style={{
                fontFamily: 'Youth',
                fontWeight: 900,
                lineHeight: '100%',
                letterSpacing: '0%',
            }}>
                {/* Card 1 */}
                <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 w-full sm:w-64 text-center mb-6 md:mb-0">
                    <div className="mb-4 flex items-center justify-center h-36">
                        <img src={images.PigiBank} alt="Savings" className="h-20 w-auto" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold mb-3">Self-Savings<br />Model</span>
                    <span className="text-sm" style={{
                        fontFamily: 'gilroy',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}>Save while settling your debts.<br />For a secure financial future.</span>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 w-full sm:w-64 text-center mb-6 md:mb-0">
                    <div className="mb-4 flex items-center justify-center h-36">
                        <img src={images.Calendar} alt="Calendar" className="h-20 w-auto" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold mb-3">Consumer-<br />Feasible Plan</span>
                    <span className="text-sm" style={{
                        fontFamily: 'gilroy',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}>Personalized And Practical Plans Designed For Your Financial Ease.</span>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 w-full sm:w-64 text-center mb-6 md:mb-0">
                    <div className="mb-4 flex items-center justify-center h-36">
                        <img src={images.Note} alt="Document" className="h-20 w-auto" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold mb-3">Settle Now, Pay<br />Later</span>
                    <span className="text-sm" style={{
                        fontFamily: 'gilroy',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}>We Settle Your Debts First, And You Pay After - No Upfront Costs.</span>
                </div>

                {/* Card 4 */}
                <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 w-full sm:w-64 text-center mb-6 md:mb-0">
                    <div className="mb-4 flex items-center justify-center h-36">
                        <img src={images.Arrow} alt="Target" className="h-20 w-auto" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold mb-3">Result-Oriented<br />Services</span>
                    <span className="text-sm" style={{
                        fontFamily: 'gilroy',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}>Focused On Reducing Your Debt And Improving Your Financial Stability.</span>
                </div>
            </div>
        </div>
    )
}

export default CardSection;
