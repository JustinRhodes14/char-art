import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PaintBrush, Key, Envelope, Sparkle } from '@phosphor-icons/react';
import '../styles/pages.css';
import theArtist from '../assets/images/artist.jpeg';

const MAKES = [
  {
    icon: <Sparkle size={36} weight="duotone" color="#4A3018" />,
    title: 'Stickers',
    description: 'Die-cut vinyl stickers featuring original character art. Made to go on laptops, water bottles, journals — wherever you want a little spark of cozy.',
  },
  {
    icon: <Key size={36} weight="duotone" color="#4A3018" />,
    title: 'Keychains',
    description: 'Acrylic charm keychains with original artwork. Carry a little piece of the studio with you wherever you go.',
  },
  {
    icon: <Envelope size={36} weight="duotone" color="#4A3018" />,
    title: 'Postcards',
    description: 'High-quality art print postcards. Write a note, send some love, or tuck one into a frame — they\'re made to be kept.',
  },
  {
    icon: <PaintBrush size={36} weight="duotone" color="#4A3018" />,
    title: 'Original Art',
    description: 'One-of-a-kind paintings and drawings. Each piece is signed and ships straight from the studio.',
  },
];

const VALUES = [
  {
    title: 'Handmade with care',
    description: 'Everything is made in small batches. Slow, intentional, and never rushed — because good art takes time.',
  },
  {
    title: 'Inspired by the everyday',
    description: 'Quiet mornings, cozy corners, and small joys. That\'s where the work comes from, and what it\'s meant to bring back.',
  },
  {
    title: 'Shipped with love',
    description: 'Every order is packed by hand and sent directly from the studio. No warehouses, no middlemen — just art straight to your door.',
  },
];

function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <h1 className="about-hero-heading">Park LoFi Studio</h1>
        <p className="about-tagline">Cozy art for cozy spaces.</p>
      </section>

      <Container className="py-5">

        {/* Artist intro */}
        <Row className="align-items-center mb-5 g-5">
          <Col md={5}>
            <img
              src={theArtist}
              alt="The artist"
              className="about-artist-photo img-fluid"
            />
          </Col>
          <Col md={7}>
            <h2 className="about-section-heading">Meet the Artist</h2>
            <p>
              Charlotte Park is a New Jersey-based artist specialized in curating art prints, stationary, and 
              trinkets that bring a cozy edition to one’s own life. While initially focusing on fashion illustration
              and fine art, it wasn’t until the pandemic that she found her true passion in creating whimsical 
              cozy-hearted illustrations that brought joy to others during a turbulent time. With the grand opening 
              of her shop, she hopes to continue to spread that joy to others in each of her products she makes with 
              love and care. It is thanks to your patronage and support that she is able to make it come true. 
            </p>
            <p>
              Thank you again for your visit, and we hope to see you soon :)
            </p>
            <Link to="/shop">
              <button className="btn btn-lofi-main mt-2">Browse the Shop</button>
            </Link>
          </Col>
        </Row>

        <hr className="about-divider" />

        {/* What I make */}
        <section className="mb-5">
          <h2 className="about-section-heading text-center mb-4">What I Make</h2>
          <Row className="g-4">
            {MAKES.map(item => (
              <Col sm={6} lg={3} key={item.title}>
                <div className="about-card">
                  <div className="about-card-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <hr className="about-divider" />

        {/* Values */}
        <section className="mb-5">
          <h2 className="about-section-heading text-center mb-4">How I Work</h2>
          <Row className="g-4 justify-content-center">
            {VALUES.map(item => (
              <Col md={4} key={item.title}>
                <div className="about-card about-card--value">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <hr className="about-divider" />

        {/* Connect */}
        <section className="text-center pb-3">
          <h2 className="about-section-heading mb-2">Come Say Hi</h2>
          <p className="mb-4" style={{ fontFamily: "'Indie Flower', cursive", fontSize: '1.15rem' }}>
            I post work-in-progress, new releases, and studio life over on Instagram and TikTok.
          </p>
          <div className="social-links justify-content-center">
            <a
              href="https://instagram.com/parklofistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@parklofistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              TikTok
            </a>
          </div>
        </section>

      </Container>
    </div>
  );
}

export default About;
