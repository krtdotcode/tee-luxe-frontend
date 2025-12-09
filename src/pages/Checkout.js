import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cartAPI, ordersAPI } from '../utils/api';
import products from '../data/products';

const sampleCartItems = [{ id: 1, quantity: 2 }, { id: 5, quantity: 1 }, { id: 7, quantity: 3 }];
const inputStyle = { borderRadius: '0', fontFamily: 'Inter' };
const regions = [
  { value: 'NCR', label: 'National Capital Region' },
  { value: 'CAR', label: 'Cordillera Administrative Region' },
  { value: 'Region_I', label: 'Region I - Ilocos Region' },
  { value: 'Region_II', label: 'Region II - Cagayan Valley' },
  { value: 'Region_III', label: 'Region III - Central Luzon' },
  { value: 'Region_IV_A', label: 'Region IV-A - CALABARZON' },
  { value: 'Region_IV_B', label: 'Region IV-B - MIMAROPA' },
  { value: 'Region_V', label: 'Region V - Bicol Region' },
  { value: 'Region_VI', label: 'Region VI - Western Visayas' },
  { value: 'Region_VII', label: 'Region VII - Central Visayas' },
  { value: 'Region_VIII', label: 'Region VIII - Eastern Visayas' },
  { value: 'Region_IX', label: 'Region IX - Zamboanga Peninsula' },
  { value: 'Region_X', label: 'Region X - Northern Mindanao' },
  { value: 'Region_XI', label: 'Region XI - Davao Region' },
  { value: 'Region_XII', label: 'Region XII - SOCCSKSARGEN' },
  { value: 'Region_XIII', label: 'Region XIII - Caraga' }
];

