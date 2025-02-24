import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./lib/stripe";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { TOASTER_CONFIG } from "./config/constants";
import { ROUTES } from "./config/routes";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegisterForm = lazy(() => import("./components/auth/RegisterForm"));
const PrivateRoute = lazy(() => import("./components/auth/PrivateRoute"));
const SuccessfulPaymentPage = lazy(() => import("./pages/SuccessfulPaymentPage"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path={ROUTES.HOME} element={<HomePage />} />
                      <Route path={ROUTES.LOGIN} element={<LoginForm />} />
                      <Route
                        path={ROUTES.REGISTER}
                        element={<RegisterForm />}
                      />
                      <Route
                        path={ROUTES.CART}
                        element={
                          <PrivateRoute>
                            <CartPage />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.CHECKOUT}
                        element={
                          <PrivateRoute>
                            <CheckoutPage />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.SUCCESS}
                        element={
                          <PrivateRoute>
                            <SuccessfulPaymentPage />
                          </PrivateRoute>
                        }
                      />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <Toaster toastOptions={TOASTER_CONFIG} />
              </div>
            </ErrorBoundary>
          </Elements>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
