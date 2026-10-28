import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'plants' | 'cart'

  if (page === 'plants') return <ProductList go={setPage} />;
  if (page === 'cart') return <CartItem go={setPage} />;

  return (
    <div className="landing">
      <div className="landing-box">
        <h1>Paradise Nursery</h1>
        <p>Healthy houseplants, delivered with care.</p>
        <button className="btn" onClick={() => setPage('plants')}>Get Started</button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
