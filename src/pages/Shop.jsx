import { Link } from 'react-router-dom';

function Shop() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Shop
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span><Link to="/shop">Shop</Link>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50 p-t-10">
                    <div className="block block-product-cats">
                      <div className="block-title"><h2>Categories</h2></div>
                      <div className="block-content">
                        <div className="product-cats-list">
                          <ul>
                            <li className="current">
                              <Link to="/shop">Bracelets <span className="count">9</span></Link>
                            </li>
                            <li>
                              <Link to="/shop">Earrings <span className="count">4</span></Link>
                            </li>
                            <li>
                              <Link to="/shop">Necklaces <span className="count">3</span></Link>
                            </li>
                            <li>
                              <Link to="/shop">Charms <span className="count">6</span></Link>
                            </li>
                            <li>
                              <Link to="/shop">Rings <span className="count">2</span></Link>
                            </li>
                            <li>
                              <Link to="/shop">Wedding & Bridal <span className="count">4</span></Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing all 21 results
                        </div>
                      </div>
                      <div className="products-topbar-right">
                        <div className="products-sort dropdown">
                          <span className="sort-toggle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">Default sorting</span>
                          <ul className="sort-list dropdown-menu">
                            <li className="active"><a href="#">Default sorting</a></li>
                            <li><a href="#">Sort by popularity</a></li>
                            <li><a href="#">Sort by average rating</a></li>
                            <li><a href="#">Sort by latest</a></li>
                            <li><a href="#">Sort by price: low to high</a></li>
                            <li><a href="#">Sort by price: high to low</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="layout-grid" role="tabpanel">
                        <div className="products-list grid">
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <Link to="/details">
                                      <img width="600" height="600" src="/media/product/1.jpg" className="post-image" alt="" />
                                      <img width="600" height="600" src="/media/product/1-2.jpg" className="hover-image back" alt="" />
                                    </Link>
                                  </div>		
                                  <div className="product-button">
                                    <div className="btn-add-to-cart" data-title="Add to cart">
                                      <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                    </div>
                                    <div className="btn-wishlist" data-title="Wishlist">
                                      <button className="product-btn">Add to wishlist</button>
                                    </div>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <div className="rating">
                                      <div className="star star-0"></div><span className="count">(0 review)</span>
                                    </div>
                                    <h3 className="product-title"><Link to="/details">Medium Flat Hoops</Link></h3>
                                    <span className="price">$150.00</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;

