import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './AddToCartModal.css';

function AddToCartModal({ show, onHide, product, quantity, cartTotal, cartItemCount }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`modal-backdrop ${show ? 'active' : ''}`}
        onClick={onHide}
      />

      {/* Modal */}
      <div className={`cart-modal ${show ? 'active' : ''}`}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-title">
            <svg 
              className="checkmark-icon" 
              viewBox="0 0 14 14" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m4.375 7 1.75 1.75 3.5-3.5M12.834 7A5.833 5.833 0 1 1 1.167 7a5.833 5.833 0 0 1 11.667 0z"/>
            </svg>
            <h2>Added to Bag</h2>
          </div>
          <button 
            className="close-button" 
            aria-label="Close modal"
            onClick={onHide}
          >
            <svg 
              viewBox="0 0 18 18" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16.5 1.5L1.5 16.5M1.5 1.5L16.5 16.5"/>
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Product Item */}
          <div className="cart-item purchased-item">
            <div className="item-image">
              {console.log("product====>",product)}
              <img 
                src={product.images?.[0] || '/media/product/1.jpg'} 
                alt={product.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="placeholder-image" style={{ display: 'none' }}>
                <svg viewBox="0 0 100 100" fill="#e0e0e0">
                  <rect width="100" height="100" rx="5"/>
                </svg>
              </div>
            </div>
            <div className="item-details">
              <div className="item-info">
                <p className="item-name">{product.name}</p>
                <p className="item-price">
                  <strong>${product.price?.toFixed(2) || '0.00'}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {/* Secure Checkout Button */}
          <Link 
            to="/checkout" 
            className="btn-checkout"
            onClick={onHide}
          >
            <span>SECURE CHECKOUT<strong className="checkout-total"> ${cartTotal?.toFixed(2) || '0.00'}</strong></span>
          </Link>

          {/* View Shopping Bag Link */}
          <Link 
            to="/cart" 
            className="view-bag-link"
            onClick={onHide}
          >
            View Shopping Bag ({cartItemCount || 0})
          </Link>
        </div>
      </div>
    </>
  );
}

export default AddToCartModal;

