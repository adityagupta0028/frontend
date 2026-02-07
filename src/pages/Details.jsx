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
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedDiamondType, setSelectedDiamondType] = useState('');
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

      // Process shapes from variants
      const shapesFromVariants = p.variants?.map(v => v.shape).filter(Boolean) || [];
      const shapes = [...new Set(shapesFromVariants)];

      // Process styles from variants (if available) or use design_styles
      const stylesFromVariants = p.variants?.map(v => v.style).filter(Boolean) || [];
      const stylesFromProduct = Array.isArray(p.design_styles) ? p.design_styles.filter(Boolean) :
        (p.design_styles ? [p.design_styles] : []);
      const styles = [...new Set([...stylesFromVariants, ...stylesFromProduct])];
      // Default styles if none found
      const defaultStyles = styles.length > 0 ? styles : ['Pavé', 'Hidden Halo'];

      // Process diamond types from variants
      const diamondTypesFromVariants = p.variants?.map(v => v.diamond_type).filter(Boolean) || [];
      const diamondTypesFromProduct = Array.isArray(p.diamond_origin) ? p.diamond_origin.map(origin =>
        origin.toLowerCase().includes('lab') ? 'Lab' : 'Natural'
      ) : (p.diamond_origin ? [p.diamond_origin.toLowerCase().includes('lab') ? 'Lab' : 'Natural'] : []);
      const diamondTypes = [...new Set([...diamondTypesFromVariants, ...diamondTypesFromProduct])];
      // Default diamond types if none found
      const defaultDiamondTypes = diamondTypes.length > 0 ? diamondTypes : ['Lab', 'Natural'];

      // Get current selected variant info for subtitle
      const currentMetal = metalTypes.length > 0 ? metalTypes[0] : '';
      const currentDiamondType = defaultDiamondTypes.length > 0 ? defaultDiamondTypes[0] : '';
      const currentCarat = caratWeights.length > 0 ? caratWeights[0] : '';
      const currentQuality = diamondQualities.length > 0 ? diamondQualities[0] : '';
      const currentShape = shapes.length > 0 ? shapes[0] : '';

      return {
        id: p._id || p.product_id,
        name: p.product_name || 'Product',
        description: p.description || '',
        shortDescription: p.short_description || '',
        price: p.discounted_price || p.original_price || 0,
        originalPrice: p.original_price || null,
        images: images.length > 0 ? images : ['/media/product/1.jpg'],
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
        shapes: shapes,
        styles: defaultStyles,
        diamondTypes: defaultDiamondTypes,
        inStock: p.in_stock !== false,
        additionalInfo: p.additional_information || {},
        reviews: p.reviews || [],
        variants: p.variants || [],
        matchingBandAvailable: p.matching_band_available || false,
        diamondColorGrade: p.diamond_color_grade || '',
        diamondClarityGrade: p.diamond_clarity_grade || '',
        // Product Information fields
        sku: p.sku || p.product_id || 'N/A',
        sizesAvailable: p.ring_size && Array.isArray(p.ring_size) && p.ring_size.length > 0
          ? `${Math.min(...p.ring_size)} To ${Math.max(...p.ring_size)}`
          : (p.ring_size ? String(p.ring_size) : 'N/A'),
        metal: selectedMetalType || (p.metal_type && Array.isArray(p.metal_type) ? p.metal_type[0] : (p.metal_type || 'N/A')),
        diamondClarity: p.diamond_clarity_grade || (p.diamond_quality && Array.isArray(p.diamond_quality) ? p.diamond_quality[0]?.split(',')[1]?.trim() : '') || 'N/A',
        diamondColor: p.diamond_color_grade || (p.diamond_quality && Array.isArray(p.diamond_quality) ? p.diamond_quality[0]?.split(',')[0]?.replace(/Best|Better|Good/gi, '').trim() : '') || 'N/A',
        diamondType: selectedDiamondType || (p.diamond_origin && Array.isArray(p.diamond_origin) ? (p.diamond_origin[0]?.toLowerCase().includes('lab') ? 'Lab' : 'Natural') : (p.diamond_origin ? (p.diamond_origin.toLowerCase().includes('lab') ? 'Lab' : 'Natural') : 'N/A')),
        lab: p.lab || p.certification_lab || 'IGI',
        centerDiamondCut: p.center_stone_diamond_quality || p.center_diamond_cut || 'Rare Carat Ideal',
        centerDiamondColor: p.center_stone_color || p.diamond_color_grade || 'F',
        centerDiamondClarity: p.center_stone_clarity || p.diamond_clarity_grade || 'VS+',
        centerDiamondShape: selectedShape || (p.center_stone_shape || (p.shapes && p.shapes.length > 0 ? p.shapes[0] : 'Round')),
        centerCarat: selectedCaratWeight || (p.carat_weight && Array.isArray(p.carat_weight) ? p.carat_weight[0] : (p.carat_weight || p.center_stone_min_weight || '1')),
        numberOfDiamonds: p.number_of_diamonds || p.side_stone_quantity || '24',
        totalCaratWeightMin: p.total_carat_weight_min || p.side_stone_total_carat || '0.3',
        // For subtitle
        currentMetal,
        currentDiamondType,
        currentCarat,
        currentQuality,
        currentShape
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
      if (product.shapes && product.shapes.length > 0 && !selectedShape) {
        setSelectedShape(product.shapes[0]);
      }
      if (product.styles && product.styles.length > 0 && !selectedStyle) {
        setSelectedStyle(product.styles[0]);
      }
      if (product.diamondTypes && product.diamondTypes.length > 0 && !selectedDiamondType) {
        setSelectedDiamondType(product.diamondTypes[0]);
      }
    }
  }, [product, selectedSize, selectedColor, selectedMetalType, selectedCaratWeight, selectedDiamondQuality, selectedRingSize, selectedShape, selectedStyle, selectedDiamondType]);

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
        ...(selectedShape && { shape: selectedShape }),
        ...(selectedStyle && { style: selectedStyle }),
        ...(selectedDiamondType && { diamond_type: selectedDiamondType }),
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
      const shapeMatch = !selectedShape || !variant.shape ||
        String(variant.shape) === String(selectedShape);
      const styleMatch = !selectedStyle || !variant.style ||
        String(variant.style) === String(selectedStyle);
      const diamondTypeMatch = !selectedDiamondType || !variant.diamond_type ||
        String(variant.diamond_type).toLowerCase() === String(selectedDiamondType).toLowerCase();

      return sizeMatch && colorMatch && metalTypeMatch && caratWeightMatch &&
        diamondQualityMatch && ringSizeMatch && shapeMatch && styleMatch && diamondTypeMatch;
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
  }, [product, selectedSize, selectedColor, selectedMetalType, selectedCaratWeight, selectedDiamondQuality, selectedRingSize, selectedShape, selectedStyle, selectedDiamondType]);

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

  // Calculate dynamic product information based on selected values
  const dynamicProductInfo = useMemo(() => {
    if (!product) return null;

    // Get sizes available
    const sizesAvailable = product.ringSizes && product.ringSizes.length > 0
      ? `${Math.min(...product.ringSizes)} To ${Math.max(...product.ringSizes)}`
      : (product.sizesAvailable || 'N/A');

    // Get metal - use selected or default
    const metal = selectedMetalType || product.metal || 'N/A';

    // Get diamond clarity - use selected quality or default
    const diamondClarity = selectedDiamondQuality
      ? (selectedDiamondQuality.includes(',') ? selectedDiamondQuality.split(',')[1]?.trim() : selectedDiamondQuality)
      : (product.diamondClarity || product.diamondClarityGrade || 'N/A');

    // Get diamond color - use selected quality or default
    const diamondColor = selectedDiamondQuality
      ? (selectedDiamondQuality.includes(',') ? selectedDiamondQuality.split(',')[0]?.replace(/Best|Better|Good/gi, '').trim() : selectedDiamondQuality)
      : (product.diamondColor || product.diamondColorGrade || 'N/A');

    // Get diamond type - use selected or default
    const diamondType = selectedDiamondType || product.diamondType || 'N/A';

    // Get center carat - use selected or default
    const centerCarat = selectedCaratWeight || product.centerCarat || '1';

    // Get center diamond shape - use selected or default
    const centerDiamondShape = selectedShape || product.centerDiamondShape || 'Round';

    return {
      sku: product.sku || 'N/A',
      sizesAvailable,
      metal,
      diamondClarity,
      diamondColor,
      diamondType,
      lab: product.lab || 'IGI',
      centerDiamondCut: product.centerDiamondCut || 'Rare Carat Ideal',
      centerDiamondColor: product.centerDiamondColor || product.diamondColorGrade || 'F',
      centerDiamondClarity: product.centerDiamondClarity || product.diamondClarityGrade || 'VS+',
      centerDiamondShape,
      centerCarat,
      numberOfDiamonds: product.numberOfDiamonds || '24',
      totalCaratWeightMin: product.totalCaratWeightMin || '0.3'
    };
  }, [product, selectedMetalType, selectedDiamondQuality, selectedDiamondType, selectedCaratWeight, selectedShape]);

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
          {/* <div id="title" className="page-title">
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
          </div> */}

          {/* Product Content */}
          <div id="content" className="site-content" role="main">
            <div className="shop-details zoom">
              <div className="product-top-info">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="row" style={{ alignItems: 'flex-start' }}>

                      {/* Product Images */}
                      <div className="product-images col-lg-7 col-md-12 col-12" style={{ position: 'sticky', top: '20px' }}>
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
                                      <video className='object-contain h-[100px]'>
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
                                            width="420"
                                            height="420"
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
                                  {/* <video
                                    className='object-contain w-full h-full'
                                    width="900"
                                    height="1000"
                                    loop
                                    muted
                                    playsInline
                                    controls
                                  >
                                    <source src="/assets/videos/ring.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video> */}
                                  <img
                                    width="800"
                                    height="800"
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    title={product.name}
                                    onError={(e) => {
                                      e.target.src = '/media/product/1.jpg';
                                    }}
                                    style={{ width: '100%', height: 'auto' }}
                                  />
                                  {productImages.length > 0 && (
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
                      {/* <div className="product-info col-lg-4 col-md-12 col-12" style={{ paddingLeft: '30px' }}> */}
                      <div className="product-info col-4 left-side-width" style={{ paddingLeft: '30px' }}>
                        {/* Product Title */}
                        <h1 className="title mb-0" style={{ textAlign: 'left', fontFamily: 'inter, sans-serif', fontSize: '28px', fontWeight: '550', marginBottom: '10px' }}>
                          {product.name || 'Product Rings 5'}
                        </h1>

                        {/* Product Subtitle */}
                        <small className='mb-[10px] block font-medium' style={{ textAlign: 'left', fontFamily: 'inter, sans-serif', color: '#555', fontSize: '14px', display: 'block', marginBottom: '10px' }}>
                          {(() => {
                            const metal = selectedMetalType || product.currentMetal || '14K Rose Gold';
                            const diamondType = (selectedDiamondType || product.currentDiamondType || 'natural').toLowerCase();
                            const carat = selectedCaratWeight || product.currentCarat || '0.25';
                            const caratDisplay = typeof carat === 'number' && carat < 1 ? `${carat} ct` : `${carat} ctw`;
                            return `${metal} | ${diamondType} | ${caratDisplay} Center`;
                          })()}
                        </small>

                        {/* Rating */}
                        <div className='mb-[10px]' style={{ textAlign: 'left', fontFamily: 'inter, sans-serif', marginBottom: '10px' }}>
                          {product && renderStars(product.rating)}
                        </div>

                        {/* Price */}
                        <div className="price mb-0" style={{ textAlign: 'left', fontFamily: 'inter, sans-serif', marginBottom: '20px' }}>
                          {currentVariantPrice.originalPrice && currentVariantPrice.originalPrice > currentVariantPrice.price ? (
                            <>
                              <ins className='font-bold mr-2' style={{ fontSize: '24px', fontWeight: 'bold', marginRight: '8px', textDecoration: 'none', color: '#000' }}>
                                <span>${currentVariantPrice.price.toFixed(2)}</span>
                              </ins>
                              <del aria-hidden="true" style={{ fontSize: '18px', color: '#999', textDecoration: 'line-through' }}>
                                <span>${currentVariantPrice.originalPrice.toFixed(2)}</span>
                              </del>
                            </>
                          ) : (
                            <ins style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
                              <span>${currentVariantPrice.price.toFixed(2)}</span>
                            </ins>
                          )}
                        </div>

                        {/* Customize your wedding band section */}
                        <div className="customize-section" style={{ marginTop: '30px', fontFamily: 'inter, sans-serif' }}>
                          <h2 style={{ fontFamily: 'inter, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '20px' }}>{product.name || 'Product Rings 5'}</h2>


                          {/* Metal Type Selection */}
                          <div className="variations" style={{ marginBottom: '25px', fontFamily: 'inter, sans-serif' }}>
                            <label style={{ fontFamily: 'inter, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px', color: '#333', display: 'block', marginBottom: '8px' }}>
                              METAL: {(() => {
                                const m = selectedMetalType || product.metalTypes?.[0] || '14K ROSE GOLD';
                                return m.split(' ').map(word => {
                                  const upper = word.toUpperCase();
                                  if (['14K', '18K', 'PT', 'PLATINUM'].includes(upper)) {
                                    return upper === 'PLATINUM' ? 'Platinum' : upper;
                                  }
                                  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                }).join(' ');
                              })()}
                            </label>
                            <div className="q-gutter-sm flex metal-picker-wrap-new q-ml-none" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              {product.metalTypes && product.metalTypes.length > 0 ? (
                                product.metalTypes.map((metal) => {
                                  const metalLower = metal.toLowerCase();
                                  let backgroundStyle = '';
                                  let isPlatinum = metalLower.includes('platinum');

                                  if (metalLower.includes('white gold')) {
                                    backgroundStyle = 'linear-gradient(135deg, #fdfbfb 0%, #cdd0d2ff 100%)';
                                  } else if (metalLower.includes('yellow gold')) {
                                    backgroundStyle = 'linear-gradient(135deg, #f7eed6ff 0%, #ebc716ff 100%)';
                                  } else if (metalLower.includes('rose gold')) {
                                    backgroundStyle = 'linear-gradient(135deg, #f7e8eaff 0%, #ffc3a0 100%)';
                                  } else if (isPlatinum) {
                                    backgroundStyle = 'linear-gradient(135deg, #fdfbfb 0%, #cdd0d2ff 100%)';
                                  } else {
                                    backgroundStyle = '#e8b4a0';
                                  }

                                  const isSelected = selectedMetalType === metal || (!selectedMetalType && metal === product.metalTypes[0]);
                                  return (
                                    <div
                                      key={metal}
                                      onClick={() => setSelectedMetalType(metal)}
                                      style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        background: backgroundStyle,
                                        border: isSelected ? '1px solid #002f5c' : '1px solid #ddd',
                                        boxShadow: isSelected ? '0 0 0 0px #002f5c' : 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        color: '#666'
                                      }}
                                      title={metal}
                                    >
                                      {isPlatinum && 'PT'}
                                    </div>
                                  );
                                })
                              ) : (
                                <div
                                  style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)',
                                    border: '2px solid #002f5c',
                                    cursor: 'pointer'
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Customize Your Selection Accordion */}
                        <details
                          open
                          style={{
                            borderBottom: '1px solid #e5e5e5',
                            paddingBottom: '20px',
                            marginBottom: '20px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            padding: '15px'
                          }}
                        >
                          <summary style={{
                            cursor: 'pointer',
                            fontSize: '15px',
                            fontWeight: '700',
                            color: '#002f5c',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            listStyle: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            <span style={{ fontSize: '18px', fontWeight: '500', color: '#002f5c' }}>Customize Your Selection</span>
                            <i className="fa fa-chevron-down" style={{ fontSize: '20px' }}></i>
                          </summary>

                          <div style={{ marginTop: '15px' }}>
                            {/* Total Carat Weight Selection */}
                            <div className="variations" style={{ marginBottom: '15px' }}>
                              <div>
                                <label style={{ fontSize: '16px', textAlign: 'left', fontWeight: '400', textTransform: 'capitalize', letterSpacing: '0.5px', color: '#333', display: 'block', marginBottom: '8px' }}>
                                  Total Carat Weight: {(() => {
                                    const carat = selectedCaratWeight || product.caratWeights?.[0] || '0.25';
                                    return typeof carat === 'number' && carat < 1 ? `${carat} CT` : `${carat} CTW`;
                                  })()}
                                </label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {product.caratWeights && product.caratWeights.length > 0 ? (
                                    product.caratWeights.map((carat) => {
                                      const isSelected = selectedCaratWeight === carat || String(selectedCaratWeight) === String(carat) || (!selectedCaratWeight && carat === product.caratWeights[0]);
                                      const displayValue = typeof carat === 'number' && carat < 1 ? `${carat} ct` : `${carat} ctw`;
                                      return (
                                        <button
                                          key={carat}
                                          onClick={() => setSelectedCaratWeight(carat)}
                                          style={{
                                            padding: '8px 24px',
                                            border: isSelected ? '1px solid #002f5c' : '1px solid #e5e5e5',
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontWeight: isSelected ? '400' : '400',
                                            cursor: 'pointer',
                                            borderRadius: '50px',
                                            transition: 'all 0.2s'
                                          }}
                                        >
                                          {displayValue}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <>
                                      <button
                                        style={{
                                          height: '35px',
                                          minWidth: '90px',
                                          padding: '0 12px',
                                          border: '1px solid #9333ea',
                                          backgroundColor: '#9333ea',
                                          color: '#fff',
                                          fontSize: '1px',
                                          fontWeight: '400',
                                          cursor: 'pointer',
                                          borderRadius: '0'
                                        }}
                                      >
                                        0.25 ct
                                      </button>
                                      <button
                                        style={{
                                          height: '35px',
                                          minWidth: '90px',
                                          padding: '0 12px',
                                          border: '1px solid #ddd',
                                          backgroundColor: '#fff',
                                          color: '#333',
                                          fontSize: '14px',
                                          cursor: 'pointer',
                                          borderRadius: '0'
                                        }}
                                      >
                                        0.25ct ctw
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Shape Selection */}
                            <div className="variations" style={{ marginBottom: '15px' }}>
                              <div>
                                <label style={{ fontSize: '16px', textAlign: 'left', fontWeight: '400', textTransform: 'capitalize', letterSpacing: '0.5px', color: '#333', display: 'block', marginBottom: '8px' }}>
                                  Shape: {(selectedShape || product.shapes?.[0] || 'OVAL').toUpperCase()}
                                </label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {product.shapes && product.shapes.length > 0 ? (
                                    product.shapes.map((shape) => {
                                      const isSelected = selectedShape === shape || (!selectedShape && shape === product.shapes[0]);
                                      return (
                                        <button
                                          key={shape}
                                          onClick={() => setSelectedShape(shape)}
                                          style={{
                                            padding: '8px 24px',
                                            border: isSelected ? '1px solid #002f5c' : '1px solid #e5e5e5',
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontWeight: isSelected ? '400' : '400',
                                            cursor: 'pointer',
                                            borderRadius: '50px',
                                            transition: 'all 0.2s',
                                            textTransform: 'capitalize'
                                          }}
                                        >
                                          {shape}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <button
                                      style={{
                                        padding: '8px 24px',
                                        border: '1px solid #e5e5e5',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                        fontSize: '12px',
                                        fontWeight: '400',
                                        cursor: 'pointer',
                                        borderRadius: '50px',
                                        transition: 'all 0.2s'
                                      }}
                                    >
                                      Oval
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Style Selection */}
                            <div className="variations" style={{ marginBottom: '15px' }}>
                              <div>
                                <label style={{ fontSize: '16px', textAlign: 'left', fontWeight: '400', textTransform: 'capitalize', letterSpacing: '0.5px', color: '#333', display: 'block', marginBottom: '8px' }}>
                                  Style: {(selectedStyle || product.styles?.[0] || 'PAVÉ').toUpperCase()}
                                </label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {product.styles && product.styles.length > 0 ? (
                                    product.styles.map((style) => {
                                      const isSelected = selectedStyle === style || (!selectedStyle && style === product.styles[0]);
                                      return (
                                        <button
                                          key={style}
                                          onClick={() => setSelectedStyle(style)}
                                          style={{
                                            padding: '8px 24px',
                                            border: isSelected ? '1px solid #002f5c' : '1px solid #e5e5e5',
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontWeight: isSelected ? '400' : '400',
                                            cursor: 'pointer',
                                            borderRadius: '50px',
                                            transition: 'all 0.2s',
                                            textTransform: 'capitalize'
                                          }}
                                        >
                                          {style}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <>
                                      <button
                                        style={{
                                          height: '35px',
                                          minWidth: '90px',
                                          padding: '0 12px',
                                          border: '2px solid #9333ea',
                                          backgroundColor: '#9333ea',
                                          color: '#fff',
                                          fontSize: '12px',
                                          fontWeight: '400',
                                          cursor: 'pointer',
                                          borderRadius: '0'
                                        }}
                                      >
                                        Pavé
                                      </button>
                                      <button
                                        style={{
                                          height: '35px',
                                          minWidth: '90px',
                                          padding: '0 12px',
                                          border: '1px solid #ddd',
                                          backgroundColor: '#fff',
                                          color: '#333',
                                          fontSize: '12px',
                                          cursor: 'pointer',
                                          borderRadius: '0'
                                        }}
                                      >
                                        Hidden Halo
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Diamond Type Selection */}
                            <div className="variations" style={{ marginBottom: '0' }}>
                              <div>
                                <label style={{ fontSize: '16px', textAlign: 'left', fontWeight: '400', textTransform: 'capitalize', letterSpacing: '0.5px', color: '#333', display: 'block', marginBottom: '8px' }}>
                                  Diamond Type: {(selectedDiamondType || product.diamondTypes?.[0] || 'NATURAL').toUpperCase()}
                                </label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {product.diamondTypes && product.diamondTypes.length > 0 ? (
                                    product.diamondTypes.map((diamondType) => {
                                      const isSelected = selectedDiamondType === diamondType || (!selectedDiamondType && diamondType === product.diamondTypes[0]);
                                      return (
                                        <button
                                          key={diamondType}
                                          onClick={() => setSelectedDiamondType(diamondType)}
                                          style={{
                                            padding: '8px 24px',
                                            border: isSelected ? '1px solid #002f5c' : '1px solid #e5e5e5',
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontWeight: isSelected ? '400' : '400',
                                            cursor: 'pointer',
                                            borderRadius: '50px',
                                            transition: 'all 0.2s',
                                            textTransform: 'capitalize'
                                          }}
                                        >
                                          {diamondType}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <>
                                      <button
                                        style={{
                                          height: '35px',
                                          minWidth: '90px',
                                          padding: '0 12px',
                                          border: '2px solid #9333ea',
                                          backgroundColor: '#9333ea',
                                          color: '#fff',
                                          fontSize: '12px',
                                          fontWeight: '400',
                                          cursor: 'pointer',
                                          borderRadius: '0'
                                        }}
                                      >
                                        natural
                                      </button>
                                      <button
                                        style={{
                                          height: '35px',
                                          minWidth: '90px',
                                          padding: '0 12px',
                                          border: '1px solid #ddd',
                                          backgroundColor: '#fff',
                                          color: '#333',
                                          fontSize: '12px',
                                          cursor: 'pointer',
                                          borderRadius: '0'
                                        }}
                                      >
                                        Natural
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>


                        {/* Choose this setting Button */}
                        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                          <button
                            onClick={handleAddToCart}
                            disabled={addToCartLoading}
                            style={{
                              width: '100%',
                              backgroundColor: '#002f5c',
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: '700',
                              padding: '18px 24px',
                              border: 'none',
                              borderRadius: '50px',
                              cursor: addToCartLoading ? 'wait' : 'pointer',
                              opacity: addToCartLoading ? 0.6 : 1,
                              transition: 'all 0.2s',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}
                            onMouseOver={(e) => {
                              if (!addToCartLoading) e.target.style.backgroundColor = '#001f3d';
                            }}
                            onMouseOut={(e) => {
                              if (!addToCartLoading) e.target.style.backgroundColor = '#002f5c';
                            }}
                          >
                            {addToCartLoading ? 'Adding...' : 'Choose this setting'}
                          </button>
                          {addToCartError && (
                            <div style={{
                              color: '#c33',
                              fontSize: '14px',
                              marginTop: '10px',
                              padding: '8px',
                              backgroundColor: '#fee',
                              borderRadius: '4px'
                            }}>
                              {addToCartError}
                            </div>
                          )}
                        </div>

                        {/* Secondary Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                          <button
                            style={{
                              flex: 1,
                              backgroundColor: '#fff',
                              border: '1px solid #000000',
                              color: '#000000',
                              fontSize: '14px',
                              fontWeight: '600',
                              padding: '14px 16px',
                              borderRadius: '50px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#f9f9f9';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#fff';
                            }}
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
                                ...(selectedShape && { shape: selectedShape }),
                                ...(selectedStyle && { style: selectedStyle }),
                                ...(selectedDiamondType && { diamond_type: selectedDiamondType }),
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
                                <GoHeartFill style={{ marginRight: '8px' }} /> Remove from wishlist
                              </>
                            ) : (
                              <>
                                <GoHeart style={{ marginRight: '8px' }} /> Add to wishlist
                              </>
                            )}
                          </button>
                          <button
                            style={{
                              flex: 1,
                              backgroundColor: '#fff',
                              border: '1px solid #000000',
                              color: '#000000',
                              fontSize: '14px',
                              fontWeight: '600',
                              padding: '14px 16px',
                              borderRadius: '50px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#f9f9f9';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#fff';
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              // TODO: Implement drop a hint functionality
                              console.log('Drop a hint:', product.id);
                            }}
                          >
                            <i className="fa fa-gift"></i> Drop a Hint
                          </button>
                        </div>

                        {/* Returns and Delivery Info */}
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                            <i className="fa fa-refresh"></i>
                            <span>  30-day returns, no fine print.</span>
                          </div>
                          <div style={{ fontSize: '16px', color: '#666' }}>
                            Free delivery by Monday, Feb 2.
                          </div>


                          {/* Help Section */}
                          <div style={{ marginBottom: '20px', fontSize: '16px', color: '#666' }}>
                            Need help? <a href="#" style={{ color: '#002f5c', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Chat with us</a> or call <a href="tel:8557204858" style={{ color: '#002f5c', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>855.720.4858</a>
                          </div>
                        </div>
                        {/* Guarantees Section */}
                        <div style={{ marginBottom: '30px' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                            <i className="fa fa-calendar" style={{ color: '#002f5c', marginTop: '4px', fontSize: '16px' }}></i>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              Free 30-day returns & 1-year resizing
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                            <i className="fa fa-diamond" style={{ color: '#002f5c', marginTop: '4px', fontSize: '16px' }}></i>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              Guaranteed for life
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <i className="fa fa-shield" style={{ color: '#002f5c', marginTop: '4px', fontSize: '16px' }}></i>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              Authenticity inspection
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Sections */}
                        <div>
                          <details style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '12px', marginBottom: '12px' }}>
                            <summary style={{ cursor: 'pointer', fontSize: '18px', fontWeight: '600', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyle: 'none' }}>
                              <span>Product Information</span>
                              <i className="fa fa-chevron-down" style={{ fontSize: '10px', transition: 'transform 0.3s' }}></i>
                            </summary>
                            <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
                              {dynamicProductInfo ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                  <tbody>
                                    {/* SKU */}
                                    {dynamicProductInfo.sku && dynamicProductInfo.sku !== 'N/A' && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>SKU</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.sku}</td>
                                      </tr>
                                    )}

                                    {/* Sizes Available */}
                                    {dynamicProductInfo.sizesAvailable && dynamicProductInfo.sizesAvailable !== 'N/A' && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Sizes Available</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.sizesAvailable}</td>
                                      </tr>
                                    )}

                                    {/* Metal */}
                                    {dynamicProductInfo.metal && dynamicProductInfo.metal !== 'N/A' && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Metal</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.metal}</td>
                                      </tr>
                                    )}

                                    {/* Diamond Clarity */}
                                    {dynamicProductInfo.diamondClarity && dynamicProductInfo.diamondClarity !== 'N/A' && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Diamond Clarity</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.diamondClarity}</td>
                                      </tr>
                                    )}

                                    {/* Diamond Color */}
                                    {dynamicProductInfo.diamondColor && dynamicProductInfo.diamondColor !== 'N/A' && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Diamond Color</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.diamondColor}</td>
                                      </tr>
                                    )}

                                    {/* Diamond Type */}
                                    {dynamicProductInfo.diamondType && dynamicProductInfo.diamondType !== 'N/A' && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Diamond Type</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.diamondType}</td>
                                      </tr>
                                    )}

                                    {/* Lab */}
                                    {dynamicProductInfo.lab && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Lab</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.lab}</td>
                                      </tr>
                                    )}

                                    {/* Center Diamond Cut */}
                                    {dynamicProductInfo.centerDiamondCut && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Center Diamond Cut</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.centerDiamondCut}</td>
                                      </tr>
                                    )}

                                    {/* Center Diamond Color */}
                                    {dynamicProductInfo.centerDiamondColor && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Center Diamond Color</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.centerDiamondColor}</td>
                                      </tr>
                                    )}

                                    {/* Center Diamond Clarity */}
                                    {dynamicProductInfo.centerDiamondClarity && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Center Diamond Clarity</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.centerDiamondClarity}</td>
                                      </tr>
                                    )}

                                    {/* Center Diamond Shape */}
                                    {dynamicProductInfo.centerDiamondShape && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Center Diamond Shape</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.centerDiamondShape}</td>
                                      </tr>
                                    )}

                                    {/* Center Carat */}
                                    {dynamicProductInfo.centerCarat && (
                                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Center Carat</th>
                                        <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.centerCarat}</td>
                                      </tr>
                                    )}

                                    {/* Diamond Information Section */}
                                    {(dynamicProductInfo.numberOfDiamonds || dynamicProductInfo.totalCaratWeightMin) && (
                                      <>
                                        <tr>
                                          <td colSpan="2" style={{ padding: '16px 0 8px 0', fontWeight: '500', fontSize: '15px' }}>Diamond information</td>
                                        </tr>

                                        {/* Number of Diamonds */}
                                        {dynamicProductInfo.numberOfDiamonds && (
                                          <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Number of Diamonds</th>
                                            <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.numberOfDiamonds}</td>
                                          </tr>
                                        )}

                                        {/* Total Carat Weight (min) */}
                                        {dynamicProductInfo.totalCaratWeightMin && (
                                          <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>Total Carat Weight (min)</th>
                                            <td style={{ textAlign: 'right', padding: '8px 0', verticalAlign: 'top' }}>{dynamicProductInfo.totalCaratWeightMin}</td>
                                          </tr>
                                        )}
                                      </>
                                    )}

                                    {/* Additional Info from additionalInfo object */}
                                    {product.additionalInfo && Object.keys(product.additionalInfo).length > 0 && (
                                      <>
                                        {Object.entries(product.additionalInfo).map(([key, value]) => {
                                          // Skip if already displayed above
                                          const displayedKeys = ['SKU', 'Sizes Available', 'Metal', 'Diamond Clarity', 'Diamond Color', 'Diamond Type', 'Lab', 'Center Diamond Cut', 'Center Diamond Color', 'Center Diamond Clarity', 'Center Diamond Shape', 'Center Carat', 'Number of Diamonds', 'Total Carat Weight (min)'];
                                          if (displayedKeys.includes(key)) return null;

                                          return (
                                            <tr key={key} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                              <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '500', width: '40%', verticalAlign: 'top' }}>{key}</th>
                                              <td style={{ padding: '8px 0', verticalAlign: 'top' }}>{String(value)}</td>
                                            </tr>
                                          );
                                        })}
                                      </>
                                    )}
                                  </tbody>
                                </table>
                              ) : (
                                <div style={{ color: '#999' }}>No additional information available.</div>
                              )}
                            </div>
                          </details>
                          <details style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '12px', marginBottom: '12px' }}>
                            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyle: 'none' }}>
                              <span>100% money back guarantee</span>
                              <i className="fa fa-chevron-down" style={{ fontSize: '10px', transition: 'transform 0.3s' }}></i>
                            </summary>
                            <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
                              If you're not satisfied, return it within 30 days for a full refund. No questions asked.
                            </div>
                          </details>
                          <details style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '12px' }}>
                            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyle: 'none' }}>
                              <span>Free returns and resizing</span>
                              <i className="fa fa-chevron-down" style={{ fontSize: '10px', transition: 'transform 0.3s' }}></i>
                            </summary>
                            <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
                              We offer free return shipping and one free resizing within the first year.
                            </div>
                          </details>
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
