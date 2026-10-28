import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  // Navigation used by the Product List and Cart pages: 'home' | 'plants' | 'cart'
  const go = (page) => {
    setShowProductList(page !== 'home');
    setShowCart(page === 'cart');
  };

  return (
    <div className="app-container">
      {!showProductList && (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome to Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where green meets serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <AboutUs />
          </div>
        </div>
      )}
      {showProductList && (showCart ? <CartItem go={go} /> : <ProductList go={go} />)}
    </div>
  );
}

export default App;
