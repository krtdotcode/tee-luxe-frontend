import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light border-top mt-5">
      <Container>
        <Row className="py-4">
          <Col lg={4} className="mb-3">
            <img
              src={`${process.env.PUBLIC_URL}/logo/tee-luxe.png`}
              alt="TeeLuxe Logo"
              style={{ height: '40px', width: 'auto', marginBottom: '1rem' }}
            />
            <p className="text-muted" style={{ fontFamily: 'Inter', fontSize: '0.95rem' }}>
              Minimalist fashion for the contemporary soul.
            </p>
          </Col>

          <Col lg={4} className="mb-3">
            <h6 className="fw-bold text-uppercase mb-3">Categories</h6>
            <div className="d-flex flex-column">
              <Link
                to="/products"
                className="text-muted text-decoration-none text-uppercase fw-medium mb-2 px-0 py-1"
                style={{ fontFamily: 'Inter', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#000'}
                onMouseLeave={(e) => e.target.style.color = '#6c757d'}
              >
                All
              </Link>
              <Link
                to="/products?category=Men"
                className="text-muted text-decoration-none text-uppercase fw-medium mb-2 px-0 py-1"
                style={{ fontFamily: 'Inter', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#000'}
                onMouseLeave={(e) => e.target.style.color = '#6c757d'}
              >
                Men
              </Link>
              <Link
                to="/products?category=Women"
                className="text-muted text-decoration-none text-uppercase fw-medium mb-2 px-0 py-1"
                style={{ fontFamily: 'Inter', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#000'}
                onMouseLeave={(e) => e.target.style.color = '#6c757d'}
              >
                Women
              </Link>
            </div>
          </Col>

          <Col lg={4} className="mb-3">
            <h6 className="fw-bold text-uppercase mb-3 text-center">Follow Us</h6>
            <div className="d-flex justify-content-center gap-4">
              {/* Social Icons */}
              <a href="#" className="text-muted">
                <i className="fab fa-instagram fs-4"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-facebook fs-4"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-youtube fs-4"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-tiktok fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>

        <Row className="border-top pt-3">
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; {currentYear} TeeLuxe. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
