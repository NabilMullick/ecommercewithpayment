import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../config/routes";
import { useCart } from "../../context/CartContext";
import { CartIcon } from "../Icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="bg-white border-b shadow">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={ROUTES.HOME} className="text-xl font-bold text-gray-800">
            E-Mullick Store
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to={ROUTES.CART}
              className="relative text-gray-800 hover:text-blue-600 transition-colors">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {itemCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <span className="text-gray-600 truncate max-w-[150px]">
                  {user.email}
                </span>

                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
