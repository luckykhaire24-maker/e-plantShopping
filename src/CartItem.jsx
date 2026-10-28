import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ go }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const increase = (item) => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const decrease = (item) =>
    item.quantity > 1
      ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
      : dispatch(removeItem(item.name));

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
        <h2>Shopping Cart</h2>
        {items.length === 0 && <p>Your cart is empty. Browse the plants to add some.</p>}

        {items.map((item) => (
          <div className="cart-row" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
            </div>
            <div className="qty">
              <button onClick={() => decrease(item)} aria-label={`Decrease ${item.name}`}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item)} aria-label={`Increase ${item.name}`}>+</button>
            </div>
            <p className="line-total">Total: ${item.cost * item.quantity}</p>
            <button className="delete" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        ))}

        <h3 className="cart-total">Total cart amount: ${totalAmount}</h3>
        <div className="actions">
          <button className="btn secondary" onClick={() => go('plants')}>Continue Shopping</button>
          <button className="btn" onClick={() => alert('Checkout: Coming Soon')}>Checkout</button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
