import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../styles/pages.css';

function Shop() {
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(1000);

  let sorted = [...products];

  // Apply price filter
  sorted = sorted.filter(p => p.price >= 0 && p.price <= maxPrice);

  // Apply sorting
  if (sortBy === 'price-low') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  return (
    <Container className="shop-page py-5">
      <h1 className="mb-4">Shop</h1>

      <Row className="mb-4">
        <Col md={3}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Range: $0 - ${maxPrice}</Form.Label>
              <Form.Range 
                min={0} 
                max={1000} 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Col>

        <Col md={9}>
          <Row className="g-4">
            {sorted.map(product => (
              <Col key={product.id} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Shop;
