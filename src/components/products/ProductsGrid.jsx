import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

function ProductsGrid({ products = [], layoutView = 'grid' }) {
  // State to track selected metal and carat for each product
  const [productSelections, setProductSelections] = useState({});

  // Helper function to get metal types from variants
  const getMetalTypes = (variants) => {
    if (!variants || variants.length === 0) return [];
    // Extract all metal types and filter out empty values
    const metals = variants.map(v => v.metal_type).filter(Boolean);
    // Return unique metal types (removes duplicates)
    // Note: If you have 8 variants but only 2 unique metal types, 
    // you'll see 2 metal options (which is correct)
    return [...new Set(metals)];
  };

  // Helper function to get carat weights from variants
  const getCaratWeights = (variants) => {
    if (!variants || variants.length === 0) return [];
    const carats = variants.map(v => v.carat_weight).filter(Boolean);
    return [...new Set(carats)].sort((a, b) => {
      const numA = parseFloat(a) || 0;
      const numB = parseFloat(b) || 0;
      return numA - numB;
    });
  };

  // Helper function to get metal class for styling
  const getMetalClass = (metal) => {
    if (!metal) return '';
    const metalLower = String(metal).toLowerCase();
    if (metalLower.includes('white gold') || metalLower.includes('platinum') || metalLower.includes('pl')) {
      return 'metal-white-gold';
    } else if (metalLower.includes('yellow gold') || metalLower.includes('14k') || metalLower.includes('18k')) {
      return 'metal-yellow-gold';
    } else if (metalLower.includes('rose gold')) {
      return 'metal-rose-gold';
    }
    return 'metal-white-gold'; // default
  };

  // Helper function to get metal label (extract 14K, PL, etc.)
  const getMetalLabel = (metal) => {
    if (!metal) return '';
    const metalStr = String(metal);
    // Extract 14K, 18K, PL, etc.
    const match = metalStr.match(/(\d+K|PL|Platinum)/i);
    if (match) return match[1].toUpperCase();
    // If no match, return first 8 chars
    return metalStr.replace(/^\d+K\s*/, '').substring(0, 8);
  };

  // Helper function to calculate price based on selected variant
  const getVariantPrice = (product, selectedMetal, selectedCarat) => {
    if (!product.variants || product.variants.length === 0) {
      return {
        price: product.price || 0,
        originalPrice: product.originalPrice || null
      };
    }

    // Find matching variant
    const matchingVariant = product.variants.find(variant => {
      const metalMatch = !selectedMetal || !variant.metal_type || 
        String(variant.metal_type).toLowerCase() === String(selectedMetal).toLowerCase();
      const caratMatch = !selectedCarat || !variant.carat_weight || 
        String(variant.carat_weight) === String(selectedCarat);
      return metalMatch && caratMatch;
    });

    if (matchingVariant) {
      return {
        price: matchingVariant.discounted_price || matchingVariant.price || matchingVariant.original_price || product.price || 0,
        originalPrice: matchingVariant.original_price || (matchingVariant.discounted_price && matchingVariant.price ? matchingVariant.price : null) || product.originalPrice || null
      };
    }

    // Try partial match with metal type
    if (selectedMetal) {
      const metalVariant = product.variants.find(v => 
        v.metal_type && String(v.metal_type).toLowerCase() === String(selectedMetal).toLowerCase()
      );
      if (metalVariant) {
        return {
          price: metalVariant.discounted_price || metalVariant.price || metalVariant.original_price || product.price || 0,
          originalPrice: metalVariant.original_price || (metalVariant.discounted_price && metalVariant.price ? metalVariant.price : null) || product.originalPrice || null
        };
      }
    }

    return {
      price: product.price || 0,
      originalPrice: product.originalPrice || null
    };
  };

  // Handle selection change
  const handleSelectionChange = (productId, type, value) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value
      }
    }));
  };

  // Initialize default selections for products with variants
  const initializeSelections = (product) => {
    if (!productSelections[product.id]) {
      const metalTypes = getMetalTypes(product.variants);
      const caratWeights = getCaratWeights(product.variants);
      
      if (metalTypes.length > 0 || caratWeights.length > 0) {
        setProductSelections(prev => ({
          ...prev,
          [product.id]: {
            metal: metalTypes[0] || '',
            carat: caratWeights[0] || ''
          }
        }));
      }
    }
  };

  return (
    <div className="tab-content">
      {layoutView === 'grid' ? (
        <div className="tab-pane fade show active" id="layout-grid" role="tabpanel">
          <div className="products-list grid">
            <div className="row">
              {products.map((product) => {
                console.log('productproduct',product);
                // Initialize selections if product has variants
                if (product.variants && product.variants.length > 0 && !productSelections[product.id]) {
                  initializeSelections(product);
                }

                const metalTypes = getMetalTypes(product.variants);
                const caratWeights = getCaratWeights(product.variants);
                const hasVariants = metalTypes.length > 0 || caratWeights.length > 0;
                const selections = productSelections[product.id] || {};
                const selectedMetal = selections.metal || (metalTypes.length > 0 ? metalTypes[0] : '');
                const selectedCarat = selections.carat || (caratWeights.length > 0 ? caratWeights[0] : '');
                const variantPrice = hasVariants ? getVariantPrice(product, selectedMetal, selectedCarat) : { price: product.price || 0, originalPrice: product.originalPrice || null };

                return (
                  <div key={product.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="products-entry clearfix product-wapper">
                      <div className="products-thumb mb-0">
                        {product.label && (
                          <div className="product-lable">
                            {product.discount && <div className="onsale">{product.discount}</div>}
                            {(product.label === 'hot' || product.label === 'both') && <div className="hot">Hot</div>}
                          </div>
                        )}
                        <div className={`relative product-thumb-hover ${product.hasBorder ? 'border' : ''}`}>
                          <Link to={`/product/details/${product.id}`}>
                            <img width="600" height="600" src={product.image} className="!relative post-image" alt={product.name} />
                            <img width="600" height="600" src={product.hoverImage} className="hover-image back" alt={product.name} />
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
                      <div className="products-content mt-0 !text-left">
                        <div className="contents">
                          <h3 className="product-title text-left mb-0"><Link className="text-[14px]" to={`/product/details/${product.id}`}>{product.name}</Link></h3>
                          <div className="rating text-left">
                            <div className={`star star-${product.rating}`}></div>
                            <span className="count">({product.reviews} review{product.reviews !== 1 ? 's' : ''})</span>
                          </div>
                          <span className="price mt-3">
                            {variantPrice.originalPrice && variantPrice.originalPrice > variantPrice.price ? (
                              <>
                                <ins><span className='text-[20px] font-bold mr-3'>${variantPrice.price.toFixed(2)}</span></ins>
                                <del aria-hidden="true"><span>${variantPrice.originalPrice.toFixed(2)}</span></del>
                              </>
                            ) : (
                              <ins><span>${variantPrice.price.toFixed(2)}</span></ins>
                            )}
                          </span>
                        </div>

                        {/* Metal Type Selection */}
                        {metalTypes.length > 0 && (
                          <div className="flex !justify-start items-center position-relative mb-3 mt-3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                            <p className="pe-3 mb-0 sstyle" >Metal:</p>
                            <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                              {metalTypes.map((metal, index) => {
                                const metalClass = getMetalClass(metal);
                                const metalLabel = getMetalLabel(metal);
                                const isSelected = selectedMetal && String(selectedMetal).toLowerCase() === String(metal).toLowerCase();
                                return (
                                  <div key={`${metal}-${index}`} className="d-flex flex-column align-items-center" style={{ gap: '5px' }}>
                                    <span
                                      className={`${metalClass} ${isSelected ? 'selected' : ''} !flex items-center justify-center`}
                                      onClick={() => handleSelectionChange(product.id, 'metal', metal)}
                                      style={{
                                        width: '50px',
                                        height: '25px',
                                        border: isSelected ? '2px solid #f9b61e' : '2px solid #ddd',
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                        transition: 'all 0.3s ease',
                                        // boxShadow: isSelected ? '0 0 0 2px rgba(249, 182, 30, 0.3)' : 'none'
                                      }}
                                      title={metal}
                                    >
                                    <span className='text-[11px] text-[#666] text-center font-bold'>{metalLabel}</span>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Carat Weight Selection */}
                        {caratWeights.length > 0 && (
                          <div className="flex justify-start items-center relative mt-2">
                            <p className="pe-3 mb-0 sstyle" style={{ fontSize: '14px', fontWeight: '500' }}>Carat:</p>
                            {/* <button
                              className="scroll-arrow left"
                              onClick={(e) => {
                                const ul = e.target.nextElementSibling;
                                if (ul) ul.scrollBy({ left: -100, behavior: 'smooth' });
                              }}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}
                            >
                              &#10094;
                            </button> */}
                            <ul className="shape-scroll d-flex flex-nowrap list-unstyled overflow-auto mb-0" style={{ maxWidth: '150px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                              {caratWeights.map((carat, idx) => {
                                const isSelected = selectedCarat && String(selectedCarat) === String(carat);
                                return (
                                  <li
                                    key={idx}
                                    className={`w-[60px] h-[30px] ${isSelected ? "level-1 menu-item px-3" : "px-3 ms-3"}`}
                                    style={{
                                      border: isSelected ? '2px solid #f9b61e' : '1px solid #ddd',
                                      background: isSelected ? '#f9b61e' : '#fff',
                                      color: isSelected ? '#fff' : '#333',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                      whiteSpace: 'nowrap'
                                    }}
                                    onClick={() => handleSelectionChange(product.id, 'carat', carat)}
                                  >
                                    <span className="menu-item-text" style={{ fontWeight: isSelected ? '600' : '400' }}>{carat}</span>
                                  </li>
                                );
                              })}
                            </ul>
                            {/* <button
                              className="scroll-arrow right"
                              onClick={(e) => {
                                const ul = e.target.previousElementSibling;
                                if (ul) ul.scrollBy({ left: 100, behavior: 'smooth' });
                              }}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}
                            >
                              &#10095;
                            </button> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="tab-pane fade show active" id="layout-list" role="tabpanel">
          <div className="products-list list">
            {products.slice(0, 5).map((product) => {
              // Initialize selections if product has variants
              if (product.variants && product.variants.length > 0 && !productSelections[product.id]) {
                initializeSelections(product);
              }

              const metalTypes = getMetalTypes(product.variants);
              const caratWeights = getCaratWeights(product.variants);
              const hasVariants = metalTypes.length > 0 || caratWeights.length > 0;
              const selections = productSelections[product.id] || {};
              const selectedMetal = selections.metal || (metalTypes.length > 0 ? metalTypes[0] : '');
              const selectedCarat = selections.carat || (caratWeights.length > 0 ? caratWeights[0] : '');
              const variantPrice = hasVariants ? getVariantPrice(product, selectedMetal, selectedCarat) : { price: product.price || 0, originalPrice: product.originalPrice || null };

              return (
                <div key={product.id} className="products-entry clearfix product-wapper">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="products-thumb">
                        {product.label && (
                          <div className="product-lable">
                            {(product.label === 'hot' || product.label === 'both') && <div className="hot">Hot</div>}
                          </div>
                        )}
                        <div className="product-thumb-hover">
                          <Link to={`/product/details/${product.id}`}>
                            <img width="600" height="600" src={product.image} className="post-image" alt={product.name} />
                            <img width="600" height="600" src={product.hoverImage} className="hover-image back" alt={product.name} />
                          </Link>
                        </div>
                        <span className="product-quickview" data-title="Quick View">
                          <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="products-content">
                        <h3 className="product-title"><Link to={`/product/details/${product.id}`}>{product.name}</Link></h3>
                        <span className="price">
                          {variantPrice.originalPrice && variantPrice.originalPrice > variantPrice.price ? (
                            <>
                              <del aria-hidden="true"><span>${variantPrice.originalPrice.toFixed(2)}</span></del>
                              <ins><span>${variantPrice.price.toFixed(2)}</span></ins>
                            </>
                          ) : (
                            <ins><span>${variantPrice.price.toFixed(2)}</span></ins>
                          )}
                        </span>
                        <div className="rating">
                          <div className={`star star-${product.rating}`}></div>
                          <div className="review-count">
                            ({product.reviews}<span> review{product.reviews !== 1 ? 's' : ''}</span>)
                          </div>
                        </div>

                        {/* Metal Type Selection */}
                        {metalTypes.length > 0 && (
                          <div className="d-flex align-items-center mb-3 mt-3">
                            <p className="pe-3 mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>Metal:</p>
                            <div className="d-flex align-items-center gap-2">
                              {metalTypes.map((metal) => {
                                const metalClass = getMetalClass(metal);
                                const metalLabel = getMetalLabel(metal);
                                const isSelected = selectedMetal && String(selectedMetal).toLowerCase() === String(metal).toLowerCase();
                                return (
                                  <div key={metal} className="d-flex flex-column align-items-center" style={{ gap: '5px' }}>
                                    <span
                                      className={`${metalClass} ${isSelected ? 'selected' : ''}`}
                                      onClick={() => handleSelectionChange(product.id, 'metal', metal)}
                                      style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        border: isSelected ? '3px solid #f9b61e' : '2px solid #ddd',
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                        transition: 'all 0.3s ease',
                                        boxShadow: isSelected ? '0 0 0 2px rgba(249, 182, 30, 0.3)' : 'none'
                                      }}
                                      title={metal}
                                    ></span>
                                    <span style={{ fontSize: '11px', color: '#666', textAlign: 'center', maxWidth: '50px' }}>{metalLabel}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Carat Weight Selection */}
                        {caratWeights.length > 0 && (
                          <div className="d-flex align-items-center mt-2 mb-3">
                            <p className="pe-3 mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>Carat:</p>
                            {/* <button
                              className="scroll-arrow left"
                              onClick={(e) => {
                                const ul = e.target.nextElementSibling;
                                if (ul) ul.scrollBy({ left: -100, behavior: 'smooth' });
                              }}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}
                            >
                              &#10094;
                            </button> */}
                            <ul className="shape-scroll d-flex flex-nowrap list-unstyled overflow-auto mb-0" style={{ maxWidth: '200px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                              {caratWeights.map((carat, idx) => {
                                const isSelected = selectedCarat && String(selectedCarat) === String(carat);
                                return (
                                  <li
                                    key={idx}
                                    className={`!w-[50px] ${isSelected ? "level-1 menu-item px-3 border" : "px-3 border ms-3"}`}
                                    style={{
                                      border: isSelected ? '2px solid #f9b61e' : '1px solid #ddd',
                                      borderRadius: '4px',
                                      background: isSelected ? '#f9b61e' : '#fff',
                                      color: isSelected ? '#fff' : '#333',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                      whiteSpace: 'nowrap'
                                    }}
                                    onClick={() => handleSelectionChange(product.id, 'carat', carat)}
                                  >
                                    <span className="menu-item-text" style={{ fontWeight: isSelected ? '600' : '400' }}>{carat}</span>
                                  </li>
                                );
                              })}
                            </ul>
                            <button
                              className="scroll-arrow right"
                              onClick={(e) => {
                                const ul = e.target.previousElementSibling;
                                if (ul) ul.scrollBy({ left: 100, behavior: 'smooth' });
                              }}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}
                            >
                              &#10095;
                            </button>
                          </div>
                        )}

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
                        </div>
                        <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;

