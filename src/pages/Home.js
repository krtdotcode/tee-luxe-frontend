import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Home.css';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '80vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col xl={8} lg={10}>
              <h1 className="display-1 fw-bold mb-4 text-dark" style={{ fontFamily: 'Inter', letterSpacing: '-0.025em' }}>
                Minimalist Fashion<br />for the Modern Era{' '}
                <span className="fashion-icon">
                  <i className="fas fa-tshirt"></i>
                </span>
              </h1>
              <p className="lead mb-5 text-muted" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
                Experience the perfect blend of simplicity and elegance. TeeLuxe offers contemporary clothing that resonates with your sophisticated sensibilities.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="dark"
                    size="lg"
                    className="px-5 py-3 fw-bold"
                    style={{ fontFamily: 'Inter', borderRadius: '0' }}
                  >
                    Signup
                  </Button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outline-dark"
                    size="lg"
                    className="px-5 py-3 fw-bold"
                    style={{ fontFamily: 'Inter', borderRadius: '0' }}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section py-5 bg-light" style={{ marginTop: '-1rem' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
                About TeeLuxe
              </h2>
              <div className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                <p>
                  TeeLuxe was founded on the belief that fashion should be timeless, not trendy. Our collections are crafted with meticulous attention to detail, using premium materials that stand the test of time. From premium cotton t-shirts to sophisticated wool sweaters, each piece embodies our commitment to quality craftsmanship and ethical production.
                </p>
                <p className="mt-4">
                  We're not just selling clothes—we're offering a lifestyle. Our minimalist designs empower you to build a wardrobe that's both versatile and expressive. Join thousands of discerning fashion enthusiasts who choose TeeLuxe for pieces that tell a unique story of elegance and purpose.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Cover Image Section */}
      <section className="cover-section py-5" style={{ backgroundColor: '#f8f9fa', marginTop: '-1rem' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <img
                src={`${process.env.PUBLIC_URL}/teeluxe-cover.png`}
                alt="TeeLuxe Cover"
                className="img-fluid rounded-0 shadow-lg"
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Supporting Section */}
      <section className="supporting-section py-5" style={{ marginTop: '-1rem' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
                Why Choose TeeLuxe?
              </h2>
              <p className="lead text-muted">
                Elevate your wardrobe with pieces that stand out through their quality, design, and timeless appeal.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mt-4">
            <Col xl={4} lg={6} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <div className="text-primary mb-3">
                    <i className="fas fa-brush fa-2x"></i>
                  </div>
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Minimalist Design</Card.Title>
                  <Card.Text className="text-muted">
                    Clean lines and thoughtful silhouettes that honor the art of simplicity in fashion.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} lg={6} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="fas fa-leaf fa-2x"></i>
                  </div>
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Sustainable Quality</Card.Title>
                  <Card.Text className="text-muted">
                    Ethically sourced materials and durable craftsmanship for pieces that last.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} lg={6} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <div className="text-info mb-3">
                    <i className="fas fa-clock fa-2x"></i>
                  </div>
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Contemporary Style</Card.Title>
                  <Card.Text className="text-muted">
                    Stay ahead of trends with designs that transcend seasons and fads.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} lg={6} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <div className="text-danger mb-3">
                    <i className="fas fa-money-bill-wave fa-2x"></i>
                  </div>
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Cash on Delivery</Card.Title>
                  <Card.Text className="text-muted">
                    Pay only when you receive your order for complete peace of mind.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} lg={6} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <div className="text-warning mb-3">
                    <i className="fas fa-shield-alt fa-2x"></i>
                  </div>
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Safe Delivery</Card.Title>
                  <Card.Text className="text-muted">
                    Secure and reliable shipping with tracking for every order.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} lg={6} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <div className="text-secondary mb-3">
                    <i className="fas fa-credit-card fa-2x"></i>
                  </div>
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Secure Online Payments</Card.Title>
                  <Card.Text className="text-muted">
                    The online payment is secured.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
