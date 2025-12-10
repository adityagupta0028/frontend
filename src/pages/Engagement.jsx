import { Link } from 'react-router-dom';
import CategoryCarousel from '../components/category/CategoryCarousel';
import SubCategory from '../components/subcategory/SubCategory';
import ProductsGrid from '../components/products/ProductsGrid';
import './Engagement.css';

function Engagement() {
  // Sample subcategories - in real app, this would come from API or state
  const subcategories = [
    { id: 1, name: 'Classic', slug: 'classic' },
    { id: 2, name: 'Modern', slug: 'modern' },
    { id: 3, name: 'Vintage', slug: 'vintage' },
    { id: 4, name: 'Custom', slug: 'custom' },
  ];

  // Sample products - in real app, this would come from API
  const products = [
    { id: 1, name: 'Vera', price: 2340, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: false },
    { id: 2, name: 'Amelia', price: 2770, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: true },
    { id: 3, name: 'Athena', price: 4680, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: true },
    { id: 4, name: 'Audrey', price: 1685, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: true },
    
    
  ];

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Hero Banner Section */}
          <div className="engagement-hero-banner">
            <div className="hero-breadcrumbs">
              <Link to="/">Home</Link>
              <span className="delimiter">/</span>
              <Link to="/engagement-rings">Engagement Rings</Link>
            </div>
            <div className="hero-content-wrapper">
              <div className="hero-left-content">
                <h1 className="hero-title">Engagement Rings</h1>
                <p className="hero-description">
                  For the moment that lasts a lifetime. Begin forever beautifully with rings made for lasting love.
                </p>
                <Link to="/shop" className="hero-shop-button">
                  Shop All
                </Link>
              </div>
              <div className="hero-right-visuals">
                <div className="ring-set ring-set-1">
                  <img src="/media/product/cat-1.jpg" alt="Pear-shaped diamond ring" />
                </div>
                <div className="ring-set ring-set-2">
                  <img src="/media/product/cat-4.jpg" alt="Emerald-cut diamond ring" />
                </div>
                <div className="ring-set ring-set-3">
                  <img src="/media/product/cat-3.jpg" alt="Princess-cut diamond ring" />
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                {/* Category Carousel Section */}
                <div className="category-section">
                  <CategoryCarousel />
                </div>

                {/* Products Grid Section */}
                <div className="products-section-wrapper">
                  <ProductsGrid products={products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Engagement;

