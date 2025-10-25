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
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark">
          TeeLuxe
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {/* Centered Nav Links */}
          <Nav className="mx-auto">
            <NavLink to="/">New & Featured</NavLink>
            <NavLink to="/men">Men</NavLink>
            <NavLink to="/women">Women</NavLink>
            <NavLink to="/sale">Sale</NavLink>
          </Nav>

          {/* Search Bar on Right */}
          <Form className="d-flex">
            <InputGroup style={{ width: '250px' }}>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-start"
              />
              <Button
                variant="outline-secondary"
                onClick={handleClearSearch}
                disabled={!searchQuery}
                className="rounded-end"
              >
                ×
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TeeLuxeNavbar;
