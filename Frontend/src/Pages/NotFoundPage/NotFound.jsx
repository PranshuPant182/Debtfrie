import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Layout showButton={true} showContactUsButton={true}>
            <div className="flex flex-col items-center justify-center min-h-[100vh] text-center px-4 py-20">
                <h1 className="text-9xl font-black text-[#3369e3] mb-4" style={{ fontFamily: 'Youth' }}>
                    404
                </h1>
                <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Youth' }}>
                    Oops! Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-md" style={{ fontFamily: 'gilroy' }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-[#3369e3] hover:bg-blue-700 transition-colors text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg cursor-pointer"
                    style={{ fontFamily: 'gilroy' }}
                >
                    Back to Home
                </button>
            </div>
        </Layout>
    );
};

export default NotFound;
