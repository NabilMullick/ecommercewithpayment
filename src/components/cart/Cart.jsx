import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function Cart() {
  const { cartItems, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <div className="space-x-3">
          <button
            onClick={clearCart}
            className="bg-red-200 px-3 py-1.5 rounded-lg font-medium">
            Clear Cart
          </button>
          <span className="text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="text-blue-600 hover:text-blue-700 underline">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Subtotal</div>
              <div className="text-center">Actions</div>
            </div>

            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
