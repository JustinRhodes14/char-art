import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './features/cart/cartContext';
import CharNav from './components/CharNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <CharNav />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
