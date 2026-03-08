import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useGetCartQuery, useGetWishlistQuery, useGetHeroMenuQuery } from '../Services/CustomerApi';
import { getLocalCart, getCartItemCount } from '../utils/cartService';
import { getLocalWishlist } from '../utils/wishlistService';
import { GetUrl } from '../config/GetUrl';
import './Header.css';

// Menu items with `id` use getHeroMenu API for dynamic submenu (column1–column4).
const menusData = [
  { menu: "Home", href: '/', subMenus: null },
  { id: "6942e3b741e766bf37919b9c", menu: "Engagement Rings", href: '/engagement-rings', subMenus: true },
  { id: "6945ae7225a47dcbe1667cb5", menu: "Wedding Rings", href: '/wedding', subMenus: true },
  { id: "69468b5a25a47dcbe1667e35", menu: "Jewellery", href: '/jewelry', subMenus: true },
  { menu: "Contact", href: '/', subMenus: null },
  { menu: "About Us", href: '/', subMenus: null },
];

function Header() {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('customerToken');

  // State to trigger cart recalculation (NO PAGE REFRESH)
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
  const [wishlistUpdateTrigger, setWishlistUpdateTrigger] = useState(0);

  // Fetch cart from API if logged in
  const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
    pollingInterval: 30000, // Poll every 30 seconds to keep count updated
  });

  // Fetch wishlist from API if logged in
  const { data: wishlistData, refetch: refetchWishlist } = useGetWishlistQuery(undefined, {
    skip: !isLoggedIn,
  });

  // Hero menu for dropdowns (Engagement Rings, Wedding Rings, Jewelry)
  const { data: heroMenu1 } = useGetHeroMenuQuery('6942e3b741e766bf37919b9c');
  const { data: heroMenu2 } = useGetHeroMenuQuery('6945ae7225a47dcbe1667cb5');
  const { data: heroMenu3 } = useGetHeroMenuQuery('69468b5a25a47dcbe1667e35');
  const heroMenuByCategory = useMemo(() => ({
    '6942e3b741e766bf37919b9c': heroMenu1?.data,
    '6945ae7225a47dcbe1667cb5': heroMenu2?.data,
    '69468b5a25a47dcbe1667e35': heroMenu3?.data,
  }), [heroMenu1?.data, heroMenu2?.data, heroMenu3?.data]);

  // Get cart count
  const cartCount = useMemo(() => {
    if (isLoggedIn && cartData?.data?.items) {
      return cartData.data.items.reduce((total, item) => total + (item.quantity || 1), 0);
    } else if (!isLoggedIn) {
      const localCart = getLocalCart();
      return localCart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    return 0;
  }, [isLoggedIn, cartData, cartUpdateTrigger]); // Include cartUpdateTrigger for real-time updates

  // Get cart items for mini cart dropdown
  const cartItems = useMemo(() => {
    if (isLoggedIn && cartData?.data?.items) {
      return cartData.data.items.slice(0, 3); // Show max 3 items in dropdown
    } else if (!isLoggedIn) {
      return getLocalCart().slice(0, 3);
    }
    return [];
  }, [isLoggedIn, cartData, cartUpdateTrigger]); // Include cartUpdateTrigger for real-time updates

  // Calculate cart total
  const cartTotal = useMemo(() => {
    const items = isLoggedIn && cartData?.data?.items ? cartData.data.items : (!isLoggedIn ? getLocalCart() : []);
    return items.reduce((total, item) => {
      const price = item.discountedPrice || item.price || 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  }, [isLoggedIn, cartData, cartUpdateTrigger]); // Include cartUpdateTrigger for real-time updates

  // Get wishlist count
  const wishlistCount = useMemo(() => {
    if (isLoggedIn && wishlistData?.data?.items) {
      return wishlistData.data.items.length;
    } else if (!isLoggedIn) {
      return getLocalWishlist().length;
    }
    return 0;
  }, [isLoggedIn, wishlistData, wishlistUpdateTrigger]);

  // Get product image
  const getProductImage = (item) => {
    if (item.productId?.images && item.productId.images.length > 0) {
      const image = item.productId.images[0];
      return image.startsWith('http') ? image : `${GetUrl.IMAGE_URL}${image}`;
    }
    return '/media/product/1.jpg';
  };

  // Get product name
  const getProductName = (item) => {
    return item.productId?.product_name || 'Product';
  };

  // Listen for cart updates - NO PAGE REFRESH, just state updates
  useEffect(() => {
    const handleCartUpdate = () => {
      // Update cart data without page refresh
      if (isLoggedIn && refetchCart) {
        // For logged-in users, refetch from API
        refetchCart();
      } else {
        // For guest users, trigger recalculation from localStorage
        setCartUpdateTrigger(prev => prev + 1);
      }
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [isLoggedIn, refetchCart]);

  // Listen for wishlist updates
  useEffect(() => {
    const handleWishlistUpdate = () => {
      // Update wishlist data without page refresh
      if (isLoggedIn && refetchWishlist) {
        // For logged-in users, refetch from API
        refetchWishlist();
      } else {
        // For guest users, trigger recalculation from localStorage
        setWishlistUpdateTrigger(prev => prev + 1);
      }
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [isLoggedIn, refetchWishlist]);

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
                        <div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">{cartCount || 0}</span></div>
                      </a>
                      <div className="dropdown-menu cart-popup">
                        {cartItems.length === 0 ? (
                          <div className="cart-empty-wrap">
                            <ul className="cart-list">
                              <li className="empty">
                                <span>No products in the cart.</span>
                                <Link className="go-shop" to="/shop">GO TO SHOP<i aria-hidden="true" className="arrow_right"></i></Link>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div className="cart-list-wrap">
                            <ul className="cart-list">
                              {cartItems.map((item, index) => {
                                const itemId = item._id || item.tempId || index;
                                const productImage = getProductImage(item);
                                const productName = getProductName(item);
                                const itemPrice = (item.discountedPrice || item.price || 0) * (item.quantity || 1);
                                const productId = item.productId?._id || item.productId;

                                return (
                                  <li key={itemId} className="mini-cart-item">
                                    <Link
                                      to={`/product/details/${productId}`}
                                      className="product-image"
                                    >
                                      <img width="600" height="600" src={productImage} alt={productName} />
                                    </Link>
                                    <Link
                                      to={`/product/details/${productId}`}
                                      className="product-name"
                                    >
                                      {productName}
                                    </Link>
                                    <div className="quantity">Qty: {item.quantity || 1}</div>
                                    <div className="price">${itemPrice.toFixed(2)}</div>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className="total-cart">
                              <div className="title-total">Total: </div>
                              <div className="total-price"><span>${cartTotal.toFixed(2)}</span></div>
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
                        )}
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
                        {wishlistCount > 0 && <span className="count-wishlist">{wishlistCount}</span>}
                      </div>
                      <div className="topcart dropdown light">
                        <div className="dropdown mini-cart top-cart">
                          <div className="remove-cart-shadow"></div>
                          <Link className="dropdown-toggle cart-icon" to="/cart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">{cartCount || 0}</span></div>
                          </Link>
                          <div className="dropdown-menu cart-popup">
                            {cartItems.length === 0 ? (
                              <div className="cart-empty-wrap">
                                <ul className="cart-list">
                                  <li className="empty">
                                    <span>No products in the cart.</span>
                                    <Link className="go-shop" to="/shop">GO TO SHOP<i aria-hidden="true" className="arrow_right"></i></Link>
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <div className="cart-list-wrap">
                                <ul className="cart-list">
                                  {cartItems.map((item, index) => {
                                    const itemId = item._id || item.tempId || index;
                                    const productImage = getProductImage(item);
                                    const productName = getProductName(item);
                                    const itemPrice = (item.discountedPrice || item.price || 0) * (item.quantity || 1);
                                    const productId = item.productId?._id || item.productId;

                                    return (
                                      <li key={itemId} className="mini-cart-item">
                                        <Link
                                          to={`/product/details/${productId}`}
                                          className="product-image"
                                        >
                                          <img width="600" height="600" src={productImage} alt={productName} />
                                        </Link>
                                        <Link
                                          to={`/product/details/${productId}`}
                                          className="product-name"
                                        >
                                          {productName}
                                        </Link>
                                        <div className="quantity">Qty: {item.quantity || 1}</div>
                                        <div className="price">${itemPrice.toFixed(2)}</div>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <div className="total-cart">
                                  <div className="title-total">Total: </div>
                                  <div className="total-price"><span>${cartTotal.toFixed(2)}</span></div>
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
                            )}
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
                    menusData.map((menu, idx) => (
                      <li className={`level-0 menu-item ${menu.subMenus ? 'menu-item-has-children' : ''}`} key={idx}>
                        <Link to={menu.href}><span className="menu-item-text">{menu.menu}</span></Link>
                        {menu?.subMenus && menu.id && (() => {
                          const heroData = heroMenuByCategory[menu.id];
                          const defaultCol = { title: '', items: [] };
                          const normalizeCol = (col) => {
                            if (!col) return defaultCol;
                            if (Array.isArray(col)) return { title: '', items: col };
                            return { title: col.title || '', items: col.items || [] };
                          };
                          const columns = heroData
                            ? [normalizeCol(heroData.column1), normalizeCol(heroData.column2), normalizeCol(heroData.column3), normalizeCol(heroData.column4)]
                            : [defaultCol, defaultCol, defaultCol, defaultCol];
                          const hasItems = columns.some(col => (col?.items?.length || 0) > 0);
                          const itemLink = (item) => {
                            if (item.filterKey && item.id) {
                              const idStr = typeof item.id === 'string' ? item.id : item.id?.toString?.() || '';
                              return idStr ? `${menu.href}?${encodeURIComponent(item.filterKey)}=${encodeURIComponent(idStr)}` : menu.href;
                            }
                            return `${menu.href}${item.link ? `?filter=${encodeURIComponent(item.link)}` : ''}`;
                          };
                          const itemImage = (item) => (item.image && item.image.startsWith('http')) ? item.image : (item.image ? `${GetUrl.IMAGE_URL}${item.image}` : null);
                          return (
                            <ul className="sub-menu !top-[38px]">
                              <div className="container row mx-auto">
                                {hasItems ? (
                                  <>
                                    <div className="col-md-6">
                                      <h3 className="border-bottom pb-2 fw-bold">{columns[0].title || columns[1].title || 'Curated'}</h3>
                                      <div className="row">
                                        <div className="col-md-6">
                                          {columns[0].title ? <p className="mb-2 fw-semibold text-uppercase small">{columns[0].title}</p> : null}
                                          {(columns[0].items || []).map((item, ci) => (
                                            <li key={item.id?.toString?.() || item.link || ci} className="level-1 menu-item px-0">
                                              <Link to={itemLink(item)}>
                                                <span className="menu-item-text flex">
                                                  {itemImage(item) && (
                                                    <span className="thumb-icon mr-[10px] flex items-center">
                                                      <img src={itemImage(item)} loading="lazy" width="20" height="20" alt="" className="lz-img-custom !w-[20px] !h-[20px] mb-0" />
                                                    </span>
                                                  )}
                                                  {item.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </div>
                                        <div className="col-md-6">
                                          {columns[1].title ? <p className="mb-2 fw-semibold text-uppercase small">{columns[1].title}</p> : null}
                                          {(columns[1].items || []).map((item, ci) => (
                                            <li key={item.id?.toString?.() || item.link || ci} className="level-1 menu-item px-0">
                                              <Link to={itemLink(item)}>
                                                <span className="menu-item-text flex">
                                                  {itemImage(item) && (
                                                    <span className="thumb-icon mr-[10px] flex items-center">
                                                      <img src={itemImage(item)} loading="lazy" width="20" height="20" alt="" className="lz-img-custom !w-[20px] !h-[20px] mb-0" />
                                                    </span>
                                                  )}
                                                  {item.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </div>
                                      </div>
                                      {/* <div className="intro-btn w-100 mt-4">
                                        <Link to={menu.href} className="w-100 button button-arrow animation-horizontal text-center !p-0">View all</Link>
                                      </div> */}
                                    </div>
                                    <div className="col-md-6">
                                      <h3 className="border-bottom pb-2 fw-bold">{columns[2].title || columns[3].title || 'Curated'}</h3>
                                      <div className="row">
                                        <div className="col-md-6">
                                          {columns[2].title ? <p className="mb-2 fw-semibold text-uppercase small">{columns[2].title}</p> : null}
                                          {(columns[2].items || []).map((item, ci) => (
                                            <li key={item.id?.toString?.() || item.link || ci} className="level-1 menu-item px-0">
                                              <Link to={itemLink(item)}>
                                                <span className="menu-item-text flex">
                                                  {itemImage(item) && (
                                                    <span className="thumb-icon mr-[10px] flex items-center">
                                                      <img src={itemImage(item)} loading="lazy" width="20" height="20" alt="" className="lz-img-custom !w-[20px] !h-[20px] mb-0" />
                                                    </span>
                                                  )}
                                                  {item.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </div>
                                        <div className="col-md-6">
                                          {columns[3].title ? <p className="mb-2 fw-semibold text-uppercase small">{columns[3].title}</p> : null}
                                          {(columns[3].items || []).map((item, ci) => (
                                            <li key={item.id?.toString?.() || item.link || ci} className="level-1 menu-item px-0">
                                              <Link to={itemLink(item)}>
                                                <span className="menu-item-text flex">
                                                  {itemImage(item) && (
                                                    <span className="thumb-icon mr-[10px] flex items-center">
                                                      <img src={itemImage(item)} loading="lazy" width="20" height="20" alt="" className="lz-img-custom !w-[20px] !h-[20px] mb-0" />
                                                    </span>
                                                  )}
                                                  {item.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </div>
                                      </div>
                                      {/* <div className="intro-btn w-100 mt-4">
                                        <Link to={menu.href} className="w-100 button button-arrow animation-horizontal text-center !p-0">View all</Link>
                                      </div> */}
                                    </div>
                                  </>
                                ) : (
                                  <div className="col-12 py-3 text-center">Loading menu…</div>
                                )}
                              </div>
                            </ul>
                          );
                        })()}
                      </li>
                    ))
                  }
                </ul>
              </nav>
            </div>
          </div>




        </div>
      </header >
    </>
  );
}

export default Header;

