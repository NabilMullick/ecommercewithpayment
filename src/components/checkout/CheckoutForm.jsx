import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { STRIPE_CARD_STYLE } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const API_URL =
  import.meta.env.MODE === "production"
    ?  import.meta.env.VITE_PROD_URL
    :  import.meta.env.VITE_LOCAL_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) return;
  
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }
  
    if (!user) {
      setError("Please login to complete your purchase.");
      return;
    }
  
    setProcessing(true);
    setError(null);
  
    try {
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      if (total <= 0) throw new Error("Invalid order total");
  
      // Step 1: Create a PaymentIntent on your backend
      const response = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total, items: cartItems, userId: user.uid }),
      });
      const { clientSecret } = await response.json();
  
      // Step 2: Confirm the payment on the client
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { email: user.email },
          },
        }
      );
  
      if (confirmError) throw confirmError;
  
      // Step 3: Create order in Firestore with payment details
      await setDoc(doc(db, "orders", paymentIntent.id), {
        userId: user.uid,
        items: cartItems,
        total,
        status: paymentIntent.status, // e.g., "succeeded"
        paymentId: paymentIntent.id,
        createdAt: new Date().toISOString(),
      });
  
      clearCart();
      navigate(ROUTES.SUCCESS);
    } catch (err) {
      setError(err.message);
      console.error("Checkout Error:", err);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <CardElement
          options={STRIPE_CARD_STYLE}
          className="p-4 border rounded-md"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md ${
          processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}>
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
