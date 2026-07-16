import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/pages.css';
import carouselArt1 from '../assets/images/carousel_art1.jpeg';
import carouselArt2 from '../assets/images/carousel_art2.jpeg';
import carouselArt3 from '../assets/images/carousel_art3.jpeg';
import carouselArt4 from '../assets/images/carousel_art4.jpeg';
import carouselArt5 from '../assets/images/carousel_art5.jpeg';
import carouselArt6 from '../assets/images/carousel_art6.jpeg';
import carouselArt7 from '../assets/images/carousel_art7.jpeg';
import carouselArt8 from '../assets/images/carousel_art8.jpeg';
import carouselArt9 from '../assets/images/carousel_art9.jpeg';
import carouselArt10 from '../assets/images/carousel_art10.jpeg';
import sticker1 from '../assets/artwork/Sticker_1.PNG';
import sticker2 from '../assets/artwork/Sticker_2.PNG';
import sticker3 from '../assets/artwork/Sticker_3.PNG';
import sticker4 from '../assets/artwork/Sticker_4.PNG';
import sticker5 from '../assets/artwork/Sticker_5.PNG';
import sticker6 from '../assets/artwork/Sticker_6.PNG';
import sticker7 from '../assets/artwork/Sticker_7.PNG';
import sticker8 from '../assets/artwork/Sticker_8.PNG';
import sticker9 from '../assets/artwork/Sticker_9.PNG';

const BASE_STICKERS = [
  { src: sticker1, left: '2%',  size: 176, duration: 10, delay: 0,   rotate: 200  },
  { src: sticker2, left: '12%', size: 210, duration: 14, delay: 3,   rotate: -150 },
  { src: sticker3, left: '24%', size: 160, duration: 11, delay: 1.5, rotate: 270  },
  { src: sticker4, left: '36%', size: 196, duration: 16, delay: 5,   rotate: -200 },
  { src: sticker5, left: '48%', size: 180, duration: 12, delay: 0.8, rotate: 180  },
  { src: sticker6, left: '60%', size: 168, duration: 9,  delay: 2.5, rotate: -90  },
  { src: sticker3, left: '70%', size: 190, duration: 13, delay: 4,   rotate: 150  },
  { src: sticker1, left: '79%', size: 164, duration: 11, delay: 6.5, rotate: -240 },
  { src: sticker5, left: '87%', size: 200, duration: 15, delay: 1,   rotate: 300  },
  { src: sticker2, left: '93%', size: 172, duration: 10, delay: 7,   rotate: -120 },
  { src: sticker4, left: '42%', size: 184, duration: 17, delay: 9,   rotate: 210  },
  { src: sticker6, left: '8%',  size: 156, duration: 12, delay: 11,  rotate: -180 },
  { src: sticker7, left: '19%', size: 170, duration: 13, delay: 4.5, rotate: 135  },
  { src: sticker8, left: '64%', size: 188, duration: 11, delay: 8,   rotate: -165 },
  { src: sticker9, left: '82%', size: 162, duration: 15, delay: 2,   rotate: 250  },
  { src: sticker7, left: '31%', size: 175, duration: 10, delay: 5.5, rotate: -110 },
  { src: sticker8, left: '53%', size: 165, duration: 14, delay: 0.5, rotate: 190  },
  { src: sticker9, left: '75%', size: 180, duration: 12, delay: 10,  rotate: -220 },
];

const FALLING_STICKERS = BASE_STICKERS;

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

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTurn(t => {
        if (t === 0) setIndex1(i => (i + 1) % 5);
        else         setIndex2(i => (i + 1) % 5);
        return 1 - t;
      });
    }, 10000); // Change every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const carouselImages2 = [
    { src: carouselArt6,  alt: 'Artist Piece 6'  },
    { src: carouselArt7,  alt: 'Artist Piece 7'  },
    { src: carouselArt8,  alt: 'Artist Piece 8'  },
    { src: carouselArt9,  alt: 'Artist Piece 9'  },
    { src: carouselArt10, alt: 'Artist Piece 10' },
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

      {/* Gallery Section */}
      <Row className="mt-2 mb-2">
        <Col>
          <h2 className="home-gallery-heading">My Work</h2>
        </Col>
      </Row>
      <Row className="mb-3 g-4">
        <Col md={6}>
          <Carousel
            className="carousel-container"
            activeIndex={index1}
            onSelect={setIndex1}
            interval={null}
            controls={false}
          >
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

        {carouselImages2.length > 0 && (
          <Col md={6}>
            <Carousel
              className="carousel-container"
              activeIndex={index2}
              onSelect={setIndex2}
              interval={null}
              controls={false}
            >
              {carouselImages2.map((image, index) => (
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
        )}
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
