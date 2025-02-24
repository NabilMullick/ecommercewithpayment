import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <p className="text-gray-600">
            Total Amount Payable: ${cartTotal.toFixed(2)}
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
