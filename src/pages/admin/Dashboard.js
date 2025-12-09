import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productsAPI, categoriesAPI, ordersAPI } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, categories, orders] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
          ordersAPI.getAll(),
        ]);

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalOrders: orders.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-center mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
            Admin Dashboard
          </h1>
          <p className="lead text-center text-muted">
            Welcome back, {user?.name}! Manage your TeeLuxe store from here.
          </p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col xl={4} lg={4} md={6}>
          <Card className="shadow-sm" style={{ borderRadius: '0', border: 'none' }}>
            <Card.Body className="text-center p-4">
              <div className="text-primary mb-3">
                <i className="fas fa-box fa-3x"></i>
              </div>
              <h2 className="fw-bold mb-2">{stats.totalProducts}</h2>
              <p className="text-muted mb-0 fw-semibold">Total Products</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} lg={4} md={6}>
          <Card className="shadow-sm" style={{ borderRadius: '0', border: 'none' }}>
            <Card.Body className="text-center p-4">
              <div className="text-success mb-3">
                <i className="fas fa-tags fa-3x"></i>
              </div>
              <h2 className="fw-bold mb-2">{stats.totalCategories}</h2>
              <p className="text-muted mb-0 fw-semibold">Total Categories</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} lg={4} md={6}>
          <Card className="shadow-sm" style={{ borderRadius: '0', border: 'none' }}>
            <Card.Body className="text-center p-4">
              <div className="text-warning mb-3">
                <i className="fas fa-shopping-cart fa-3x"></i>
              </div>
              <h2 className="fw-bold mb-2">{stats.totalOrders}</h2>
              <p className="text-muted mb-0 fw-semibold">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row>
        <Col lg={6} className="offset-lg-3">
          <Card className="shadow-sm" style={{ borderRadius: '0', border: 'none' }}>
            <Card.Body className="text-center">
              <h5 className="fw-bold mb-4" style={{ color: '#000' }}>Quick Actions</h5>
              <div className="d-grid gap-3">
                <Link to="/admin/products" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="dark"
                    className="w-100"
                    style={{ borderRadius: '0' }}
                  >
                    <i className="fas fa-box me-2"></i> Manage Products
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
