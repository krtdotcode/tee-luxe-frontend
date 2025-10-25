import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder validation
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please fill in all fields' });
    } else {
      // Simulate login
      alert('Login successful!');
    }
  };

  return (
    <section className="login-section" style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={8}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '0' }}>
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>
                  Welcome Back
                </h2>
                <p className="text-center text-muted mb-4" style={{ fontFamily: 'Inter' }}>
                  Sign in to your TeeLuxe account
                </p>

                {errors.general && <Alert variant="danger">{errors.general}</Alert>}

                <Form onSubmit={handleSubmit}>
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
                      placeholder="Enter your password"
                      className="py-3"
                      style={{ borderRadius: '0', fontFamily: 'Inter' }}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="dark"
                      type="submit"
                      className="py-3 fw-bold"
                      style={{ fontFamily: 'Inter', borderRadius: '0' }}
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-4" style={{ fontFamily: 'Inter' }}>
                  Don't have an account? {' '}
                  <Link to="/signup" className="fw-bold" style={{ color: '#000', textDecoration: 'none' }}>
                    Sign Up
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

export default Login;
