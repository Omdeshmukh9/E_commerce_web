// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './component/Nav';
import Home from './component/Home';
import About from './component/About';
import Services from './component/Services';
import Contact from './component/Contact';
// import Footer from './component/Footer';
// import Section from './component/sections/Section';
import Login from './component/Login/Login';
import Profile from './component/Login/Profile';
import Signup from './component/Login/Signup';
import ShowProduct from "./Products/ShowProduct";
import { Navigate } from 'react-router-dom';
import CartPage from './Carts/Cartpage';
import AllProducts from './Products/Allproduct';
import KidsClothes from './Catagories/SubCatagories/KidsClothes';
const ProtectedRoute = ({ isAuthenticated, children }) => {
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the children components (protected content)
  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Nav" element={<Nav />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Footer />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ShowProduct" element={<ShowProduct/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProducts />} />
          
          
          {/* Catagories Routing */}
           {/* Kids routes */}
           <Route path="/kids/clothes" element={<KidsClothes />} />
          {/* <Route path="/kids/toys" element={<KidsToys />} />
          <Route path="/kids/shoes" element={<KidsShoes />} /> */}

          {/* Mobiles routes */}
          {/* <Route path="/mobiles/smartphones" element={<MobilesSmartphones />} /> */}
          {/* <Route path="/mobiles/accessories" element={<MobilesAccessories />} />
          <Route path="/mobiles/cases" element={<MobilesCases />} /> */}

          {/* Electronics routes */}
          {/* <Route path="/electronics/headphones" element={<ElectronicsHeadphones />} /> */}
          {/* <Route path="/electronics/trimmers" element={<ElectronicsTrimmers />} />
          <Route path="/electronics/lights" element={<ElectronicsLights />} /> */}

          {/* Fashion routes */}
          {/* <Route path="/fashion/men" element={<FashionMen />} /> */}
          {/* <Route path="/fashion/women" element={<FashionWomen />} />
          <Route path="/fashion/kids" element={<FashionKids />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
