import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CartPage from '../pages/CartPage'; // adjust path as needed
import { CartContext } from '../context/CartContext';

// Mock useNavigate to capture navigation calls
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Helper function to render with CartContext and router
const renderWithProviders = (ui, { cartContextValue } = {}) => {
  return render(
    <CartContext.Provider value={cartContextValue}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </CartContext.Provider>
  );
};

describe('CartPage Component', () => {
  afterEach(() => {
    // Clear navigation mock calls between tests
    mockedNavigate.mockClear();
  });

  test('renders empty cart view when cart is empty', () => {
    const cartContextValue = {
      cartItems: [],
      itemCount: 0,
      cartTotal: 0,
    };

    renderWithProviders(<CartPage />, { cartContextValue });

    // Verify the empty cart message and link are rendered
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /continue shopping/i })
    ).toBeInTheDocument();
    // "Proceed to Checkout" button should not appear when the cart is empty
    expect(
      screen.queryByRole('button', { name: /proceed to checkout/i })
    ).not.toBeInTheDocument();
  });

  test('renders order summary and handles navigation when cart has items', () => {
    // Provide a sample cart state with one item
    const cartContextValue = {
      cartItems: [{ id: '1', name: 'Item 1' }],
      itemCount: 1,
      cartTotal: 25.5,
    };

    renderWithProviders(<CartPage />, { cartContextValue });

    // Check that order summary is rendered
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    expect(
      screen.getByText(/subtotal \(1 items\):/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$25.50/)).toBeInTheDocument();

    // Simulate clicking the "Proceed to Checkout" button
    const checkoutButton = screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
    expect(checkoutButton).toBeEnabled();
    fireEvent.click(checkoutButton);
    // Assuming ROUTES.CHECKOUT is '/checkout'
    expect(mockedNavigate).toHaveBeenCalledWith('/checkout');

    // Simulate clicking the "Continue Shopping" button
    const continueButton = screen.getByRole('button', {
      name: /continue shopping/i,
    });
    fireEvent.click(continueButton);
    // Assuming ROUTES.HOME is '/'
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
