// KidsClothes.js
import React from 'react';
import Catagories from '../Catagories';
import Layout from '../../include/Layout';
import 'react-multi-carousel/lib/styles.css';
import './kidsclothes.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

function KidsClothes() {
  const kidsClothesData = [
    {
      id: 1,
      productName: "Boys' Cotton T-Shirt",
      description: "Soft and comfortable cotton t-shirt with cartoon print.",
      price: 12.99,
      size: ["S", "M", "L", "XL"],
      color: ["Red", "Blue", "Green"],
      ageGroup: "3-8 years",
      brand: "Kids Fashion",
      material: "100% Cotton",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 2,
      productName: "Girls' Floral Dress",
      description: "Elegant floral print dress for special occasions.",
      price: 19.99,
      size: ["S", "M", "L"],
      color: ["Pink", "Yellow", "White"],
      ageGroup: "4-10 years",
      brand: "Pretty Kids",
      material: "Cotton Blend",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 3,
      productName: "Unisex Hooded Jacket",
      description: "Warm and stylish hooded jacket for boys and girls.",
      price: 25.99,
      size: ["M", "L", "XL"],
      color: ["Gray", "Navy", "Black"],
      ageGroup: "5-12 years",
      brand: "Young Style",
      material: "Fleece",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 4,
      productName: "Boys' Cargo Shorts",
      description: "Durable cargo shorts with multiple pockets for boys.",
      price: 15.49,
      size: ["S", "M", "L", "XL"],
      color: ["Khaki", "Olive", "Black"],
      ageGroup: "3-10 years",
      brand: "Adventure Kids",
      material: "Cotton Twill",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 5,
      productName: "Girls' Denim Skirt",
      description: "Trendy denim skirt with adjustable waist for girls.",
      price: 17.99,
      size: ["S", "M", "L"],
      color: ["Blue", "Dark Blue"],
      ageGroup: "4-10 years",
      brand: "Denim Junior",
      material: "Denim",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 6,
      productName: "Boys' Sports Shoes",
      description: "Comfortable and lightweight sports shoes for boys.",
      price: 29.99,
      size: ["7", "8", "9", "10"],
      color: ["Black", "White", "Red"],
      ageGroup: "6-12 years",
      brand: "Run Kid",
      material: "Synthetic",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 7,
      productName: "Girls' Princess Gown",
      description: "Beautiful princess gown with sequins and lace details.",
      price: 39.99,
      size: ["M", "L", "XL"],
      color: ["Purple", "Pink", "White"],
      ageGroup: "5-10 years",
      brand: "Fairy Tale",
      material: "Silk Blend",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 8,
      productName: "Boys' Swim Shorts",
      description: "Quick-dry swim shorts with fun prints for boys.",
      price: 13.99,
      size: ["S", "M", "L"],
      color: ["Blue", "Green", "Yellow"],
      ageGroup: "3-8 years",
      brand: "Wave Riders",
      material: "Polyester",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 9,
      productName: "Girls' Winter Coat",
      description: "Cozy winter coat with faux fur hood for girls.",
      price: 49.99,
      size: ["M", "L", "XL"],
      color: ["Pink", "Red", "White"],
      ageGroup: "5-12 years",
      brand: "Snow Angels",
      material: "Polyester",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    },
    {
      id: 10,
      productName: "Unisex Raincoat",
      description: "Waterproof raincoat with reflective strips for safety.",
      price: 19.99,
      size: ["M", "L", "XL"],
      color: ["Yellow", "Green", "Blue"],
      ageGroup: "4-10 years",
      brand: "Rainy Day",
      material: "PVC",
      imageUrl: "https://picsum.photos/500/300",
      inStock: true,
    }
    // Add the remaining data here
  ];

  // Responsive settings for react-multi-carousel
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set the delay between slides (in milliseconds)
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
  

  return (
    <Layout>
      <Catagories />
      <div className="bg-orange-50 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-black-500 tracking-wide">Kids Clothes</h2>
            <Link
              to="/allkidsclothes"
              className="bg-purple-400 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300"
            >
              See All
            </Link>
          </div>
          <Slider {...settings} className="slider-container">
            {kidsClothesData.map((item) => (
              <div key={item.id} className="relative mx-2 p-2">
                <Link to={`/ShowKidsProduct`} state={{ item }} className="block no-underline hover:no-underline">
                  <div className="relative rounded-lg overflow-hidden bg-blue-50">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-44 object-cover object-center"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.productName}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.ageGroup} | Brand: {item.brand}
                      </p>
                      <p className="text-lg font-bold text-purple-600">Price: ${item.price}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <button className="btn btn-primary mt-2">Add to Cart</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  );
}

export default KidsClothes;
