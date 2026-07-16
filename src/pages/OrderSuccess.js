import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { CartContext } from '../features/cart/cartContext';
import '../styles/pages.css';

function OrderSuccess() {
  const { clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Clear the cart once - only when arriving from a real Stripe session
  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="py-5 text-center">
      <h1 className="home-hero-heading mb-3">Order Confirmed!</h1>
      <p className="lead mb-2">
        Thank you for your purchase. We'll get your order packed and on its way soon.
      </p>
      <p className="mb-4" style={{ color: 'var(--lofi-xanadu)' }}>
        A confirmation email will be sent to you shortly.
      </p>
      <Link to="/shop">
        <button className="btn btn-lofi-main">Keep Shopping</button>
      </Link>
    </Container>
  );
}

export default OrderSuccess;
