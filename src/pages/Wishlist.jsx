import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useGetWishlistQuery, useRemoveFromWishlistMutation, useAddToCartMutation, useGetCartQuery } from '../Services/CustomerApi';
import { useGetSingleProductQuery } from '../Services/ProductApi';
import { getLocalWishlist, removeFromWishlist } from '../utils/wishlistService';
import { addToCart, getLocalCart } from '../utils/cartService';
import { GetUrl } from '../config/GetUrl';
import AddToCartModal from '../components/AddToCartModal';
import './Wishlist.css';

function Wishlist() {
  const [activeTab, setActiveTab] = useState('all');
  const [wishlistUpdateTrigger, setWishlistUpdateTrigger] = useState(0);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('customerToken');

  // Fetch wishlist from API if logged in
  const { data: wishlistData, refetch: refetchWishlist } = useGetWishlistQuery(undefined, {
    skip: !isLoggedIn,
  });

  // Fetch cart from API if logged in
  const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  // Mutations
  const [removeFromWishlistApi] = useRemoveFromWishlistMutation();
  const [addToCartApi] = useAddToCartMutation();

  // Get cart items (from API or localStorage)
  const cartItems = useMemo(() => {
    if (isLoggedIn && cartData?.data?.items) {
      return cartData.data.items || [];
    } else if (!isLoggedIn) {
      return getLocalCart();
    }
    return [];
  }, [isLoggedIn, cartData, cartUpdateTrigger]);

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice || item.price || 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  }, [cartItems]);

  // Calculate cart item count
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  // Get wishlist items (from API or localStorage)
  const wishlistItems = useMemo(() => {
    if (isLoggedIn && wishlistData?.data?.items) {
      return wishlistData.data.items || [];
    } else if (!isLoggedIn) {
      return getLocalWishlist();
    }
    return [];
  }, [isLoggedIn, wishlistData, wishlistUpdateTrigger]);

  // Group wishlist items by category
  const groupedWishlist = useMemo(() => {
    const groups = {
      engagement: [],
      wedding: [],
      jewellery: [],
      other: []
    };

    wishlistItems.forEach(item => {
      const productId = item.productId?._id || item.productId;
      if (!productId) return;

      // Try to determine category from product data or category name
      const categoryName = item.productId?.categoryId?.category_name?.toLowerCase() || 
                         item.productId?.category_name?.toLowerCase() || '';
      
      if (categoryName.includes('engagement')) {
        groups.engagement.push(item);
      } else if (categoryName.includes('wedding')) {
        groups.wedding.push(item);
      } else if (categoryName.includes('jewelry') || categoryName.includes('jewellery')) {
        groups.jewellery.push(item);
      } else {
        groups.other.push(item);
      }
    });

    return groups;
  }, [wishlistItems]);

  // Calculate counts
  const counts = useMemo(() => {
    return {
      all: wishlistItems.length,
      engagement: groupedWishlist.engagement.length,
      wedding: groupedWishlist.wedding.length,
      jewellery: groupedWishlist.jewellery.length
    };
  }, [wishlistItems, groupedWishlist]);

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId, removeFromWishlistApi);
      if (isLoggedIn && refetchWishlist) {
        refetchWishlist();
      } else {
        setWishlistUpdateTrigger(prev => prev + 1);
      }
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (item) => {
    try {
      const productId = item.productId?._id || item.productId;
      if (!productId) return;

      // Get product details for modal
      const product = item.productId;
      let productName, productPrice, productImage;
      
      if (product && typeof product === 'object' && product.product_name) {
        // Logged-in user - product is populated
        productName = product.product_name;
        productPrice = getProductPrice(product, item.selectedVariant || {});
        productImage = getProductImage(product);
      } else {
        // Guest user - use stored metadata
        productName = item.productName || 'Product';
        const storedPrice = Number(item.productPrice) || 0;
        const storedOriginalPrice = Number(item.productOriginalPrice) || 0;
        productPrice = storedPrice > 0 ? storedPrice : (storedOriginalPrice > 0 ? storedOriginalPrice : 0);
        productImage = item.productImage ? getImageUrl(item.productImage) : '/media/product/1.jpg';
      }

      const productData = {
        productId,
        product_id: item.product_id || item.productId?.product_id || '',
        quantity: 1,
        selectedVariant: item.selectedVariant || {},
        price: productPrice,
        discountedPrice: item.productId?.discounted_price || null
      };

      const result = await addToCart(productData, addToCartApi);
      
      if (result.success) {
        // Update cart data
        if (isLoggedIn && refetchCart) {
          refetchCart();
        } else {
          setCartUpdateTrigger(prev => prev + 1);
        }
        
        // Set selected product for modal
        setSelectedProduct({
          name: productName,
          price: productPrice,
          images: [productImage]
        });
        
        // Show modal
        setShowAddToCartModal(true);
        
        // Dispatch cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Get image URL helper
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/media/product/1.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${GetUrl.IMAGE_URL}${imageUrl}`;
  };

  // Get product image
  const getProductImage = (product) => {
    if (!product) return '/media/product/1.jpg';
    if (product.images && product.images.length > 0) {
      return getImageUrl(product.images[0]);
    }
    if (product.image) {
      return getImageUrl(product.image);
    }
    return '/media/product/1.jpg';
  };

  // Get product price - handle variants if selectedVariant is provided
  const getProductPrice = (product, selectedVariant = {}) => {
    if (!product) return 0;
    
    // If product has variants and selectedVariant is provided, find matching variant
    if (product.variants && product.variants.length > 0 && selectedVariant && Object.keys(selectedVariant).length > 0) {
      const matchingVariant = product.variants.find(variant => {
        const metalMatch = !selectedVariant.metal_type || !variant.metal_type ||
          String(variant.metal_type).toLowerCase() === String(selectedVariant.metal_type).toLowerCase();
        const caratMatch = !selectedVariant.carat_weight || !variant.carat_weight ||
          String(variant.carat_weight) === String(selectedVariant.carat_weight);
        return metalMatch && caratMatch;
      });
      
      if (matchingVariant) {
        return matchingVariant.discounted_price || matchingVariant.price || matchingVariant.original_price || product.discounted_price || product.original_price || 0;
      }
    }
    
    // Fallback to product price
    return product.discounted_price || product.original_price || 0;
  };

  // Render product card
  const renderProductCard = (item) => {
    // Handle both cases: populated product (logged-in) or stored metadata (localStorage)
    const product = item.productId;
    const productId = product?._id || item.productId;
    
    // For logged-in users, product is populated object
    // For localStorage, we have stored metadata
    let productName, productImage, productPrice;
    
    if (product && typeof product === 'object' && product.product_name) {
      // Logged-in user - product is populated
      productName = product.product_name;
      productImage = getProductImage(product);
      // Calculate price based on selected variant if available
      productPrice = getProductPrice(product, item.selectedVariant || {});
      
      // If price is still 0, try to get from product base price
      if (productPrice === 0) {
        productPrice = product.discounted_price || product.original_price || 
                      (product.variants && product.variants.length > 0 && product.variants[0]?.price) || 
                      (product.variants && product.variants.length > 0 && product.variants[0]?.discounted_price) ||
                      (product.variants && product.variants.length > 0 && product.variants[0]?.original_price) || 0;
      }
    } else {
      // Guest user - use stored metadata
      productName = item.productName || 'Product';
      productImage = item.productImage ? getImageUrl(item.productImage) : '/media/product/1.jpg';
      // Use stored price, prefer productPrice over productOriginalPrice
      // Convert to number and check if price exists and is greater than 0
      const storedPrice = Number(item.productPrice) || 0;
      const storedOriginalPrice = Number(item.productOriginalPrice) || 0;
      
      if (storedPrice > 0) {
        productPrice = storedPrice;
      } else if (storedOriginalPrice > 0) {
        productPrice = storedOriginalPrice;
      } else {
        // If no price stored, default to 0
        productPrice = 0;
      }
    }

    return (
      <div key={item._id || item.tempId || productId} className="wishlist-product-card">
        <div className="product-image-wrapper">
          <Link to={`/product/details/${productId}`}>
            <img 
              src={productImage}
              alt={productName}
              className="product-image"
              onError={(e) => {
                e.target.src = '/media/product/1.jpg';
              }}
            />
          </Link>
          <div className="product-actions">
            <button 
              className="action-icon"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFromWishlist(productId);
              }}
              title="Remove from wishlist"
            >
              <GoHeartFill className="text-red-500" />
            </button>
          </div>
        </div>
        <div className="product-info">
          <Link to={`/product/details/${productId}`} className='product_title'>
            <h3 className="product-name">{productName}</h3>
          </Link>
          <p className="product-price">
            {productPrice > 0 ? `$${productPrice.toLocaleString()}` : 'Price not available'}
          </p>
          <button 
            className="complete-ring-btn"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(item);
            }}
          >
            Add To Bag
          </button>
        </div>
      </div>
    );
  };

  // Render section
  const renderSection = (title, items, showIfEmpty = false) => {
    if (!showIfEmpty && items.length === 0) return null;

    return (
      <div className="wishlist-section">
        {items.length > 0 && <h2 className="section-title">{title}</h2>}
        {items.length > 0 ? (
          <div className="wishlist-products">
            {items.map(item => renderProductCard(item))}
            {/* Promotional Card - only show for engagement rings */}
            {title === 'Engagement Rings' && (
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
              </div>
            )}
          </div>
        ) : (
          <div className="empty-wishlist">
            <p>No {title.toLowerCase()} in your wishlist.</p>
          </div>
        )}
      </div>
    );
  };

  // Get customer name
  const customerName = useMemo(() => {
    if (isLoggedIn) {
      const customerData = localStorage.getItem('customerData');
      if (customerData) {
        try {
          const parsed = JSON.parse(customerData);
          return parsed.name || parsed.firstName || 'Your';
        } catch (e) {
          return 'Your';
        }
      }
    }
    return 'Your';
  }, [isLoggedIn]);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (isLoggedIn && refetchCart) {
        refetchCart();
      } else {
        setCartUpdateTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [isLoggedIn, refetchCart]);

  return (
    <>
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
            <h1 className="wishlist-title">{customerName}'s Wish List</h1>
            <button className="share-wishlist-btn">
              Share Wish List
              <IoMailOutline className='text-2xl' />
            </button>
          </div>

          {/* Category Tabs */}
          {wishlistItems.length > 0 && (
            <div className="wishlist-tabs">
              <div className='wishlist-tabs-buttons'>
                <button 
                  className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  View All ({counts.all})
                </button>
                {counts.engagement > 0 && (
                  <button 
                    className={`tab-btn ${activeTab === 'engagement' ? 'active' : ''}`}
                    onClick={() => setActiveTab('engagement')}
                  >
                    Engagement Rings ({counts.engagement})
                  </button>
                )}
                {counts.wedding > 0 && (
                  <button 
                    className={`tab-btn ${activeTab === 'wedding' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wedding')}
                  >
                    Wedding Rings ({counts.wedding})
                  </button>
                )}
                {counts.jewellery > 0 && (
                  <button 
                    className={`tab-btn ${activeTab === 'jewellery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jewellery')}
                  >
                    Jewellery ({counts.jewellery})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {wishlistItems.length === 0 && (
            <div className="empty-wishlist-container">
              <div className="empty-wishlist">
                <GoHeart size={64} className="empty-wishlist-icon" />
                <h2>Your wishlist is empty</h2>
                <p>Start adding products you love to your wishlist!</p>
                <Link to="/shop" className="shop-now-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          )}

          {/* Engagement Rings Section */}
          {(activeTab === 'all' || activeTab === 'engagement') && 
            renderSection('Engagement Rings', groupedWishlist.engagement, activeTab === 'engagement')
          }

          {/* Wedding Rings Section */}
          {(activeTab === 'all' || activeTab === 'wedding') && 
            renderSection('Wedding Rings', groupedWishlist.wedding, activeTab === 'wedding')
          }

          {/* Jewellery Section */}
          {(activeTab === 'all' || activeTab === 'jewellery') && 
            renderSection('Jewellery', groupedWishlist.jewellery, activeTab === 'jewellery')
          }

          {/* Other Items Section */}
          {activeTab === 'all' && groupedWishlist.other.length > 0 && 
            renderSection('Other Items', groupedWishlist.other)
          }
        </div>
      </div>
    </div>

    {/* Add to Cart Modal */}
    {selectedProduct && (
      <AddToCartModal
        show={showAddToCartModal}
        onHide={() => {
          setShowAddToCartModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        quantity={1}
        cartTotal={cartTotal}
        cartItemCount={cartItemCount}
      />
    )}
    </>
  );
}

export default Wishlist;
