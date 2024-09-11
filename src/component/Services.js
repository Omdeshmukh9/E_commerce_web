import {React,useEffect,useRef}from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Services.css'; // Custom CSS file
import Layout from '../include/Layout';
export default function Services() {
    const contactRef = useRef(null);

  useEffect(() => {
    // Scroll to the contact form when the component mounts
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "We build responsive and visually appealing websites tailored to your business needs. Our team specializes in creating user-friendly interfaces, ensuring seamless navigation, and optimizing performance across all devices. From e-commerce platforms to personal blogs, we've got you covered!"
    },
    {
      title: "Digital Marketing",
      description: "Grow your business with our comprehensive digital marketing services. We offer SEO, PPC advertising, social media management, and content marketing to help you reach a wider audience, increase brand awareness, and drive more traffic to your site. Let's turn clicks into conversions!"
    },
    {
      title: "Graphic Design",
      description: "Enhance your brand identity with our creative graphic design services. Our talented designers create compelling logos, brochures, business cards, and social media graphics that resonate with your target audience. We believe in designs that not only look good but also tell your brand's story."
    },
    {
      title: "Mobile App Development",
      description: "Enter the mobile market with confidence through our app development services. We design and develop user-friendly mobile applications for both iOS and Android platforms, ensuring high performance and a seamless user experience. Whether it’s for business, gaming, or social networking, we create apps that engage and retain users."
    },
    {
      title: "Cloud Solutions",
      description: "Embrace the future of technology with our cloud solutions. We provide cloud migration, storage, and management services that ensure data security, scalability, and reliability. Our solutions are tailored to reduce costs, improve efficiency, and support your business growth."
    },
  ];

  return (
    <>
    <Layout>

    <div className="container my-5" ref={contactRef}>
      <h1 style={{color:"black"}} className="text-center mb-4">Our Services</h1>
      <div className="row">
        {services.map((service, index) => (
            <motion.div
            className="col-md-6 mb-4"
            key={index}
            initial={{ opacity: 0, y: 50 }}  
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Delay effect for staggered animation
            whileHover={{ scale: 1.05 }} // Hover effect for scaling
            >
            <div className="card service-card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </Layout>
        </>
  );
}
