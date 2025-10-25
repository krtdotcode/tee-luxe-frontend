import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

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

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Navbar bg="white" expand="lg" className="py-3">
      <Container fluid className="px-3">
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bolder fs-3 text-dark me-4">
          TeeLuxe
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex w-100 align-items-center justify-content-between">
            {/* Centered Nav Links */}
            <Nav className="mx-auto d-flex gap-2">
              <NavLink to="/men">Men</NavLink>
              <NavLink to="/women">Women</NavLink>
              <NavLink to="/sale">Sale</NavLink>
            </Nav>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-3">
              {/* Search Bar */}
              <Form className="mb-0">
                <InputGroup className="search-group">
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <Button
                    variant="outline-dark"
                    onClick={handleClearSearch}
                    disabled={!searchQuery}
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
