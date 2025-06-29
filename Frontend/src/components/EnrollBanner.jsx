import { useNavigate } from 'react-router-dom';

function EnrollBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center py-6 bg-gradient-to-r from-white to-blue-50">
      <div
        onClick={() => navigate('/contactus')}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        style={{ fontFamily: 'gilroy', fontWeight: 500 }}
      >
        Enroll today for just ₹50
      </div>
    </div>
  );
}
export default EnrollBanner