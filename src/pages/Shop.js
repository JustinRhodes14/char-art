import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import useImagePreloader from '../hooks/useImagePreloader';
import '../styles/pages.css';

const CATEGORIES = ['all', 'acrylic charm', 'art print', 'sticker', 'sticker sheet'];
const MAX_PRICE = 20;

function Shop() {
  const allLoaded = useImagePreloader(products.map(p => p.image));
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [activeCategory, setActiveCategory] = useState('all');

  if (!allLoaded) {
    return (
      <div className="shop-loading">
        <p className="shop-loading-text">setting up the shop...</p>
      </div>
    );
  }

  let filtered = [...products];

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  filtered = filtered.filter(p => p.price <= maxPrice);

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  return (
    <>
      <div className="shop-hero">
        <h1 className="shop-hero-heading">The Little Shop</h1>
        <p className="shop-tagline">Handmade goods for cozy people ˚₊‧꩜</p>
      </div>

      <Container className="shop-page py-5">
        <div className="shop-category-row mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`shop-category-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All Items' : cat.replace(/\b\w/g, c => c.toUpperCase())}
            </button>
          ))}
        </div>

        <Row>
          <Col lg={3} className="mb-4">
            <div className="shop-filters">
              <p className="shop-filters-heading">Filters</p>

              <label className="shop-filter-label d-block mb-1">Sort By</label>
              <select
                className="shop-filter-select mb-4"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <label className="shop-filter-label d-block mb-1">
                Max Price: ${maxPrice === MAX_PRICE ? `${MAX_PRICE}+` : maxPrice}
              </label>
              <input
                type="range"
                className="shop-filter-range"
                min={4}
                max={MAX_PRICE}
                value={maxPrice}
                onChange={e => setMaxPrice(parseInt(e.target.value))}
              />
              <div className="shop-filter-range-labels">
                <span>$4</span><span>$20+</span>
              </div>
            </div>
          </Col>

          <Col lg={9}>
            <p className="shop-results-count mb-3">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </p>
            {filtered.length === 0 ? (
              <div className="shop-empty">
                <p>No items match those filters — try widening the price range!</p>
              </div>
            ) : (
              <Row className="g-4">
                {filtered.map(product => (
                  <Col key={product.id} sm={6} xl={4}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Shop;
