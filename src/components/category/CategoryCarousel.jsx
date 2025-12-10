import { useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryCarousel() {
  const categories = [
    { id: 1, name: 'Solitaire', image: '/media/product/cat-1.jpg' },
    { id: 2, name: 'Side Stone', image: '/media/product/cat-2.jpg' },
    { id: 3, name: 'Halo', image: '/media/product/cat-3.jpg' },
    { id: 4, name: 'Three Stone', image: '/media/product/cat-4.jpg' },
    { id: 5, name: 'Hidden Halo', image: '/media/product/cat-5.jpg' },
    { id: 6, name: 'Bridal Sets', image: '/media/product/cat-6-1.jpg' },
    { id: 7, name: 'Eternity', image: '/media/product/cat-8-1.jpg' },
    { id: 8, name: 'Statement Rings', image: '/media/product/cat-3-1.jpg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= categories.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 
        ? Math.max(0, categories.length - itemsPerView) 
        : prev - itemsPerView
    );
  };

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <div className="category-carousel-wrapper">
      <div className="category-carousel">
        <button 
          className="carousel-nav prev" 
          onClick={prevSlide}
          aria-label="Previous categories"
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        
        <div className="category-items">
          {visibleCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/engagement-rings/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="category-item"
            >
              <div className="category-image">
                <img 
                  src={category.image} 
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = '/media/product/1.jpg';
                  }}
                />
              </div>
              <div className="category-name">{category.name}</div>
            </Link>
          ))}
        </div>
        
        <button 
          className="carousel-nav next" 
          onClick={nextSlide}
          aria-label="Next categories"
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default CategoryCarousel;

