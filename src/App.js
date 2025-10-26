import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './App.css';
import TeeLuxeNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function Men() {
  return (
    <div>
      <h1>Men</h1>
      <p>Explore our collection for men.</p>
    </div>
  );
}

function Women() {
  return (
    <div>
      <h1>Women</h1>
      <p>Explore our collection for women.</p>
    </div>
  );
}

function Sale() {
  return (
    <div>
      <h1>Sale</h1>
      <p>Check out our latest discounts and deals.</p>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="App">
      {!isAuthPage && <TeeLuxeNavbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
