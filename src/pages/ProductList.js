import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, InputGroup, Button } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categories = ['All', 'Men', 'Women'];

  useEffect(() => {
    const search = searchParams.get('search');
    setSearchTerm(search ? decodeURIComponent(search) : '');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="product-list py-5">
      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="display-4 fw-bold text-center mb-4" style={{ fontFamily: 'Inter', color: '#000' }}>
              Our Collection
            </h1>
            <p className="lead text-center text-muted mb-4">
              Discover our curated selection of minimalist fashion essentials
            </p>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col>
            <Navbar expand="lg" className="p-0 justify-content-center">
              <Navbar.Brand className="fs-6 fw-semibold text-dark pe-3">
                Filter by Category:
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="category-nav" />
              <Navbar.Collapse id="category-nav">
                <Nav className="flex-wrap justify-content-center">
                  {categories.map(category => (
                    <Nav.Link
                      key={category}
                      className={`me-3 mb-2 fw-semibold ${selectedCategory === category ? 'text-dark border-bottom border-dark' : 'text-muted'}`}
                      style={{ cursor: 'pointer', borderBottom: selectedCategory === category ? '2px solid #000' : 'none' }}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Nav.Link>
                  ))}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>

        {/* Product Grid */}
        <Row className="g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Col key={product.id} xl={4} lg={6} md={6}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <div className="w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <i className="fas fa-search text-muted" style={{ fontSize: '4rem' }}></i>
                <h3 className="mt-3 text-muted">No products found</h3>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline-dark"
                  onClick={() => navigate('/products')}
                  className="mt-3"
                  style={{ borderRadius: '0' }}
                >
                  Clear Filters
                </Button>
              </div>
            </Col>
          )}
        </Row>

        {/* Results Count */}
        <Row className="mt-4">
          <Col className="text-center">
            <small className="text-muted">
              Showing {filteredProducts.length} of {products.length} products
            </small>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProductList;
