import React from 'react';
import { Container, Row, Col, Nav, Navbar, NavLink } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light border-top mt-5">
      <Container>
        <Row className="py-4">
          <Col lg={4} className="mb-3">
            <Navbar.Brand className="fw-bold fs-4 text-dark p-0">
            <img
              src={`${process.env.PUBLIC_URL}/logo/tee-luxe.png`}
              alt="TeeLuxe Logo"
              style={{ height: '40px', width: 'auto' }}
            />
            </Navbar.Brand>
            <p className="text-muted mt-2">
              Minimalist fashion for the contemporary soul.
            </p>
          </Col>

          <Col lg={4} className="mb-3">
            <h6 className="fw-bold text-uppercase mb-3">Quick Links</h6>
            <Nav className="flex-column">
              <Nav.Link href="/men" className="text-muted p-0 mb-2">Men</Nav.Link>
              <Nav.Link href="/women" className="text-muted p-0 mb-2">Women</Nav.Link>
              <Nav.Link href="/sale" className="text-muted p-0 mb-2">Sale</Nav.Link>
            </Nav>
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
