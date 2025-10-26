import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Placeholder validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    // Simulate signup
    alert('Signup successful!');
  };

  return (
    <section className="signup-section" style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={8}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '0' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <img
                    src={`${process.env.PUBLIC_URL}/logo/tee-luxe.png`}
                    alt="TeeLuxe Logo"
                    style={{ height: '50px', width: 'auto' }}
                    className="mb-3"
                  />
                  <h2 className="fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>
                    Join TeeLuxe
                  </h2>
                </div>
                <p className="text-center text-muted mb-4" style={{ fontFamily: 'Inter' }}>
                  Create your account and discover minimalist fashion
                </p>

                {errors.general && <Alert variant="danger">{errors.general}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontFamily: 'Inter', fontWeight: '500' }}>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="py-3"
                      style={{ borderRadius: '0', fontFamily: 'Inter' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontFamily: 'Inter', fontWeight: '500' }}>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="py-3"
                      style={{ borderRadius: '0', fontFamily: 'Inter' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontFamily: 'Inter', fontWeight: '500' }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="py-3"
                      style={{ borderRadius: '0', fontFamily: 'Inter' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontFamily: 'Inter', fontWeight: '500' }}>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="py-3"
                      style={{ borderRadius: '0', fontFamily: 'Inter' }}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="dark"
                      type="submit"
                      className="py-3 fw-bold"
                      style={{ fontFamily: 'Inter', borderRadius: '0' }}
                    >
                      Create Account
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-4" style={{ fontFamily: 'Inter' }}>
                  Already have an account? {' '}
                  <Link to="/login" className="fw-bold" style={{ color: '#000', textDecoration: 'none' }}>
                    Sign In
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Signup;
