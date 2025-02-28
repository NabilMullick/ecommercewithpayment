import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';
import CartPage from '../pages/CartPage';
import { ROUTES } from '../config/routes';

// Dummy Home page component that adds a product to the cart.
function DummyHome() {
  const { setCartItems } = useCart();
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() =>
          // Simulate adding a product with id, name, and price.
          setCartItems([{ id: 1, name: 'Product 1', price: 20 }])
        }
      >
        Add Product
      </button>
    </div>
  );
}

describe('Integration: Shopping Flow', () => {
  it('should update the cart and display correct order summary on CartPage', async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Routes>
            <Route path={ROUTES.HOME} element={<DummyHome />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // On the Home page, click the button to add a product.
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    // Simulate navigation to the CartPage.
    // (Depending on your app, this could be triggered by a link click.
    // Here, we simulate it by updating the browser history.)
    window.history.pushState({}, '', ROUTES.CART);

    // Re-rendering isn't automatic in our test, so we re-render our router setup.
    render(
      <CartProvider>
        <MemoryRouter initialEntries={[ROUTES.CART]}>
          <Routes>
            <Route path={ROUTES.CART} element={<CartPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // Wait for the CartPage to update and then verify the order summary.
    await waitFor(() => {
      // Check that the order summary is displayed.
      expect(screen.getByText(/order summary/i)).toBeInTheDocument();
      // Check that the subtotal line indicates 1 item.
      expect(screen.getByText(/subtotal \(1 items\):/i)).toBeInTheDocument();
      // Check that the total is correctly computed as $20.00.
      expect(screen.getByText('$20.00')).toBeInTheDocument();
    });
  });
});
