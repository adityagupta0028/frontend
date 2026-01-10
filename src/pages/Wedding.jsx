import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useGetSubCategoryQuery } from '../Services/CategoryApi';
import { useGetProductQuery } from '../Services/ProductApi';
import { GetUrl } from '../config/GetUrl';
import './Wedding.css';
import SubCategoryCarousel from '../components/category/subCategoryCarousel';
import ProductsGrid from '../components/products/ProductsGrid';
import FilterSidebar from '../components/FilterSidebar';
import CustomDropdown from '../components/CustomDropdown';
import { SlEqualizer } from "react-icons/sl";

// Wedding Category ID
const WEDDING_CATEGORY_ID = '6945ae7225a47dcbe1667cb5';



function Wedding() {
  const [layoutView, setLayoutView] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedView, setSelectedView] = useState({ 
    label: 'Angled View', 
    value: 'Angled view',
    image: '/assets/img/rings/angled.png' 
  });
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [viewAngleChanged, setViewAngleChanged] = useState(false);

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

  // Clean up filters - remove null, undefined, and empty arrays
  const cleanedFilters = useMemo(() => {
    const cleaned = {};
    Object.keys(selectedFilters).forEach(key => {
      const value = selectedFilters[key];
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          // Only include non-empty arrays
          if (value.length > 0) {
            cleaned[key] = value;
          }
        } else {
          // Include single values (ObjectId strings)
          cleaned[key] = value;
        }
      }
    });
    return cleaned;
  }, [selectedFilters]);

  // Build query parameters - only include viewAngle if user has explicitly changed it
  const queryParams = useMemo(() => {
    const params = {
      categoryId: WEDDING_CATEGORY_ID,
      limit: 20,
      page: 1,
      ...cleanedFilters,
    };
    
    // Only add viewAngle if user has explicitly selected a view (not default)
    if (viewAngleChanged && selectedView?.value) {
      params.viewAngle = selectedView.value;
    }
    
    return params;
  }, [cleanedFilters, viewAngleChanged, selectedView]);

  // Fetch products for Wedding category
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
    refetch
  } = useGetProductQuery(queryParams, {
    // Force refetch when queryParams change
    refetchOnMountOrArgChange: true,
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

        // Build all images array
        const allImages = images.map(img => buildImageUrl(img));

        // Build metal_images array with proper URLs
        const metalImages = product.metal_images && product.metal_images.length > 0
          ? product.metal_images.map((metalImg) => ({
              metal_type: metalImg.metal_type,
              view_angle: metalImg.view_angle,
              image: buildImageUrl(metalImg.image)
            }))
          : [];

        return {
          id: product._id || product.product_id,
          name: product.product_name || 'Product',
          price: discountedPrice,
          originalPrice: originalPrice,
          image: mainImage,
          hoverImage: hoverImage,
          images: allImages, // Pass full images array for slider
          metal_images: metalImages, // Include metal_images with proper URLs
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

  // View dropdown options with images
  const viewOptions = [
    { 
      label: 'Angled View', 
      value: 'Angled view',
      image: '/assets/img/rings/angled.png' 
    },
    { 
      label: 'Top View', 
      value: 'Top view',
      image: '/assets/img/rings/top.png' 
    },
    { 
      label: 'Side View', 
      value: 'Side view',
      image: '/assets/img/rings/side.png' 
    }
  ];

  const sortOptions = [
    { 
      label: 'Featured', 
      value: 'Featured',
    },
    { 
      label: 'Price: High to Low', 
      value: 'Price: High to Low',
    },
    { 
      label: 'Price: Low to High', 
      value: 'Price: Low to High',
    }
  ];

  const handleViewSelect = (view) => {
    // Handle both string and object formats
    if (typeof view === 'string') {
      // If string, find the matching option object
      const foundOption = viewOptions.find(opt => opt.value === view || opt.label === view);
      setSelectedView(foundOption || view);
    } else {
      setSelectedView(view);
    }
    // Mark that view angle has been changed from default
    setViewAngleChanged(true);
  };

  const handleSortSelect = (sort) => {
    // Handle both string and object formats
    if (typeof sort === 'string') {
      setSelectedSort(sort);
    } else {
      const sortValue = sort?.value || sort?.label || 'Featured';
      setSelectedSort(sortValue);
    }
  };

  const handleFilterChange = (filters) => {
    console.log('Filter change triggered:', filters);
    setSelectedFilters(filters);
  };

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
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
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
                    <div className="products-topbar bg-gray-100 px-[10px] py-[5px] flex items-center justify-between border border-[#e1e1e1] rounded-[2px]">
                      <div className="products-topbar-left flex items-center gap-[15px]">
                        <button className="filter-open-btn flex items-center gap-[5px] !text-[15px] !font-medium bg-transparent border rounded-0 !border-[#cb8161] !text-[#cb8161] " onClick={() => setIsFilterOpen(true)}> <SlEqualizer size={18} /> Filter</button>
                        <div className='result'>{products.length} Results</div>
                      </div>

                      <div className="products-topbar-right flex justify-end items-center gap-[30px]">
                        <CustomDropdown
                          options={viewOptions}
                          selectedValue={selectedView}
                          onSelect={handleViewSelect}
                          chevronSize={10}
                        />

                        <CustomDropdown
                          options={sortOptions}
                          selectedValue={selectedSort}
                          onSelect={handleSortSelect}
                          chevronSize={10}
                          type="sort"
                          staticText="Sort"
                        />
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

