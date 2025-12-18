import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const menusData = [
  {
    menu:"Home",
    href:'/',
    subMenus:null,
  },
  {
    menu:"Shop",
    href:'/',
    rings:{
      title:"Curated Rings",
      styles:[
        {
          name:'Solitaire',
          link:'Solitaire'
        },
        {
          name:'Side Stone',
          link:'side-stone'
        },
        {
          name:'Halo',
          link:'halo'
        },
        {
          name:'Vintage',
          link:'vintage'
        },
        {
          name:'Botanical',
          link:'botanical'
        },
      ],
      shapes:[
        {
          name:'Round',
          link:'round'
        },
        {
          name:'Princess',
          link:'princess'
        },
        {
          name:'Oval',
          link:'oval'
        },
        {
          name:'Cushio',
          link:'cushio'
        },
        {
          name:'Radiant',
          link:'radiant'
        },
        {
          name:'Pear',
          link:'pear'
        },
        {
          name:'Assher',
          link:'Assher'
        },
        {
          name:'Heart',
          link:'Heart'
        },
        {
          name:'Vintage Cuts',
          link:'Vintage Cuts'
        },
      ],
    },
    subMenus:null,
  },
];

function Header() {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    navigate('/my-account');
  };
  return (
    <>
      <div className="bg-brown py-2">
        <p className="text-white text-center mb-0">Free Shipping and Free Returns</p>
      </div>


      <header id="site-header" className="site-header header-v3 small-padding">
        <div className="header-mobile">
          <div className="section-padding">
            <div className="section-container">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                  <div className="navbar-header">
                    <button type="button" id="show-megamenu" className="navbar-toggle"></button>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
                  <div className="site-logo">
                    <Link to="/">
                      <img width="400" height="79" src="/media/logo.png" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                  <div className="topcart dropdown">
                    <div className="dropdown mini-cart top-cart">
                      <div className="remove-cart-shadow"></div>
                      <a className="dropdown-toggle cart-icon" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">2</span></div>
                      </a>
                      <div className="dropdown-menu cart-popup">
                        <div className="cart-empty-wrap">
                          <ul className="cart-list">
                            <li className="empty">
                              <span>No products in the cart.</span>
                              <Link className="go-shop" to="/shop">GO TO SHOP<i aria-hidden="true" className="arrow_right"></i></Link>
                            </li>
                          </ul>
                        </div>
                        <div className="cart-list-wrap">
                          <ul className="cart-list ">
                            <li className="mini-cart-item">
                              <a href="#" className="remove" title="Remove this item"><i className="icon_close"></i></a>
                              <Link to="/details" className="product-image"><img width="600" height="600" src="/media/product/3.jpg" alt=""></img></Link>
                              <Link to="/details" className="product-name">Twin Hoops</Link>
                              <div className="quantity">Qty: 1</div>
                              <div className="price">$150.00</div>
                            </li>
                            <li className="mini-cart-item">
                              <a href="#" className="remove" title="Remove this item"><i className="icon_close"></i></a>
                              <Link to="/details" className="product-image"><img width="600" height="600" src="/media/product/1.jpg" alt=""></img></Link>
                              <Link to="/details" className="product-name">Medium Flat Hoops</Link>
                              <div className="quantity">Qty: 1</div>
                              <div className="price">$100.00</div>
                            </li>
                          </ul>
                          <div className="total-cart">
                            <div className="title-total">Total: </div>
                            <div className="total-price"><span>$250.00</span></div>
                          </div>
                          <div className="free-ship">
                            <div className="title-ship">Buy <strong>$400</strong> more to enjoy <strong>FREE Shipping</strong></div>
                            <div className="total-percent">
                              <div className="percent" style={{ width: '20%' }}></div>
                            </div>
                          </div>
                          <div className="buttons">
                            <Link to="/cart" className="button btn view-cart btn-primary">View cart</Link>
                            <Link to="/checkout" className="button btn checkout btn-default">Check out</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-mobile-fixed">
            <div className="shop-page">
              <Link to="/shop"><i className="wpb-icon-shop"></i></Link>
            </div>
            <div className="my-account">
              <div className="login-header">
                <a
                  href="/my-account"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUserIconClick();
                  }}
                  style={{ cursor: 'pointer', display: 'block', textDecoration: 'none' }}
                >
                  <i className="wpb-icon-user"></i>
                </a>
              </div>
            </div>
            <div className="search-box">
              <div className="search-toggle"><i className="wpb-icon-magnifying-glass"></i></div>
            </div>
            <div className="wishlist-box">
              <Link to="/wishlist"><i className="wpb-icon-heart"></i></Link>
            </div>
          </div>
        </div>
        <div className="header-desktop">
          <div className="header-top">
            <div className="section-padding">
              <div className="section-container large p-l-r">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 header-left">
                    <div className="header-page-link">
                      <div className="search-box d-flex align-items-center">
                        <div className="search-toggle w-small me-3">
                          <i className="fa fa-phone me-1"></i>
                          5454752475
                        </div>
                        <div className="search-toggle w-small">
                          <i className="fa fa-envelope me-1"></i>
                          logo@email.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-4 col-md-12 col-sm-12 col-12 text-center header-center">
                    <div className="site-logo">
                      <Link to="/">
                        <img width="400" height="80" src="/media/logo.png" alt="logo" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 header-right">
                    <div className="header-page-link">
                      <div className="search-box">
                        <div className="search-toggle"><i className="icon-search"></i></div>
                      </div>
                      <div className="login-header icon">
                        <a
                          className="active-login"
                          href="/my-account"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUserIconClick();
                          }}
                          style={{ cursor: 'pointer', display: 'block', textDecoration: 'none' }}
                        >
                          <i className="icon-user"></i>
                        </a>
                      </div>
                      <div className="wishlist-box">
                        <Link to="/wishlist"><i className="icon-heart"></i></Link>
                        <span className="count-wishlist">1</span>
                      </div>
                      <div className="topcart dropdown light">
                        <div className="dropdown mini-cart top-cart">
                          <div className="remove-cart-shadow"></div>
                          <a className="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">2</span></div>
                          </a>
                          <div className="dropdown-menu cart-popup">
                            <div className="cart-empty-wrap">
                              <ul className="cart-list">
                                <li className="empty">
                                  <span>No products in the cart.</span>
                                  <Link className="go-shop" to="/shop">GO TO SHOP<i aria-hidden="true" className="arrow_right"></i></Link>
                                </li>
                              </ul>
                            </div>
                            <div className="cart-list-wrap">
                              <ul className="cart-list ">
                                <li className="mini-cart-item">
                                  <a href="#" className="remove" title="Remove this item"><i className="icon_close"></i></a>
                                  <Link to="/details" className="product-image"><img width="600" height="600" src="/media/product/3.jpg" alt=""></img></Link>
                                  <Link to="/details" className="product-name">Twin Hoops</Link>
                                  <div className="quantity">Qty: 1</div>
                                  <div className="price">$150.00</div>
                                </li>
                                <li className="mini-cart-item">
                                  <a href="#" className="remove" title="Remove this item"><i className="icon_close"></i></a>
                                  <Link to="/details" className="product-image"><img width="600" height="600" src="/media/product/1.jpg" alt=""></img></Link>
                                  <Link to="/details" className="product-name">Medium Flat Hoops</Link>
                                  <div className="quantity">Qty: 1</div>
                                  <div className="price">$100.00</div>
                                </li>
                              </ul>
                              <div className="total-cart">
                                <div className="title-total">Total: </div>
                                <div className="total-price"><span>$250.00</span></div>
                              </div>
                              <div className="free-ship">
                                <div className="title-ship">Buy <strong>$400</strong> more to enjoy <strong>FREE Shipping</strong></div>
                                <div className="total-percent">
                                  <div className="percent" style={{ width: '20%' }}></div>
                                </div>
                              </div>
                              <div className="buttons">
                                <Link to="/cart" className="button btn view-cart btn-primary">View cart</Link>
                                <Link to="/checkout" className="button btn checkout btn-default">Check out</Link>
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


          <div className="header-middle text-center bg-white no-padding">
            <div className="site-navigation">
              <nav id="main-navigation">
                <ul id="menu-main-menu" className="menu">
                  <li className="level-0 menu-item">
                    <Link to="/"><span className="menu-item-text">Home</span></Link>
                  </li>
                  <li className="level-0 menu-item menu-item-has-children">
                    <Link to="/shop"><span className="menu-item-text">Shop</span></Link>
                    <ul className="sub-menu">
                      <div className="container row mx-auto">
                        <div className="col-md-6">
                          <h3 className="border-bottom pb-2 fw-bold">CURATED RINGS</h3>
                          <div className="row">
                            <div className="col-md-6">
                              <p>Shop by Style</p>
                              <li className="level-1 menu-item px-0">
                                <Link to="/shop"><span className="menu-item-text">Solitaire</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Side Stone</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Halo</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Vintage</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Botanical</span></Link>
                              </li>
                            </div>
                            <div className="col-md-6">
                              <p>Shop by Shape</p>
                              <div className="row">
                                <div className="col-6">
                                  <li className="level-1 menu-item px-0">
                                    <Link to="/shop"><span className="menu-item-text">Round</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Princess</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Oval</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Cushio</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Radiant</span></Link>
                                  </li>
                                </div>
                                <div className="col-6">
                                  <li className="level-1 menu-item px-0">
                                    <Link to="/shop"><span className="menu-item-text">Pear</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Enerald</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Assher</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Heart</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/shop"><span className="menu-item-text">Vintage Cuts</span></Link>
                                  </li>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="intro-btn w-100 mt-4">
                            <Link to="/shop" className="w-100 button button-black button-arrow animation-horizontal text-center">View all</Link>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h3 className="border-bottom pb-2 fw-bold">DESIGN STUDIO</h3>
                          <div className="row">
                            <div className="col-12">
                              <img src="/media/site-headdder.jpg" alt="image" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-12 d-flex">
                              <div className="intro-btn mt-4 me-4">
                                <Link to="/shop" className="w-100 button button-black button-arrow animation-horizontal text-center text-nowrap">Start with Setting</Link>
                              </div>
                              <div className="intro-btn mt-4">
                                <Link to="/shop" className="w-100 button button-black button-arrow animation-horizontal text-center text-nowrap">Start with a Diamond</Link>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <p className="fw-bold border-bottom mt-3 pb-2">Diamond Education</p>
                              <li className="level-1 menu-item px-0">
                                <Link to="/shop"><span className="menu-item-text">Lorem Ipsum 1</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Lorem Ipsum 2</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Lorem Ipsum 3</span></Link>
                              </li>
                            </div>
                            <div className="col-md-6">
                              <p className="fw-bold border-bottom mt-3 pb-2">Jewelry Guide</p>
                              <li className="level-1 menu-item px-0">
                                <Link to="/shop"><span className="menu-item-text">Lorem Ipsum 1</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Lorem Ipsum 2</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/shop"><span className="menu-item-text">Lorem Ipsum 3</span></Link>
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </li>
                  {/* {category list here} */}
                  <li className="level-0 menu-item menu-item-has-children">
                    <Link to="/engagement-rings"><span className="menu-item-text">Engagement</span></Link>
                    <ul className="sub-menu">
                      <div className="container row mx-auto">
                        <div className="col-md-6">
                          <h3 className="border-bottom pb-2 fw-bold">ENGAGEMENT RINGS</h3>
                          <div className="row">
                            <div className="col-md-6">
                              <p>Shop by Style</p>
                              <li className="level-1 menu-item px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Classic</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Modern</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Vintage</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Custom</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Halo</span></Link>
                              </li>
                            </div>
                            <div className="col-md-6">
                              <p>Shop by Shape</p>
                              <div className="row">
                                <div className="col-6">
                                  <li className="level-1 menu-item px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Round</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Princess</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Oval</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Cushion</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Radiant</span></Link>
                                  </li>
                                </div>
                                <div className="col-6">
                                  <li className="level-1 menu-item px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Pear</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Emerald</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Asscher</span></Link>
                                  </li>
                                  <li className="px-0 mb-0">
                                    <Link to="/engagement-rings"><span className="menu-item-text">Heart</span></Link>
                                  </li>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="intro-btn w-100 mt-4">
                            <Link to="/engagement-rings" className="w-100 button button-black button-arrow animation-horizontal text-center">View all</Link>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h3 className="border-bottom pb-2 fw-bold">DESIGN STUDIO</h3>
                          <div className="">
                            <div className="">
                              <img src="/media/product/cat-1.jpg" alt="image" className="w-100 !h-[150px] object-cover" />
                            </div>
                            <div className="flex gap-[20px] justify-center">
                              <Link to="/engagement-rings" className="button w-[250px] button-arrow animation-horizontal text-center bg-transparent text-black py-0 !text-[12px] !tracking-[1px] !px-[30px] !border-[1px] hover:!bg-[#000] hover:!text-white">Start with Setting</Link>
                              <Link to="/engagement-rings" className="button w-[250px] button-arrow animation-horizontal text-center bg-transparent text-black py-0 !text-[12px] !tracking-[1px] !px-[30px] !border-[1px] hover:!bg-[#000] hover:!text-white">Start with a Diamond</Link>
                            </div>



                            <div className='flex mt-3 gap-[30px]'>
                              <div className="flex-1">
                              <p className="fw-bold mt-3 pb-2 uppercase tracking-[0.5px] border-b">Diamond Education</p>
                              <li className="level-1 menu-item px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">The 4 C's</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Diamond Shapes</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Ring Settings</span></Link>
                              </li>
                            </div>

                            <div className="flex-1">
                              <p className="fw-bold mt-3 pb-2 uppercase tracking-[0.5px] border-b">Jewelry Guide</p>
                              <li className="level-1 menu-item px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Ring Sizing</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Care & Maintenance</span></Link>
                              </li>
                              <li className="px-0 mb-0">
                                <Link to="/engagement-rings"><span className="menu-item-text">Custom Design</span></Link>
                              </li>
                            </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </ul>
                  </li>
                  <li className="level-0 menu-item menu-item-has-children">
                    <Link to="/wedding"><span className="menu-item-text">Wedding</span></Link>
                    <ul className="sub-menu">
                      <div className="container row mx-auto">
                        <div className="col-md-6">
                          <h3 className="border-bottom pb-2 fw-bold">WEDDING BANDS</h3>
                          <div className="row">
                            <div className="col-md-6">
                              <p>Shop by Style</p>
                              <li className="level-1 menu-item px-0">
                                <Link to="/wedding"><span className="menu-item-text">Classic</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Eternity</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Vintage</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Modern</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Matching Sets</span></Link>
                              </li>
                            </div>
                            <div className="col-md-6">
                              <p>Shop by Material</p>
                              <div className="row">
                                <div className="col-6">
                                  <li className="level-1 menu-item px-0">
                                    <Link to="/wedding"><span className="menu-item-text">Gold</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/wedding"><span className="menu-item-text">Platinum</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/wedding"><span className="menu-item-text">Rose Gold</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/wedding"><span className="menu-item-text">White Gold</span></Link>
                                  </li>
                                </div>
                                <div className="col-6">
                                  <li className="level-1 menu-item px-0">
                                    <Link to="/wedding"><span className="menu-item-text">Diamond</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/wedding"><span className="menu-item-text">Plain</span></Link>
                                  </li>
                                  <li className="px-0">
                                    <Link to="/wedding"><span className="menu-item-text">Engraved</span></Link>
                                  </li>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="intro-btn w-100 mt-4">
                            <Link to="/wedding" className="w-100 button button-black button-arrow animation-horizontal text-center">View all</Link>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h3 className="border-bottom pb-2 fw-bold">DESIGN STUDIO</h3>
                          <div className="row">
                            <div className="col-12">
                              <img src="/media/product/cat-6-1.jpg" alt="image" className="w-100" />
                            </div>
                            <div className="col-md-12 d-flex">
                              <div className="intro-btn mt-4 me-4">
                                <Link to="/wedding" className="w-100 button button-black button-arrow animation-horizontal text-center">Start with Setting</Link>
                              </div>
                              <div className="intro-btn mt-4">
                                <Link to="/wedding" className="w-100 button button-black button-arrow animation-horizontal text-center">Start with a Diamond</Link>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <p className="fw-bold border-bottom mt-3 pb-2">Wedding Guide</p>
                              <li className="level-1 menu-item px-0">
                                <Link to="/wedding"><span className="menu-item-text">Ring Sizing</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Matching Sets</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Care & Maintenance</span></Link>
                              </li>
                            </div>
                            <div className="col-md-6">
                              <p className="fw-bold border-bottom mt-3 pb-2">Anniversary Bands</p>
                              <li className="level-1 menu-item px-0">
                                <Link to="/wedding"><span className="menu-item-text">5 Year</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">10 Year</span></Link>
                              </li>
                              <li className="px-0">
                                <Link to="/wedding"><span className="menu-item-text">Custom</span></Link>
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </li>
                  {/* {category list ends here} */}
                  <li className="level-0 menu-item">
                    <Link to="/contact"><span className="menu-item-text">Contact</span></Link>
                  </li>
                  <li className="level-0 menu-item">
                    <Link to="/about"><span className="menu-item-text">About us</span></Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>


        </div>
      </header>
    </>
  );
}

export default Header;

