import React, { useEffect } from 'react';
// import { useCart } from './CartContext'; // Import the custom hook to use Cart Context
import { useLocation } from 'react-router-dom';

export default function CartPage() {
  const { state } = useLocation(); // Retrieve the product data from location state
  const product = state?.product; // Extract product data

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
        <div className="row">
        
            <div key={product.id} className="card m-3" style={{ width: '18rem' }}>
              <img
                src={`${process.env.REACT_APP_BASE_URL}${product.item_image}`}
                className="card-img-top"
                alt={product.product_name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                {/* <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(product.id)} // Remove product from cart
                >
                  Remove from Cart
                </button> */}
              </div>
            </div>
          
        </div>
      
      {/* <button className="btn btn-primary mt-3" onClick={() => navigate('/home')}>
        Continue Shopping
      </button> */}
    </div>
  );
}
