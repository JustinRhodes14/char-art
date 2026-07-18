import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { products, MATERIAL_DESCRIPTIONS } from '../data/products';
import { CartContext } from '../features/cart/cartContext';
import ImageLightbox from '../components/ImageLightbox';
import ProductPolicyNotes from '../components/ProductPolicyNotes';
import '../styles/pages.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5">
        <h2 className="pd-name">Product not found</h2>
        <button className="btn btn-lofi-main" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate('/cart');
  };

  return (
    <>
    <Container className="product-detail-page py-5">
      <Link to="/shop" className="pd-back-link">← Back to Shop</Link>

      <Row className="g-5 mt-0">
        <Col md={6}>
          <div className="pd-image-wrap" onClick={() => setShowLightbox(true)} style={{ cursor: 'zoom-in' }}>
            <img src={product.image} alt={product.name} className="pd-image" />
            {!product.inStock && (
              <div className="pd-soldout-overlay">Sold Out</div>
            )}
          </div>
        </Col>

        <Col md={6}>
          <div className="pd-info">
            <span className="pd-category-tag">{product.category}</span>
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-price">${product.price.toFixed(2)}</p>
            <p className="pd-description">{product.description}</p>

            {product.materialType && MATERIAL_DESCRIPTIONS[product.materialType] && (
              <p className="product-material-desc">
                {MATERIAL_DESCRIPTIONS[product.materialType]}
              </p>
            )}

            <div className="pd-meta">
              {product.dimensions && (
                <div className="pd-meta-row">
                  <span className="pd-meta-label">Dimensions</span>
                  <span className="pd-meta-value">{product.dimensions}</span>
                </div>
              )}
              {product.medium && (
                <div className="pd-meta-row">
                  <span className="pd-meta-label">Medium</span>
                  <span className="pd-meta-value">{product.medium}</span>
                </div>
              )}
              <div className="pd-meta-row">
                <span className="pd-meta-label">Availability</span>
                <span className={product.inStock ? 'pd-in-stock' : 'pd-out-of-stock'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {product.inStock && (
              <>
                <div className="pd-stepper-wrap">
                  <span className="pd-stepper-label">Quantity</span>
                  <div className="cart-item-stepper">
                    <button
                      className="cart-stepper-btn"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="cart-stepper-val">{quantity}</span>
                    <button
                      className="cart-stepper-btn"
                      onClick={() => setQuantity(q => q + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                </div>

                <button className="btn btn-lofi-main pd-add-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </>
            )}

            <ProductPolicyNotes />

            <Link to="/shop" className="pd-continue-link">← keep shopping</Link>
          </div>
        </Col>
      </Row>
    </Container>

    <ImageLightbox
      src={product.image}
      alt={product.name}
      show={showLightbox}
      onHide={() => setShowLightbox(false)}
    />
    </>
  );
}

export default ProductDetail;
