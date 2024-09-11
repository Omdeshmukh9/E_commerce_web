import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import './showproduct.css'; // Custom CSS file for additional styling
import DataProduct from './DataProduct'
import Layout from '../include/Layout';
export default function ProductDetail() {
  const { state } = useLocation(); // Retrieve the product data from location state
  const product = state?.product; // Extract product data

  const [zoomStyle, setZoomStyle] = useState({
    display: 'none',
    backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${product?.item_image})`,
  });
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch all products
    fetch(process.env.REACT_APP_PRODUCT_DATA)
      .then(response => response.json())
      .then(data => setAllProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  if (!product) {
    return <p>No product details available.</p>;
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: '200%',
      backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${product.item_image})`,
    });

    const circle = document.querySelector('.cursor-circle');
    if (circle) {
      circle.style.top = `${e.clientY - rect.top}px`;
      circle.style.left = `${e.clientX - rect.left}px`;
    }
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
    const circle = document.querySelector('.cursor-circle');
    if (circle) circle.style.display = 'none';
  };

  const handleMouseEnter = () => {
    const circle = document.querySelector('.cursor-circle');
    if (circle) circle.style.display = 'block';
  };

  return (
    <Layout>
    <div className="container mt-4">
      {/* Display Selected Product */}
      <h2 className="mb-4">Selected Product</h2>
      <div className="card product-detail-card mb-4">
        <div className="row g-0">
          <div className="col-md-5 p-4">
            <div
              className="image-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
            >
              <img
                src={`${process.env.REACT_APP_BASE_URL}${product.item_image}`}
                alt={product.product_name}
                className="img-fluid product-image"
              />
              <div className="cursor-circle"></div>
            </div>
          </div>
          <div className="col-md-7 position-relative p-4">
            <div className="zoomed-section" style={zoomStyle}></div>
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="card-text">
                <strong>Discount:</strong> ${product.discount}
              </p>
              <p className="card-text">
                <strong>Category:</strong> {product.item_category}
              </p>
              <p className="card-text">
                <strong>Brand:</strong> {product.brand}
              </p>
              <p className="card-text">
                <strong>Quantity:</strong> {product.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Display All Products */}
      <h3 className="mb-4">All Products</h3>

     <Link to='/ShowProduct'> <p><DataProduct /></p></Link>

    </div>
    </Layout>
  );
}
