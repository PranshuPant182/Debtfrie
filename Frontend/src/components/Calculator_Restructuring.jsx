import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DebtSavingsPopup from "./DebtSavingsPopup";

const DebtCalculator_Restructuring = () => {
    const nagivate = useNavigate();
    const [creditCardDebt, setCreditCardDebt] = useState(1000);
    const [personalLoanDebt, setPersonalLoanDebt] = useState(2000);
    const [showPopup, setShowPopup] = useState(false);

    const totalDebt = creditCardDebt + personalLoanDebt;
    const restructuredAmount = Math.round(totalDebt * 0.6); // 40% reduction
    const savings = totalDebt - restructuredAmount;
    const percentage = totalDebt > 0 ? (restructuredAmount / totalDebt) * 100 : 0;

    const circleRadius = 36;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const progressStroke = circleCircumference * (percentage / 100);
    const remainingStroke = circleCircumference - progressStroke;

    return (
        <div className="w-full h-auto px-4 py-10 flex flex-col items-center justify-center bg-gradient-to-r from-white to-blue-50">
            <div className="text-center mb-6 max-w-2xl mx-auto" style={{
                fontFamily: 'Youth',
                fontWeight: 900,
                lineHeight: '100%',
                letterSpacing: '0%',
            }}>
                <h2 className="text-3xl sm:text-5xl font-bold">
                    Your Path To A <span className="text-[#4575FE]">Debt-Free</span>
                </h2>
                <h2 className="text-3xl sm:text-5xl font-bold">
                    Life Starts Here
                </h2>
                <p className="text-lf mt-2 text-gray-600" style={{
                    fontFamily: 'gilroy',
                    fontWeight: 400,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                }}>
                    Track, Manage, And Clear Your Debts With Ease.
                </p>
            </div>

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-10" style={{
                fontFamily: 'gilroy',
                fontWeight: 400,
                lineHeight: '100%',
                letterSpacing: '0%',
            }}>
                {/* Credit Card Debt */}
                <div>
                    <p className="font-semibold mb-1">1. Your Current Personal Loan EMI</p>
                    <div className="relative mt-12 flex justify-center">
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="1000"
                            value={creditCardDebt}
                            onChange={(e) => setCreditCardDebt(Number(e.target.value))}
                            className="w-[75%] accent-blue-500"
                        />
                        <div className="absolute right-6 sm:right-20 -top-6 font-semibold text-black">₹{creditCardDebt}</div>
                    </div>
                </div>

                {/* Personal Loan Debt */}
                <div className="mt-8">
                    <p className="font-semibold mb-1">2. Your Credit Card EMI </p>
                    <p className="text-xs text-gray-500 mb-1">
                        Our lender rates vary from <span className="font-bold">5.20%</span> to <span className="font-bold">35.99%</span> APR
                    </p>
                    <div className="relative mt-12 flex justify-center">
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="1000"
                            value={personalLoanDebt}
                            onChange={(e) => setPersonalLoanDebt(Number(e.target.value))}
                            className="w-[75%] accent-blue-500"
                        />
                        <div className="absolute right-6 sm:right-20 -top-6 font-semibold text-black">₹{personalLoanDebt}</div>
                    </div>
                </div>

                {/* Results */}
                <div className="mt-8">
                    <p className="font-semibold mb-1">3. Check the results</p>
                    <p className="text-sm text-gray-700 mb-4">
                        Your current total EMI is <span className="font-bold">₹{totalDebt.toLocaleString()}</span>.
                        With Debtfrie, it can be restructured to just
                        <span className="font-bold">₹{restructuredAmount.toLocaleString()}</span>, saving you
                        <span className="font-bold">₹{savings.toLocaleString()}</span> monthly!
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-10">
                        {/* Circular Progress */}
                        <div className="w-30 h-30 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-30 h-30" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r={circleRadius}
                                    fill="none"
                                    stroke="#E5E7EB"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r={circleRadius}
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="8"
                                    strokeDasharray={`${progressStroke},${circleCircumference}`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                                <text
                                    x="50"
                                    y="52"
                                    textAnchor="middle"
                                    className="fill-blue-500 text-[10px] font-bold"
                                >
                                    ₹{savings.toLocaleString()}
                                </text>
                            </svg>
                        </div>

                        {/* Bar Legend & Bars */}
                        <div className="flex-1 flex flex-col justify-center space-y-4">
                            <div className="flex items-center justify-center text-sm mb-6 space-x-6">
                                <div className="flex items-center">
                                    <div className="sm:w-4 w-6 h-4 bg-black rounded-sm mr-2"></div>
                                    <span className="text-gray-500">Without Debtfrie</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="sm:w-4 w-6 h-4 bg-blue-500 rounded-sm mr-2"></div>
                                    <span className="text-gray-500">With Debtfrie</span>
                                </div>
                            </div>

                            {/* Total Debt */}
                            <div className="flex items-center justify-end space-x-2">
                                <span className="text-sm font-semibold text-black">₹{totalDebt.toLocaleString()}</span>
                                <div className="w-[85%] h-2 bg-gray-200 rounded-full">
                                    <div className="h-full bg-black w-full rounded-full"></div>
                                </div>
                            </div>

                            {/* Settlement */}
                            <div className="flex items-center justify-end space-x-2">
                                <span className="text-sm font-semibold text-black">₹{restructuredAmount.toLocaleString()}</span>
                                <div className="w-[85%] h-2 bg-blue-100 rounded-full">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        <button className="w-[50%] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold" onClick={() => setShowPopup(true)}>
                            Check Rates
                        </button>
                    </div>

                    <p className="text-xs text-center text-gray-600 mt-4">
                        Checking rate won't affect your credit score. Calculator results are for illustrative purposes only.
                    </p>
                </div>
            </div>
            {showPopup && (
                <DebtSavingsPopup
                    onClose={() => setShowPopup(false)}
                    onRedirect={() => {
                        setShowPopup(false);
                        nagivate("/contactus");
                    }}
                />
            )}
        </div>
    );
};

export default DebtCalculator_Restructuring;