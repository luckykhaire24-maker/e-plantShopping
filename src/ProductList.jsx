import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Simple generated thumbnail so the project works without external image files.
const thumb = (c) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='#eef4ec'/>` +
    `<path d='M50 62C30 60 22 40 28 24c18 4 26 18 22 38Z' fill='${c}'/>` +
    `<path d='M50 62c20-2 28-22 22-38-18 4-26 18-22 38Z' fill='${c}' opacity='.75'/>` +
    `<path d='M34 66h32l-5 24H39z' fill='#a8643a'/></svg>`
  );

// [name, price, leaf colour]
const raw = {
  'Air Purifying Plants': [
    ['Snake Plant', 15, '#2d6a4f'], ['Spider Plant', 12, '#52b788'], ['Peace Lily', 18, '#1b4332'],
    ['Boston Fern', 14, '#40916c'], ['Rubber Plant', 20, '#2d6a4f'], ['Aloe Vera', 10, '#74c69d'],
  ],
  'Aromatic Plants': [
    ['Lavender', 16, '#7b6fa8'], ['Jasmine', 17, '#52b788'], ['Rosemary', 11, '#3a7d44'],
    ['Mint', 8, '#52b788'], ['Lemon Balm', 9, '#74c69d'], ['Basil', 7, '#2d6a4f'],
  ],
  'Low Light Plants': [
    ['ZZ Plant', 22, '#1b4332'], ['Cast Iron Plant', 19, '#2d6a4f'], ['Pothos', 9, '#40916c'],
    ['Chinese Evergreen', 21, '#52b788'], ['Dracaena', 24, '#3a7d44'], ['Philodendron', 13, '#2d6a4f'],
  ],
};

const categories = Object.entries(raw).map(([title, plants]) => ({
  title,
  plants: plants.map(([name, cost, colour]) => ({ name, cost, image: thumb(colour) })),
}));

function ProductList({ go }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const inCart = (name) => items.some((item) => item.name === name);

  return (
    <div>
      <nav className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div className="links">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); go('plants'); }}>Plants</a>
          <a href="#" className="cart-link" onClick={(e) => { e.preventDefault(); go('cart'); }}>
            Cart <span className="cart-icon" aria-label="Cart items">🛒 <b>{totalCount}</b></span>
          </a>
        </div>
      </nav>

      <main className="page">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2>{cat.title}</h2>
            <div className="grid">
              {cat.plants.map((plant) => (
                <div className="card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.cost}</p>
                  <button
                    className="btn"
                    disabled={inCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {inCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
