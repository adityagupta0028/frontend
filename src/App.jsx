import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import About from './pages/About';
import Details from './pages/Details';
import Wishlist from './pages/Wishlist';
import FAQ from './pages/FAQ';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import MyItems from './pages/MyItems';
import MyAppointments from './pages/MyAppointments';
import PaymentMethods from './pages/PaymentMethods';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Privacy from './pages/Privacy';
import ReturnPolicy from './pages/ReturnPolicy';
import Terms from './pages/Terms';
import Engagement from './pages/Engagement';
import Wedding from './pages/Wedding';
import Jewelry from './pages/Jewelry';
import NotFound from './pages/NotFound';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div id="page" className="hfeed page-wrapper">
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/details/:id" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/my-items" element={<MyItems />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/engagement-rings" element={<Engagement />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <WhatsAppFloat />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
