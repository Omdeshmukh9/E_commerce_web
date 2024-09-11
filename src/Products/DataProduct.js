import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './productdata.css'
const { REACT_APP_PRODUCT_GETDATA, REACT_APP_BASE_URL } = process.env;

export default function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(REACT_APP_PRODUCT_GETDATA);
        console.log("Fetched Products:", response);
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

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleSaveProduct = (productId) => {
    if (savedProducts.includes(productId)) {
      setSavedProducts(savedProducts.filter(id => id !== productId));
    } else {
      setSavedProducts([...savedProducts, productId]);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  return (
    <div className="bg-orange-50 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black-500 tracking-wide">Our Products</h2>
          <Link
            to="/allproduct"
            className="bg-purple-400 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300"
          >
            See All
          </Link>
        </div>
        <Slider {...settings} className="slider-container">
          {data.map((product) => (
            <div key={product.id} className="relative mx-2 p-2">
              <Link to={`/ShowProduct`} state={{ product }} className="block no-underline hover:no-underline">
                <div className="relative rounded-lg overflow-hidden bg-blue-50">
                  <img
                    src={`${REACT_APP_BASE_URL}${product.item_image}`}
                    alt={product.product_name}
                    className="w-full h-44 object-cover object-center"
                  />
                  <button className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full">
                    <FontAwesomeIcon
                      icon={savedProducts.includes(product.id) ? solidBookmark : regularBookmark}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigating when clicking the bookmark
                        toggleSaveProduct(product.id);
                      }}
                      className="text-black hover:text-black cursor-pointer text-xl"
                    />
                  </button>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.product_name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.item_category} | Brand: {product.brand}
                    </p>
                    <p className="text-lg font-bold text-purple-600">Price: ${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
