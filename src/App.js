import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TeeLuxeNavbar from './components/Navbar';

function NewFeatured() {
  return (
    <div>
      <h1>New & Featured</h1>
      <p>Discover the latest trends and featured items at TeeLuxe.</p>
    </div>
  );
}

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

function App() {
  return (
    <Router>
      <div className="App">
        <TeeLuxeNavbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<NewFeatured />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/sale" element={<Sale />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
