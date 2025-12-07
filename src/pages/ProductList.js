import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, InputGroup, Button } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../utils/api';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categories = ['All', 'Men', 'Women'];

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category') || 'All';
    setSearchTerm(search ? decodeURIComponent(search) : '');
    setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;
        const data = await productsAPI.getAll(params);
        setProducts(data);
        setDataLoaded(true);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Since backend already handles filtering, no client-side filtering needed
  const filteredProducts = products;

  if (loading) {
    return (
      <section className="product-list py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading products...</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-list py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
              <h2 className="mt-3 text-muted">Unable to load products</h2>
              <p className="text-muted">Error: {error}</p>
              <p className="text-muted">Please check if the backend is running on localhost:8082</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

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



        {/* Product Grid */}
        <Row className="g-4">
          {dataLoaded ? (
            filteredProducts.length > 0 ? (
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
            )
          ) : (
            <Col className="text-center py-5">
              <div className="w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <i className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </i>
                <p className="mt-3 text-muted">Fetching products from server...</p>
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
