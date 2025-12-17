import { Link } from 'react-router-dom';
import ProductSlider from '../components/home/productSlider';

function Home() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            <section className="section m-b-0">
              <div className="block block-sliders auto-height color-white nav-center">
                <div className="slick-sliders" data-autoplay="true" data-dots="true" data-nav="true" data-columns4="1" data-columns3="1" data-columns2="1" data-columns1="1" data-columns1440="1" data-columns="1">
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width="1920" height="1080" src="/media/slider/1-1.jpg" alt="Image Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content">
                          <h2 className="title-slider">Discover a <br />world of jewelry</h2>
                          <Link className="button-slider button button-white button-outline thick-border" to="/shop">Explore Bestseller</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width="1920" height="1080" src="/media/slider/1-2.jpg" alt="Image Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content">
                          <h2 className="title-slider">Discover the<br /> Best of the Best</h2>
                          <Link className="button-slider button button-white button-outline thick-border" to="/shop">Explore Bestseller</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width="1920" height="1080" src="/media/slider/1-3.jpg" alt="Image Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content">
                          <h2 className="title-slider">Oh,<br /> Hello Newness!</h2>
                          <Link className="button-slider button button-white button-outline thick-border" to="/shop">Explore Bestseller</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section background-img bg-img-1 m-b-50">
              <div className="block block-intro">
                <div className="row">
                  <div className="col-md-12">
                    <div className="intro-wrap px-0 w-100 text-center" style={{ maxWidth: '75%' }}>
                      <h2 className="intro-title mb-3">Handcrafted &amp; Ethically Sourced</h2>
                      <div className="intro-item text-center">
                        <div className="content">
                          <div className="text">Lorem ipsum dolor, sit, amet consectetur adipisicing elit. Nesciunt obcaecati incidunt laborum ratione omnis explicabo sequi molestias praesentium asperiores corrupti inventore dolore eum quam autem minima quod excepturi, architecto saepe!</div>
                        </div>
                      </div>
                      <div className="intro-btn">
                        <Link to="/about" className="button button-black button-arrow animation-horizontal">LEARN MORE</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section-padding background-img bg-img-2 p-t-50 p-b-50 mb-0">
              <div className="section-container">
                <div className="block block-product-cats slider layout-3">
                  <div className="block-widget-wrap">
                    <div className="block-title mb-4 text-center">
                      <h2 className="t-brown">Explore the Range</h2>
                    </div>

                    <section className="section section-padding mb-0">
                      <div className="small">
                        <div className="block block-intro layout-4 mb-4">
                          <div className="block-widget-wrap">
                            <ul className="nav nav-tabs border-0 justify-content-center">
                              <li className="nav-item border-0 bg-none">
                                <a className="nav-link active border-0 bg-none" data-bs-toggle="tab" href="#beauty-ingenuity" role="tab">Lorem</a>
                              </li>
                              <li className="nav-item border-0 bg-none">
                                <a className="nav-link border-0 bg-none" data-bs-toggle="tab" href="#ear-stack" role="tab">Lorem</a>
                              </li>
                              <li className="nav-item border-0 bg-none">
                                <a className="nav-link border-0 bg-none" data-bs-toggle="tab" href="#wristwear-essentials" role="tab">Lorem</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="tab-content">
                          <div className="tab-pane fade show active" id="beauty-ingenuity" role="tabpanel">
                            <div className="block-content">
                              <div className="product-cats-list slick-wrap">
                                <div className="slick-sliders content-category" data-dots="0" data-slidestoscroll="true" data-nav="0" data-columns4="1" data-columns3="3" data-columns2="4" data-columns1="4" data-columns1440="5" data-columns="5">
                                  <div className="item item-product-cat slick-slide">
                                    <div className="item-product-cat-content">
                                      <Link to="/shop">
                                        <div className="item-image animation-horizontal">
                                          <img width="273" height="376" src="/media/product/cat-4-1.jpg" alt="Bracelets" />
                                        </div>
                                      </Link>
                                      <div className="product-cat-content-info">
                                        <h2 className="item-title">
                                          <Link to="/shop">Bracelets</Link>
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item item-product-cat slick-slide">
                                    <div className="item-product-cat-content">
                                      <Link to="/shop">
                                        <div className="item-image animation-horizontal">
                                          <img width="273" height="376" src="/media/product/cat-4-2.jpg" alt="Charms" />
                                        </div>
                                      </Link>
                                      <div className="product-cat-content-info">
                                        <h2 className="item-title">
                                          <Link to="/shop">Charms</Link>
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item item-product-cat slick-slide">
                                    <div className="item-product-cat-content">
                                      <Link to="/shop">
                                        <div className="item-image animation-horizontal">
                                          <img width="273" height="376" src="/media/product/cat-4-3.jpg" alt="Earrings" />
                                        </div>
                                      </Link>
                                      <div className="product-cat-content-info">
                                        <h2 className="item-title">
                                          <Link to="/shop">Earrings</Link>
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item item-product-cat slick-slide">
                                    <div className="item-product-cat-content">
                                      <Link to="/shop">
                                        <div className="item-image animation-horizontal">
                                          <img width="273" height="376" src="/media/product/cat-4-4.jpg" alt="Necklaces" />
                                        </div>
                                      </Link>
                                      <div className="product-cat-content-info">
                                        <h2 className="item-title">
                                          <Link to="/shop">Necklaces</Link>
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item item-product-cat slick-slide">
                                    <div className="item-product-cat-content">
                                      <Link to="/shop">
                                        <div className="item-image animation-horizontal">
                                          <img width="273" height="376" src="/media/product/cat-4-5.jpg" alt="Rings" />
                                        </div>
                                      </Link>
                                      <div className="product-cat-content-info">
                                        <h2 className="item-title">
                                          <Link to="/shop">Rings</Link>
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section-padding p-t-50">
              <div className="section-container">
                <div className="block block-feature layout-2">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center">
                      <h2 className="t-brown">Lorem Ipsum Lorem</h2>
                    </div>
                    <div className="row">
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="intro-btn">
                            <Link to="/shop" className="button w-100 button-outline border-black animation-horizontal">Under By $250</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="intro-btn">
                            <Link to="/shop" className="button w-100 button-outline border-black animation-horizontal">Under By $500</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="intro-btn">
                            <Link to="/shop" className="button w-100 button-outline border-black animation-horizontal">Under By $1000</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="intro-btn">
                            <Link to="/shop" className="button w-100 button-outline border-black animation-horizontal">Under By $1000+</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>



            <ProductSlider />



            <section className="section section-padding top-border p-t-50 m-b-50">
              <div className="section-container">
                <div className="block block-banners layout-5 banners-effect">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center">
                      <h2 className="t-brown">Collections Elegance</h2>
                    </div>
                    <div className="block-content">
                      <div className="row">
                        <div className="col-md-4 sm-m-b-40">
                          <div className="block-widget-banner">
                            <div className="bg-banner">
                              <div className="banner-wrapper banners">
                                <div className="banner-image">
                                  <Link to="/shop">
                                    <img width="450" height="371" src="/media/banner/banner-6-1.jpg" alt="Banner Image" />
                                  </Link>
                                </div>
                                <div className="banner-wrapper-infor">
                                  <div className="info">
                                    <div className="content">
                                      <h3 className="title-banner">EAR STACK MAGIC</h3>
                                      <div className="banner-image-description">
                                        Fusce egestas elit eget lorem n hac habitasse platea dictumstn hac habitasse
                                      </div>
                                      <Link className="button" to="/shop">Shop Now</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 sm-m-b-40">
                          <div className="block-widget-banner">
                            <div className="bg-banner">
                              <div className="banner-wrapper banners">
                                <div className="banner-image">
                                  <Link to="/shop">
                                    <img width="450" height="371" src="/media/banner/banner-6-2.jpg" alt="Banner Image" />
                                  </Link>
                                </div>
                                <div className="banner-wrapper-infor">
                                  <div className="info">
                                    <div className="content">
                                      <h3 className="title-banner">THE LOCKET</h3>
                                      <div className="banner-image-description">
                                        Fusce egestas elit eget lorem n hac habitasse platea dictumstn hac habitasse
                                      </div>
                                      <Link className="button" to="/shop">Shop Now</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="block-widget-banner">
                            <div className="bg-banner">
                              <div className="banner-wrapper banners">
                                <div className="banner-image">
                                  <Link to="/shop">
                                    <img width="450" height="371" src="/media/banner/banner-6-3.jpg" alt="Banner Image" />
                                  </Link>
                                </div>
                                <div className="banner-wrapper-infor">
                                  <div className="info">
                                    <div className="content">
                                      <h3 className="title-banner">AWARENESS BRACELET</h3>
                                      <div className="banner-image-description">
                                        Fusce egestas elit eget lorem n hac habitasse platea dictumstn hac habitasse
                                      </div>
                                      <Link className="button" to="/shop">Shop Now</Link>
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
            </section>
            <section className="section section-padding top-border p-t-50 mb-0">
              <div className="section-container large">
                <div className="block block-products slider">
                  <div className="block-widget-wrap">
                    <div className="block-title mb-4 text-center">
                      <h2 className="t-brown">Trending Products</h2>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section-padding mb-0">
              <div className="small">
                <div className="block block-intro layout-4 mb-4">
                  <div className="block-widget-wrap">
                    <ul className="nav nav-tabs border-0 justify-content-center">
                      <li className="nav-item border-0">
                        <a className="nav-link active border-0" data-bs-toggle="tab" href="#beauty-ingenuity" role="tab">Beauty & Ingenuity</a>
                      </li>
                      <li className="nav-item border-0">
                        <a className="nav-link border-0" data-bs-toggle="tab" href="#ear-stack" role="tab">Ear Stack Magic</a>
                      </li>
                      <li className="nav-item border-0">
                        <a className="nav-link border-0" data-bs-toggle="tab" href="#wristwear-essentials" role="tab">Wristwear Essentials</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="beauty-ingenuity" role="tabpanel">
                    <section className="section">
                      <div className="section-container large">
                        <div className="block block-products slider">
                          <div className="block-widget-wrap">
                            <div className="block-content">
                              <div className="content-product-list slick-wrap">
                                <div className="slick-sliders products-list grid" data-slidestoscroll="true" data-dots="false" data-nav="1" data-columns4="1" data-columns3="2" data-columns2="2" data-columns1="3" data-columns1440="4" data-columns="4">
                                  <div className="item-product slick-slide">
                                    <div className="items">
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
                                            <div className="btn-compare" data-title="Compare">
                                              <button className="product-btn">Compare</button>
                                            </div>
                                            <span className="product-quickview" data-title="Quick View">
                                              <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="products-content">
                                          <div className="contents">
                                            <div className="rating">
                                              <div className="star star-0"></div>
                                              <span className="count">(0 review)</span>
                                            </div>
                                            <h3 className="product-title"><Link to="/details">Medium Flat Hoops</Link></h3>
                                            <span className="price">$100.00</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item-product slick-slide">
                                    <div className="items">
                                      <div className="products-entry clearfix product-wapper">
                                        <div className="products-thumb">
                                          <div className="product-lable">
                                            <div className="onsale">-10%</div>
                                            <div className="hot">Hot</div>
                                          </div>
                                          <div className="product-thumb-hover">
                                            <Link to="/details">
                                              <img width="600" height="600" src="/media/product/2.jpg" className="post-image" alt="" />
                                              <img width="600" height="600" src="/media/product/2-2.jpg" className="hover-image back" alt="" />
                                            </Link>
                                          </div>
                                          <div className="product-button">
                                            <div className="btn-add-to-cart" data-title="Add to cart">
                                              <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                            </div>
                                            <div className="btn-wishlist" data-title="Wishlist">
                                              <button className="product-btn">Add to wishlist</button>
                                            </div>
                                            <div className="btn-compare" data-title="Compare">
                                              <button className="product-btn">Compare</button>
                                            </div>
                                            <span className="product-quickview" data-title="Quick View">
                                              <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="products-content">
                                          <div className="contents">
                                            <div className="rating">
                                              <div className="star star-5"></div>
                                              <span className="count">(1 review)</span>
                                            </div>
                                            <h3 className="product-title"><Link to="/details">Bold Pearl Hoop Earrings</Link></h3>
                                            <span className="price">
                                              <del aria-hidden="true"><span>$200.00</span></del>
                                              <ins><span>$180.00</span></ins>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item-product slick-slide">
                                    <div className="items">
                                      <div className="products-entry clearfix product-wapper">
                                        <div className="products-thumb">
                                          <div className="product-lable">
                                            <div className="hot">Hot</div>
                                          </div>
                                          <div className="product-thumb-hover">
                                            <Link to="/details">
                                              <img width="600" height="600" src="/media/product/3.jpg" className="post-image" alt="" />
                                              <img width="600" height="600" src="/media/product/3-2.jpg" className="hover-image back" alt="" />
                                            </Link>
                                          </div>
                                          <div className="product-button">
                                            <div className="btn-add-to-cart" data-title="Add to cart">
                                              <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                            </div>
                                            <div className="btn-wishlist" data-title="Wishlist">
                                              <button className="product-btn">Add to wishlist</button>
                                            </div>
                                            <div className="btn-compare" data-title="Compare">
                                              <button className="product-btn">Compare</button>
                                            </div>
                                            <span className="product-quickview" data-title="Quick View">
                                              <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="products-content">
                                          <div className="contents">
                                            <div className="rating">
                                              <div className="star star-0"></div>
                                              <span className="count">(0 review)</span>
                                            </div>
                                            <h3 className="product-title"><Link to="/details">Twin Hoops</Link></h3>
                                            <span className="price">$150.00</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item-product slick-slide">
                                    <div className="items">
                                      <div className="products-entry clearfix product-wapper">
                                        <div className="products-thumb">
                                          <div className="product-lable">
                                            <div className="onsale">-33%</div>
                                          </div>
                                          <div className="product-thumb-hover">
                                            <Link to="/details">
                                              <img width="600" height="600" src="/media/product/4.jpg" className="post-image" alt="" />
                                              <img width="600" height="600" src="/media/product/4-2.jpg" className="hover-image back" alt="" />
                                            </Link>
                                          </div>
                                          <div className="product-button">
                                            <div className="btn-add-to-cart" data-title="Add to cart">
                                              <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                            </div>
                                            <div className="btn-wishlist" data-title="Wishlist">
                                              <button className="product-btn">Add to wishlist</button>
                                            </div>
                                            <div className="btn-compare" data-title="Compare">
                                              <button className="product-btn">Compare</button>
                                            </div>
                                            <span className="product-quickview" data-title="Quick View">
                                              <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="products-content">
                                          <div className="contents">
                                            <div className="rating">
                                              <div className="star star-4"></div>
                                              <span className="count">(2 reviews)</span>
                                            </div>
                                            <h3 className="product-title"><Link to="/details">Yilver And Turquoise Earrings</Link></h3>
                                            <span className="price">
                                              <del aria-hidden="true"><span>$150.00</span></del>
                                              <ins><span>$100.00</span></ins>
                                            </span>
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
                    </section>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section-padding background-img bg-img-3 p-t-70 p-b-70 m-b-0">
              <div className="section-container">
                <div className="block block-feature layout-2">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center">
                      <h2 className="t-brown">Lorem Ipsum Lorem</h2>
                    </div>
                    <div className="row">
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="box-icon animation-horizontal">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.998 511.998" style={{ enableBackground: 'new 0 0 511.998 511.998' }}>
                                <g>
                                  <g>
                                    <path d="M256.013,59.844c-108.193,0-196.218,88.025-196.218,196.218c0,108.201,88.025,196.218,196.218,196.218S452.23,364.263,452.23,256.061C452.23,147.869,364.206,59.844,256.013,59.844z M256.013,435.217c-98.791,0-179.155-80.372-179.155-179.155c0-98.791,80.364-179.155,179.155-179.155s179.155,80.364,179.155,179.155C435.168,354.844,354.804,435.217,256.013,435.217z"></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">Shipping Worldwide</h3>
                            <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="box-icon icon-2 animation-horizontal">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508 508" style={{ enableBackground: 'new 0 0 508 508' }}>
                                <g>
                                  <g>
                                    <path d="M254,0C128.3,0,26.1,102.2,26.1,227.9c0,122.9,97.9,223.4,219.8,227.7V508l60.3-60.3l-60.3-60.3v52c-113-4.4-203.5-97.5-203.5-211.5c0-116.7,94.9-211.6,211.6-211.6s211.6,94.9,211.6,211.6h16.3C481.9,102.2,379.7,0,254,0z M262.1,426.6l21,21l-21,21V426.6z"></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">14 Days Return</h3>
                            <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="box">
                          <div className="box-icon icon-3 animation-horizontal">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }}>
                                <g>
                                  <g>
                                    <path d="M457.987,31.531c-2.688-6.997-13.013-8.533-17.749-3.499c-21.44,18.88-48.939,29.248-77.547,29.248c-39.424,0-75.989-19.627-97.771-52.501C262.937,1.792,259.609,0,256.025,0c-3.563,0-6.912,1.792-8.875,4.757c-21.845,32.875-58.411,52.501-97.835,52.501c-28.928,0-56.704-10.603-78.208-29.867c-3.136-2.816-7.616-3.499-11.477-1.792c-3.84,1.707-6.315,5.525-6.315,9.728v231.317c0,133.205,189.44,239.552,197.504,244.011c1.6,0.896,3.392,1.344,5.163,1.344c1.771,0,3.563-0.448,5.163-1.301c8.064-4.459,197.504-110.827,197.504-244.011v-230.4C458.777,34.688,458.563,33.067,457.987,31.531z"></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">Security Payment</h3>
                            <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="box-icon animation-horizontal">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.998 511.998" style={{ enableBackground: 'new 0 0 511.998 511.998' }}>
                                <g>
                                  <g>
                                    <path d="M256.013,59.844c-108.193,0-196.218,88.025-196.218,196.218c0,108.201,88.025,196.218,196.218,196.218S452.23,364.263,452.23,256.061C452.23,147.869,364.206,59.844,256.013,59.844z M256.013,435.217c-98.791,0-179.155-80.372-179.155-179.155c0-98.791,80.364-179.155,179.155-179.155s179.155,80.364,179.155,179.155C435.168,354.844,354.804,435.217,256.013,435.217z"></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">Shipping Worldwide</h3>
                            <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section-padding p-t-70 m-b-70">
              <div className="section-container">
                <div className="block block-intro layout-3">
                  <div className="block-widget-wrap">
                    <div className="row">
                      <div className="section-column left">
                        <div className="intro-wrap">
                          <h2 className="intro-title black">Jewellery Online<br /> at the Most Affordable Price</h2>
                          <div className="intro-item">
                            Behind our 15-year success is our panel of expert jewellers who have been scouring the entire globe in pursuit of the best and most stunning jewellery that can be offered at affordable price for you.
                          </div>
                          <div className="intro-item">
                            Visit our online catalogue and shop for the finest earrings, rings, bracelets, watches, silver, and the most luxurious gemstones.
                          </div>
                          <div className="intro-btn">
                            <Link to="/about" className="button button-outline border-black animation-horizontal">Read more</Link>
                          </div>
                        </div>
                      </div>
                      <div className="section-column right animation-horizontal hover-opacity">
                        <img width="690" height="498" src="/media/banner/intro-4.jpg" alt="intro" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section-padding">
              <div className="section-container large">
                <div className="block block-banners layout-2 banners-effect">
                  <div className="block-widget-wrap">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="block-widget-banner m-b-15">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <Link to="/shop">
                                  <img width="856" height="496" src="/media/banner/banner-1-4.jpg" alt="Banner Image" />
                                </Link>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner">Summer Collections</h3>
                                    <div className="banner-image-description">
                                      Freshwater pearl necklace and earrings
                                    </div>
                                    <Link className="button button-outline thick-border border-white button-arrow" to="/shop">Explore</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <Link to="/shop">
                                  <img width="856" height="496" src="/media/banner/banner-1-5.jpg" alt="Banner Image" />
                                </Link>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner">Make It Memorable</h3>
                                    <div className="banner-image-description">
                                      Freshwater pearl necklace and earrings
                                    </div>
                                    <Link className="button button-outline thick-border border-white button-arrow" to="/shop">Explore</Link>
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
            </section>
            <section className="section section-padding background-img bg-img-2 m-b-0 p-t-140 p-b-70 m-t-n-130">
              <div className="section-container">
                <div className="block block-testimonial layout-2">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center">
                      <h2 className="t-brown">What Our Customers Say</h2>
                    </div>
                    <div className="block-content">
                      <div className="testimonial-wrap slick-wrap">
                        <div className="slick-sliders" data-slidestoscroll="true" data-nav="1" data-dots="0" data-columns4="1" data-columns3="1" data-columns2="1" data-columns1="2" data-columns="3">
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Amazing piece of history"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/1.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Robet Smith</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-4"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Fabulous Grounds"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/2.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Saitama One</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Great vineyard tour and tasting!"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/3.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Sara Colinton</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Stunning Design"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/4.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Shetty Jamie</h2>
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

