import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMailOutline } from "react-icons/io5";


import './Wishlist.css';

function Wishlist() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="wishlist-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Wish List</span>
          </div>

          {/* Page Header */}
          <div className="wishlist-header">
            <h1 className="wishlist-title">Mohammad's Wish List</h1>
            <button className="share-wishlist-btn">
              Share Wish List
              <IoMailOutline className='text-2xl' />
              {/* <i className="fa fa-envelope"></i> */}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="wishlist-tabs">
            <div className='wishlist-tabs-buttons'>
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              View All (2)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'engagement' ? 'active' : ''}`}
              onClick={() => setActiveTab('engagement')}
            >
              Engagement Rings (2)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'wedding' ? 'active' : ''}`}
              onClick={() => setActiveTab('wedding')}
            >
              Wedding Rings (1)
            </button>
            </div>
          </div>

          {/* Engagement Rings Section */}
          {(activeTab === 'all' || activeTab === 'engagement') && (
            <div className="wishlist-section">
              <h2 className="section-title">Engagement Rings</h2>
              <div className="wishlist-products">
                {/* Product Card 1 */}
                <div className="wishlist-product-card">
                  <div className="product-image-wrapper">
                    <Link to="">
                      <img 
                        src="https://image.brilliantearth.com/media/diamond_ring_vto/ZK/BE1D3939_yellow_Oval_top_2_carat.png" 
                        alt="Freesia Hidden Halo"
                        className="product-image"
                      />
                    </Link>
                    <div className="product-actions">
                      <button className="action-icon">
                        <i className="fa fa-envelope"></i>
                      </button>
                      <button className="action-icon">
                        <i className="fa fa-heart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <Link to="" className='product_title'>
                      <h3 className="product-name">Freesia Hidden Halo</h3>
                    </Link>
                    {/* <p className="product-type">Setting Only</p> */}
                    <p className="product-price">$1,290</p>
                    <button className="complete-ring-btn">
                      Add To Bag
                      {/* <i className="fa fa-chevron-down"></i> */}
                    </button>
                  </div>
                </div>

                {/* Product Card 2 */}
                <div className="wishlist-product-card">
                  <div className="product-image-wrapper">
                    <img 
                      src="https://image.brilliantearth.com/media/diamond_ring_vto/A6/BE1D6351_yellow_Round_top_2_carat.png" 
                      alt="Secret Garden"
                      className="product-image"
                    />
                    <div className="product-actions">
                      <button className="action-icon">
                        <i className="fa fa-envelope"></i>
                      </button>
                      <button className="action-icon">
                        <i className="fa fa-heart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">Secret Garden</h3>
                    {/* <p className="product-type">Setting Only</p> */}
                    <p className="product-price">$2,890</p>
                    <button className="complete-ring-btn">
                      Complete Ring
                      <i className="fa fa-chevron-down"></i>
                    </button>
                  </div>
                </div>

                {/* Promotional Card */}
                <div className="promotional-card">
                  <div className="promo-image">
                    <img 
                      src="https://css.brilliantearth.com/static/img/wishlist/wish-list-tile/Wishlist-StylizedTile-ER-3x.jpg" 
                      alt="Visit Our Showrooms"
                      className="promo-bg-image"
                    />
                    <div className="promo-overlay">
                      <p className="promo-label">GET UP CLOSE</p>
                      <h3 className="promo-title">Visit Our Showrooms</h3>
                      <button className="book-appointment-btn">Book Appointment</button>
                    </div>
                  </div>
                  {/* <button className="book-appointment-btn">Book Appointment</button> */}
                </div>
              </div>
            </div>
          )}

         

          {/* You May Also Like Section */}
          <div className="you-may-also-like">
            <h2 className="section-title">You May Also Like</h2>
            <div className="recommended-products">
              <div className="recommended-product-card">
                <div className="product-badge">#1 BRACELET</div>
                <img 
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=500,height=500,quality=85,format=auto/https://image.brilliantearth.com/media/product_images/C8/BE5DREV15TBLC-14KY_top.jpg?new=1" 
                  alt="6.5 In. Petite Lab Diamond Tennis Bracelet"
                  className="recommended-image"
                />
                <div className="color-swatches">
                  <span className="color-swatch" style={{background: '#d4af37'}}></span>
                  <span className="color-swatch" style={{background: '#c0c0c0'}}></span>
                </div>
                <h4 className="recommended-name">6.5 In. Petite Lab Diamond Tennis Bracelet</h4>
                <p className="recommended-price">$995</p>
                {/* <p className="recommended-details">(1 1/2 Ct. Tw.)</p> */}
              </div>

              <div className="recommended-product-card">
                <div className="product-badge gift">GIFT FAVORITE</div>
                <img 
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=500,height=500,quality=85,format=auto/https://image.brilliantearth.com/media/product_images/8Y/BE30PH213-14KY_top.jpg?new=1" 
                  alt="2mm Huggie Perfect Hoop Earrings"
                  className="recommended-image"
                />
                <div className="color-swatches">
                  <span className="color-swatch" style={{background: '#d4af37'}}></span>
                  <span className="color-swatch" style={{background: '#c0c0c0'}}></span>
                </div>
                <h4 className="recommended-name">2mm Huggie Perfect Hoop Earrings</h4>
                <p className="recommended-price">$175</p>
              </div>

              <div className="recommended-product-card">
                <div className="product-badge bestseller">BEST SELLER</div>
                <img 
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=500,height=500,quality=85,format=auto/https://image.brilliantearth.com/media/product_images/8Y/BE30PH213-14KY_top.jpg?new=1" 
                  alt="Comfort Fit 5mm Wedding Ring"
                  className="recommended-image"
                />
                <div className="color-swatches">
                  <span className="color-swatch" style={{background: '#d4af37'}}></span>
                  <span className="color-swatch" style={{background: '#c0c0c0'}}></span>
                  <span className="color-swatch" style={{background: '#e8b4a0'}}></span>
                  <span className="color-swatch" style={{background: '#f5d76e'}}></span>
                </div>
                <h4 className="recommended-name">Comfort Fit 5mm Wedding Ring</h4>
                <p className="recommended-price">$850</p>
              </div>

              <div className="recommended-product-card">
                <img 
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=500,height=500,quality=85,format=auto/https://image.brilliantearth.com/media/product_images/8Y/BE30PH213-14KY_top.jpg?new=1" 
                  alt="Freesia Hidden Halo Diamond Ring"
                  className="recommended-image"
                />
                <div className="color-swatches">
                  <span className="color-swatch" style={{background: '#c0c0c0'}}></span>
                  <span className="color-swatch" style={{background: '#e8b4a0'}}></span>
                  <span className="color-swatch" style={{background: '#d4af37'}}></span>
                </div>
                <h4 className="recommended-name">Freesia Hidden Halo Diamond Ring</h4>
                <p className="recommended-price">$1,290</p>
              </div>

              

              <div className="recommended-product-card">
                <div className="product-badge loved">MOST LOVED</div>
                <img 
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=500,height=500,quality=85,format=auto/https://image.brilliantearth.com/media/product_images/8Y/BE30PH213-14KY_top.jpg?new=1" 
                  alt="Nadia Di"
                  className="recommended-image"
                />
                <div className="color-swatches">
                  <span className="color-swatch" style={{background: '#c0c0c0'}}></span>
                  <span className="color-swatch" style={{background: '#d4af37'}}></span>
                </div>
                <h4 className="recommended-name">Nadia Di</h4>
                <p className="recommended-price">$1,450</p>
              </div>
            </div>
            <button className="scroll-arrow right">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;

