import { Link, useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { useGetSingleProductQuery } from '../Services/ProductApi';
import { GetUrl } from '../config/GetUrl';
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

  // Fetch product details from API
  const { 
    data: productData, 
    isLoading, 
    error 
  } = useGetSingleProductQuery(id || '');

console.log(productData);




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
      
      // Process metal types
      const metalTypes = Array.isArray(p.metal_type) ? p.metal_type.filter(Boolean) : [];
      
      // Process carat weights
      const caratWeights = Array.isArray(p.carat_weight) ? p.carat_weight.filter(Boolean) : [];
      
      // Process diamond quality
      const diamondQualities = Array.isArray(p.diamond_quality) ? p.diamond_quality.filter(Boolean) : [];
      // If diamond_quality is empty, try to construct from color and clarity grades
      if (diamondQualities.length === 0 && (p.diamond_color_grade || p.diamond_clarity_grade)) {
        const qualityStr = `${p.diamond_color_grade || ''}${p.diamond_clarity_grade ? ', ' + p.diamond_clarity_grade : ''}`.trim();
        if (qualityStr) {
          diamondQualities.push(qualityStr);
        }
      }
      
      // Process ring sizes
      const ringSizes = Array.isArray(p.ring_size) ? p.ring_size.filter(Boolean) : [];

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
        reviews: p.reviews || []
      };
    }
    return null;
  }, [productData]);

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

  // Calculate visible thumbnails (show 4 at a time)
  const getVisibleThumbnails = () => {
    const maxVisible = 4;
    const start = Math.max(0, Math.min(selectedImage - Math.floor(maxVisible / 2), productImages.length - maxVisible));
    const end = Math.min(start + maxVisible, productImages.length);
    return { start, end, thumbnails: productImages.slice(start, end) };
  };

  const { start: thumbnailStart, thumbnails } = getVisibleThumbnails();

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
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="rating">
        <div className={`star star-${Math.round(rating)}`}></div>
        {product.reviewCount > 0 && (
          <div className="review-count">
            ({product.reviewCount}<span> reviews</span>)
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
                                  {thumbnails.map((image, idx) => {
                                    const actualIndex = thumbnailStart + idx;
                                    return (
                                      <div 
                                        key={actualIndex} 
                                        className={`img-item ${selectedImage === actualIndex ? 'slick-current active' : ''}`}
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
                            <div className="scroll-image main-image">
                              <div className="image-additional react-image-slider">
                                <div className="main-image-container" style={{ position: 'relative' }}>
                                  <img 
                                    width="900" 
                                    height="900" 
                                    src={productImages[selectedImage]} 
                                    alt={product.name}
                                    title={product.name}
                                    onError={(e) => {
                                      e.target.src = '/media/product/1.jpg';
                                    }}
                                    style={{ width: '100%', height: 'auto' }}
                                  />
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
                        <h1 className="title">{product.name}</h1>
                        <span className="price">
                          {product.originalPrice && product.originalPrice > product.price ? (
                            <>
                              <del aria-hidden="true"><span>${product.originalPrice.toFixed(2)}</span></del>
                              <ins><span>${product.price.toFixed(2)}</span></ins>
                            </>
                          ) : (
                            <ins><span>${product.price.toFixed(2)}</span></ins>
                          )}
                        </span>
                        {renderStars(product.rating)}
                        <div className="description">
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
                                <tr>
                                  <td className="label">Metal Type</td>
                                  <td className="attributes">
                                    <ul className="metals">
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
                                              className={`${metalClass} ${selectedMetalType === metal ? 'selected' : ''}`}
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
                                  <td className="label">
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
                                              className={isSelected ? 'selected' : ''}
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
                                  <td className="label">
                                    Diamond Quality
                                    <i className="fa fa-info-circle" style={{ marginLeft: '5px', cursor: 'help' }} title="Select the diamond quality grade"></i>
                                  </td>
                                  <td className="attributes">
                                    <ul className="text">
                                      {product.diamondQualities.map((quality, index) => (
                                        <li key={quality || index}>
                                          <span 
                                            className={selectedDiamondQuality === quality ? 'selected' : ''}
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
                                  <td className="label">
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
                              <a 
                                href="#" 
                                tabIndex="0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // TODO: Implement add to cart functionality
                                  console.log('Add to cart:', { 
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
                                Add to cart
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
                              onClick={(e) => {
                                e.preventDefault();
                                // TODO: Implement wishlist functionality
                                console.log('Add to wishlist:', product.id);
                              }}
                            >
                              Add to wishlist
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
    </div>
  );
}

export default Details;
