import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../features/cart/cartContext';
import { BasketIcon } from '@phosphor-icons/react/ssr';
import '../styles/components.css';

function MobileCartButton() {
  const { cart, cartTotal } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Already on the full cart/checkout page - the FAB would just duplicate it.
  if (cartCount === 0 || location.pathname === '/cart') return null;

  const goToCart = () => {
    setShow(false);
    navigate('/cart');
  };

  return (
    <>
      <button
        type="button"
        className="mobile-cart-fab d-lg-none"
        onClick={() => setShow(true)}
        aria-label={`View cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
      >
        <BasketIcon weight="duotone" size={26} color="var(--lofi-cream)" />
        <span className="mobile-cart-fab-badge">{cartCount}</span>
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        scrollable
        className="mobile-cart-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mobile-cart-modal-items">
            {cart.map(item => (
              <div className="mobile-cart-modal-item" key={item.id}>
                {item.image && (
                  <img src={item.image} alt={item.name} className="mobile-cart-modal-thumb" />
                )}
                <div className="mobile-cart-modal-info">
                  <span className="mobile-cart-modal-name">{item.name}</span>
                  <span className="mobile-cart-modal-qty">Qty {item.quantity}</span>
                </div>
                <span className="mobile-cart-modal-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mobile-cart-modal-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/shop" className="mobile-cart-modal-keep-shopping" onClick={() => setShow(false)}>
            keep shopping
          </Link>
          <button type="button" className="btn btn-lofi-main w-100" onClick={goToCart}>
            View Cart &amp; Checkout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MobileCartButton;
