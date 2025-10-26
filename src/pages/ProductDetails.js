import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <i className="fas fa-exclamation-triangle text-muted" style={{ fontSize: '4rem' }}></i>
            <h2 className="mt-3" style={{ fontFamily: 'Inter' }}>Product Not Found</h2>
            <Button variant="dark" style={{ borderRadius: '0' }} onClick={() => navigate('/products')}>
              Back to Collection
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(price);
  };

  // Get suggested products (same category, exclude current)
  const suggestedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="product-details py-5">
      <Container>
        <Row className="g-5">
          {/* Product Image */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '0' }}>
              <Card.Img
                src={product.image}
                alt={product.name}
                className="rounded-0"
                style={{ height: '550px', objectFit: 'cover', width: '100%' }}
              />
            </Card>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="sticky-top" style={{ top: '2rem' }}>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2" style={{ fontSize: '0.9em', borderRadius: '0' }}>
                  {product.category}
                </Badge>
              </div>

              <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: 'Inter', color: '#000', lineHeight: '1.2' }}>
                {product.name}
              </h1>

              <p className="fs-4 fw-bold mb-4 text-dark">
                {formatPrice(product.price)}
              </p>

              <p className="text-muted mb-4 lead" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                {product.description}
              </p>

              <div className="d-grid gap-3 mb-5">
                <Button
                  variant="dark"
                  size="lg"
                  className="py-3 fw-bold"
                  style={{ fontFamily: 'Inter', borderRadius: '0', fontSize: '1.1rem' }}
                  onClick={() => alert('Added to cart!')}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Add to Cart
                </Button>

                <Button
                  variant="outline-dark"
                  size="lg"
                  className="py-3 fw-bold"
                  style={{ fontFamily: 'Inter', borderRadius: '0', fontSize: '1.1rem' }}
                  onClick={() => navigate('/products')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Continue Shopping
                </Button>
              </div>

              {/* Product Highlights */}
              <div>
                <h3 className="fw-bold mb-4" style={{ fontFamily: 'Inter', fontSize: '1.3rem' }}>Product Highlights</h3>
                <div className="row g-3">
                  <Col sm={6}>
                    <div className="p-3 border" style={{ borderRadius: '0' }}>
                      <i className="fas fa-check text-success me-2"></i>
                      Authentic Materials
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="p-3 border" style={{ borderRadius: '0' }}>
                      <i className="fas fa-check text-success me-2"></i>
                      Ethical Production
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="p-3 border" style={{ borderRadius: '0' }}>
                      <i className="fas fa-check text-success me-2"></i>
                      Premium Quality
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="p-3 border" style={{ borderRadius: '0' }}>
                      <i className="fas fa-check text-success me-2"></i>
                      Timeless Design
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <Row className="mt-5 pt-5 border-top">
            <Col>
              <h3 className="text-center mb-5 fw-bold" style={{ fontFamily: 'Inter', color: '#000' }}>
                You Might Also Like
              </h3>
              <Row className="g-4">
                {suggestedProducts.map(product => (
                  <Col key={product.id} lg={3} md={6}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default ProductDetails;
