import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Nav from '../Nav';
// import Footer from '../Footer';
import './section.css'

export default function ExtraSection() {
    return (
        <>
            {/* <Nav/> */}
            <section className="extra-section bg-light py-5">
                <div className="container">
                    <motion.div
                        className="row text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="col-md-6 mb-4">
                            <h2>Welcome to Our Website!</h2>
                            <span class="wdt-heading-title">Access The World <span class="wdt-split-heading-wrapper"><span class="wdt-split-heading-title" style={{animationDelay: '50ms'}}>Q</span><span class="wdt-split-heading-title" style={{animationDelay: '100ms'}}>u</span><span class="wdt-split-heading-title" style={{animationDelay: '150ms'}}>i</span><span class="wdt-split-heading-title" style={{animationDelay: '200ms'}}>c</span><span class="wdt-split-heading-title" style={{animationDelay: '250ms'}}>k</span><span class="wdt-split-heading-title" style={{animationDelay: '300ms'}}>l</span><span class="wdt-split-heading-title" style={{animationDelay: '350ms'}}>y</span></span>Just From Anywhere</span>
                            <Link target='_blank' to="http://www.mysportsclub.co.in" className="btn btn-primary">
                                Go To Mysite
                            </Link>
                        </div>
                        <div className="col-md-6 mb-4">
                            <img id="data"
                                src="https://picsum.photos/500/300"
                                alt="Welcome"
                                className="img-fluid rounded"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* <Footer/> */}
        </>
    );
}
