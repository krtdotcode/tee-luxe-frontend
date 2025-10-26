import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(price);
  };

  if (!product) return null;

  return (
    <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0', overflow: 'hidden' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ overflow: 'hidden', height: '300px' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-100 h-100 object-fit-cover"
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column p-4">
        <div className="flex-grow-1">
          <small className="text-muted text-uppercase fw-semibold mb-2 d-block" style={{ fontSize: '0.8em' }}>
            {product.category}
          </small>
          <Card.Title className="fw-bold mb-2 lh-sm" style={{ fontFamily: 'Inter', fontSize: '1.1rem' }}>
            {product.name}
          </Card.Title>
          <Card.Text className="text-muted small mb-3" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
            {product.description}
          </Card.Text>
        </div>
        <div>
          <p className="fw-bold fs-5 mb-3 text-dark" style={{ fontFamily: 'Inter', margin: 0 }}>
            {formatPrice(product.price)}
          </p>
          <Button
            variant="dark"
            size="sm"
            className="w-100 py-2 fw-bold"
            style={{ fontFamily: 'Inter', borderRadius: '0' }}
            as={Link}
            to={`/product/${product.id}`}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
