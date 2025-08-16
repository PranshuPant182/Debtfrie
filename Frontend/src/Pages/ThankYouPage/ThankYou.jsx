import { useNavigate } from 'react-router-dom';

function ThankYouPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                {/* Success Icon */}
                <div className="mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg 
                        className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth={2} 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 
                    className="text-4xl sm:text-3xl md:text-5xl font-bold text-green-700 mb-4 animate-fade-in"
                    style={{
                        fontFamily: 'Youth, sans-serif',
                        fontWeight: 900,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}
                >
                    Thank You!
                </h1>

                {/* Message Card */}
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 mb-8 backdrop-blur-sm border border-gray-100 animate-slide-up">
                    <p 
                        className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-6"
                        style={{
                            fontFamily: 'Gilroy, sans-serif',
                            fontWeight: 400,
                            lineHeight: '150%',
                        }}
                    >
                        Thank you for reaching out to{' '}
                        <span className="font-bold text-blue-600 text-lg sm:text-xl">
                            Debt Frie
                        </span>
                        .<br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        Our expert support team will get in touch with you shortly.
                    </p>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 mb-6">
                        <p 
                            className="text-blue-800 text-sm sm:text-base font-medium"
                            style={{
                                fontFamily: 'Gilroy, sans-serif',
                                fontWeight: 500,
                            }}
                        >
                            💼 <strong>What's Next?</strong><br />
                            Our team typically responds within 2-4 business hours.<br />
                            We'll contact you via the information you provided.
                        </p>
                    </div>

                    <p 
                        className="text-gray-600 text-sm sm:text-base"
                        style={{
                            fontFamily: 'Gilroy, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                        }}
                    >
                        We appreciate your trust in our services!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleGoHome}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                        style={{
                            fontFamily: 'Gilroy, sans-serif',
                            fontWeight: 600,
                        }}
                    >
                        Back to Home
                    </button>
                </div>

            </div>

            {/* Background Decorations */}
            <div className="fixed top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="fixed bottom-10 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="fixed top-1/2 left-5 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
    );
}

export default ThankYouPage;