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
    subMenus:{
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
      studio:{
        title:"Design Studio",
        gallery:{
            imgSrc:"/media/site-headdder.jpg",
            alt:"gallery image"
          },
        diamond:[
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
        ],
        jewellery:[
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
        ],
      }
    },
    
  },
  {
    menu:"Engagement",
    href:'/',
    subMenus:{
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
      studio:{
        title:"Design Studio",
        gallery:{
            imgSrc:"/media/site-headdder.jpg",
            alt:"gallery image"
          },
        diamond:[
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
        ],
        jewellery:[
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
        ],
      }
    },
    
  },
  {
    menu:"Wedding",
    href:'/',
    subMenus:{
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
      studio:{
        title:"Design Studio",
        gallery:{
            imgSrc:"/media/site-headdder.jpg",
            alt:"gallery image"
          },
        diamond:[
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
        ],
        jewellery:[
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
          {
            title:'Lorem Ipsum 1',
            url:"",
          },
        ],
      }
    },
    
  },
  {
    menu:"Contact",
    href:'/',
    subMenus:null,
  },
  {
    menu:"About Us",
    href:'/',
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


          {/* dynamic menus */}

          <div className="header-middle text-center bg-white no-padding">
            <div className="site-navigation">
              <nav id="main-navigation">
                <ul id="menu-main-menu" className="menu">
                    {
                      menusData.map((menu, idx)=>(
                        <li className={`level-0 menu-item ${menu.subMenus ? 'menu-item-has-children' : ''}`}>
                          <Link to="/"><span className="menu-item-text">{menu.menu}</span></Link>
                          {menu?.subMenus && (
                            <ul className="sub-menu !top-[38px]">
                              <div className="container row mx-auto">
                                <div className="col-md-6">
                                  <h3 className="border-bottom pb-2 fw-bold">{menu.subMenus.rings.title}</h3>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <p>Shop by Style</p>
                                      {menu.subMenus.rings.styles.map((item, itemIdx)=>(
                                        <li className="level-1 menu-item px-0">
                                          <Link to="/shop"><span className="menu-item-text">{item.name}</span></Link>
                                        </li>
                                      ))}
                                      
                                    </div>
                                    <div className="col-md-6">
                                      <p>Shop by Shape</p>
                                      <div className="row">
                                        <div className="col-6 px-0">
                                          {menu.subMenus.rings.shapes.map((item, itemIdx)=>{
                                            if(itemIdx < 5){
                                              return (
                                                <li className="level-1 menu-item px-0">
                                                  <Link to="/shop">
                                                    <span className="menu-item-text flex">
                                                      <span class="thumb-icon mr-[10px] flex items-center">
                                                        <img src="https://images.grownbrilliance.com/images/menu/round.svg" loading="lazy" width="20" height="20" alt="" class="lz-img-custom !w-[20px] !h-[20px] mb-0" />
                                                      </span>
                                                      {item.name}
                                                    </span>
                                                  </Link>
                                                </li>
                                              )
                                            }
                                          }
                                          )}
                                        </div>


                                        <div className="col-6">
                                          {menu.subMenus.rings.shapes.map((item, itemIdx)=>{
                                            if(itemIdx >= 5){
                                              return (
                                                <li className="level-1 menu-item px-0">
                                                  <Link to="/shop">
                                                    <span className="menu-item-text flex">
                                                      <span class="thumb-icon mr-[10px] flex items-center">
                                                        <img src="https://images.grownbrilliance.com/images/menu/round.svg" loading="lazy" width="20" height="20" alt="" class="lz-img-custom !w-[20px] !h-[20px] mb-0" />
                                                      </span>
                                                      {item.name}
                                                    </span>
                                                  </Link>
                                                </li>
                                              )
                                            }
                                          }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="intro-btn w-100 mt-4">
                                    <Link to="/shop" className="w-100 button button-arrow animation-horizontal text-center !p-0">View all</Link>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <h3 className="border-bottom pb-2 fw-bold">{menu.subMenus.studio.title}</h3>
                                  <div className="row">
                                    <div className="col-12">
                                      <img src={menu.subMenus.studio.gallery.imgSrc} alt="image" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                    </div>


                                    <div className="flex gap-[20px] justify-center">
                                      <Link to="/engagement-rings" className="button w-[250px] button-arrow animation-horizontal text-center bg-transparent text-black py-0 !text-[12px] !tracking-[1px] !px-[30px] !border-[1px] hover:!bg-[#000] hover:!text-white">Start with Setting</Link>
                                      <Link to="/engagement-rings" className="button w-[250px] button-arrow animation-horizontal text-center bg-transparent text-black py-0 !text-[12px] !tracking-[1px] !px-[30px] !border-[1px] hover:!bg-[#000] hover:!text-white">Start with a Diamond</Link>
                                    </div>

                                      <div className='flex mt-3 gap-[30px]'>
                                        <div className="flex-1">
                                        <p className="fw-bold mt-3 pb-2 uppercase tracking-[0.5px] border-b">Diamond Education</p>
                                        {menu.subMenus.studio.diamond.map((diamondItem, diamondIdx)=>(
                                          <li className="level-1 menu-item px-0 mb-0">
                                            <Link to="/shop"><span className="menu-item-text">{diamondItem.title}</span></Link>
                                          </li>
                                        ))}
                                        
                                      </div>

                                      <div className="flex-1">
                                        <p className="fw-bold mt-3 pb-2 uppercase tracking-[0.5px] border-b">Jewelry Guide</p>
                                        {menu.subMenus.studio.jewellery.map((jwlItem, jwlIdx)=>(
                                          <li className="level-1 menu-item px-0 mb-0">
                                            <Link to="/shop"><span className="menu-item-text">{jwlItem.title}</span></Link>
                                          </li>
                                        ))}
                                      </div>
                                      </div>

                                  </div>
                                </div>

                              </div>
                            </ul>
                          )}
                        </li>
                      ))
                    }
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

