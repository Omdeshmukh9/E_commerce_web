import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Footer Logo and Description */}
          <div className="col-md-4 mb-3">
            <h5>TrackMyAcademy</h5>
            <p>
              TrackMyAcademy is a one-stop digital solution designed to maximize productivity and communication between athletes and sports organizations.
            </p>
          </div>

          {/* Footer Navigation Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home" className="text-white text-decoration-none"><i className="bi bi-house me-2"></i> Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none"><i className="bi bi-info-circle me-2"></i> About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-white text-decoration-none"><i className="bi bi-briefcase me-2"></i> Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none"><i className="bi bi-telephone me-2"></i> Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Footer Social Media Links */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <Link target='_blank' to="https://facebook.com" className="text-white text-decoration-none">
                  <i className="bi bi-facebook me-2"></i> Facebook
                </Link>
              </li>
              <li>
                <Link target='_blank' to="https://twitter.com" className="text-white text-decoration-none">
                  <i className="bi bi-twitter me-2"></i> Twitter
                </Link>
              </li>
              <li>
                <Link target='_blank' to="https://instagram.com" className="text-white text-decoration-none">
                  <i className="bi bi-instagram me-2"></i> Instagram
                </Link>
              </li>
              <li>
                <Link target='_blank' to="https://linkedin.com" className="text-white text-decoration-none">
                  <i className="bi bi-linkedin me-2"></i> LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="row mt-4">
          <div className="col-12">
            <h5 className="text-center mb-3">Find Us</h5>
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15128.768693779763!2d73.76901820000002!3d18.565372900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf94c44576f3%3A0x797deefe4f83d755!2sDigitrack%20Sports%20India%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1725863726406!5m2!1sen!2sin"
                title="Google Maps"
                allowFullScreen
                loading="lazy"
                style={{
                  zIndex: 3,
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  padding: "0px",
                  borderWidth: "0px",
                  margin: "0px",
                  left: "0px",
                  top: "0px",
                  touchAction: "pan-x pan-y",
                  "--bs-aspect-ratio": "17.25%"
                }}
              ></iframe>
            </div>
          </div>
        </div> */}

        {/* Copyright Section */}
        <div className="text-center pt-3">
          <p className="mb-0">&copy; 2024 TrackMyAcademy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
