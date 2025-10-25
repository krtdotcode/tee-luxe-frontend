import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './App.css';
import TeeLuxeNavbar from './components/Navbar';

function NewFeatured() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '85vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', paddingTop: '2rem' }}>
        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col xl={8} lg={10}>
              <h1 className="display-1 fw-bold mb-4 text-dark" style={{ fontFamily: 'Inter', letterSpacing: '-0.025em' }}>
                Minimalist Fashion<br />for the Modern Era
              </h1>
              <p className="lead mb-5 text-muted" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
                Experience the perfect blend of simplicity and elegance. TeeLuxe offers contemporary clothing that resonates with your sophisticated sensibilities.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button 
                  variant="dark" 
                  size="lg" 
                  className="px-5 py-3 fw-bold"
                  style={{ fontFamily: 'Inter', borderRadius: '0' }}
                >
                  Signup
                </Button>
                <Button 
                  variant="outline-dark" 
                  size="lg" 
                  className="px-5 py-3 fw-bold"
                  style={{ fontFamily: 'Inter', borderRadius: '0' }}
                >
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Supporting Section */}
      <section className="supporting-section py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
                Why Choose TeeLuxe?
              </h2>
              <p className="lead text-muted">
                Elevate your wardrobe with pieces that stand out through their quality, design, and timeless appeal.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Minimalist Design</Card.Title>
                  <Card.Text className="text-muted">
                    Clean lines and thoughtful silhouettes that honor the art of simplicity in fashion.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Sustainable Quality</Card.Title>
                  <Card.Text className="text-muted">
                    Ethically sourced materials and durable craftsmanship for pieces that last.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0' }}>
                <Card.Body className="text-center p-4">
                  <Card.Title className="fw-bold mb-3" style={{ fontFamily: 'Inter' }}>Contemporary Style</Card.Title>
                  <Card.Text className="text-muted">
                    Stay ahead of trends with designs that transcend seasons and fads.
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

function Men() {
  return (
    <div>
      <h1>Men</h1>
      <p>Explore our collection for men.</p>
    </div>
  );
}

function Women() {
  return (
    <div>
      <h1>Women</h1>
      <p>Explore our collection for women.</p>
    </div>
  );
}

function Sale() {
  return (
    <div>
      <h1>Sale</h1>
      <p>Check out our latest discounts and deals.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <TeeLuxeNavbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<NewFeatured />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/sale" element={<Sale />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
