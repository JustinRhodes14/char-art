import React from 'react';
import { Modal } from 'react-bootstrap';

function ImageLightbox({ src, alt, show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="xl" className="image-lightbox" backdropClassName="image-lightbox-backdrop" onClick={onHide}>
      <Modal.Body className="image-lightbox-body" onClick={e => e.stopPropagation()}>
        <button className="image-lightbox-close" onClick={onHide} aria-label="Close">✕</button>
        <img src={src} alt={alt} className="image-lightbox-img" />
      </Modal.Body>
    </Modal>
  );
}

export default ImageLightbox;
