import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Phone, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DebtQuiz2 = () => {
    const questions = [
        {
            question: "How do you feel about your monthly EMIs?",
            options: [
                "A) I comfortably manage them every month.",
                "B) I struggle occasionally.",
                "C) I consistently fail to keep up.",
            ],
        },
        {
            question: "Have you ever skipped or delayed a loan or credit card payment?",
            options: [
                "A) Never",
                "B) Once or twice",
                "C) Frequently",
            ],
        },
        {
            question: "Is your monthly debt repayment higher than 50% of your income?",
            options: [
                "A) No",
                "B) Close to it",
                "C) Yes",
            ],
        },
        {
            question: "Have lenders or collection agents contacted you regarding overdue payments?",
            options: [
                "A) No",
                "B) Yes, but it's rare",
                "C) Yes, and it's causing stress",
            ],
        },
    ];

    const [answers, setAnswers] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    // Confetti Component
    const Confetti = () => {
        const [confettiPieces, setConfettiPieces] = useState([]);

        useEffect(() => {
            if (showConfetti) {
                const pieces = [];
                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
                
                for (let i = 0; i < 100; i++) {
                    pieces.push({
                        id: i,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        left: Math.random() * 100,
                        animationDelay: Math.random() * 1,
                        animationDuration: 2 + Math.random() * 1,
                    });
                }
                setConfettiPieces(pieces);

                const timer = setTimeout(() => {
                    setShowConfetti(false);
                    setConfettiPieces([]);
                }, 5000);

                return () => clearTimeout(timer);
            }
        }, [showConfetti]);

        if (!showConfetti) return null;

        return (
            <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
                {confettiPieces.map((piece) => (
                    <div
                        key={piece.id}
                        className="absolute w-2 h-2 opacity-80"
                        style={{
                            left: `${piece.left}%`,
                            backgroundColor: piece.color,
                            animationDelay: `${piece.animationDelay}s`,
                            animationDuration: `${piece.animationDuration}s`,
                            animation: `confetti-fall ${piece.animationDuration}s ${piece.animationDelay}s ease-out forwards`,
                            borderRadius: Math.random() > 0.5 ? '50%' : '0',
                        }}
                    />
                ))}
                <style jsx>{`
                    @keyframes confetti-fall {
                        0% {
                            transform: translateY(-100vh) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `}</style>
            </div>
        );
    };

    const handleOptionSelect = (questionIndex, optionIndex) => {
        setAnswers({ ...answers, [questionIndex]: optionIndex });
    };

    const calculateResults = () => {
        const answerCounts = { A: 0, B: 0, C: 0 };
        Object.values(answers).forEach(answer => {
            if (answer === 0) answerCounts.A++;
            else if (answer === 1) answerCounts.B++;
            else if (answer === 2) answerCounts.C++;
        });

        const maxCount = Math.max(answerCounts.A, answerCounts.B, answerCounts.C);
        const dominantAnswers = Object.keys(answerCounts).filter(key => answerCounts[key] === maxCount);

        if (dominantAnswers.includes('A') && answerCounts.A >= 2) {
            return {
                title: "You're in Control! 💪",
                message: "You're in a stable position—just keep monitoring your finances and maintaining good habits.",
                type: "success"
            };
        } else if (dominantAnswers.includes('B') || (answerCounts.A > 0 && answerCounts.B > 0)) {
            return {
                title: "Room for Improvement 📈",
                message: "You may benefit from EMI realignment or temporary relief—Debtfrie can help you explore options to make your finances more manageable.",
                type: "warning"
            };
        } else {
            return {
                title: "Time to Take Control! 🚀",
                message: "It's time to take control. Debtfrie offers customized support, legal protection, and restructuring tools to help you breathe easier.",
                type: "info"
            };
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSubmitting(false);
        setShowConfetti(true);
        setTimeout(() => setShowPopup(true), 100);
    };

    const handleContactUs = () => {
        console.log("Navigating to contact page");
        setShowPopup(false);
        setShowConfetti(false);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowConfetti(false);
    };

    const isFormComplete = Object.keys(answers).length === questions.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <Confetti />

            {/* Compact Header Section */}
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
                        <Shield className="w-3 h-3" />
                        Financial Assessment
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Paying monthly EMIs is a headache?
                    </h1>
                    <p className="text-sm text-gray-600 max-w-xl mx-auto">
                        Take this quick self-assessment to find out how restructuring could change your financial future.
                    </p>
                </div>
            </div>

            {/* Compact Quiz Content */}
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        {/* Compact Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-600">Progress</span>
                                <span className="text-xs font-medium text-gray-600">
                                    {Object.keys(answers).length}/{questions.length}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Compact Questions */}
                        <div className="space-y-5">
                            {questions.map((q, qIndex) => (
                                <div key={qIndex} className="border-b border-gray-100 pb-5 last:border-b-0">
                                    <h3 className="text-base font-semibold text-gray-900 mb-3 leading-tight">
                                        {qIndex + 1}. {q.question}
                                    </h3>
                                    <div className="space-y-2">
                                        {q.options.map((option, oIndex) => (
                                            <label 
                                                key={oIndex} 
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 hover:shadow-sm ${
                                                    answers[qIndex] === oIndex 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${qIndex}`}
                                                    value={oIndex}
                                                    checked={answers[qIndex] === oIndex}
                                                    onChange={() => handleOptionSelect(qIndex, oIndex)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700 flex-1">
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Compact Submit Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleSubmit}
                                disabled={!isFormComplete || isSubmitting}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    isFormComplete && !isSubmitting
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Get My Results
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Results Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
                    <div className="bg-white p-6 rounded-xl max-w-md w-full text-center shadow-xl transform animate-bounce-in">
                        {(() => {
                            const result = calculateResults();
                            
                            return (
                                <>
                                    <div className="mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                                            🌟 Your Results
                                        </h2>
                                        <h3 className="text-base font-semibold text-blue-600 mb-2">
                                            {result.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {result.message}
                                        </p>
                                    </div>
                                    
                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
                                            <h4 className="text-sm font-bold text-gray-800 mb-1">
                                                Take the First Step Today
                                            </h4>
                                            <p className="text-gray-700 text-xs leading-relaxed">
                                                Book your <strong className="text-blue-600">₹49 consultation</strong> and discover how restructuring can change your financial future.
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                                            <button
                                                onClick={() => navigate('/contactus')}
                                                className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                            >
                                                <Phone className="w-3 h-3" />
                                                Book Consultation
                                            </button>
                                            <button
                                                onClick={handleClosePopup}
                                                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm border border-gray-200 transition-colors"
                                            >
                                                Maybe Later
                                            </button>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes bounce-in {
                    0% {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.8;
                    }
                    70% {
                        transform: scale(0.9);
                        opacity: 0.9;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-bounce-in {
                    animation: bounce-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default DebtQuiz2;