import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useGetSubCategoryQuery } from '../Services/CategoryApi';
import { useGetProductQuery } from '../Services/ProductApi';
import { GetUrl } from '../config/GetUrl';
import './Wedding.css';

// Wedding Category ID
const WEDDING_CATEGORY_ID = '6939a0978c7aaa4fcdf5940c';

function Wedding() {
  const [layoutView, setLayoutView] = useState('grid');

  // Fetch subcategories for Wedding category
  const { 
    data: subcategoriesData, 
    isLoading: subcategoriesLoading,
    error: subcategoriesError 
  } = useGetSubCategoryQuery(WEDDING_CATEGORY_ID);

  // Transform subcategories from API
  const subcategories = useMemo(() => {
    if (subcategoriesData?.data?.subcategories && subcategoriesData.data.subcategories.length > 0) {
      return subcategoriesData.data.subcategories.map((sub, index) => ({
        id: sub._id || index + 1,
        name: sub.title || sub.subCategoryName || 'Subcategory',
        image: sub.image 
          ? (sub.image.startsWith('http') 
              ? sub.image 
              : `${GetUrl.IMAGE_URL}${sub.image}`)
          : `/media/product/cat-6-${(index % 6) + 1}.jpg`,
      }));
    }
    // Fallback to default subcategories if API data is not available
    return [
      { id: 1, name: 'Bracelets', image: '/media/product/cat-6-1.jpg' },
      { id: 2, name: 'Charms', image: '/media/product/cat-6-2.jpg' },
      { id: 3, name: 'Earrings', image: '/media/product/cat-6-3.jpg' },
      { id: 4, name: 'Necklaces', image: '/media/product/cat-6-4.jpg' },
      { id: 5, name: 'Rings', image: '/media/product/cat-6-5.jpg' },
      { id: 6, name: 'Rings', image: '/media/product/cat-6-6.jpg' },
    ];
  }, [subcategoriesData]);

  // Fetch products for Wedding category
  const { 
    data: productsData, 
    isLoading: productsLoading,
    error: productsError 
  } = useGetProductQuery({
    categoryId: WEDDING_CATEGORY_ID,
    limit: 20,
    page: 1,
  });

  // Transform products from API
  const products = useMemo(() => {
    if (productsData?.data?.products && productsData.data.products.length > 0) {
      return productsData.data.products.map((product) => {
        const images = product.images || [];
        const mainImage = images[0] 
          ? (images[0].startsWith('http') 
              ? images[0] 
              : `${GetUrl.IMAGE_URL}/${images[0]}`)
          : '/media/product/1.jpg';
        const hoverImage = images[1] 
          ? (images[1].startsWith('http') 
              ? images[1] 
              : `${GetUrl.IMAGE_URL}/${images[1]}`)
          : mainImage;
        
        const originalPrice = product.original_price || 0;
        const discountedPrice = product.discounted_price || originalPrice;
        const discount = originalPrice && discountedPrice < originalPrice
          ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
          : null;
        
        let label = null;
        if (product.promotion_label) label = 'hot';
        if (product.discount_label || discount) label = label ? 'both' : 'sale';
        
        return {
          id: product._id || product.product_id,
          name: product.product_name || 'Product',
          price: discountedPrice,
          originalPrice: originalPrice,
          image: mainImage,
          hoverImage: hoverImage,
          rating: product.average_rating || 0,
          reviews: product.review_count || 0,
          label: label,
          discount: discount ? `-${discount}%` : null,
          hasFilters: false,
          hasBorder: false,
        };
      });
    }
    // Fallback to default products if API data is not available
    return [
      { id: 1, name: 'Medium Flat Hoops', price: 150.00, image: '/media/product/1.jpg', hoverImage: '/media/product/1-2.jpg', rating: 0, reviews: 0, label: 'hot', hasFilters: true },
      { id: 2, name: 'Yilver And Turquoise Earrings', price: 100.00, originalPrice: 150.00, image: '/media/product/5.jpg', hoverImage: '/media/product/5-2.jpg', rating: 5, reviews: 1, label: 'sale', discount: '-33%', hasBorder: true },
      { id: 3, name: 'Bold Pearl Hoop Earrings', price: 150.00, image: '/media/product/2.jpg', hoverImage: '/media/product/2-2.jpg', rating: 0, reviews: 0 },
      { id: 4, name: 'Bora Armchair', price: 100.00, originalPrice: 150.00, image: '/media/product/6.jpg', hoverImage: '/media/product/6-2.jpg', rating: 4, reviews: 2, label: 'both', discount: '-33%', hasBorder: true },
      { id: 5, name: 'Twin Hoops', price: 90.00, originalPrice: 100.00, image: '/media/product/3.jpg', hoverImage: '/media/product/3-2.jpg', rating: 5, reviews: 5, label: 'both', discount: '-23%' },
      { id: 6, name: 'Diamond Bracelet', price: 50.00, originalPrice: 79.00, image: '/media/product/7.jpg', hoverImage: '/media/product/7-2.jpg', rating: 0, reviews: 0, label: 'sale', discount: '-37%', hasBorder: true },
      { id: 7, name: 'Yilver And Turquoise Earrings', price: 120.00, image: '/media/product/4.jpg', hoverImage: '/media/product/4-2.jpg', rating: 0, reviews: 0 },
      { id: 8, name: 'X Hoop Earrings', price: 180.00, originalPrice: 200.00, image: '/media/product/8.jpg', hoverImage: '/media/product/8-2.jpg', rating: 5, reviews: 3, label: 'sale', discount: '-10%', hasBorder: true },
      { id: 9, name: 'Yintage Medallion Necklace', price: 140.00, image: '/media/product/9.jpg', hoverImage: '/media/product/9-2.jpg', rating: 4, reviews: 1, label: 'hot', hasBorder: true },
    ];
  }, [productsData]);

  const isLoading = subcategoriesLoading || productsLoading;

  const shapes = ['Round', 'Princess', 'Oval', 'Cushio', 'Radiant'];
  const carats = ['2', '3', '4', '5', '6', '7', '8'];

  // Show loading state
  if (isLoading) {
    return (
      <div id="site-main" className="site-main">
        <div className="section-padding">
          <div className="section-container p-l-r text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (subcategoriesError || productsError) {
    return (
      <div id="site-main" className="site-main">
        <div className="section-padding">
          <div className="section-container p-l-r text-center">
            <p>Error loading data. Please try again later.</p>
            {subcategoriesError && <p className="text-danger">Subcategories Error: {subcategoriesError.message}</p>}
            {productsError && <p className="text-danger">Products Error: {productsError.message}</p>}
          </div>
        </div>
      </div>
    );
  }
console.log("subcategories===>",subcategories);
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            {/* title for category  */}
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">
                    Wedding Bands & Anniversary Bands
                  </h1>
                </div>
                <div className="breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="delimiter"></span>
                  <Link to="/wedding">Wedding & Anniversary Bands</Link>
                  <span className="delimiter"></span>
                </div>
              </div>
            </div>

            {/* subcategories Slider Section */}
            <section className="section section-padding">
              <div className="section-container">
                <div className="block block-product-cats slider layout-4">
                  <div className="block-widget-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="product-cats-list slick-wrap">
                          <div className="slick-sliders content-category" data-slidestoscroll="true" data-dots="false" data-nav="1" data-columns4="1" data-columns3="2" data-columns2="2" data-columns1="3" data-columns1440="4" data-columns="4">
                            {subcategories.length > 0 ? (
                              subcategories.map((subcategory) => (
                                <div key={subcategory.id} className="slick-item slick-slide">
                                  <div className="item item-product-cat">
                                    <div className="item-product-cat-content">
                                      <Link to="/shop">
                                        <div className="item-image animation-horizontal">
                                          <img 
                                            width="298" 
                                            height="224" 
                                            src={subcategory.image} 
                                            alt={subcategory.name}
                                            onError={(e) => {
                                              e.target.src = `/media/product/cat-6-1.jpg`;
                                            }}
                                          />
                                        </div>
                                      </Link>
                                      <div className="product-cat-content-info">
                                        <h2 className="item-title">
                                          <Link to="/shop">{subcategory.name}</Link>
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center p-4">
                                <p>No subcategories available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* Products Section */}
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    {/* Products Topbar */}
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="d-flex gap-3 align-items-baseline">
                          <div className="products-count">Filter By</div>

                          <div className="products-sort dropdown">
                            <span className="sort-toggle dropdown-toggle border-0 p-2 text-muted" data-bs-toggle="dropdown" aria-expanded="true">Category</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="sort-toggle dropdown-toggle border-0 p-2 text-muted" data-bs-toggle="dropdown" aria-expanded="true">Type</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">Material</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">Gemstone Color</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">Chain</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">Size</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">Ring Size</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">Carat Weight</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>

                          <div className="products-sort dropdown">
                            <span className="border-0 p-2 sort-toggle dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-expanded="true">All Filter</span>
                            <ul className="sort-list dropdown-menu">
                              <li className="active"><a href="#">Default sorting</a></li>
                              <li><a href="#">Sort by popularity</a></li>
                              <li><a href="#">Sort by average rating</a></li>
                              <li><a href="#">Sort by latest</a></li>
                              <li><a href="#">Sort by price: low to high</a></li>
                              <li><a href="#">Sort by price: high to low</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="products-topbar-right">
                        <div className="products-sort dropdown">
                          <span className="sort-toggle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">Default sorting</span>
                          <ul className="sort-list dropdown-menu">
                            <li className="active"><a href="#">Default sorting</a></li>
                            <li><a href="#">Sort by popularity</a></li>
                            <li><a href="#">Sort by average rating</a></li>
                            <li><a href="#">Sort by latest</a></li>
                            <li><a href="#">Sort by price: low to high</a></li>
                            <li><a href="#">Sort by price: high to low</a></li>
                          </ul>
                        </div>
                        <ul className="layout-toggle nav nav-tabs">
                          <li className="nav-item">
                            <a 
                              className={`layout-grid nav-link ${layoutView === 'grid' ? 'active' : ''}`}
                              onClick={(e) => { e.preventDefault(); setLayoutView('grid'); }}
                              role="tab"
                            >
                              <span className="icon-column">
                                <span className="layer first"><span></span><span></span><span></span></span>
                                <span className="layer middle"><span></span><span></span><span></span></span>
                                <span className="layer last"><span></span><span></span><span></span></span>
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a 
                              className={`layout-list nav-link ${layoutView === 'list' ? 'active' : ''}`}
                              onClick={(e) => { e.preventDefault(); setLayoutView('list'); }}
                              role="tab"
                            >
                              <span className="icon-column">
                                <span className="layer first"><span></span><span></span></span>
                                <span className="layer middle"><span></span><span></span></span>
                                <span className="layer last"><span></span><span></span></span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Products Grid/List View */}
                    <div className="tab-content">
                      {layoutView === 'grid' ? (
                        <div className="tab-pane fade show active" id="layout-grid" role="tabpanel">
                          <div className="products-list grid">
                            <div className="row">
                              {products.map((product) => (
                                <div key={product.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                  <div className="products-entry clearfix product-wapper">
                                    <div className="products-thumb">
                                      {product.label && (
                                        <div className="product-lable">
                                          {product.discount && <div className="onsale">{product.discount}</div>}
                                          {(product.label === 'hot' || product.label === 'both') && <div className="hot">Hot</div>}
                                        </div>
                                      )}
                                      <div className={`product-thumb-hover ${product.hasBorder ? 'border' : ''}`}>
                                        <Link to={`/details?productId=${product.id}`}>
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
                                    </div>
                                    <div className="products-content">
                                      <div className="contents text-center">
                                        <div className="rating">
                                          <div className={`star star-${product.rating}`}></div>
                                          <span className="count">({product.reviews} review{product.reviews !== 1 ? 's' : ''})</span>
                                        </div>
                                        <h3 className="product-title"><Link to={`/details?productId=${product.id}`}>{product.name}</Link></h3>
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

                                      {product.hasFilters && (
                                        <>
                                          <div className="d-flex align-items-center position-relative mb-3">
                                            <p className="pe-3 mb-0 sstyle">Shape:</p>
                                            <button 
                                              className="scroll-arrow left"
                                              onClick={(e) => {
                                                const ul = e.target.nextElementSibling;
                                                if (ul) ul.scrollBy({ left: -150, behavior: 'smooth' });
                                              }}
                                            >
                                              &#10094;
                                            </button>
                                            <ul className="shape-scroll d-flex flex-nowrap list-unstyled overflow-auto mb-0">
                                              {shapes.map((shape, idx) => (
                                                <li key={idx} className={idx === 0 ? "level-1 menu-item px-2" : "px-2"}>
                                                  <Link to="/shop"><span className="menu-item-text">{shape}</span></Link>
                                                </li>
                                              ))}
                                            </ul>
                                            <button 
                                              className="scroll-arrow right"
                                              onClick={(e) => {
                                                const ul = e.target.previousElementSibling;
                                                if (ul) ul.scrollBy({ left: 150, behavior: 'smooth' });
                                              }}
                                            >
                                              &#10095;
                                            </button>
                                          </div>

                                          <div className="d-flex align-items-center position-relative">
                                            <p className="pe-3 mb-0 sstyle">Caret:</p>
                                            <button 
                                              className="scroll-arrow left"
                                              onClick={(e) => {
                                                const ul = e.target.nextElementSibling;
                                                if (ul) ul.scrollBy({ left: -150, behavior: 'smooth' });
                                              }}
                                            >
                                              &#10094;
                                            </button>
                                            <ul className="shape-scroll d-flex flex-nowrap list-unstyled overflow-auto mb-0">
                                              {carats.map((carat, idx) => (
                                                <li key={idx} className={idx === 0 ? "level-1 menu-item px-3 border" : "px-3 border ms-3"}>
                                                  <Link to="/shop"><span className="menu-item-text">{carat}</span></Link>
                                                </li>
                                              ))}
                                            </ul>
                                            <button 
                                              className="scroll-arrow right"
                                              onClick={(e) => {
                                                const ul = e.target.previousElementSibling;
                                                if (ul) ul.scrollBy({ left: 150, behavior: 'smooth' });
                                              }}
                                            >
                                              &#10095;
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="tab-pane fade show active" id="layout-list" role="tabpanel">
                          <div className="products-list list">
                            {products.slice(0, 5).map((product) => (
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
                                        <Link to={`/details?productId=${product.id}`}>
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
                                      <h3 className="product-title"><Link to={`/details?productId=${product.id}`}>{product.name}</Link></h3>
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
                                      <div className="rating">
                                        <div className={`star star-${product.rating}`}></div>
                                        <div className="review-count">
                                          ({product.reviews}<span> review{product.reviews !== 1 ? 's' : ''}</span>)
                                        </div>
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
                                      </div>
                                      <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Section */}
            <section className="section section-padding background-img bg-img-3 p-t-70 p-b-70 m-b-0">
              <div className="section-container">
                <div className="block block-feature layout-2">
                  <div className="block-widget-wrap">
                    <div className="block-title">
                      <h2 className="t-brown">Lorem Ipsum Lorem</h2>
                    </div>
                    <div className="row">
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="box-icon animation-horizontal">
                            <span>
                              <i className="icon-truck"></i>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">Shipping Worldwide</h3>
                            <p className="box-description">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="box-icon icon-2 animation-horizontal">
                            <span>
                              <i className="icon-refresh"></i>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">14 Days Return</h3>
                            <p className="box-description">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="box">
                          <div className="box-icon icon-3 animation-horizontal">
                            <span>
                              <i className="icon-lock"></i>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">Security Payment</h3>
                            <p className="box-description">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 sm-m-b-50">
                        <div className="box">
                          <div className="box-icon animation-horizontal">
                            <span>
                              <i className="icon-truck"></i>
                            </span>
                          </div>
                          <div className="box-title-wrap">
                            <h3 className="box-title">Shipping Worldwide</h3>
                            <p className="box-description">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wedding;

