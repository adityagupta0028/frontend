import { Link, useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { useGetSingleProductQuery } from '../Services/ProductApi';
import { useAddToCartMutation, useGetCartQuery, useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from '../Services/CustomerApi';
import { addToCart, getLocalCart } from '../utils/cartService';
import { addToWishlist, removeFromWishlist, getLocalWishlist } from '../utils/wishlistService';
import { GetUrl } from '../config/GetUrl';
import AddToCartModal from '../components/AddToCartModal';
import { GoPlay } from "react-icons/go";
import { GoHeart, GoHeartFill } from "react-icons/go";

import './Details.css';

function Details() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMetalType, setSelectedMetalType] = useState('');
  const [selectedCaratWeight, setSelectedCaratWeight] = useState('');
  const [selectedDiamondQuality, setSelectedDiamondQuality] = useState('');
  const [selectedRingSize, setSelectedRingSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToCartError, setAddToCartError] = useState('');
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0); // Trigger to force cart recalculation

  // Cart API hook
  const [addToCartApi] = useAddToCartMutation();

  // Wishlist API hooks
  const [addToWishlistApi] = useAddToWishlistMutation();
  const [removeFromWishlistApi] = useRemoveFromWishlistMutation();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('customerToken');

  // Fetch cart from API if logged in
  const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
    pollingInterval: 30000, // Poll every 30 seconds to keep count updated
  });

  // Fetch wishlist from API if logged in
  const { data: wishlistData, refetch: refetchWishlist } = useGetWishlistQuery(undefined, {
    skip: !isLoggedIn,
  });

  // Fetch product details from API
  const {
    data: productData,
    isLoading,
    error
  } = useGetSingleProductQuery(id || '');

  // Process product data from API
  const product = useMemo(() => {
    if (productData?.data?.product) {
      const p = productData.data.product;

      // Process images
      const images = (p.images || []).map(img =>
        img.startsWith('http') ? img : `${GetUrl.IMAGE_URL}${img}`
      );

      // Process sizes and colors from variants
      const sizes = p.variants?.map(v => v.size).filter(Boolean) || [];
      const colors = p.variants?.map(v => v.color).filter(Boolean) || [];

      // Process metal types - combine from both product and variants
      //const metalTypesFromProduct = Array.isArray(p.metal_type) ? p.metal_type.filter(Boolean) : [];
      const metalTypesFromVariants = p.variants?.map(v => v.metal_type).filter(Boolean) || [];
      // Combine and remove duplicates
      const metalTypes = [...new Set([...metalTypesFromVariants])];

      // Process carat weights - combine from both product and variants
      const caratWeightsFromProduct = Array.isArray(p.carat_weight) ? p.carat_weight.filter(Boolean) : [];
      const caratWeightsFromVariants = p.variants?.map(v => v.carat_weight).filter(Boolean) || [];
      const caratWeights = [...new Set([...caratWeightsFromProduct, ...caratWeightsFromVariants])];

      // Process diamond quality - combine from both product and variants
      const diamondQualitiesFromProduct = Array.isArray(p.diamond_quality) ? p.diamond_quality.filter(Boolean) : [];
      const diamondQualitiesFromVariants = p.variants?.map(v => v.diamond_quality).filter(Boolean) || [];
      let diamondQualities = [...new Set([...diamondQualitiesFromProduct, ...diamondQualitiesFromVariants])];
      // If diamond_quality is empty, try to construct from color and clarity grades
      if (diamondQualities.length === 0 && (p.diamond_color_grade || p.diamond_clarity_grade)) {
        const qualityStr = `${p.diamond_color_grade || ''}${p.diamond_clarity_grade ? ', ' + p.diamond_clarity_grade : ''}`.trim();
        if (qualityStr) {
          diamondQualities.push(qualityStr);
        }
      }

      // Process ring sizes - combine from both product and variants
      const ringSizesFromProduct = Array.isArray(p.ring_size) ? p.ring_size.filter(Boolean) : [];
      const ringSizesFromVariants = p.variants?.map(v => v.ring_size).filter(Boolean) || [];
      const ringSizes = [...new Set([...ringSizesFromProduct, ...ringSizesFromVariants])];

      return {
        id: p._id || p.product_id,
        name: p.product_name || 'Product',
        description: p.description || '',
        shortDescription: p.short_description || '',
        price: p.discounted_price || p.original_price || 0,
        originalPrice: p.original_price || null,
        images: images.length > 0 ? images : ['/media/product/1.jpg'],
        sku: p.sku || 'N/A',
        category: p.category_name || 'Uncategorized',
        categoryId: p.category_id,
        tags: p.tags || [],
        rating: p.average_rating || 0,
        reviewCount: p.review_count || 0,
        sizes: sizes,
        colors: colors,
        metalTypes: metalTypes,
        caratWeights: caratWeights,
        diamondQualities: diamondQualities,
        ringSizes: ringSizes,
        inStock: p.in_stock !== false,
        additionalInfo: p.additional_information || {},
        reviews: p.reviews || [],
        variants: p.variants || []


      };
    }
    return null;
  }, [productData]);

  // Check if product is in wishlist
  const isProductInWishlist = useMemo(() => {
    if (!product || !product.id) return false;
    
    if (isLoggedIn && wishlistData?.data?.items) {
      return wishlistData.data.items.some(
        item => item.productId && item.productId.toString() === product.id.toString()
      );
    } else if (!isLoggedIn) {
      const localWishlist = getLocalWishlist();
      return localWishlist.some(item => item.productId === product.id);
    }
    return false;
  }, [isLoggedIn, wishlistData, product]);

  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      if (product.metalTypes.length > 0 && !selectedMetalType) {
        setSelectedMetalType(product.metalTypes[0]);
      }
      if (product.caratWeights.length > 0 && !selectedCaratWeight) {
        setSelectedCaratWeight(product.caratWeights[0]);
      }
      if (product.diamondQualities.length > 0 && !selectedDiamondQuality) {
        setSelectedDiamondQuality(product.diamondQualities[0]);
      }
      if (product.ringSizes.length > 0 && !selectedRingSize) {
        setSelectedRingSize(product.ringSizes[0]);
      }
    }
  }, [product, selectedSize, selectedColor, selectedMetalType, selectedCaratWeight, selectedDiamondQuality, selectedRingSize]);

  // Fallback product images if API fails
  const fallbackImages = [
    '/media/product/1.jpg',
    '/media/product/1-2.jpg',
    '/media/product/2.jpg',
    '/media/product/2-2.jpg',
    '/media/product/3.jpg',
  ];

  const productImages = product?.images || fallbackImages;

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  // Handle previous/next image navigation
  const handlePreviousImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAddToCartError('');
    setAddToCartLoading(true);

    if (!product || !product.id) {
      setAddToCartError('Product information is missing');
      setAddToCartLoading(false);
      return;
    }

    try {
      // Prepare selected variant object
      const selectedVariant = {
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
        ...(selectedMetalType && { metal_type: selectedMetalType }),
        ...(selectedCaratWeight && { carat_weight: selectedCaratWeight }),
        ...(selectedDiamondQuality && { diamond_quality: selectedDiamondQuality }),
        ...(selectedRingSize && { ring_size: selectedRingSize }),
      };

      // Prepare product data for cart
      const productData = {
        productId: product.id,
        product_id: product.sku || product.id,
        quantity: quantity,
        selectedVariant: selectedVariant,
        price: currentVariantPrice.originalPrice || currentVariantPrice.price || 0,
        discountedPrice: currentVariantPrice.originalPrice ? currentVariantPrice.price : null,
        engraving_text: '' // Can be added later if needed
      };

      // Use cart service to add item
      const result = await addToCart(productData, addToCartApi);

      if (result.success) {
        // Update cart data immediately (NO PAGE REFRESH)
        if (isLoggedIn && refetchCart) {
          // For logged-in users, refetch from API
          refetchCart();
        } else {
          // For guest users, trigger recalculation from localStorage
          setCartUpdateTrigger(prev => prev + 1);
        }
        // Dispatch custom event for other components (like Header) - NO PAGE REFRESH
        window.dispatchEvent(new Event('cartUpdated'));
        // Show success modal - React will batch updates and modal will get fresh cart data
        setShowAddToCartModal(true);
      } else {
        setAddToCartError('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddToCartError(error.data?.message || error.message || 'Failed to add item to cart. Please try again.');
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Calculate visible thumbnails (show 4 at a time)
  const getVisibleThumbnails = () => {
    const maxVisible = 4;
    const start = Math.max(0, Math.min(selectedImage - Math.floor(maxVisible / 2), productImages.length - maxVisible));
    const end = Math.min(start + maxVisible, productImages.length);
    return { start, end, thumbnails: productImages.slice(start, end) };
  };

  const { start: thumbnailStart, thumbnails } = getVisibleThumbnails();

  // Find matching variant and calculate price based on selected options
  const currentVariantPrice = useMemo(() => {
    if (!product || !product.variants || product.variants.length === 0) {
      return {
        price: product?.price || 0,
        originalPrice: product?.originalPrice || null
      };
    }

    // Find matching variant based on selected options
    const matchingVariant = product.variants.find(variant => {
      // Match all selected attributes
      const sizeMatch = !selectedSize || !variant.size || variant.size === selectedSize;
      const colorMatch = !selectedColor || !variant.color || variant.color === selectedColor;
      const metalTypeMatch = !selectedMetalType || !variant.metal_type ||
        String(variant.metal_type).toLowerCase() === String(selectedMetalType).toLowerCase();
      const caratWeightMatch = !selectedCaratWeight || !variant.carat_weight ||
        String(variant.carat_weight) === String(selectedCaratWeight);
      const diamondQualityMatch = !selectedDiamondQuality || !variant.diamond_quality ||
        String(variant.diamond_quality) === String(selectedDiamondQuality);
      const ringSizeMatch = !selectedRingSize || !variant.ring_size ||
        String(variant.ring_size) === String(selectedRingSize);

      return sizeMatch && colorMatch && metalTypeMatch && caratWeightMatch &&
        diamondQualityMatch && ringSizeMatch;
    });

    // If exact match found, use variant price
    if (matchingVariant) {
      return {
        price: matchingVariant.discounted_price || matchingVariant.price || matchingVariant.original_price || product.price || 0,
        originalPrice: matchingVariant.original_price || (matchingVariant.discounted_price && matchingVariant.price ? matchingVariant.price : null) || product.originalPrice || null
      };
    }

    // Try to find partial match (prioritize metal type if selected)
    if (selectedMetalType && product.variants.length > 0) {
      const metalTypeVariant = product.variants.find(v =>
        v.metal_type && String(v.metal_type).toLowerCase() === String(selectedMetalType).toLowerCase()
      );

      if (metalTypeVariant) {
        return {
          price: metalTypeVariant.discounted_price || metalTypeVariant.price || metalTypeVariant.original_price || product.price || 0,
          originalPrice: metalTypeVariant.original_price || (metalTypeVariant.discounted_price && metalTypeVariant.price ? metalTypeVariant.price : null) || product.originalPrice || null
        };
      }
    }

    // Fallback to base product price
    return {
      price: product.price || 0,
      originalPrice: product.originalPrice || null
    };
  }, [product, selectedSize, selectedColor, selectedMetalType, selectedCaratWeight, selectedDiamondQuality, selectedRingSize]);

  // Calculate cart total dynamically
  const cartTotal = useMemo(() => {
    const items = isLoggedIn && cartData?.data?.items ? cartData.data.items : (!isLoggedIn ? getLocalCart() : []);
    return items.reduce((total, item) => {
      const price = item.discountedPrice || item.price || 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  }, [isLoggedIn, cartData, cartUpdateTrigger]); // Include cartUpdateTrigger to force recalculation

  // Calculate cart item count dynamically
  const cartItemCount = useMemo(() => {
    if (isLoggedIn && cartData?.data?.items) {
      return cartData.data.items.reduce((total, item) => total + (item.quantity || 1), 0);
    } else if (!isLoggedIn) {
      const localCart = getLocalCart();
      return localCart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    return 0;
  }, [isLoggedIn, cartData, cartUpdateTrigger]); // Include cartUpdateTrigger to force recalculation

  // Listen for cart updates from other components (for guest users) - NO PAGE REFRESH
  useEffect(() => {
    if (!isLoggedIn) {
      const handleCartUpdate = () => {
        // Trigger recalculation by updating state - NO PAGE REFRESH
        setCartUpdateTrigger(prev => prev + 1);
      };
      window.addEventListener('cartUpdated', handleCartUpdate);
      return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }
  }, [isLoggedIn]);

  // Loading state
  if (isLoading) {
    return (
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div className="section-container">
              <div className="text-center" style={{ padding: '100px 0' }}>
                <p>Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div className="section-container">
              <div className="text-center" style={{ padding: '100px 0' }}>
                <p>Product not found or error loading product details.</p>
                <Link to="/shop" className="btn">Back to Shop</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render star rating
  const renderStars = (rating) => {
    // Ensure rating is a valid number between 0 and 5
    const validRating = Math.max(0, Math.min(5, rating || 0));
    const roundedRating = Math.round(validRating);

    // Always show rating, even if 0 (will show empty stars)
    return (
      <div className="rating mt-1" style={{ display: 'inline-block' }}>
        <div className={`star star-${roundedRating}`} style={{ display: 'inline-block' }}></div>
        {product.reviewCount > 0 ? (
          <div className="review-count" style={{ display: 'inline-block', marginLeft: '7.5pt' }}>
            ({product.reviewCount}<span> reviews</span>)
          </div>
        ) : (
          <div className="review-count" style={{ display: 'inline-block', marginLeft: '7.5pt', opacity: 0.6 }}>
            (No reviews yet)
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Page Title */}
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  {product.name}
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>
                <Link to="/shop">Shop</Link><span className="delimiter"></span>
                {product.name}
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div id="content" className="site-content" role="main">
            <div className="shop-details zoom">
              <div className="product-top-info">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="row">

                      {/* Product Images */}
                      <div className="product-images col-lg-7 col-md-12 col-12">
                        <div className="row">
                          {/* Thumbnail Slider */}
                          <div className="col-md-2">
                            <div className="content-thumbnail-scroll">
                              <div className="image-thumbnail react-thumbnail-slider">
                                {productImages.length > 4 && thumbnailStart > 0 && (
                                  <button
                                    className="thumbnail-nav-btn thumbnail-nav-up"
                                    onClick={() => {
                                      const newIndex = Math.max(0, selectedImage - 1);
                                      setSelectedImage(newIndex);
                                    }}
                                    aria-label="Previous thumbnail"
                                  >
                                    <i className="fa fa-chevron-up"></i>
                                  </button>
                                )}
                                <div className="thumbnail-list">

                                  <div className={`img-item slick-current active`}>
                                    <span
                                      className="img-thumbnail-scroll relative"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <GoPlay size={30} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl' />
                                      <video className='object-contain h-[140px]'>
                                        <source src="/assets/videos/ring.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    </span>
                                  </div>

                                  {thumbnails.map((image, idx) => {
                                    const actualIndex = thumbnailStart + idx;
                                    return (
                                      <div
                                        key={actualIndex}
                                        className={`img-item `} //${selectedImage === actualIndex ? 'slick-current active' : ''}
                                      >
                                        <span
                                          className="img-thumbnail-scroll"
                                          onClick={() => handleThumbnailClick(actualIndex)}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          <img
                                            width="600"
                                            height="600"
                                            src={image}
                                            alt={`Product ${actualIndex + 1}`}
                                            onError={(e) => {
                                              e.target.src = '/media/product/1.jpg';
                                            }}
                                          />
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                {productImages.length > 4 && thumbnailStart + thumbnails.length < productImages.length && (
                                  <button
                                    className="thumbnail-nav-btn thumbnail-nav-down"
                                    onClick={() => {
                                      const newIndex = Math.min(productImages.length - 1, selectedImage + 1);
                                      setSelectedImage(newIndex);
                                    }}
                                    aria-label="Next thumbnail"
                                  >
                                    <i className="fa fa-chevron-down"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Main Image */}
                          <div className="col-md-10">
                            <div className="scroll-image main-image h-full">
                              <div className="image-additional react-image-slider h-full">
                                <div className="main-image-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                  <video
                                    className='object-contain w-full h-full'
                                    width="900"
                                    height="900"
                                    loop
                                    muted
                                    playsInline
                                    controls
                                  >
                                    <source src="/assets/videos/ring.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                  {/* <img
                                    width="900"
                                    height="900"
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    title={product.name}
                                    onError={(e) => {
                                      e.target.src = '/media/product/1.jpg';
                                    }}
                                    style={{ width: '100%', height: 'auto' }}
                                  /> */}
                                  {productImages.length > 1 && (
                                    <>
                                      <button
                                        className="image-nav-btn image-nav-prev"
                                        onClick={handlePreviousImage}
                                        aria-label="Previous image"
                                      >
                                        <i className="fa fa-chevron-left"></i>
                                      </button>
                                      <button
                                        className="image-nav-btn image-nav-next"
                                        onClick={handleNextImage}
                                        aria-label="Next image"
                                      >
                                        <i className="fa fa-chevron-right"></i>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="product-info col-lg-5 col-md-12 col-12">
                        <h1 className="title mb-0">{product.name}</h1>
                        <small className='mb-[10px] block font-medium text-[#555]'>14K White Gold, E, VS1 | IGI Certified, 1 1/2 ct Center</small>
                        <div className='mb-[10px]'>
                        {product && renderStars(product.rating)}
                        </div>
                        <span className="price mb-0">
                          {currentVariantPrice.originalPrice && currentVariantPrice.originalPrice > currentVariantPrice.price ? (
                            <>
                              <ins className='font-bold mr-2'><span>${currentVariantPrice.price.toFixed(2)}</span></ins>
                              <del aria-hidden="true" className='!mr-[10px] !text-[16px]'><span>${currentVariantPrice.originalPrice.toFixed(2)}</span></del>
                            </>
                          ) : (
                            <ins><span>${currentVariantPrice.price.toFixed(2)}</span></ins>
                          )}
                        </span>
                        <div className="description !border-t border-black">
                          <p>{product.shortDescription || product.description || 'No description available.'}</p>
                        </div>

                        {/* Variations */}
                        {(product.sizes.length > 0 || product.colors.length > 0) && (
                          <div className="variations">
                            <table cellSpacing="0">
                              <tbody>
                                {product.sizes.length > 0 && (
                                  <tr>
                                    <td className="label">Size</td>
                                    <td className="attributes">
                                      <ul className="text">
                                        {product.sizes.map((size) => (
                                          <li key={size}>
                                            <span
                                              className={selectedSize === size ? 'selected' : ''}
                                              onClick={() => setSelectedSize(size)}
                                              style={{ cursor: 'pointer' }}
                                            >{size}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                )}
                                {product.colors.length > 0 && (
                                  <tr>
                                    <td className="label">Color</td>
                                    <td className="attributes">
                                      <ul className="colors">
                                        {product.colors.map((color, index) => (
                                          <li key={color || index}>
                                            <span
                                              className={`color-${index + 1} ${selectedColor === color ? 'selected' : ''}`}
                                              onClick={() => setSelectedColor(color)}
                                              style={{ cursor: 'pointer' }}
                                              title={color}
                                            ></span>
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Metal Type Selection */}
                        {product.metalTypes.length > 0 && (
                          <div className="variations" style={{ marginTop: '20px' }}>
                            <table cellSpacing="0">
                              <tbody>
                                <tr className='!block'>
                                  <td className="label block !w-full !tracking-[1px] !font-bold mb-1">Metal Type</td>
                                  <td className="attributes">
                                    <ul className="metals !px-[5px]">
                                      {product.metalTypes.map((metal) => {
                                        // Determine metal class based on metal type
                                        const metalLower = metal.toLowerCase();
                                        let metalClass = '';
                                        if (metalLower.includes('white gold') || metalLower.includes('platinum')) {
                                          metalClass = 'metal-white-gold';
                                        } else if (metalLower.includes('yellow gold')) {
                                          metalClass = 'metal-yellow-gold';
                                        } else if (metalLower.includes('rose gold')) {
                                          metalClass = 'metal-rose-gold';
                                        }

                                        return (
                                          <li key={metal} title={metal}>
                                            <span
                                              className={`!rounded-none !h-[25px] ${metalClass} ${selectedMetalType === metal ? 'outline outline-offset-[3px]' : ''}`}
                                              onClick={() => setSelectedMetalType(metal)}
                                              style={{ cursor: 'pointer' }}
                                            ></span>
                                            <div style={{ fontSize: '11px', marginTop: '5px', textAlign: 'center', maxWidth: '50px' }}>
                                              {metal.replace(/^\d+K\s*/, '').substring(0, 8)}
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Carat Weight Selection */}
                        {product.caratWeights.length > 0 && (
                          <div className="variations" style={{ marginTop: '20px' }}>
                            <table cellSpacing="0">
                              <tbody>
                                <tr>
                                  <td className="label block !w-full !tracking-[1px] !font-bold mb-1">
                                    Carat Weight
                                    <i className="fa fa-info-circle" style={{ marginLeft: '5px', cursor: 'help' }} title="Select the carat weight for your diamond"></i>
                                  </td>
                                  <td className="attributes">
                                    <ul className="text">
                                      {product.caratWeights.map((carat) => {
                                        const isSelected = selectedCaratWeight === carat || String(selectedCaratWeight) === String(carat);
                                        const displayValue = typeof carat === 'number' && carat < 1
                                          ? `${carat} ct`
                                          : `${carat} ctw`;
                                        return (
                                          <li key={carat}>
                                            <span
                                              className={`!rounded-none !outline !outline-offset-[3px] !h-[35px] !w-[90px] !flex items-center justify-center p-0 ${isSelected ? 'selected' : ''}`}
                                              onClick={() => setSelectedCaratWeight(carat)}
                                              style={{ cursor: 'pointer' }}
                                            >{displayValue}</span>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Diamond Quality Selection */}
                        {product.diamondQualities.length > 0 && (
                          <div className="variations" style={{ marginTop: '20px' }}>
                            <table cellSpacing="0">
                              <tbody>
                                <tr>
                                  <td className="label block !w-full !tracking-[1px] !font-bold mb-1">
                                    Diamond Quality
                                    <i className="fa fa-info-circle" style={{ marginLeft: '5px', cursor: 'help' }} title="Select the diamond quality grade"></i>
                                  </td>
                                  <td className="attributes">
                                    <ul className="text">
                                      {product.diamondQualities.map((quality, index) => (
                                        <li key={quality || index}>
                                          <span
                                            className={`!rounded-none  !h-[35px] !w-[90px] !flex items-center justify-center p-0 ${selectedDiamondQuality === quality ? 'selected' : ''}`}
                                            onClick={() => setSelectedDiamondQuality(quality)}
                                            style={{ cursor: 'pointer' }}
                                          >{quality}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Ring Size Selection */}
                        {product.ringSizes.length > 0 && (
                          <div className="variations" style={{ marginTop: '20px' }}>
                            <table cellSpacing="0">
                              <tbody>
                                <tr>
                                  <td className="label block !w-full !tracking-[1px] !font-bold mb-1">
                                    Ring Size
                                    <a href="#" onClick={(e) => { e.preventDefault(); }} style={{ marginLeft: '10px', fontSize: '12px', textDecoration: 'underline' }}>Find Ring Size</a>
                                  </td>
                                  <td className="attributes">
                                    <select
                                      value={selectedRingSize}
                                      onChange={(e) => setSelectedRingSize(e.target.value)}
                                      style={{
                                        padding: '8px 12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        minWidth: '120px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {product.ringSizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Add to Cart Section */}
                        <div className="buttons">
                          <div className="add-to-cart-wrap">
                            <div className="quantity">
                              <button
                                type="button"
                                className="plus"
                                onClick={() => handleQuantityChange(1)}
                              >+</button>
                              <input
                                type="number"
                                className="qty"
                                step="1"
                                min="1"
                                name="quantity"
                                value={quantity}
                                title="Qty"
                                size="4"
                                placeholder=""
                                inputMode="numeric"
                                autoComplete="off"
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 1;
                                  setQuantity(val >= 1 ? val : 1);
                                }}
                              />
                              <button
                                type="button"
                                className="minus"
                                onClick={() => handleQuantityChange(-1)}
                              >-</button>
                            </div>
                            <div className="btn-add-to-cart">
                              {addToCartError && (
                                <div style={{
                                  color: '#c33',
                                  fontSize: '14px',
                                  marginBottom: '10px',
                                  padding: '8px',
                                  backgroundColor: '#fee',
                                  borderRadius: '4px'
                                }}>
                                  {addToCartError}
                                </div>
                              )}
                              <a
                                href="#"
                                tabIndex="0"
                                onClick={handleAddToCart}
                                style={{
                                  opacity: addToCartLoading ? 0.6 : 1,
                                  pointerEvents: addToCartLoading ? 'none' : 'auto',
                                  cursor: addToCartLoading ? 'wait' : 'pointer'
                                }}
                              >
                                {addToCartLoading ? 'Adding...' : 'Add to cart'}
                              </a>
                            </div>
                          </div>
                          <div className="btn-quick-buy" data-title="Buy It Now">
                            <button
                              className="product-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                // TODO: Implement quick buy functionality
                                console.log('Quick buy:', {
                                  productId: product.id,
                                  quantity,
                                  size: selectedSize,
                                  color: selectedColor,
                                  metalType: selectedMetalType,
                                  caratWeight: selectedCaratWeight,
                                  diamondQuality: selectedDiamondQuality,
                                  ringSize: selectedRingSize
                                });
                              }}
                            >
                              Buy It Now
                            </button>
                          </div>
                          <div className="btn-wishlist" data-title="Wishlist">
                            <button
                              className="product-btn"
                              onClick={async (e) => {
                                e.preventDefault();
                                if (!product || !product.id) return;

                                const selectedVariant = {
                                  ...(selectedSize && { size: selectedSize }),
                                  ...(selectedColor && { color: selectedColor }),
                                  ...(selectedMetalType && { metal_type: selectedMetalType }),
                                  ...(selectedCaratWeight && { carat_weight: selectedCaratWeight }),
                                  ...(selectedDiamondQuality && { diamond_quality: selectedDiamondQuality }),
                                  ...(selectedRingSize && { ring_size: selectedRingSize }),
                                };

                                try {
                                  if (isProductInWishlist) {
                                    // Remove from wishlist
                                    await removeFromWishlist(product.id, removeFromWishlistApi);
                                    if (isLoggedIn && refetchWishlist) {
                                      refetchWishlist();
                                    }
                                    window.dispatchEvent(new Event('wishlistUpdated'));
                                  } else {
                                    // Add to wishlist
                                    // Use currentVariantPrice which is already calculated
                                    const productData = {
                                      productId: product.id,
                                      product_id: product.sku || product.id,
                                      selectedVariant,
                                      // Include product metadata for localStorage
                                      productName: product.name || '',
                                      productPrice: currentVariantPrice.price || product.price || 0,
                                      productOriginalPrice: currentVariantPrice.originalPrice || product.originalPrice || null,
                                      productImage: product.image || (product.images && product.images.length > 0 ? product.images[0] : '')
                                    };
                                    await addToWishlist(productData, addToWishlistApi);
                                    if (isLoggedIn && refetchWishlist) {
                                      refetchWishlist();
                                    }
                                    window.dispatchEvent(new Event('wishlistUpdated'));
                                  }
                                } catch (error) {
                                  console.error('Error updating wishlist:', error);
                                }
                              }}
                            >
                              {isProductInWishlist ? (
                                <>
                                  <GoHeartFill className="inline mr-2" /> Remove from wishlist
                                </>
                              ) : (
                                <>
                                  <GoHeart className="inline mr-2" /> Add to wishlist
                                </>
                              )}
                            </button>
                          </div>
                          <div className="btn-compare" data-title="Compare">
                            <button
                              className="product-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                // TODO: Implement compare functionality
                                console.log('Compare:', product.id);
                              }}
                            >
                              Compare
                            </button>
                          </div>
                        </div>

                        {/* Product Meta */}
                        <div className="product-meta">
                          <span className="sku-wrapper">SKU: <span className="sku">{product.sku}</span></span>
                          {product.categoryId && (
                            <span className="posted-in">
                              Category: <Link to={`/shop?category=${product.categoryId}`} rel="tag">{product.category}</Link>
                            </span>
                          )}
                          {product.tags.length > 0 && (
                            <span className="tagged-as">
                              Tags: {product.tags.map((tag, index) => (
                                <span key={tag}>
                                  <Link to={`/shop?tag=${tag}`} rel="tag">{tag}</Link>
                                  {index < product.tags.length - 1 && ', '}
                                </span>
                              ))}
                            </span>
                          )}
                        </div>

                        {/* Social Share */}
                        <div className="social-share">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            title="Facebook"
                            className="share-facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-facebook"></i>Facebook
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                            title="Twitter"
                            className="share-twitter"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-twitter"></i>Twitter
                          </a>
                          <a
                            href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(productImages[0])}`}
                            title="Pinterest"
                            className="share-pinterest"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-pinterest"></i>Pinterest
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Tabs */}
              <div className="product-tabs">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="product-tabs-wrap">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setActiveTab('description'); }}
                            role="tab"
                            style={{ cursor: 'pointer' }}
                          >
                            Description
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeTab === 'additional-information' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setActiveTab('additional-information'); }}
                            role="tab"
                            style={{ cursor: 'pointer' }}
                          >
                            Additional information
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setActiveTab('reviews'); }}
                            role="tab"
                            style={{ cursor: 'pointer' }}
                          >
                            Reviews ({product.reviewCount || 0})
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        {activeTab === 'description' && (
                          <div className="tab-pane fade show active" id="description" role="tabpanel">
                            <p>{product.description || 'No description available.'}</p>
                          </div>
                        )}
                        {activeTab === 'additional-information' && (
                          <div className="tab-pane fade show active" id="additional-information" role="tabpanel">
                            <table className="product-attributes">
                              <tbody>
                                {Object.entries(product.additionalInfo).map(([key, value]) => (
                                  <tr key={key} className="attribute-item">
                                    <th className="attribute-label">{key}</th>
                                    <td className="attribute-value">{String(value)}</td>
                                  </tr>
                                ))}
                                {Object.keys(product.additionalInfo).length === 0 && (
                                  <tr>
                                    <td colSpan="2">No additional information available.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {activeTab === 'reviews' && (
                          <div className="tab-pane fade show active" id="reviews" role="tabpanel">
                            <div id="reviews" className="product-reviews">
                              <div id="comments">
                                <h2 className="reviews-title">
                                  {product.reviewCount || 0} review{product.reviewCount !== 1 ? 's' : ''} for <span>{product.name}</span>
                                </h2>
                                {product.reviews && product.reviews.length > 0 ? (
                                  <ol className="comment-list">
                                    {product.reviews.map((review, index) => (
                                      <li key={review.id || index} className="review">
                                        <div className="content-comment-container">
                                          <div className="comment-container">
                                            <img
                                              src={review.avatar || "/media/user.jpg"}
                                              className="avatar"
                                              height="60"
                                              width="60"
                                              alt={review.author || 'User'}
                                            />
                                            <div className="comment-text">
                                              <div className="rating small">
                                                <div className={`star star-${Math.round(review.rating || 0)}`}></div>
                                              </div>
                                              <div className="review-author">{review.author || 'Anonymous'}</div>
                                              <div className="review-time">{review.date || 'N/A'}</div>
                                            </div>
                                          </div>
                                          <div className="description">
                                            <p>{review.comment || review.text || 'No comment provided.'}</p>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ol>
                                ) : (
                                  <p>No reviews yet. Be the first to review this product!</p>
                                )}
                              </div>
                              <div id="review-form">
                                <div id="respond" className="comment-respond">
                                  <span id="reply-title" className="comment-reply-title">Add a review</span>
                                  <form
                                    action="#"
                                    method="post"
                                    id="comment-form"
                                    className="comment-form"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      // TODO: Implement review submission
                                      console.log('Submit review');
                                    }}
                                  >
                                    <p className="comment-notes">
                                      <span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
                                    </p>
                                    <div className="comment-form-rating">
                                      <label htmlFor="rating">Your rating</label>
                                      <p className="stars">
                                        <span>
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <a
                                              key={star}
                                              className={`star-${star}`}
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                // TODO: Set rating state
                                                console.log('Rating:', star);
                                              }}
                                            >
                                              {star}
                                            </a>
                                          ))}
                                        </span>
                                      </p>
                                    </div>
                                    <p className="comment-form-comment">
                                      <textarea
                                        id="comment"
                                        name="comment"
                                        placeholder="Your Reviews *"
                                        cols="45"
                                        rows="8"
                                        required
                                      ></textarea>
                                    </p>
                                    <div className="content-info-reviews">
                                      <p className="comment-form-author">
                                        <input
                                          id="author"
                                          name="author"
                                          placeholder="Name *"
                                          type="text"
                                          size="30"
                                          required
                                        />
                                      </p>
                                      <p className="comment-form-email">
                                        <input
                                          id="email"
                                          name="email"
                                          placeholder="Email *"
                                          type="email"
                                          size="30"
                                          required
                                        />
                                      </p>
                                      <p className="form-submit">
                                        <input
                                          name="submit"
                                          type="submit"
                                          id="submit"
                                          className="submit"
                                          value="Submit"
                                        />
                                      </p>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="clear"></div>
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

      {/* Add to Cart Modal */}
      <AddToCartModal
        show={showAddToCartModal}
        onHide={() => setShowAddToCartModal(false)}
        product={{
          name: product.name,
          price: currentVariantPrice.price,
          images: product.images
        }}
        quantity={quantity}
        cartTotal={cartTotal}
        cartItemCount={cartItemCount}
      />
    </div>
  );
}

export default Details;
