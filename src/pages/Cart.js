import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../features/cart/cartContext';
import { API_BASE_URL } from '../api';
import '../styles/pages.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            weight_oz: item.weight_oz || 1.5,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('Could not start checkout. Please try again.');
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <h1 className="mb-4">Shopping Cart</h1>
        <p className="lead">Your cart is empty.</p>
        <Link to="/shop">
          <Button className="btn-lofi-outline">Continue Shopping</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="cart-page py-5">
      <h1 className="mb-4">Shopping Cart</h1>

      <Row>
        <Col lg={8}>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      className="btn-lofi-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col lg={4}>
          <div className="bg-light p-4 rounded">
            <h4 className="mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <strong>Subtotal:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            {error && (
              <p className="text-danger small mb-2">{error}</p>
            )}

            <Button
              className="btn-lofi-main w-100 mb-2"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Redirecting to Checkout…' : 'Proceed to Checkout'}
            </Button>
            <Link to="/shop" className="d-block text-center">
              Continue Shopping
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
