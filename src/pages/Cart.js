import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { cartAPI, getToken } from '../utils/api';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null); // which cart item is being updated

  useEffect(() => {
    const fetchCart = async () => {
      if (!getToken()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await cartAPI.getAll();
        setCartItems(data);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        if (err.status === 401) {
          setError('Please login to view your cart');
        } else {
          setError(err.message || 'Failed to load cart');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(price);
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeItem(cartId);
      return;
    }

    try {
      setUpdating(cartId);
      await cartAPI.updateItem(cartId, newQuantity);
      setCartItems(prev =>
        prev.map(item =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      alert('Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (cartId) => {
    try {
      setUpdating(cartId);
      await cartAPI.removeItem(cartId);
      setCartItems(prev => prev.filter(item => item.id !== cartId));
    } catch (err) {
      alert('Failed to remove item');
    } finally {
      setUpdating(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 149.99; // Free shipping over ₱1000
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
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
                      {cartItems.map(item => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-4 px-4">
                            <div className="d-flex align-items-center">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                className="me-3"
                              />
                              <div>
                                <h6 className="fw-bold mb-1" style={{ fontFamily: 'Inter', color: '#000' }}>
                                  {item.product.name}
                                </h6>
                                <p className="text-muted small mb-0">{item.product.category.name}</p>
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
                                disabled={item.quantity <= 1 || updating === item.id}
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
                                disabled={updating === item.id}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 text-center" style={{ fontFamily: 'Inter', fontWeight: '600' }}>
                            {formatPrice(item.product.price)}
                          </td>
                          <td className="py-4 text-center fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>
                            {formatPrice(item.product.price * item.quantity)}
                          </td>
                          <td className="py-4 text-center">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              style={{ borderRadius: '0', border: 'none' }}
                              className="text-danger"
                              disabled={updating === item.id}
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
                    <span style={{ fontFamily: 'Inter', color: '#6c757d' }}>Subtotal ({cartItems.length} items)</span>
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
                    as={Link}
                    to="/checkout"
                    variant="dark"
                    size="lg"
                    className="py-3 fw-bold"
                    style={{ borderRadius: '0', fontFamily: 'Inter', fontSize: '1.1rem' }}
                  >
                    Proceed to Checkout
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
