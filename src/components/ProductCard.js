import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { RulerIcon } from '@phosphor-icons/react/ssr';
import { CartContext } from '../features/cart/cartContext';
import { products, MATERIAL_DESCRIPTIONS, isNewProduct } from '../data/products';
import ImageLightbox from './ImageLightbox';
import ProductPolicyNotes from './ProductPolicyNotes';
import '../styles/components.css';
import '../styles/pages.css';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalQty, setModalQty] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeProduct, setActiveProduct] = useState(product);

  const variants = product.variantGroup
    ? products.filter(p => p.variantGroup === product.variantGroup)
    : [];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleModalAddToCart = () => {
    addToCart({ ...activeProduct, quantity: modalQty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalQty(1);
    setActiveProduct(product);
  };

  return (
    <>
      <div className="product-card h-100" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
        <div className="product-card-img-wrap">
          <img
            src={product.image}
            alt={product.shopDisplayName || product.name}
            className="product-card-img"
            style={product.cardImagePosition ? { objectPosition: product.cardImagePosition } : undefined}
          />
          <span className="product-card-category">{product.category}</span>
          {isNewProduct(product) && <span className="product-card-new-badge">New</span>}
          {product.dimensions && (
            <span className="product-card-dimensions">
              <RulerIcon size={13} weight="duotone" style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
              {product.dimensions}
            </span>
          )}
          {!product.inStock && <div className="product-card-soldout">Sold Out</div>}
        </div>
        <div className="product-card-body">
          <h3 className="product-card-title">{product.shopDisplayName || product.name}</h3>
          <p className="product-card-desc">{product.description}</p>
          <div className="product-card-footer">
            <div className="product-card-footer-row">
              <span className="product-card-price">${product.price.toFixed(2)}</span>
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

      <Modal show={showModal} onHide={handleModalClose} centered scrollable className="product-modal">
        <Modal.Header closeButton className="product-modal-header">
          <span className="product-modal-category">{activeProduct.category}</span>
        </Modal.Header>
        <Modal.Body className="product-modal-body">
          <div className="product-modal-img-wrap" onClick={() => setShowLightbox(true)} style={{ cursor: 'zoom-in' }}>
            <img src={activeProduct.image} alt={activeProduct.shopDisplayName || activeProduct.name} className="product-modal-img" />
            {!activeProduct.inStock && <div className="pd-soldout-overlay">Sold Out</div>}
          </div>
          <div className="product-modal-info">
            <h3 className="product-modal-name">{activeProduct.shopDisplayName || activeProduct.name}</h3>
            <p className="product-modal-price">${activeProduct.price.toFixed(2)}</p>
            <p className="product-modal-desc">{activeProduct.description}</p>

            {variants.length > 1 && (
              <div className="mb-3">
                <span className="pd-stepper-label d-block mb-2">Design</span>
                <div className="d-flex gap-2 flex-wrap">
                  {variants.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      className={`shop-category-pill pd-variant-pill${activeProduct.id === v.id ? ' active' : ''}`}
                      onClick={() => setActiveProduct(v)}
                    >
                      {v.variantLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeProduct.inStock && (
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
                to={`/product/${activeProduct.id}`}
                className="btn btn-lofi-outline-dark product-modal-btn"
                onClick={() => setShowModal(false)}
              >
                View Details
              </Link>
              <button
                className="btn btn-lofi-main product-modal-btn"
                onClick={handleModalAddToCart}
                disabled={!activeProduct.inStock || added}
              >
                {added ? 'Added!' : '+ Add to Cart'}
              </button>
            </div>

            {activeProduct.materialType && MATERIAL_DESCRIPTIONS[activeProduct.materialType] && (
              <p className="product-material-desc">
                {MATERIAL_DESCRIPTIONS[activeProduct.materialType]}
              </p>
            )}
            <ProductPolicyNotes />
          </div>
        </Modal.Body>
      </Modal>

      <ImageLightbox
        src={activeProduct.image}
        alt={activeProduct.shopDisplayName || activeProduct.name}
        show={showLightbox}
        onHide={() => setShowLightbox(false)}
      />
    </>
  );
}

export default ProductCard;
