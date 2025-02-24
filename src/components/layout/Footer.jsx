import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              Your one-stop shop for amazing products at great prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES.HOME}
                  className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CART}
                  className="text-gray-300 hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Email: nabil.mullick@example.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Your E-Mullick Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
