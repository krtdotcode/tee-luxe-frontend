import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Button, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const NavLink = ({ to, children }) => {
  return (
    <Nav.Link as={Link} to={to}>
      {children}
    </Nav.Link>
  );
};

function TeeLuxeNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItemCount } = useCart();

  useEffect(() => {
    const search = searchParams.get('search');
    setSearchQuery(search ? decodeURIComponent(search) : '');
  }, [searchParams]);

  const currentSearch = searchParams.get('search');
  const currentCategory = searchParams.get('category') || 'All';

  const getNavClass = (cat) => {
    return `${currentCategory === cat ? 'text-dark fw-bold' : 'text-muted'} text-decoration-none text-uppercase fw-medium transition-all`;
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigate('/products');
  };

  return (
    <Navbar bg="white" expand="lg" className="py-2 shadow-sm" style={{ borderBottom: '1px solid #f0f0f0', fontFamily: 'Inter, sans-serif' }}>
      <Container fluid className="px-4">
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bolder fs-2 text-dark me-5">
          <img
            src={`${process.env.PUBLIC_URL}/logo/tee-luxe.png`}
            alt="TeeLuxe Logo"
            style={{ height: '50px', width: 'auto' }}
          />
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-3 border-0" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex w-100 justify-content-between align-items-center flex-lg-row flex-column gap-4">
            {/* Navigation Links */}
            <div className="d-flex gap-4">
              <Link
                className={getNavClass('All')}
                to="/products"
                style={{ fontSize: '0.95rem', letterSpacing: '0.5px', padding: '8px 0', transition: 'color 0.3s ease' }}
              >
                All
              </Link>
              <Link
                className={getNavClass('Men')}
                to={`/products?category=Men${currentSearch ? `&search=${currentSearch}` : ''}`}
                style={{ fontSize: '0.95rem', letterSpacing: '0.5px', padding: '8px 0', transition: 'color 0.3s ease' }}
              >
                Men
              </Link>
              <Link
                className={getNavClass('Women')}
                to={`/products?category=Women${currentSearch ? `&search=${currentSearch}` : ''}`}
                style={{ fontSize: '0.95rem', letterSpacing: '0.5px', padding: '8px 0', transition: 'color 0.3s ease' }}
              >
                Women
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center justify-content-lg-start">
              {/* Search Bar */}
              <Form className="mb-0" onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) handleSearch(); }}>
                <InputGroup style={{ width: '280px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search fashion..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-3 border-end-0"
                    style={{
                      borderRadius: '25px 0 0 25px',
                      fontFamily: 'Inter',
                      fontSize: '0.9rem',
                      borderColor: '#e0e0e0',
                      padding: '12px 16px'
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={handleClearSearch}
                    className="border-start-0"
                    style={{
                      borderRadius: '0 25px 25px 0',
                      borderColor: '#e0e0e0',
                      backgroundColor: '#f8f9fa',
                      color: '#6c757d',
                      padding: '12px 16px',
                      width: '50px'
                    }}
                  >
                    ×
                  </Button>
                </InputGroup>
              </Form>

              {/* Shopping Cart Icon */}
              <Button
                variant="link"
                as={Link}
                to="/cart"
                className="text-dark p-2 position-relative"
                style={{ borderRadius: '50%', transition: 'background-color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="fas fa-shopping-cart fs-5"></i>
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{ fontSize: '0.65rem', fontWeight: '600' }}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Button>

              {/* User Account */}
              {isAuthenticated ? (
                <NavDropdown
                  title={<i className="fas fa-user fs-5"></i>}
                  id="user-dropdown"
                  align="end"
                  className="text-dark"
                >
                  <NavDropdown.Item disabled className="text-muted fw-semibold">
                    Hello, {user?.name}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button
                  variant="link"
                  as={Link}
                  to="/login"
                  className="text-dark p-2"
                  style={{ borderRadius: '50%', transition: 'background-color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <i className="fas fa-user fs-5"></i>
                </Button>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TeeLuxeNavbar;
