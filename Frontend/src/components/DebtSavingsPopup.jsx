import React from 'react';

const DebtSavingsPopup = ({ onClose, onRedirect }) => {
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md backdrop-saturate-150 flex justify-center items-center z-[9999] animate-fade-in px-4">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative">
        {/* Header */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: 'Youth' }}
        >
          Congratulations!
        </h2>

        {/* Main Message */}
        <p
          className="text-md sm:text-lg text-gray-600 mb-2"
          style={{ fontFamily: 'gilroy' }}
        >
          You've successfully reduced your estimated debt by <span className="font-semibold text-blue-600">70%</span>.
        </p>

        {/* Call to Action */}
        <p
          className="text-blue-600 font-semibold text-sm mb-6"
          style={{ fontFamily: 'gilroy' }}
        >
          Talk to our expert now — just ₹49!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={onRedirect}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full font-semibold shadow"
          >
            Connect with Expert
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 transition text-gray-800 px-6 py-2 rounded-full font-medium shadow"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebtSavingsPopup;
