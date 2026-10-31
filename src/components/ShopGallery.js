import React, { useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  gallerySlides,
  GALLERY_HEADING,
  GALLERY_INTRO,
  GALLERY_SIGNOFF,
} from '../data/shopGallery';

// `embedded` drops the full-width band + inner Container so the gallery can
// sit inside a page that already has its own Container (the Home page).
function ShopGallery({ embedded = false }) {
  const [index, setIndex] = useState(0);

  if (gallerySlides.length === 0) return null;

  const active = gallerySlides[index];
  const Wrapper = embedded ? 'div' : Container;

  return (
    <section className={`shop-gallery${embedded ? ' shop-gallery--embedded' : ''}`}>
      <Wrapper>
        <Row className="align-items-center g-4">
          <Col md={5} className="order-2 order-md-1">
            <p className="shop-gallery-eyebrow">✿ product highlights ✿</p>
            <h2 className="shop-gallery-heading">{GALLERY_HEADING}</h2>
            <p className="shop-gallery-intro">{GALLERY_INTRO}</p>

            <div className="shop-gallery-note">
              <p className="shop-gallery-note-title">
                {active.product.shopDisplayName || active.product.name}
                <span className="shop-gallery-note-category"> · {active.product.category}</span>
              </p>
              <p className="shop-gallery-note-body">{active.product.description}</p>
              <Link to={`/product/${active.product.id}`} className="shop-gallery-link">
                take a closer look →
              </Link>
            </div>

            <p className="shop-gallery-signoff">{GALLERY_SIGNOFF}</p>
          </Col>

          <Col md={7} className="order-1 order-md-2">
            <div className="shop-gallery-frame">
              <span className="shop-gallery-tape" aria-hidden="true" />
              <Carousel
                className="shop-gallery-carousel"
                activeIndex={index}
                onSelect={setIndex}
                interval={4500}
                pause="hover"
              >
                {gallerySlides.map(slide => (
                  <Carousel.Item key={slide.productId}>
                    <img
                      className="d-block w-100 shop-gallery-image"
                      src={slide.product.image}
                      alt={slide.product.shopDisplayName || slide.product.name}
                      style={slide.position ? { objectPosition: slide.position } : undefined}
                    />
                    <span className="shop-gallery-caption">{slide.caption}</span>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Wrapper>
    </section>
  );
}

export default ShopGallery;
