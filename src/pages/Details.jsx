import { Link } from 'react-router-dom';

function Details() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Product Details
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span><Link to="/shop">Shop</Link><span className="delimiter"></span>Product Details
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="product-detail-page">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="product-images">
                        <img src="/media/product/1.jpg" alt="Product" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="product-summary">
                        <h1 className="product-title">Medium Flat Hoops</h1>
                        <div className="price">
                          <span className="amount">$150.00</span>
                        </div>
                        <div className="product-description">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <form className="cart">
                          <div className="quantity">
                            <button type="button" className="minus">-</button>
                            <input type="number" className="input-text qty text" step="1" min="1" max="" name="quantity" value="1" />
                            <button type="button" className="plus">+</button>
                          </div>
                          <button type="submit" className="single-add-to-cart-button button alt">Add to cart</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

