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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Add validation for empty cart
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    // Add validation for user
    if (!user) {
      setError("Please login to complete your purchase.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);

      // Add validation for minimum purchase amount if needed
      if (total <= 0) {
        throw new Error("Invalid order total");
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw error;
      }

      // Create order in Firestore
      await setDoc(doc(db, "orders", paymentMethod.id), {
        userId: user.uid,
        items: cartItems,
        total,
        status: "completed",
        paymentId: paymentMethod.id,
        createdAt: new Date().toISOString(),
      });

      clearCart();
      navigate(ROUTES.SUCCESS);
    } catch (err) {
      setError(err.message);
      console.error("Checkout Error:", err); // Better error logging
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
