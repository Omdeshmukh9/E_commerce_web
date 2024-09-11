import React, { useEffect, useRef } from 'react';
import './ContactForm.css'; // Import the CSS file for styling
import Layout from '../include/Layout';

export default function ContactForm() {
  const contactRef = useRef(null);

  useEffect(() => {
    // Scroll to the contact form when the component mounts
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Layout>
      <div className="contact-container" ref={contactRef}>
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-md-6">
              <div className="contact-form">
                <h2>Contact Us</h2>
                <form>
                  <div className="form-group">
                    <input type="text" id="name" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" id="email" className="form-control" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <textarea id="message" className="form-control" placeholder="Your Message" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>

            {/* Additional Details and Map */}
            <div className="col-md-6">
              <div className="company-details">
                <h3>Company Information</h3>
                <p><strong>Address:</strong> 103, Victory Landmark, Baner Rd, opp. D Mart, Pune, Maharashtra 411045</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Email:</strong> contact@company.com</p>
              </div>

              <div className="map-section mt-5">
                <h3>Find Us</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15128.768693779763!2d73.7690182!3d18.5653729!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf94c44576f3%3A0x797deefe4f83d755!2sDigitrack%20Sports%20India%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1725882225920!5m2!1sen!2sin' allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
