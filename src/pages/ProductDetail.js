import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { products } from '../data/products';
import { CartContext } from '../features/cart/cartContext';
import '../styles/pages.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = React.useState(1);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5">
        <h2>Product not found</h2>
        <Button className="btn-lofi-outline" onClick={() => navigate('/shop')}>Back to Shop</Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate('/cart');
  };

  return (
    <Container className="product-detail-page py-5">
      <Row className="mb-4">
        <Col md={6}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="text-muted">{product.category}</p>
          <h3 className="text-primary">${product.price}</h3>
          <p className="lead">{product.description}</p>

          <Form className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control 
                type="number" 
                min="1" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{ maxWidth: '100px' }}
              />
            </Form.Group>
          </Form>

          <Button
            className="btn-lofi-main me-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            className="btn-lofi-outline"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>

          <hr className="my-4" />
          <p><strong>Dimensions:</strong> {product.dimensions}</p>
          <p><strong>Medium:</strong> {product.medium}</p>
          <p><strong>In Stock:</strong> {product.inStock ? 'Yes' : 'No'}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
