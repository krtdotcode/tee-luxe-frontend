import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Badge, Card, Modal, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../../utils/api';
import ProductCard from '../../components/ProductCard';

function ProductManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock_quantity: '',
    image: '',
    is_active: true
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct.id, {
          ...formData,
          price: parseFloat(formData.price),
          stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : null
        });
      } else {
        await productsAPI.create({
          ...formData,
          price: parseFloat(formData.price),
          stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : null
        });
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productsAPI.delete(productId);
      loadProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      description: product.description || '',
      price: product.price,
      stock_quantity: product.stock_quantity || '',
      image: product.image || '',
      is_active: product.is_active
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      description: '',
      price: '',
      stock_quantity: '',
      image: '',
      is_active: true
    });
  };

  const openAddModal = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading products...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-4 fw-bold mb-0" style={{ fontFamily: 'Inter', color: '#000' }}>
                Product Management
              </h1>
              <p className="text-muted mt-2">Manage your store's products</p>
            </div>
            <div>
              <Button
                variant="outline-secondary"
                className="me-2"
                style={{ borderRadius: '0' }}
                onClick={() => navigate('/admin')}
              >
                <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
              </Button>
              <Button
                variant="dark"
                style={{ borderRadius: '0' }}
                onClick={openAddModal}
              >
                <i className="fas fa-plus me-2"></i> Add Product
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" className="mb-0" style={{ borderRadius: '0' }}>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card className="shadow-sm" style={{ borderRadius: '0', border: 'none' }}>
            <Card.Body className="p-0">
              {products.length > 0 ? (
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fw-bold">Image</th>
                      <th className="fw-bold">Name</th>
                      <th className="fw-bold">Category</th>
                      <th className="fw-bold">Price</th>
                      <th className="fw-bold">Stock</th>
                      <th className="fw-bold">Status</th>
                      <th className="fw-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>
                          {product.image ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL || 'http://localhost:8082'}${product.image}`}
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ) : (
                            <div
                              className="bg-light d-flex align-items-center justify-content-center"
                              style={{ width: '50px', height: '50px', borderRadius: '4px' }}
                            >
                              <i className="fas fa-image text-muted"></i>
                            </div>
                          )}
                        </td>
                        <td className="fw-semibold">{product.name}</td>
                        <td>{product.category?.name || 'No category'}</td>
                        <td className="fw-semibold">₱{product.price}</td>
                        <td>
                          {product.stock_quantity !== null ? product.stock_quantity : 'Unlimited'}
                        </td>
                        <td>
                          <Badge bg={product.is_active ? 'success' : 'secondary'} className="rounded-0">
                            {product.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1 rounded-0"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="me-1 rounded-0"
                            onClick={() => handleEdit(product)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-0"
                            onClick={() => handleDelete(product.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-box text-muted fa-4x mb-3"></i>
                  <h4 className="text-muted mb-2">No products yet</h4>
                  <p className="text-muted mb-4">Start adding products to your store.</p>
                  <Button variant="dark" onClick={openAddModal} style={{ borderRadius: '0' }}>
                    <i className="fas fa-plus me-2"></i> Add First Product
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title className="fw-bold" style={{ fontFamily: 'Inter' }}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger" className="mb-0" style={{ borderRadius: '0' }}>{error}</Alert>}

            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ borderRadius: '0' }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Category *</Form.Label>
                  <Form.Select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    required
                    style={{ borderRadius: '0' }}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Price (₱) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    style={{ borderRadius: '0' }}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ borderRadius: '0' }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Leave empty for unlimited"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    style={{ borderRadius: '0' }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{ borderRadius: '0' }}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Check
                  type="switch"
                  id="is_active"
                  label="Active (visible to customers)"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: 'none' }}>
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(false)}
              style={{ borderRadius: '0' }}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              type="submit"
              style={{ borderRadius: '0' }}
            >
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ProductManagement;
