import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../features/cart/cartContext';
import '../styles/components.css';
import '../styles/pages.css';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card h-100">
      <div className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
        />
        <span className="product-card-category">{product.category}</span>
        {!product.inStock && (
          <div className="product-card-soldout">Sold Out</div>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <div className="product-card-footer-row">
            <span className="product-card-price">${product.price}</span>
            <Link
              to={`/product/${product.id}`}
              className="btn btn-lofi-main product-card-btn"
            >
              View
            </Link>
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
  );
}

export default ProductCard;
