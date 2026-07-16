import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { CartContext } from '../features/cart/cartContext';
import '../styles/components.css';
import '../styles/pages.css';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalQty, setModalQty] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleModalAddToCart = () => {
    addToCart({ ...product, quantity: modalQty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalQty(1);
  };

  return (
    <>
      <div className="product-card h-100" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
        <div className="product-card-img-wrap">
          <img src={product.image} alt={product.name} className="product-card-img" />
          <span className="product-card-category">{product.category}</span>
          {!product.inStock && <div className="product-card-soldout">Sold Out</div>}
        </div>
        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-desc">{product.description}</p>
          <div className="product-card-footer">
            <div className="product-card-footer-row">
              <span className="product-card-price">${product.price}</span>
            </div>
            <button
              className="btn btn-lofi-main product-card-add-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock || added}
            >
              {added ? 'Added!' : '+ Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered className="product-modal">
        <Modal.Header closeButton className="product-modal-header">
          <span className="product-modal-category">{product.category}</span>
        </Modal.Header>
        <Modal.Body className="product-modal-body">
          <div className="product-modal-img-wrap">
            <img src={product.image} alt={product.name} className="product-modal-img" />
            {!product.inStock && <div className="pd-soldout-overlay">Sold Out</div>}
          </div>
          <div className="product-modal-info">
            <h3 className="product-modal-name">{product.name}</h3>
            <p className="product-modal-price">${product.price}</p>
            <p className="product-modal-desc">{product.description}</p>
            {product.inStock && (
              <div className="product-modal-stepper-wrap">
                <span className="pd-stepper-label">Quantity</span>
                <div className="cart-item-stepper">
                  <button className="cart-stepper-btn" onClick={() => setModalQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="cart-stepper-val">{modalQty}</span>
                  <button className="cart-stepper-btn" onClick={() => setModalQty(q => q + 1)}>+</button>
                </div>
              </div>
            )}
            <div className="product-modal-actions">
              <Link
                to={`/product/${product.id}`}
                className="btn btn-lofi-outline-dark product-modal-btn"
                onClick={() => setShowModal(false)}
              >
                View Details
              </Link>
              <button
                className="btn btn-lofi-main product-modal-btn"
                onClick={handleModalAddToCart}
                disabled={!product.inStock || added}
              >
                {added ? 'Added!' : '+ Add to Cart'}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductCard;