function Checkout() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', region: '', postalCode: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await cartAPI.getAll();
        setCartItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  // Pre-fill shipping info with user data
  useEffect(() => {
    if (user) {
      setShipping(prev => ({
        ...prev,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(price);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(shipping).forEach(key => {
      if (!shipping[key].trim()) newErrors[`shipping_${key}`] = 'Required';
    });
    if (shipping.email && !/\S+@\S+\.\S+/.test(shipping.email)) newErrors.shipping_email = 'Invalid email';
    if (shipping.phone && !/^(\+63|0)9\d{9}$/.test(shipping.phone.replace(/\s|-/g, ''))) {
      newErrors.shipping_phone = 'Invalid Philippine mobile number format (+63XXXXXXXXX or 09XXXXXXXXX)';
    }
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
  const shippingCost = subtotal > 1000 ? 0 : 149.99;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const orderData = {
        shipping_first_name: shipping.firstName,
        shipping_last_name: shipping.lastName,
        shipping_email: shipping.email,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_region: shipping.region,
        shipping_postal_code: shipping.postalCode,
        payment_method: paymentMethod,
      };

      const order = await ordersAPI.create(orderData);
      setOrderPlaced(true);
    } catch (error) {
      console.error('Failed to place order:', error);
      // Handle error - for now just log, later can show alert or message
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <section className="checkout-success py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card style={{ borderRadius: '0', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Card.Body className="text-center p-5">
                  <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                  <h2 className="mt-4 mb-3" style={{ fontFamily: 'Inter', color: '#000' }}>Order Placed Successfully!</h2>
                  <p className="mb-4 lead" style={{ fontFamily: 'Inter' }}>Thank you for your order. You'll receive a confirmation email shortly.</p>
                  <div className="border rounded p-3 mb-4" style={{ borderRadius: '0' }}>
                    <h5 className="mb-3">Order Summary</h5>
                    <div className="d-flex justify-content-between">
                      <span>Total Amount:</span>
                      <span className="fw-bold">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Button as={Link} to="/products" variant="dark" size="lg" style={{ borderRadius: '0' }}>Continue Shopping</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="checkout py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold text-center mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
              Checkout
            </h1>
          </Col>
        </Row>

        <form onSubmit={handleSubmit}>
          <Row>
            {/* Left Side - Forms */}
            <Col lg={8} className="mb-4">
              {/* Shipping Information */}
              <Card className="mb-4" style={{ borderRadius: '0', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Card.Header className="bg-white" style={{ borderBottom: '1px solid #e9ecef' }}>
                  <h5 className="mb-0 fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>Shipping Information</h5>
                </Card.Header>
                <Card.Body>
                  {['firstName', 'lastName', 'email', 'phone'].map((field, i) => (
                    <Col key={field} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontFamily: 'Inter', fontWeight: '600' }}>
                          {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Form.Label>
                        <Form.Control
                          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                          name={field}
                          value={shipping[field]}
                          onChange={handleShippingChange}
                          isInvalid={!!errors[`shipping_${field}`]}
                          placeholder={field === 'phone' ? '+63 9XX XXX XXXX' : ''}
                          style={inputStyle}
                        />
                        <Form.Control.Feedback type="invalid">{errors[`shipping_${field}`]}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )).reduce((arr, col, i) => {
                    if (i % 2 === 0) arr.push([col]);
                    else arr[arr.length - 1].push(col);
                    return arr;
                  }, []).map((pair, i) => <Row key={i}>{pair}</Row>)}

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontFamily: 'Inter', fontWeight: '600' }}>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={shipping.address}
                      onChange={handleShippingChange}
                      isInvalid={!!errors.shipping_address}
                      placeholder="House/Building Number, Street Name"
                      style={inputStyle}
                    />
                    <Form.Control.Feedback type="invalid">{errors.shipping_address}</Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    {['city', 'postalCode'].map(field => (
                      <Col key={field} md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontFamily: 'Inter', fontWeight: '600' }}>
                            {field === 'city' ? 'City' : 'Postal Code'}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={field}
                            value={shipping[field]}
                            onChange={handleShippingChange}
                            isInvalid={!!errors[`shipping_${field}`]}
                            style={inputStyle}
                          />
                          <Form.Control.Feedback type="invalid">{errors[`shipping_${field}`]}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    ))}
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontFamily: 'Inter', fontWeight: '600' }}>Region</Form.Label>
                        <Form.Select name="region" value={shipping.region} onChange={handleShippingChange} isInvalid={!!errors.shipping_region} style={inputStyle}>
                          <option value="">Select Region</option>
                          {regions.map(region => <option key={region.value} value={region.value}>{region.label}</option>)}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.shipping_region}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Payment Method */}
              <Card className="mb-4" style={{ borderRadius: '0', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Card.Header className="bg-white" style={{ borderBottom: '1px solid #e9ecef' }}>
                  <h5 className="mb-0 fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>Payment Method</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group>
                    <div>
                      <Form.Check
                        type="radio"
                        id="wallet"
                        name="paymentMethod"
                        value="wallet"
                        label="Pay Online with TeeLuxe Wallet"
                        checked={paymentMethod === 'wallet'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mb-3"
                      />
                      <Form.Check
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        label="Cash on Delivery (Pay when you receive your order)"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mb-3"
                      />
                    </div>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Side - Order Summary */}
            <Col lg={4}>
              <Card style={{ borderRadius: '0', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
                    Order Summary
                  </h5>

                  {/* Order Items */}
                  <div className="mb-3">
                    {cartItems.map(item => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                        <div className="flex-grow-1">
                          <div className="fw-semibold" style={{ fontFamily: 'Inter', fontSize: '0.9rem' }}>
                            {item.product.name}
                          </div>
                          <div className="text-muted small">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="fw-semibold" style={{ fontFamily: 'Inter' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr />

                  <div className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ fontFamily: 'Inter' }}>Subtotal ({cartItems.length} items)</span>
                      <span className="fw-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ fontFamily: 'Inter' }}>Shipping</span>
                      <span className="fw-semibold">
                        {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5" style={{ fontFamily: 'Inter' }}>Total</span>
                    <span className="fw-bold fs-5" style={{ fontFamily: 'Inter' }}>{formatPrice(total)}</span>
                  </div>

                  <Button
                    type="submit"
                    variant="dark"
                    size="lg"
                    className="w-100 py-3 fw-bold"
                    disabled={submitting}
                    style={{ borderRadius: '0', fontFamily: 'Inter' }}
                  >
                    {submitting ? <><Spinner animation="border" size="sm" className="me-2" />Processing...</> : 'Complete Order'}
                  </Button>

                  <p className="text-center mt-3 mb-0" style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: '#6c757d' }}>
                    {paymentMethod === 'wallet' ? (
                      <>
                        <i className="fas fa-wallet me-1"></i>
                        TeeLuxe wallet payment
                      </>
                    ) : paymentMethod === 'cod' ? (
                      <>
                        <i className="fas fa-money-bill me-1"></i>
                        Pay upon delivery
                      </>
                    ) : null}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
}

export default Checkout;
