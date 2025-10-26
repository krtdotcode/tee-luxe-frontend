import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Nav.Link as={Link} to={to} className={isActive ? 'fw-bold active' : ''}>
      {children}
    </Nav.Link>
  );
};

function TeeLuxeNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get('search');
    setSearchQuery(search ? decodeURIComponent(search) : '');
  }, [searchParams]);

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
    <Navbar bg="white" expand="lg" className="py-3">
      <Container fluid className="px-3">
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bolder fs-3 text-dark me-4">
          <img
            src={`${process.env.PUBLIC_URL}/logo/tee-luxe.png`}
            alt="TeeLuxe Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex w-100 justify-content-between align-items-center flex-lg-row flex-column gap-3">
            {/* Navigation Links */}
            <Nav className="d-flex gap-2">
              <NavLink to="/products">Shop</NavLink>
            </Nav>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center justify-content-lg-start">
              {/* Search Bar */}
              <Form className="mb-0" onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) handleSearch(); }}>
                <InputGroup className="search-group">
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={handleClearSearch}
                    className="search-clear-btn"
                  >
                    ×
                  </Button>
                </InputGroup>
              </Form>

              {/* Shopping Cart Icon */}
              <Button variant="link" className="text-dark p-0 position-relative">
                <i className="fas fa-shopping-cart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{ fontSize: '0.6rem' }}>
                  0
                </span>
              </Button>

              {/* User Icon (Login) */}
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="link" className="text-dark p-0">
                  <i className="fas fa-user fs-5"></i>
                </Button>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TeeLuxeNavbar;
