import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

export default function SuccessfulPaymentPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mt-52 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful! 🎉
      </h1>
      <p className="mt-2 text-lg">Thank you for your purchase.</p>
      <p className="mt-2 text-gray-500">You can return to the homepage.</p>

      <button
        onClick={() => navigate(ROUTES.HOME)}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Go to Homepage
      </button>
    </div>
  );
}
