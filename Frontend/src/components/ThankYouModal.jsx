import { useNavigate } from 'react-router-dom';

function ThankYouModal({ visible, onClose }) {
    const navigate = useNavigate();

    if (!visible) return null;

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in scale-100 transition-all duration-300">
                {/*  Icon */}
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/*  Headline */}
                <h2 className="text-2xl font-bold text-green-700 mb-2" style={{
                    fontFamily: 'Youth',
                    fontWeight: 900,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                }}>Thank You!</h2>

                {/*  Body Message */}
                <p className="text-gray-700 text-md mb-6 px-2"
                    style={{
                        fontFamily: 'gilroy',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '0%',
                    }}>
                    Thank you for reaching out to <span className="font-semibold text-blue-600">Debt Frie</span>.<br />
                    Our support team will get in touch with you shortly.<br />
                    We appreciate your trust!
                </p>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default ThankYouModal;