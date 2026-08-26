import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BrandsPage from './pages/BrandsPage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ProductsPage from './pages/ProductsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetails from './components/Products/ProductDetails';
import MobileHeader from './layout/MobileHeader';
import CustomerDetails from './pages/CustomerDetails';
import ScrollToTop from './components/utilities/ScrollToTop';

const SharedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div >
        <Navbar />
      </div>

      {/* MOBILE HEADER: Hidden on Home page */}
      {/* {!isHomePage && (
        <div className="md:hidden">
          <MobileHeader />
        </div>
      )} */}

      {/* MOBILE NAVBAR: Shown on Home page mobile */}
      {/* {isHomePage && (
        <div className="md:hidden">
          <Navbar />
        </div>
      )} */}

      <Outlet /> 
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        <Route element={<SharedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/products/:modelName" element={<ProductsPage />} />
          <Route path="/product/:partId" element={<ProductDetails />} />
        </Route>

       
        <Route path="/customer-details/:customerType" element={<CustomerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;