import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useGetSubCategoryQuery } from '../Services/CategoryApi';
import { useGetProductQuery } from '../Services/ProductApi';
import { GetUrl } from '../config/GetUrl';
import './Wedding.css';
import SubCategoryCarousel from '../components/category/subCategoryCarousel';
import ProductsGrid from '../components/products/ProductsGrid';

// Wedding Category ID
const WEDDING_CATEGORY_ID = '6942e3b741e766bf37919b9c';



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
            : `${GetUrl.API_URL}${sub.image}`)
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
        const buildImageUrl = (imgPath) => {
          if (!imgPath) return '/media/product/1.jpg';
          if (imgPath.startsWith('http')) return imgPath;
          // Handle both cases: path with or without leading slash
          const cleanPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
          const baseUrl = GetUrl.IMAGE_URL?.endsWith('/') 
            ? GetUrl.IMAGE_URL.slice(0, -1) 
            : GetUrl.IMAGE_URL;
          return `${baseUrl}${cleanPath}`;
        };
        const mainImage = buildImageUrl(images[0]);
        const hoverImage = images[1] ? buildImageUrl(images[1]) : mainImage;

        const originalPrice = product.original_price || 0;
        const discountedPrice = product.discounted_price || originalPrice;
        const discount = originalPrice && discountedPrice < originalPrice
          ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
          : null;

        let label = null;
        if (product.promotion_label) label = 'hot';
        if (product.discount_label || discount) label = label ? 'both' : 'sale';

        // Check if product has variants with metal type or carat weight
        const hasVariants = product.variants && product.variants.length > 0;
        const hasMetalTypes = hasVariants && product.variants.some(v => v.metal_type);
        const hasCaratWeights = hasVariants && product.variants.some(v => v.carat_weight);
        const hasFilters = hasMetalTypes || hasCaratWeights;

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
          hasFilters: hasFilters,
          hasBorder: false,
          variants: product.variants || [],
        };
      });
    }
    return [];
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
            <SubCategoryCarousel data={subcategories} />


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
                    <ProductsGrid products={products} layoutView={layoutView} />
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

