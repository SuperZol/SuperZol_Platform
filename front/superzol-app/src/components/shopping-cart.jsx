import React from 'react';
import '../css/shopping-cart.css';

export const ShoppingCart = () => {
  return (
    <div className="shopping-cart">
      <h2>עגלת הקניות שלי</h2>
      <div className="shopping-cart-content">
        <div className="item">
          <p>חלב בקרטון 3% 1 ליטר</p>
          <p>₪ 7.1 - 7.1</p>
        </div>
        {/* Add more items as needed */}
      </div>
    </div>
  );
};
