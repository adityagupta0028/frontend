import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartItemMutation } from '../Services/CustomerApi';
import { getLocalCart, removeFromCart, updateCartItem } from '../utils/cartService';
import { GetUrl } from '../config/GetUrl';
import './Cart.css';

function Cart() {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [appraisalChecked, setAppraisalChecked] = useState({});
  const [selectedItemForChange, setSelectedItemForChange] = useState(null);
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('customerToken');
  
  // Fetch cart from API if logged in
  const { data: cartData, isLoading: cartLoading, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !isLoggedIn, // Skip query if not logged in
  });
  console.log("cartData=====>",cartData)
  // Mutations
  const [removeFromCartApi] = useRemoveFromCartMutation();
  const [updateCartItemApi] = useUpdateCartItemMutation();
  
  // Get cart items (from API or localStorage)
  const cartItems = useMemo(() => {
    if (isLoggedIn && cartData?.data) {
      return cartData.data.items || [];
    } else if (!isLoggedIn) {
      const localCart = getLocalCart();
      return localCart || [];
    }
    return [];
  }, [isLoggedIn, cartData]);
  
  // Calculate totals
  const cartTotals = useMemo(() => {
    let subtotal = 0;
    let totalItems = 0;
    
    cartItems.forEach(item => {
      const price = item.discountedPrice || item.price || 0;
      const quantity = item.quantity || 1;
      subtotal += price * quantity;
      totalItems += quantity;
    });
    
    const discount = 0; // Can be calculated from promotions
    const shipping = subtotal >= 1000 ? 0 : 0; // Free shipping over $1000
    const total = subtotal - discount + shipping;
    
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
      itemCount: totalItems
    };
  }, [cartItems]);

  const showChangeOptions = (e) => {
    e.preventDefault();
    setShowChangeModal(true);
  };

  const closeChangeModal = () => {
    setShowChangeModal(false);
  };

  const moveToWishlist = () => {
    alert('Item moved to wishlist!');
    closeChangeModal();
  };

  // Handle remove item
  const handleRemoveItem = async (itemId) => {
    if (!confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }

    try {
      if (isLoggedIn) {
        await removeFromCart(itemId, removeFromCartApi);
        refetchCart();
      } else {
        await removeFromCart(itemId);
        // Force re-render by updating state
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  // Handle update quantity
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      if (isLoggedIn) {
        await updateCartItem(itemId, newQuantity, updateCartItemApi);
        refetchCart();
      } else {
        await updateCartItem(itemId, newQuantity);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  // Handle change options
  const handleChangeOptions = (item) => {
    setSelectedItemForChange(item);
    setShowChangeModal(true);
  };

  // Get product image URL
  const getProductImage = (item) => {
    if (item.productId?.images && item.productId.images.length > 0) {
      const image = item.productId.images[0];
      return image.startsWith('http') ? image : `${GetUrl.IMAGE_URL}${image}`;
    }
    return '/media/product/1.jpg'; // Fallback image
  };

  // Get product name
  const getProductName = (item) => {
    if (item.productId?.product_name) {
      return item.productId.product_name;
    }
    return 'Product';
  };

  // Get product SKU
  const getProductSku = (item) => {
    if (item.productId?.product_id) {
      return item.productId.product_id;
    }
    return item.product_id || 'N/A';
  };

  // Get product specs
  const getProductSpecs = (item) => {
    const specs = [];
    if (item.selectedVariant?.metal_type) {
      specs.push(item.selectedVariant.metal_type);
    }
    if (item.selectedVariant?.carat_weight) {
      specs.push(`${item.selectedVariant.carat_weight} ctw`);
    }
    if (item.selectedVariant?.diamond_quality) {
      specs.push(item.selectedVariant.diamond_quality);
    }
    return specs.join(', ') || 'Standard';
  };

  // Get item price
  const getItemPrice = (item) => {
    return item.discountedPrice || item.price || 0;
  };

  // Get original price
  const getOriginalPrice = (item) => {
    if (item.discountedPrice && item.price) {
      return item.price;
    }
    return null;
  };

  // Calculate discount amount
  const getDiscountAmount = (item) => {
    if (item.discountedPrice && item.price) {
      return (item.price - item.discountedPrice) * (item.quantity || 1);
    }
    return 0;
  };

  // Listen for cart updates (for localStorage)
  useEffect(() => {
    const handleCartUpdate = () => {
      // Force re-render
      window.location.reload();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Loading state
  if (cartLoading && isLoggedIn) {
    return (
      <main className="cart-main">
        <div className="cart-container">
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <p>Loading cart...</p>
          </div>
        </div>
      </main>
    );
  }

  console.log("cartTotals======>",cartTotals)

  return (
    <main className="cart-main">
      <div className="cart-container">
        {/* Engagement Ring Section */}
        <div className="cart-section">
          {/* Left Column: Cart Items */}
          <div className="cart-items-column">
            <h2 className="cart-title">My Bag <span className="item-count">({cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'item' : 'items'})</span></h2>

            {/* Cart Items - Dynamic */}
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty</p>
                <Link to="/shop" className="btn-primary">Continue Shopping</Link>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const itemId = item._id || item.tempId || index;
                const productName = getProductName(item);
                const productSku = getProductSku(item);
                const productSpecs = getProductSpecs(item);
                const itemPrice = getItemPrice(item);
                const originalPrice = getOriginalPrice(item);
                const discountAmount = getDiscountAmount(item);
                const productImage = getProductImage(item);
                const ringSize = item.selectedVariant?.ring_size;
                
                return (
                  <div key={itemId} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={productImage} 
                        alt={productName}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.style.display = 'block';
                          }
                        }} 
                      />
                      <div className="placeholder-image" style={{ display: 'none' }}>
                        <svg viewBox="0 0 100 100" fill="#e0e0e0">
                          <rect width="100" height="100" rx="8" />
                        </svg>
                      </div>
                    </div>
                    <div className="item-details">
                      <div className="item-header">
                        <h3 className="item-name">{productName}</h3>
                      </div>
                      <p className="item-spec">{productSpecs}</p>
                      <p className="item-sku">SKU: {productSku}</p>
                      <div className="item-pricing">
                        {originalPrice && (
                          <>
                            <span className="original-price">${originalPrice.toFixed(2)}</span>
                            {discountAmount > 0 && (
                              <span className="discount-badge">
                                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                ${discountAmount.toFixed(2)} discount applied
                              </span>
                            )}
                          </>
                        )}
                        <span className="current-price">${itemPrice.toFixed(2)}</span>
                      </div>
                      <div className="item-quantity">
                        <label>Quantity:
                          <div className="quantity-controls">
                            <button 
                              type="button"
                              className="qty-btn minus"
                              onClick={() => handleUpdateQuantity(itemId, (item.quantity || 1) - 1)}
                            >-</button>
                            <input 
                              type="number" 
                              value={item.quantity || 1} 
                              min="1"
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value) || 1;
                                if (newQty >= 1) {
                                  handleUpdateQuantity(itemId, newQty);
                                }
                              }}
                              className="qty-input"
                            />
                            <button 
                              type="button"
                              className="qty-btn plus"
                              onClick={() => handleUpdateQuantity(itemId, (item.quantity || 1) + 1)}
                            >+</button>
                          </div>
                        </label>
                      </div>
                      {ringSize && (
                        <div className="item-options">
                          <div className="size-selector">
                            <label>Ring Size:
                              <span className="size-value">{ringSize}</span>
                            </label>
                          </div>
                        </div>
                      )}
                      {item.engraving_text && (
                        <div className="engraving-text">
                          <p>Engraving: {item.engraving_text}</p>
                        </div>
                      )}
                      <div className="item-actions">
                        <button 
                          className="action-btn change-btn" 
                          onClick={() => handleChangeOptions(item)}
                        >
                          Change
                        </button>
                        <button className="action-btn remove-btn">Save for Later</button>
                        <button 
                          className="action-btn remove-btn"
                          onClick={() => handleRemoveItem(itemId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Jewelry Cleaning Kit */}
            <div className="addon-item">
              <div className="item-image">
                <img src="/media/product/3.jpg" alt="Jewelry Cleaning Kit" onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'block';
                  }
                }} />
                <div className="placeholder-image" style={{ display: 'none' }}>
                  <svg viewBox="0 0 100 100" fill="#e0e0e0">
                    <rect width="100" height="100" rx="8" />
                  </svg>
                </div>
              </div>
              <div className="item-details">
                <h3 className="item-name">Jewelry Cleaning Kit</h3>
                <p className="item-spec">Keep your jewelry sparkling clean</p>
                <div className="item-pricing">
                  <span className="current-price">+$50.00</span>
                </div>
                <button className="add-to-bag-btn">Add to bag</button>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="delivery-info">
              <svg className="delivery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <div className="delivery-text">
                <strong>Estimated Delivery:</strong>
                <span> Tuesday, January 6, 2025</span>
              </div>
            </div>
          </div>

          {/* Buy Together Section */}
          <div className="buy-together-section">
            <h3 className="section-title">Buy together and save</h3>
            <div className="cart-item">
              <div className="item-image">
                <img src="/media/product/4.jpg" alt="Wedding Band" onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'block';
                  }
                }} />
                <div className="placeholder-image" style={{ display: 'none' }}>
                  <svg viewBox="0 0 100 100" fill="#e0e0e0">
                    <rect width="100" height="100" rx="8" />
                  </svg>
                </div>
              </div>
              <div className="item-details">
                <h3 className="item-name">Matching wedding ring</h3>
                <p className="item-spec">Marigold Pavé Band</p>
                <div className="item-pricing">
                  <span className="original-price">$1,010.00</span>
                  <span className="current-price">$606.00</span>
                </div>
                <button className="add-to-bag-btn">Add to bag</button>
              </div>
            </div>
            <Link to="/shop" className="shop-all-link">Shop all wedding bands &gt;</Link>
          </div>

          {/* Bottom Actions */}
          <div className="bottom-actions">
            <button className="action-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email for later
            </button>
            <button className="action-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Save for later
            </button>
            <button className="action-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Ask a question
            </button>
          </div>
        </div>

        {/* Right Column: Promotions & Order Summary */}
        <aside className="cart-sidebar">
          {/* Promotions Section */}
          <div className="promotions-section">
            <h3 className="sidebar-title">Promotions</h3>

            {/* Applied Promotion 1 */}
            <div className="promotion-item applied">
              <div className="promotion-header">
                <div className="promotion-badge">
                  <span className="badge-text">Last<br />Chance</span>
                </div>
                <div className="promotion-content-wrapper">
                  <p className="promotion-text">Save $967 with </p>
                  <span className="applied-status">
                    <svg className="applied-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="applied-text">Applied</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Applied Promotion 2 */}
            <div className="promotion-item applied">
              <div className="promotion-header">
                <div className="promotion-image">
                  <img src="/media/product/5.jpg" alt="Lab diamond earrings" onError={(e) => {
                    e.target.style.display = 'none';
                  }} />
                </div>
                <div className="promotion-content-wrapper">
                  <p className="promotion-text">Lab diamond earrings with order over $1000</p>
                  <span className="applied-status">
                    <svg className="applied-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="applied-text">Applied</span>
                  </span>
                </div>
              </div>
              <Link to="/shop" className="view-offers-link">
                View all offers <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="sidebar-title">Order summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotals.subtotal}</span>
            </div>
            {parseFloat(cartTotals.discount) > 0 && (
              <div className="summary-row discount-row">
                <span>Discount</span>
                <span className="discount-value">-${cartTotals.discount}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span>{parseFloat(cartTotals.shipping) === 0 ? 'Free' : `$${cartTotals.shipping}`}</span>
            </div>

            <div className="summary-total">
              <span>Estimated Total</span>
              <span className="total-amount">${cartTotals.total}</span>
            </div>

            {/* <Link to="/checkout" className="checkout-btn">Go to checkout</Link> */}
            <Link to="/login" className="checkout-btn">Go to checkout</Link>
            
          </div>

          {/* Order Includes */}
          <div className="order-includes">
            <h3 className="sidebar-title">Your order includes:</h3>
            <ul className="includes-list">
              <li>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Free 30-Day Returns
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Free 1-Year Resizing
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Free Lifetime Warranty
              </li>
            </ul>
          </div>

          {/* Why Rare Carat */}
          <div className="why-section">
            <h3 className="sidebar-title">Why Rare Carat?</h3>
            <div className="why-items">
              <div className="why-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>100% Money-Back Guarantee</span>
              </div>
              <div className="why-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Authenticity Inspection</span>
              </div>
              <div className="why-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Discreet, Quality Packaging: Watch Unboxing Video</span>
              </div>
            </div>
          </div>

          {/* Help Contact */}
          <div className="help-section">
            <p>Need Help? Call <a href="tel:18557204858">1.855.720.4858</a></p>
          </div>
        </aside>
      </div>

      {/* Change Options Modal */}
      <div className={`change-modal ${showChangeModal ? 'show' : ''}`} onClick={(e) => {
        if (e.target.classList.contains('change-modal')) {
          closeChangeModal();
        }
      }}>
        <div className="modal-content-small">
          <h3>Change Product</h3>
          <p>What would you like to do with this item?</p>
          <div className="modal-actions">
            {selectedItemForChange && (
              <Link 
                to={`/product/details/${selectedItemForChange.productId?._id || selectedItemForChange.productId}`} 
                className="modal-btn primary"
              >
                Go to Product Page
              </Link>
            )}
            <button className="modal-btn secondary" onClick={moveToWishlist}>Move to Wishlist</button>
            <button className="modal-btn cancel" onClick={closeChangeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
