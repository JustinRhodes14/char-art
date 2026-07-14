import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/components.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-lofi mt-5 py-4">
      <Container>
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <h5>Park LoFi Studio</h5>
            <p className="footer-lofi-link" style={{ pointerEvents: 'none' }}>Handcrafted artwork with passion and vision.</p>
          </Col>
          <Col md={3} className="mb-3">
            <h5>Shop</h5>
            <ul className="list-unstyled">
              <li><Link to="/shop" className="footer-lofi-link">All Artwork</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>About</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-lofi-link">About the Artist</Link></li>
              <li><Link to="/contact" className="footer-lofi-link">Contact</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>Follow</h5>
            <ul className="list-unstyled">
              <li><a href="https://instagram.com/parklofistudio"
              target="_blank"
              rel="noopener noreferrer" className="footer-lofi-link"
              >Instagram</a></li>
              <li><a href="https://tiktok.com/@parklofistudio" target="_blank" rel="noopener noreferrer" className="footer-lofi-link">TikTok</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="footer-copy mb-0">© {currentYear} Park LoFi Studio. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
