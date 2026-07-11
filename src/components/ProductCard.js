import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/components.css';

function ProductCard({ product }) {
  return (
    <Card className="product-card h-100 shadow-sm hover-shadow transition">
      <Card.Img 
        variant="top" 
        src={product.image} 
        alt={product.name}
        className="product-image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted">{product.category}</Card.Text>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-primary mb-0">${product.price}</h5>
          <Link to={`/product/${product.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
