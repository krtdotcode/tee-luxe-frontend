import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationModal from '../components/NotificationModal';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!formData.password.trim()) {
      setErrors({ password: 'Password is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
      setModalMessage(error.message || 'Login failed. Please check your credentials.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section" style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
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
                    Welcome Back
                  </h2>
                </div>
                <p className="text-center text-muted mb-4" style={{ fontFamily: 'Inter' }}>
                  Sign in to your TeeLuxe account
                </p>

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
                      isInvalid={!!errors.email}
                      style={{ borderRadius: '0', fontFamily: 'Inter' }}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                      disabled={loading}
                      style={{ fontFamily: 'Inter', borderRadius: '0' }}
                    >
                      {loading ? <><Spinner animation="border" size="sm" className="me-2" />Signing In...</> : 'Sign In'}
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

      <NotificationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Login Error"
        message={modalMessage}
      />
    </section>
  );
}

export default Login;
