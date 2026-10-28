import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ go }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost of one plant line (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for all plants in the cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));
  const handleContinueShopping = (e) => { e.preventDefault(); go('plants'); };
  const handleCheckoutShopping = () => alert('Checkout: Coming Soon');

  return (
    <div>
      <nav className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div className="links">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Home</a>
          <a href="#" onClick={handleContinueShopping}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); go('cart'); }}>
            Cart <span className="cart_icon" aria-label="Cart items">🛒 <b>{totalCount}</b></span>
          </a>
        </div>
      </nav>

      <div className="cart-container">
        <h2 className="total_cart_amount">Total Cart Amount: ${calculateTotalAmount()}</h2>
        {cart.length === 0 && <p>Your cart is empty. Browse the plants to add some.</p>}

        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>−</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
            </div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}

        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
          <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
