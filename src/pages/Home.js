import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/pages.css';
import carouselArt1 from '../assets/images/carousel_art1.jpeg';
import carouselArt2 from '../assets/images/carousel_art2.jpeg';
import carouselArt3 from '../assets/images/carousel_art3.jpeg';
import carouselArt4 from '../assets/images/carousel_art4.jpeg';
import carouselArt5 from '../assets/images/carousel_art5.jpeg';

function Home() {
  const carouselImages = [
    { src: carouselArt1, alt: 'Artist Piece 1' },
    { src: carouselArt2, alt: 'Artist Piece 2' },
    { src: carouselArt3, alt: 'Artist Piece 3' },
    { src: carouselArt4, alt: 'Artist Piece 4' },
    { src: carouselArt5, alt: 'Artist Piece 5' },
  ];

  return (
    <Container className="home-page py-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="display-4 home-hero-heading mb-3">
            Welcome to Park LoFi Studio
          </h1>
          <p className="lead">Catering to all your cozy vibes.</p>
          <Link to="/shop">
            <Button className="btn-lofi-main me-2">Shop Now</Button>
          </Link>
          <Link to="/gallery">
            <Button className="btn-lofi-outline">View Gallery</Button>
          </Link>
        </Col>
      </Row>

      {/* Carousel Section */}
      <Row className="my-5">
        <Col>
          <Carousel className="carousel-container">
            {carouselImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-image"
                  src={image.src}
                  alt={image.alt}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Social Media Section */}
      <Row className="my-5 text-center">
        <Col>
          <h3 className="home-section-heading mb-4">Stay updated with my art</h3>
          <div className="social-links">
            <a
              href="https://instagram.com/parklofistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Instagram"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a
              href="https://tiktok.com/@parklofistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="TikTok"
            >
              <i className="fab fa-tiktok"></i> TikTok
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
