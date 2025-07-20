import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Phone, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DebtQuiz = () => {
    const questions = [
        {
            question: "The Urgent Call: A creditor rings up, demanding you pay right now. What's your move?",
            options: [
                "A) Pay instantly—anything for peace!",
                "B) Stay cool, ask for written proof, and call in DEBTFRIE's experts.",
                "C) Hit \"ignore\" and hope they vanish.",
            ],
        },
        {
            question: "The Juggling Act: You're spinning plates with multiple loans and credit cards. What's your game plan?",
            options: [
                "A) Grab another loan to cover the old ones.",
                "B) Sort your debts, set priorities, and team up with DEBTFRIE for a plan.",
                "C) Cross your fingers and hope it all works out.",
            ],
        },
        {
            question: "The Legal Notice: A legal letter lands in your mailbox about overdue payments. What's your next step?",
            options: [
                "A) Panic and borrow from anyone who'll help.",
                "B) Snap a pic and send it to DEBTFRIE for expert support.",
                "C) Toss it aside and hope it's a mistake.",
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

        if (dominantAnswers.includes('B') && answerCounts.B >= 2) {
            return {
                title: "You're a Debt Defender! 🛡️",
                message: "Smart, proactive, and ready to win. With DEBTFRIE, you'll reach debt freedom even faster.",
                type: "success"
            };
        } else if (dominantAnswers.length > 1 || (answerCounts.A > 0 && answerCounts.B > 0 && answerCounts.C > 0)) {
            return {
                title: "You're on the Right Track! 📈",
                message: "You're trying, but there's room to sharpen your strategy. Let DEBTFRIE give you the tools and confidence to take control.",
                type: "warning"
            };
        } else {
            return {
                title: "No Judgment—Debt is Tough! 💪",
                message: "But you don't have to face it alone. DEBTFRIE's friendly experts are just a click away to help you turn things around.",
                type: "info"
            };
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        
        // Trigger confetti effect
        setShowConfetti(true);
        
        // Show popup after a brief delay to let confetti start
        setTimeout(() => {
            setShowPopup(true);
        }, 200);
    };


    const handleClosePopup = () => {
        setShowPopup(false);
        setShowConfetti(false);
    };

    const isFormComplete = Object.keys(answers).length === questions.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            {/* Confetti Effect */}
            <Confetti />

            {/* Compact Header Section */}
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
                        <Shield className="w-3 h-3" />
                        Financial Assessment
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        How Debt-Savvy Are You?
                    </h1>
                    <p className="text-sm text-gray-600 max-w-xl mx-auto">
                        Take our quick assessment to discover your debt management style and get personalized recommendations
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
                                                Book your <strong className="text-blue-600">₹49 consultation</strong> and start your journey to financial freedom.
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <button
                                                onClick={()=> navigate('/contactus')}
                                                className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                            >
                                                <Phone className="w-3 h-3" />
                                                Book Consultation
                                            </button>
                                            <button
                                                onClick={handleClosePopup}
                                                className="bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors text-gray-700 px-4 py-2 rounded-lg font-medium text-sm border border-gray-200"
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
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
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

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default DebtQuiz;