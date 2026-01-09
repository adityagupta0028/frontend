import { useState, useMemo, useEffect } from 'react';
import { useGetFilteredVisibilityQuery } from '../Services/ProductApi';
import { GetUrl } from '../config/GetUrl';

function FilterSidebar({ isOpen, onClose, selectedFilters = {}, onFilterChange }) {
  // Fetch filtered visibility data
  const {
    data: filtersData,
    isLoading: filtersLoading,
    error: filtersError
  } = useGetFilteredVisibilityQuery();

  // Transform filter data from API to match filterSections structure
  const filterSections = useMemo(() => {
    if (filtersData?.data?.filters && filtersData.data.filters.length > 0) {
      return filtersData.data.filters.map((filter) => {
        const buildImageUrl = (imgPath) => {
          if (!imgPath) return '/media/product/cat-6-1.jpg';
          if (imgPath.startsWith('http')) return imgPath;
          const cleanPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
          const baseUrl = GetUrl.IMAGE_URL?.endsWith('/') 
            ? GetUrl.IMAGE_URL.slice(0, -1) 
            : GetUrl.IMAGE_URL;
          return `${baseUrl}${cleanPath}`;
        };

        return {
          key: filter.filterKey,
          title: filter.filterName,
          items: filter.data.map((item, index) => ({
            id: item._id ? String(item._id) : null,
            title: item.displayName || item.code || 'Item',
            image: item.image 
              ? buildImageUrl(item.image)
              : `/media/product/cat-6-${(index % 6) + 1}.jpg`,
          })),
        };
      });
    }
    // Fallback to default filter sections if API data is not available
    return [
      {
        key: 'ringStyle',
        title: 'Ring Style',
        items: [
          { title: 'Classic', image: '/media/product/cat-6-1.jpg' },
          { title: 'Vintage', image: '/media/product/cat-6-2.jpg' },
          { title: 'Halo', image: '/media/product/cat-6-3.jpg' },
          { title: 'Solitaire', image: '/media/product/cat-6-4.jpg' },
          { title: 'Three-Stone', image: '/media/product/cat-6-5.jpg' },
          { title: 'Pavé', image: '/media/product/cat-6-6.jpg' },
        ],
      },
      {
        key: 'diamondShape',
        title: 'Diamond Shape',
        items: [
          { title: 'Round', image: '/media/product/cat-6-1.jpg' },
          { title: 'Princess', image: '/media/product/cat-6-2.jpg' },
          { title: 'Oval', image: '/media/product/cat-6-3.jpg' },
          { title: 'Cushion', image: '/media/product/cat-6-4.jpg' },
          { title: 'Radiant', image: '/media/product/cat-6-5.jpg' },
          { title: 'Pear', image: '/media/product/cat-6-6.jpg' },
        ],
      },
      {
        key: 'metal',
        title: 'Metal',
        items: [
          { title: 'Platinum', image: '/media/product/cat-6-1.jpg' },
          { title: 'White Gold', image: '/media/product/cat-6-2.jpg' },
          { title: 'Yellow Gold', image: '/media/product/cat-6-3.jpg' },
          { title: 'Rose Gold', image: '/media/product/cat-6-4.jpg' },
          { title: 'Mixed Metal', image: '/media/product/cat-6-5.jpg' },
          { title: 'Sterling Silver', image: '/media/product/cat-6-6.jpg' },
        ],
      },
    ];
  }, [filtersData]);

  const [accordionState, setAccordionState] = useState({});

  // Initialize accordion state when filterSections change
  useEffect(() => {
    if (filterSections.length > 0) {
      setAccordionState((prev) => {
        // Only initialize if accordionState is empty
        if (Object.keys(prev).length === 0) {
          return filterSections.reduce((acc, section) => ({ ...acc, [section.key]: true }), {});
        }
        // Otherwise, merge new sections that might not exist yet
        const newState = { ...prev };
        filterSections.forEach((section) => {
          if (!(section.key in newState)) {
            newState[section.key] = true;
          }
        });
        return newState;
      });
    }
  }, [filterSections]);

  const toggleAccordion = (key) => {
    setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterItemClick = (filterKey, itemId) => {
    if (!onFilterChange) return;
    
    // Ensure itemId is a string for consistent comparison
    const itemIdStr = String(itemId);
    
    console.log('Filter item clicked:', { filterKey, itemId: itemIdStr, originalItemId: itemId });
    
    const currentFilterValues = selectedFilters[filterKey];
    
    // Determine if this filter accepts arrays or single values based on the filter key
    const arrayFilters = [
      'shankTreatments',
      'styles',
      'settingFeatures',
      'motifThemes',
      'ornamentDetails',
      'accentStoneShapes'
    ];
    
    let newFilterValues;
    
    if (arrayFilters.includes(filterKey)) {
      // Array filter - toggle selection
      const currentArray = Array.isArray(currentFilterValues) 
        ? currentFilterValues.map(id => String(id))
        : [];
      const isSelected = currentArray.includes(itemIdStr);
      
      if (isSelected) {
        newFilterValues = currentArray.filter(id => id !== itemIdStr);
      } else {
        newFilterValues = [...currentArray, itemIdStr];
      }
    } else {
      // Single value filter - replace selection (allow switching between options)
      const currentValueStr = currentFilterValues ? String(currentFilterValues) : null;
      const isSelected = currentValueStr === itemIdStr;
      
      if (isSelected) {
        // If clicking the same item, deselect it
        newFilterValues = null;
      } else {
        // If clicking a different item, replace the selection
        newFilterValues = itemIdStr;
      }
    }

    console.log('New filter values:', { filterKey, newFilterValues, currentFilterValues });
    
    onFilterChange({
      ...selectedFilters,
      [filterKey]: newFilterValues
    });
  };

  const isFilterItemSelected = (filterKey, itemId) => {
    const currentFilterValues = selectedFilters[filterKey];
    if (currentFilterValues === null || currentFilterValues === undefined) return false;
    
    // Ensure both values are strings for comparison
    const itemIdStr = String(itemId);
    
    if (Array.isArray(currentFilterValues)) {
      return currentFilterValues.map(id => String(id)).includes(itemIdStr);
    }
    return String(currentFilterValues) === itemIdStr;
  };

  // Show loading state
  if (filtersLoading) {
    return (
      <>
        {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
          <div className="filter-sidebar-header d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Filters</h3>
            <button className="filter-close-btn" aria-label="Close filters" onClick={onClose}>×</button>
          </div>
          <div className="filter-sidebar-body">
            <div className="text-center p-4">Loading filters...</div>
          </div>
        </div>
      </>
    );
  }

  // Show error state (still show sidebar with error message)
  if (filtersError) {
    return (
      <>
        {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
          <div className="filter-sidebar-header d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Filters</h3>
            <button className="filter-close-btn" aria-label="Close filters" onClick={onClose}>×</button>
          </div>
          <div className="filter-sidebar-body">
            <div className="text-center p-4 text-danger">
              Error loading filters. Using default filters.
            </div>
            {/* Render default filters even on error */}
            {filterSections.map((section) => (
              <div key={section.key} className="filter-accordion">
                <button
                  className="filter-accordion-toggle d-flex justify-content-between align-items-center w-100"
                  onClick={() => toggleAccordion(section.key)}
                >
                  <span>{section.title}</span>
                  <span className="toggle-indicator">{accordionState[section.key] ? '−' : '+'}</span>
                </button>
                {accordionState[section.key] && (
                  <div className="filter-accordion-content">
                    <div className="filter-items">
                      {section.items.map((item, idx) => {
                        const isSelected = isFilterItemSelected(section.key, item.id);
                        return (
                          <div 
                            key={`${section.key}-${idx}`} 
                            className={`filter-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleFilterItemClick(section.key, item.id)}
                            style={{ 
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.8';
                              e.currentTarget.style.transform = 'scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <div className="filter-item-thumb" style={{ position: 'relative' }}>
                              <img src={item.image} alt={item.title} style={{ cursor: 'pointer' }} />
                              {isSelected && (
                                <div className="filter-item-check" style={{
                                  position: 'absolute',
                                  top: '5px',
                                  right: '5px',
                                  background: '#cb8161',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}>✓</div>
                              )}
                            </div>
                            <div className="filter-item-title" style={{ cursor: 'pointer' }}>{item.title}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
      <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="filter-sidebar-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Filters</h3>
          <button className="filter-close-btn" aria-label="Close filters" onClick={onClose}>×</button>
        </div>
        <div className="filter-sidebar-body">
          {filterSections.map((section) => (
            <div key={section.key} className="filter-accordion">
              <button
                className="filter-accordion-toggle d-flex justify-content-between align-items-center w-100"
                onClick={() => toggleAccordion(section.key)}
              >
                <span>{section.title}</span>
                <span className="toggle-indicator">{accordionState[section.key] ? '−' : '+'}</span>
              </button>
              {accordionState[section.key] && (
                <div className="filter-accordion-content">
                    <div className="filter-items">
                      {section.items.map((item, idx) => (
                        <div 
                          key={`${section.key}-${idx}`} 
                          className="filter-item"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.8';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <div className="filter-item-thumb">
                            <img src={item.image} alt={item.title} style={{ cursor: 'pointer' }} />
                          </div>
                          <div className="filter-item-title" style={{ cursor: 'pointer' }}>{item.title}</div>
                        </div>
                      ))}
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;

