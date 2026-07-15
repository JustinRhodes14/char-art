import React, { useState } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/pages.css';
import carouselArt1 from '../assets/images/carousel_art1.jpeg';
import carouselArt2 from '../assets/images/carousel_art2.jpeg';
import carouselArt3 from '../assets/images/carousel_art3.jpeg';
import carouselArt4 from '../assets/images/carousel_art4.jpeg';
import carouselArt5 from '../assets/images/carousel_art5.jpeg';
import sticker1 from '../assets/artwork/Sticker_1.PNG';
import sticker2 from '../assets/artwork/Sticker_2.PNG';
import sticker3 from '../assets/artwork/Sticker_3.PNG';
import sticker4 from '../assets/artwork/Sticker_4.PNG';
import sticker5 from '../assets/artwork/Sticker_5.PNG';
import sticker6 from '../assets/artwork/Sticker_6.PNG';

const FALLING_STICKERS = [
  { src: sticker1, left: '2%',  size: 176,  duration: 10, delay: 0,   rotate: 200  },
  { src: sticker2, left: '12%', size: 210, duration: 14, delay: 3,   rotate: -150 },
  { src: sticker3, left: '24%', size: 160,  duration: 11, delay: 1.5, rotate: 270  },
  { src: sticker4, left: '36%', size: 196,  duration: 16, delay: 5,   rotate: -200 },
  { src: sticker5, left: '48%', size: 180,  duration: 12, delay: 0.8, rotate: 180  },
  { src: sticker6, left: '60%', size: 168,  duration: 9,  delay: 2.5, rotate: -90  },
  { src: sticker3, left: '70%', size: 190,  duration: 13, delay: 4,   rotate: 150  },
  { src: sticker1, left: '79%', size: 164,  duration: 11, delay: 6.5, rotate: -240 },
  { src: sticker5, left: '87%', size: 200, duration: 15, delay: 1,   rotate: 300  },
  { src: sticker2, left: '93%', size: 172,  duration: 10, delay: 7,   rotate: -120 },
  { src: sticker4, left: '42%', size: 184,  duration: 17, delay: 9,   rotate: 210  },
  { src: sticker6, left: '8%',  size: 156,  duration: 12, delay: 11,  rotate: -180 },
];

function Home() {
  const [stickersOn, setStickersOn] = useState(
    () => localStorage.getItem('stickers') !== 'off'
  );

  const toggleStickers = () => {
    const next = !stickersOn;
    setStickersOn(next);
    localStorage.setItem('stickers', next ? 'on' : 'off');
  };

  const carouselImages = [
    { src: carouselArt1, alt: 'Artist Piece 1' },
    { src: carouselArt2, alt: 'Artist Piece 2' },
    { src: carouselArt3, alt: 'Artist Piece 3' },
    { src: carouselArt4, alt: 'Artist Piece 4' },
    { src: carouselArt5, alt: 'Artist Piece 5' },
  ];

  return (
    <>
      <button
        className="stickers-toggle"
        onClick={toggleStickers}
        title={stickersOn ? 'Turn off falling stickers' : 'Turn on falling stickers'}
      >
        {stickersOn ? '✨ off' : '✨ on'}
      </button>

      {stickersOn && <div className="falling-stickers-overlay" aria-hidden="true">
        {FALLING_STICKERS.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt=""
            className="falling-sticker"
            style={{
              left: s.left,
              width: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              '--sticker-rotate': `${s.rotate}deg`,
            }}
          />
        ))}
      </div>}
    <Container className="home-page py-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="display-4 home-hero-heading mb-3">
            Welcome to Park LoFi Studio!
          </h1>
          <p className="lead">Why not check out the breakfast club collection?</p>
          <Link to="/shop">
            <Button className="btn-lofi-main me-2">Shop Now</Button>
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
    </>
  );
}

export default Home;
