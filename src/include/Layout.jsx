import React from 'react';
import Nav from '../component/Nav';
import Footer from '../component/Footer';
// import Section from '../component/sections/Section'
import "../App.css"

function Layout(props) {
  return (
    <>
    <Nav />
    {/* <Section/> */}
    <div className='mainClass'>
          {props.children}
    </div>
    <Footer />
    </>
  )
}

export default Layout
