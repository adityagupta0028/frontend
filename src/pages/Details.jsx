import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Details() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('color-1');
  const [activeTab, setActiveTab] = useState('description');

  const productImages = [
    '/media/product/1.jpg',
    '/media/product/1-2.jpg',
    '/media/product/2.jpg',
    '/media/product/2-2.jpg',
    '/media/product/3.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  // Initialize slick carousel after component mounts
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (window.jQuery && window.jQuery.fn.slick) {
        // Initialize thumbnail slider
        const $thumbnail = window.jQuery('.image-thumbnail');
        if ($thumbnail.length && !$thumbnail.hasClass('slick-initialized')) {
          $thumbnail.slick({
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.image-additional',
            centerMode: true,
            focusOnSelect: true,
            arrows: true,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 5
                }
              }
            ]
          });
        }

        // Initialize main image slider
        const $mainImage = window.jQuery('.image-additional');
        if ($mainImage.length && !$mainImage.hasClass('slick-initialized')) {
          $mainImage.slick({
            fade: true,
            asNavFor: '.image-thumbnail',
            arrows: true,
            dots: false
          });

          // Sync React state when slick changes slide
          $mainImage.on('afterChange', function(event, slick, currentSlide) {
            setSelectedImage(currentSlide);
          });
        }

        // Sync thumbnail slider with state
        if ($thumbnail.length && $thumbnail.hasClass('slick-initialized')) {
          $thumbnail.on('afterChange', function(event, slick, currentSlide) {
            setSelectedImage(currentSlide);
          });
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup slick on unmount
      if (window.jQuery) {
        const $thumbnail = window.jQuery('.image-thumbnail');
        const $mainImage = window.jQuery('.image-additional');
        
        if ($thumbnail.hasClass('slick-initialized')) {
          $thumbnail.off('afterChange');
          $thumbnail.slick('unslick');
        }
        
        if ($mainImage.hasClass('slick-initialized')) {
          $mainImage.off('afterChange');
          $mainImage.slick('unslick');
        }
      }
    };
  }, []);

  const sizes = ['L', 'M', 'S'];
  const colors = ['color-1', 'color-2', 'color-3'];

  const relatedProducts = [
    { id: 1, name: 'Medium Flat Hoops', price: 100.00, image: '/media/product/13.jpg', hoverImage: '/media/product/13-2.jpg', rating: 5, label: 'hot' },
    { id: 2, name: 'Bold Pearl Hoop Earrings', price: 200.00, image: '/media/product/2.jpg', hoverImage: '/media/product/2-2.jpg', rating: 4, label: 'hot' },
    { id: 3, name: 'Twin Hoops', price: 150.00, image: '/media/product/3.jpg', hoverImage: '/media/product/3-2.jpg', rating: 0 },
    { id: 4, name: 'Yilver And Turquoise Earrings', price: 100.00, originalPrice: 150.00, image: '/media/product/4.jpg', hoverImage: '/media/product/4-2.jpg', rating: 5, label: 'sale', discount: '-33%' },
    { id: 5, name: 'Amp Pendant Light Large', price: 140.00, originalPrice: 150.00, image: '/media/product/5.jpg', hoverImage: '/media/product/5-2.jpg', rating: 4, label: 'sale', discount: '-7%', outOfStock: true },
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
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
                  Bora Armchair
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span><Link to="/shop">Shop</Link><span className="delimiter"></span>Bora Armchair
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div id="content" className="site-content" role="main">
            <div className="shop-details zoom" data-product_layout_thumb="scroll" data-zoom_scroll="true" data-zoom_contain_lens="true" data-zoomtype="inner" data-lenssize="200" data-lensshape="square" data-lensborder="" data-bordersize="2" data-bordercolour="#f9b61e" data-popup="false">
              <div className="product-top-info">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="row">
                      {/* Product Images */}
                      <div className="product-images col-lg-7 col-md-12 col-12">
                        <div className="row">
                          <div className="col-md-2">
                            <div className="content-thumbnail-scroll">
                              <div className="image-thumbnail slick-carousel slick-vertical" data-asnavfor=".image-additional" data-centermode="true" data-focusonselect="true" data-columns4="5" data-columns3="4" data-columns2="4" data-columns1="4" data-columns="4" data-nav="true" data-vertical="true" data-verticalswiping="true">
                                {productImages.map((image, index) => (
                                  <div key={index} className={`img-item slick-slide ${selectedImage === index ? 'slick-current' : ''}`}>
                                    <span 
                                      className="img-thumbnail-scroll"
                                      onClick={() => {
                                        setSelectedImage(index);
                                        // Sync slick slider
                                        if (window.jQuery && window.jQuery.fn.slick) {
                                          const $mainImage = window.jQuery('.image-additional');
                                          if ($mainImage.hasClass('slick-initialized')) {
                                            $mainImage.slick('slickGoTo', index);
                                          }
                                        }
                                      }}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <img width="600" height="600" src={image} alt={`Product ${index + 1}`} />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-10">
                            <div className="scroll-image main-image">
                              <div className="image-additional slick-carousel" data-asnavfor=".image-thumbnail" data-fade="true" data-columns4="1" data-columns3="1" data-columns2="1" data-columns1="1" data-columns="1" data-nav="true">
                                {productImages.map((image, index) => (
                                  <div key={index} className={`img-item slick-slide ${selectedImage === index ? 'slick-current' : ''}`}>
                                    <img width="900" height="900" src={image} alt={`Product ${index + 1}`} title="" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="product-info col-lg-5 col-md-12 col-12">
                        <h1 className="title">Bora Armchair</h1>
                        <span className="price">
                          <del aria-hidden="true"><span>$100.00</span></del>
                          <ins><span>$90.00</span></ins>
                        </span>
                        <div className="rating">
                          <div className="star star-5"></div>
                          <div className="review-count">
                            (3<span> reviews</span>)
                          </div>
                        </div>
                        <div className="description">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                        <div className="variations">
                          <table cellSpacing="0">
                            <tbody>
                              <tr>
                                <td className="label">Size</td>
                                <td className="attributes">
                                  <ul className="text">
                                    {sizes.map((size) => (
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
                              <tr>
                                <td className="label">Color</td>
                                <td className="attributes">
                                  <ul className="colors">
                                    {colors.map((color, index) => (
                                      <li key={color}>
                                        <span 
                                          className={`${color} ${selectedColor === color ? 'selected' : ''}`}
                                          onClick={() => setSelectedColor(color)}
                                          style={{ cursor: 'pointer' }}
                                        ></span>
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="buttons">
                          <div className="add-to-cart-wrap">
                            <div className="quantity">
                              <button type="button" className="plus" onClick={() => handleQuantityChange(1)}>+</button>
                              <input 
                                type="number" 
                                className="qty" 
                                step="1" 
                                min="0" 
                                max="" 
                                name="quantity" 
                                value={quantity} 
                                title="Qty" 
                                size="4" 
                                placeholder="" 
                                inputMode="numeric" 
                                autoComplete="off"
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                              />
                              <button type="button" className="minus" onClick={() => handleQuantityChange(-1)}>-</button>
                            </div>
                            <div className="btn-add-to-cart">
                              <a href="#" tabIndex="0">Add to cart</a>
                            </div>
                          </div>
                          <div className="btn-quick-buy" data-title="Wishlist">
                            <button className="product-btn">Buy It Now</button>
                          </div>
                          <div className="btn-wishlist" data-title="Wishlist">
                            <button className="product-btn">Add to wishlist</button>
                          </div>
                          <div className="btn-compare" data-title="Compare">
                            <button className="product-btn">Compare</button>
                          </div>
                        </div>
                        <div className="product-meta">
                          <span className="sku-wrapper">SKU: <span className="sku">D2300-3-2-2</span></span>
                          <span className="posted-in">Category: <Link to="/shop" rel="tag">Bracelets</Link></span>
                          <span className="tagged-as">Tags: <Link to="/shop" rel="tag">Hot</Link>, <Link to="/shop" rel="tag">Trend</Link></span>
                        </div>
                        <div className="social-share">
                          <a href="#" title="Facebook" className="share-facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i>Facebook</a>
                          <a href="#" title="Twitter" className="share-twitter"><i className="fa fa-twitter"></i>Twitter</a>
                          <a href="#" title="Pinterest" className="share-pinterest"><i className="fa fa-pinterest"></i>Pinterest</a>
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
                          >
                            Description
                          </a>
                        </li>
                        <li className="nav-item">
                          <a 
                            className={`nav-link ${activeTab === 'additional-information' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setActiveTab('additional-information'); }}
                            role="tab"
                          >
                            Additional information
                          </a>
                        </li>
                        <li className="nav-item">
                          <a 
                            className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setActiveTab('reviews'); }}
                            role="tab"
                          >
                            Reviews (1)
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        {activeTab === 'description' && (
                          <div className="tab-pane fade show active" id="description" role="tabpanel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                          </div>
                        )}
                        {activeTab === 'additional-information' && (
                          <div className="tab-pane fade show active" id="additional-information" role="tabpanel">
                            <table className="product-attributes">
                              <tbody>
                                <tr className="attribute-item">
                                  <th className="attribute-label">Color</th>
                                  <td className="attribute-value">Antique, Chestnut, Grullo</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        {activeTab === 'reviews' && (
                          <div className="tab-pane fade show active" id="reviews" role="tabpanel">
                            <div id="reviews" className="product-reviews">
                              <div id="comments">
                                <h2 className="reviews-title">1 review for <span>Bora Armchair</span></h2>
                                <ol className="comment-list">
                                  <li className="review">
                                    <div className="content-comment-container">
                                      <div className="comment-container">
                                        <img src="/media/user.jpg" className="avatar" height="60" width="60" alt="" />
                                        <div className="comment-text">
                                          <div className="rating small">
                                            <div className="star star-5"></div>
                                          </div>
                                          <div className="review-author">Peter Capidal</div>
                                          <div className="review-time">January 12, 2023</div>
                                        </div>
                                      </div>
                                      <div className="description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                              <div id="review-form">
                                <div id="respond" className="comment-respond">
                                  <span id="reply-title" className="comment-reply-title">Add a review</span>
                                  <form action="#" method="post" id="comment-form" className="comment-form">
                                    <p className="comment-notes">
                                      <span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
                                    </p>
                                    <div className="comment-form-rating">
                                      <label htmlFor="rating">Your rating</label>
                                      <p className="stars">
                                        <span>
                                          <a className="star-1" href="#" onClick={(e) => e.preventDefault()}>1</a>
                                          <a className="star-2" href="#" onClick={(e) => e.preventDefault()}>2</a>
                                          <a className="star-3" href="#" onClick={(e) => e.preventDefault()}>3</a>
                                          <a className="star-4" href="#" onClick={(e) => e.preventDefault()}>4</a>
                                          <a className="star-5" href="#" onClick={(e) => e.preventDefault()}>5</a>
                                        </span>
                                      </p>
                                    </div>
                                    <p className="comment-form-comment">
                                      <textarea id="comment" name="comment" placeholder="Your Reviews *" cols="45" rows="8" ariaRequired="true" required></textarea>
                                    </p>
                                    <div className="content-info-reviews">
                                      <p className="comment-form-author">
                                        <input id="author" name="author" placeholder="Name *" type="text" defaultValue="" size="30" ariaRequired="true" required />
                                      </p>
                                      <p className="comment-form-email">
                                        <input id="email" name="email" placeholder="Email *" type="email" defaultValue="" size="30" ariaRequired="true" required />
                                      </p>
                                      <p className="form-submit">
                                        <input name="submit" type="submit" id="submit" className="submit" value="Submit" />
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

              {/* Related Products */}
              <div className="product-related">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="block block-products slider">
                      <div className="block-title"><h2>Related Products</h2></div>
                      <div className="block-content">
                        <div className="content-product-list slick-wrap">
                          <div className="slick-sliders products-list grid" data-slidestoscroll="true" data-dots="false" data-nav="1" data-columns4="1" data-columns3="2" data-columns2="3" data-columns1="3" data-columns1440="4" data-columns="4">
                            {relatedProducts.map((product) => (
                              <div key={product.id} className="item-product slick-slide">
                                <div className="items">
                                  <div className="products-entry clearfix product-wapper">
                                    <div className="products-thumb">
                                      {product.label && (
                                        <div className="product-lable">
                                          {product.discount && <div className="onsale">{product.discount}</div>}
                                          {(product.label === 'hot' || product.label === 'both') && <div className="hot">Hot</div>}
                                        </div>
                                      )}
                                      <div className="product-thumb-hover">
                                        <Link to="/details">
                                          <img width="600" height="600" src={product.image} className="post-image" alt={product.name} />
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
                                      {product.outOfStock && (
                                        <div className="product-stock">
                                          <span className="stock">Out Of Stock</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="products-content">
                                      <div className="contents text-center">
                                        <h3 className="product-title"><Link to="/details">{product.name}</Link></h3>
                                        <div className="rating">
                                          <div className={`star star-${product.rating}`}></div>
                                        </div>
                                        <span className="price">
                                          {product.originalPrice ? (
                                            <>
                                              <del aria-hidden="true"><span>${product.originalPrice.toFixed(2)}</span></del>
                                              <ins><span>${product.price.toFixed(2)}</span></ins>
                                            </>
                                          ) : (
                                            `$${product.price.toFixed(2)}`
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
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
    </div>
  );
}

export default Details;
