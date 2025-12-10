import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductsGrid({ products = [] }) {
  const [sortBy, setSortBy] = useState('default');
  const [filterInStock, setFilterInStock] = useState(false);

  // Sample products data - in real app, this would come from props or API
  const sampleProducts = products.length > 0 ? products : [
    { id: 1, name: 'Vera', price: 2340, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: false },
    { id: 2, name: 'Amelia', price: 2590, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: true },
    { id: 3, name: 'Athena', price: 4680, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: true },
    { id: 4, name: 'Audrey', price: 1685, image: 'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/RIGTXR05314O250/thumb/RIGTXR05314O250-GY4_1.jpg', inStock: true, hasMatchingBand: true },
    
  ];

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  let filteredProducts = [...sampleProducts];

  // Filter by stock
  if (filterInStock) {
    filteredProducts = filteredProducts.filter(p => p.inStock);
  }

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="products-section">
      <div className="products-list grid">
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="products-entry clearfix product-wapper">
                <div className="products-thumb">
                  {product.hasMatchingBand && (
                    <div className="product-label">
                      <div className="matching-band">MATCHING BAND</div>
                    </div>
                  )}
                  <div className="product-thumb-hover">
                    <Link to={`/details/${product.id}`}>
                      <img 
                        src={product.image} 
                        className="post-image engagement-product-image" 
                        alt={product.name}
                        onError={(e) => {
                          console.error('Image failed to load:', product.image);
                          e.target.src = '/media/product/1.jpg';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', product.name);
                        }}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                </div>
                <div className="products-content">
                  <div className="contents text-center">
                    <h3 className="product-title">
                      <Link to={`/details/${product.id}`}>{product.name}</Link>
                    </h3>
                    <span className="price">${product.price.toLocaleString('de-DE')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsGrid;

