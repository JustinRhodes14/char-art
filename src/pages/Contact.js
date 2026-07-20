import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { API_BASE_URL } from '../api';
import '../styles/pages.css';

const EMPTY = { name: '', email: '', message: '' };

function Contact() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData(EMPTY);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="contact-page py-5">
      <Row className="justify-content-center">
        <Col md={7}>

          <h1 className="about-section-heading mb-1">Get in Touch</h1>
          <p className="contact-subheading mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '1.15rem' }}>
            Have a question about an order, a custom request, or just want to say hi? Send me a message.
          </p>

          {status === 'success' && (
            <div className="contact-notice contact-notice--success mb-4">
              Message sent! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="contact-notice contact-notice--error mb-4">
              {errorMsg}
            </div>
          )}

          <div className="contact-form-card">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="contact-label">Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="contact-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="contact-label">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  required
                />
              </Form.Group>

              <button
                type="submit"
                className="btn btn-lofi-main"
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </Form>
          </div>

          <hr className="about-divider mt-5" />

          <Row className="mt-4">
            <Col sm={6} className="mb-3">
              <h5 className="contact-info-heading">Email</h5>
              <a href="mailto:parklofistudio@gmail.com" className="contact-info-link" style={{ fontFamily: "'Quicksand', sans-serif"}}>
                parklofistudio@gmail.com
              </a>
            </Col>
            <Col md={6} className="mb-3">
              <h5 className="contact-info-heading">Follow Along</h5>
              <div className="d-flex gap-3">
                <a href="https://instagram.com/parklofistudio" target="_blank" rel="noopener noreferrer" className="contact-info-link" style={{ fontFamily: "'Quicksand', sans-serif"}}>
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
              <div>
                <a href="https://tiktok.com/@parklofistudio" target="_blank" rel="noopener noreferrer" className="contact-info-link" style={{ fontFamily: "'Quicksand', sans-serif"}}>
                  <i className="fab fa-tiktok"></i> TikTok
                </a>
              </div>
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
