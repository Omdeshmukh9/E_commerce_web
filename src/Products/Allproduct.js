import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './allproduct.css'; // Custom CSS file for additional styling

const { REACT_APP_PRODUCT_GETDATA, REACT_APP_BASE_URL } = process.env;

export default function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(REACT_APP_PRODUCT_GETDATA);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Products</h2>
      <div className="row">
        {data.length > 0 ? (
          data.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`${REACT_APP_BASE_URL}${product.item_image}`}
                  alt={product.product_name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <Link to={`/ShowProduct`} state={{ product }} className="btn btn-primary">View Product</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
