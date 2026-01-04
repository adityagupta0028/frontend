import { Link,useNavigate } from 'react-router-dom';
import './MyAccount.css';

function MyAccount() {
  const navigate = useNavigate();
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="account-breadcrumb">
            <Link to="/contact">Customer Service</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">My Account</span>
          </div>

          {/* Main Account Layout */}
          <div className="account-container">
            {/* Left Sidebar Navigation */}
            <aside className="account-sidebar">
              <div className="account-greeting">
                <span className="greeting-icon">👤</span>
                <span className="greeting-text">Hi, Mohammad</span>
              </div>
              <nav className="account-nav">
                <Link to="/my-account" className="nav-link active">
                  Account Overview
                </Link>
                <Link to="/order-history" className="nav-link">
                  Order History
                </Link>
                <Link to="/settings" className="nav-link">
                  Settings & Preferences
                </Link>
                <Link to="/cart" className="nav-link">
                  Shopping Bag
                </Link>
                <Link to="/wishlist" className="nav-link">
                  Wish List
                </Link>
                <Link to="/refer" className="nav-link">
                  Refer a Friend
                </Link>
                <Link  className="nav-link" onClick={() => {localStorage.removeItem('customerToken');localStorage.removeItem('customerData'); navigate("/login");}}>
                  Sign Out
                </Link>
              </nav>
            </aside>

            {/* Right Content Area */}
            <main className="account-content">
              {/* Account Overview Cards */}
              <div className="account-cards">
                {/* Order History Card */}
                <div className="account-card">
                  <h3 className="card-title">Order History</h3>
                  <p className="card-description">You have no recent orders.</p>
                  <Link to="/order-history" className="card-link">
                    View Order History
                  </Link>
                </div>

                {/* Settings & Preferences Card */}
                <div className="account-card">
                  <h3 className="card-title">Settings & Preferences</h3>
                  <p className="card-description">Update your name, email or change your password.</p>
                  <Link to="/settings" className="card-link">
                    Update Preferences
                  </Link>
                </div>

                {/* Shopping Bag Card */}
                <div className="account-card">
                  <h3 className="card-title">Shopping Bag</h3>
                  <p className="card-description">View your bag items and checkout.</p>
                  <Link to="/cart" className="card-link">
                    View Shopping Bag
                  </Link>
                </div>

                {/* Wish List Card */}
                <div className="account-card">
                  <h3 className="card-title">Wish List</h3>
                  <p className="card-description">View your bag items and checkout.</p>
                  <Link to="/wishlist" className="card-link">
                    View My Wish List
                  </Link>
                </div>

                {/* Refer a Friend Card */}
                <div className="account-card">
                  <h3 className="card-title">Refer a Friend</h3>
                  <p className="card-description">Love Brilliant Earth? Tell your friends!</p>
                  <Link to="/refer" className="card-link">
                    Refer a Friend
                  </Link>
                </div>

                {/* My Items Card */}
                <div className="account-card my-items-card">
                  <div className="card-header-with-icon">
                    <i className="fa fa-key card-icon"></i>
                    <h3 className="card-title">My Items</h3>
                  </div>
                  <p className="card-description">Review your collection and request service for your items.</p>
                  <Link to="/my-items" className="card-link">
                    View Collection
                  </Link>
                </div>

                {/* My Appointments Card */}
                <div className="account-card my-appointments-card">
                  <div className="card-header-with-icon">
                    <i className="fa fa-calendar card-icon"></i>
                    <h3 className="card-title">My Appointments</h3>
                  </div>
                  <p className="card-description">View and manage your showroom appointments and consultations.</p>
                  <Link to="/my-appointments" className="card-link">
                    View Appointments
                  </Link>
                </div>

                {/* Truly Custom Requests Card */}
                <div className="account-card truly-custom-card">
                  <div className="card-header-with-icon">
                    <i className="fa fa-gem card-icon"></i>
                    <h3 className="card-title">Truly Custom Requests</h3>
                  </div>
                  <p className="card-description">Here you can keep track of your Truly Custom Designs.</p>
                  <Link to="/truly-custom-requests" className="card-link">
                    View Requests
                  </Link>
                </div>

                {/* Payment Methods Card */}
                <div className="account-card payment-methods-card">
                  <div className="card-header-with-icon">
                    <i className="fa fa-credit-card card-icon"></i>
                    <h3 className="card-title">Payment Methods</h3>
                  </div>
                  <p className="card-description">Manage your saved payment methods and billing information.</p>
                  <Link to="/payment-methods" className="card-link">
                    Manage Payment Methods
                  </Link>
                </div>

                {/* Personal Details Card */}
                <div className="account-card personal-details-card">
                  <div className="card-header-with-icon">
                    <i className="fa fa-user card-icon"></i>
                    <h3 className="card-title">Personal Details</h3>
                  </div>
                  <p className="card-description">Update your personal information and account details.</p>
                  <Link to="/profile" className="card-link">
                    View Personal Details
                  </Link>
                </div>
              </div>

              {/* Continue Shopping Section */}
              <div className="continue-shopping">
                <h2 className="shopping-title">Continue Shopping</h2>
                <div className="shopping-categories">
                  {/* Engagement Rings */}
                  <Link to="/shop?category=engagement-rings" className="category-card">
                    <div className="category-image">
                      <img 
                        src="https://image.brilliantearth.com/static/img/shopping/wishlist-Shop-By-Category/Engagement-Rings-dt.jpg" 
                        alt="Engagement Rings"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="category-title">Engagement Rings</h3>
                  </Link>

                  {/* Wedding Rings */}
                  <Link to="/shop?category=wedding-rings" className="category-card">
                    <div className="category-image">
                      <img 
                        src="https://image.brilliantearth.com/static/img/shopping/wishlist-Shop-By-Category/Wedding-Rings-dt.jpg" 
                        alt="Wedding Rings"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="category-title">Wedding Rings</h3>
                  </Link>

                  {/* Gemstone Rings */}
                  <Link to="/shop?category=gemstone-rings" className="category-card">
                    <div className="category-image">
                      <img 
                        src="https://image.brilliantearth.com/static/img/shopping/wishlist-Shop-By-Category/Gemstone-Rings-dt.jpg" 
                        alt="Gemstone Rings"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="category-title">Gemstone Rings</h3>
                  </Link>

                  {/* Fine Jewelry */}
                  <Link to="/shop?category=fine-jewelry" className="category-card">
                    <div className="category-image">
                      <img 
                        src="https://image.brilliantearth.com/static/img/shopping/wishlist-Shop-By-Category/Fine-Jewelry-dt.jpg" 
                        alt="Fine Jewelry"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="category-title">Fine Jewelry</h3>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

