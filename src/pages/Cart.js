import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from '../data/products';

// Sample cart items - in real app, this would come from global state/store
const sampleCartItems = [
  { id: 1, quantity: 2 },
  { id: 5, quantity: 1 },
  { id: 7, quantity: 3 }
];

function Cart() {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(price);
  };

  // Get product details and merge with quantities
  const cartItemsWithDetails = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    return {
      ...product,
      quantity: cartItem.quantity
    };
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItemsWithDetails.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 149.99; // Free shipping over ₱1000
  const total = subtotal + shipping;

  if (cartItemsWithDetails.length === 0) {
    return (
      <section className="cart-empty py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <div className="mb-4">
                <i className="fas fa-shopping-cart text-muted" style={{ fontSize: '4rem' }}></i>
              </div>
              <h2 className="fw-bold mb-3" style={{ fontFamily: 'Inter', color: '#000' }}>
                Your Cart is Empty
              </h2>
              <p className="text-muted mb-4 lead" style={{ fontFamily: 'Inter' }}>
                Discover our minimalist fashion collection and add some items to your cart.
              </p>
              <Button
                as={Link}
                to="/products"
                variant="dark"
                size="lg"
                className="px-4 py-3 fw-bold"
                style={{ borderRadius: '0', fontFamily: 'Inter', minWidth: '200px' }}
              >
                Shop Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="cart py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold text-center mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
              Shopping Cart
            </h1>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mb-4">
            <Card style={{ borderRadius: '0', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table className="mb-0">
                    <thead className="border-bottom">
                      <tr>
                        <th className="border-0 py-4 px-4 fw-bold" scope="col" style={{ fontFamily: 'Inter', color: '#000' }}>Product</th>
                        <th className="border-0 py-4 text-center fw-bold" scope="col" style={{ fontFamily: 'Inter', color: '#000' }}>Quantity</th>
                        <th className="border-0 py-4 text-center fw-bold" scope="col" style={{ fontFamily: 'Inter', color: '#000' }}>Price</th>
                        <th className="border-0 py-4 text-center fw-bold" scope="col" style={{ fontFamily: 'Inter', color: '#000' }}>Total</th>
                        <th className="border-0 py-4 text-center fw-bold" scope="col" style={{ fontFamily: 'Inter', color: '#000' }}>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItemsWithDetails.map(item => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-4 px-4">
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                className="me-3"
                              />
                              <div>
                                <h6 className="fw-bold mb-1" style={{ fontFamily: 'Inter', color: '#000' }}>
                                  {item.name}
                                </h6>
                                <p className="text-muted small mb-0">{item.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <Button
                                variant="outline-dark"
                                size="sm"
                                className="px-2"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{ borderRadius: '0', width: '30px', height: '30px' }}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="mx-3 fw-semibold" style={{ minWidth: '40px', textAlign: 'center' }}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline-dark"
                                size="sm"
                                className="px-2"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{ borderRadius: '0', width: '30px', height: '30px' }}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 text-center" style={{ fontFamily: 'Inter', fontWeight: '600' }}>
                            {formatPrice(item.price)}
                          </td>
                          <td className="py-4 text-center fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>
                            {formatPrice(item.price * item.quantity)}
                          </td>
                          <td className="py-4 text-center">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              style={{ borderRadius: '0', border: 'none' }}
                              className="text-danger"
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={{ borderRadius: '0', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
                  Order Summary
                </h5>

                <div className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontFamily: 'Inter', color: '#6c757d' }}>Subtotal ({cartItemsWithDetails.length} items)</span>
                    <span className="fw-semibold" style={{ fontFamily: 'Inter', color: '#000' }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span style={{ fontFamily: 'Inter', color: '#6c757d' }}>Shipping</span>
                    <span className="fw-semibold" style={{ fontFamily: 'Inter', color: '#000' }}>
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5" style={{ fontFamily: 'Inter', color: '#000' }}>Total</span>
                  <span className="fw-bold fs-5" style={{ fontFamily: 'Inter', color: '#000' }}>{formatPrice(total)}</span>
                </div>

                <div className="d-grid gap-3">
                  <Button
                    variant="dark"
                    size="lg"
                    className="py-3 fw-bold"
                    style={{ borderRadius: '0', fontFamily: 'Inter', fontSize: '1.1rem' }}
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Proceed to Checkout'}
                  </Button>

                  <Button
                    as={Link}
                    to="/products"
                    variant="outline-dark"
                    size="lg"
                    className="py-3 fw-bold"
                    style={{ borderRadius: '0', fontFamily: 'Inter', fontSize: '1.1rem' }}
                  >
                    Continue Shopping
                  </Button>
                </div>

                {subtotal < 1000 && (
                  <div className="mt-3 p-3 bg-light rounded" style={{ borderRadius: '0' }}>
                    <small className="text-muted" style={{ fontFamily: 'Inter' }}>
                      Add {formatPrice(1000 - subtotal)} more for FREE shipping!
                    </small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Cart;
