import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../features/cart/cartContext';
import { API_BASE_URL } from '../api';
import '../styles/pages.css';

// Keep in sync with FREE_SHIPPING_THRESHOLD_CENTS in server/routes/checkout.js
const FREE_SHIPPING_THRESHOLD = 40;

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [removingIds, setRemovingIds] = useState([]);

  const FADE_DURATION_MS = 300;

  const handleRemove = (id) => {
    setRemovingIds(ids => [...ids, id]);
    setTimeout(() => removeFromCart(id), FADE_DURATION_MS);
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      handleRemove(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const qualifiesForFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const freeShippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
        }),
      });
      if (!res.ok) throw new Error('Could not start checkout. Please try again.');
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="cart-page py-5">
        <div className="cart-empty">
          <p className="cart-empty-title">Your cart is empty</p>
          <p className="cart-empty-sub">Nothing here yet - the shop is waiting!</p>
          <Link to="/shop" className="btn btn-lofi-main">Browse the Shop</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="cart-page py-5">
      <h1 className="cart-heading">Shopping Cart</h1>

      <Row className="g-4">
        <Col lg={8}>
          <div className="cart-items">
            {cart.map(item => (
              <div
                className={`cart-item ${removingIds.includes(item.id) ? 'cart-item-removing' : ''}`}
                key={item.id}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumb"
                  />
                )}
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  {item.category && (
                    <span className="cart-item-category">{item.category}</span>
                  )}
                </div>

                <div className="cart-item-stepper">
                  <button
                    className="cart-stepper-btn"
                    onClick={() => handleDecrease(item)}
                    aria-label="Decrease quantity"
                  >−</button>
                  <span className="cart-stepper-val">{item.quantity}</span>
                  <button
                    className="cart-stepper-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>

                <span className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  className="cart-item-remove"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.name}`}
                >×</button>
              </div>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          <div className="cart-summary">
            <h3 className="cart-summary-heading">Order Summary</h3>

            <div className="free-shipping-banner">
              <p className={`free-shipping-message ${qualifiesForFreeShipping ? 'free-shipping-message-earned' : ''}`}>
                {qualifiesForFreeShipping
                  ? "You've unlocked free shipping!"
                  : `Add $${amountToFreeShipping.toFixed(2)} more for free shipping`}
              </p>
              <div
                className="free-shipping-progress-track"
                role="progressbar"
                aria-valuenow={Math.round(freeShippingProgress)}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Progress toward free shipping"
              >
                <div
                  className={`free-shipping-progress-fill ${qualifiesForFreeShipping ? 'free-shipping-progress-fill-complete' : ''}`}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            <div className="cart-summary-row">
              <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className="cart-summary-note">at checkout</span>
            </div>

            <hr className="cart-summary-divider" />

            <div className="cart-summary-row cart-summary-total">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            {error && <p className="cart-error">{error}</p>}

            <button
              className="btn btn-lofi-main w-100 mb-3"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Heading to checkout...' : 'Proceed to Checkout'}
            </button>

            <Link to="/shop" className="cart-continue-link">← keep shopping</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
