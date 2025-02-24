import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "../components/cart/Cart";
import { ROUTES } from "../config/routes";

export default function CartPage() {
  const { cartItems, itemCount, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to={ROUTES.HOME}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Cart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="mt-8 border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items):</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate(ROUTES.CHECKOUT)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate(ROUTES.HOME)}
                  className="w-full bg-white text-blue-600 border border-blue-600 py-3 px-4 rounded-md hover:bg-blue-50 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
