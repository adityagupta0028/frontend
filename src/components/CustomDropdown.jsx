import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiSort } from "react-icons/bi";

function CustomDropdown({
  options = [],
  selectedValue,
  onSelect,
  buttonClassName = 'custom-dropdown-btn',
  dropdownClassName = 'custom-dropdown-panel',
  chevronSize = 10,
  containerStyle = {},
  buttonStyle = {},
  dropdownStyle = {},
  type = 'dropdown',
  staticText = '',
  leftIcon: LeftIcon = null,
  prefix = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value) => {
    if (onSelect) {
      onSelect(value);
    }
    setIsOpen(false);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Get display value and image - if selectedValue is a string, use it; if it's an object, use its label/value
  const getSelectedOption = () => {
    if (!selectedValue) {
      return null;
    }

    if (typeof selectedValue === 'string') {
      // Find matching option by value or label
      const found = options.find(opt => {
        if (typeof opt === 'string') {
          return opt === selectedValue;
        }
        const optValue = opt.value || opt.label;
        return optValue === selectedValue;
      });
      return found || null;
    }

    // selectedValue is an object, return it directly or find matching option
    if (typeof selectedValue === 'object') {
      // Check if it's already one of the options (reference equality)
      const found = options.find(opt => opt === selectedValue);
      if (found) return found;

      // Try to find by value or label
      const foundByValue = options.find(opt => {
        if (typeof opt === 'string') return false;
        return (opt.value === selectedValue.value || opt.label === selectedValue.label);
      });
      return foundByValue || selectedValue;
    }

    return null;
  };

  const selectedOption = getSelectedOption();

  // Determine display value: prioritize selected value, fallback to staticText or default
  let displayValue;

  // First, try to get value from selectedOption
  if (typeof selectedOption === 'string') {
    displayValue = selectedOption;
  } else if (selectedOption && typeof selectedOption === 'object') {
    displayValue = selectedOption.label || selectedOption.value;
  }

  // If we still don't have a display value, try selectedValue directly
  if (!displayValue && selectedValue) {
    if (typeof selectedValue === 'string') {
      displayValue = selectedValue;
    } else if (typeof selectedValue === 'object') {
      displayValue = selectedValue.label || selectedValue.value;
    }
  }

  // Final fallback: use staticText or default
  if (!displayValue) {
    displayValue = staticText || 'Select';
  }

  // Only show image if option has image property
  const displayImage = typeof selectedOption === 'object' && selectedOption?.image ? selectedOption.image : null;

  return (
    <div className={`custom-dropdown-container ${type}`} ref={dropdownRef} style={{ ...containerStyle }}>
      <button
        className={`${buttonClassName} flex items-center gap-[10px] w-full`}
        onClick={handleToggle}
        style={{ ...buttonStyle }}
      >
        <div className="flex items-center gap-[8px] flex-grow">
          {LeftIcon && <LeftIcon className="dropdown-left-icon" size={18} />}
          {!LeftIcon && displayImage && (
            <img
              src={displayImage}
              alt={displayValue}
              className="dropdown-display-image"
              style={{ width: '20px', height: '20px', objectFit: 'cover' }}
            />
          )}
          <div className="flex items-baseline gap-[5px] text-xs md:text-sm">
            {prefix && <span className="dropdown-prefix uppercase font-bold text-[#000080]">{prefix}</span>}
            <span className="dropdown-value uppercase text-[#4a4a4a]">{displayValue}</span>
          </div>
        </div>
        <div className="dropdown-chevron flex items-center justify-center">
          {isOpen ? <FaChevronUp size={chevronSize} /> : <FaChevronDown size={chevronSize} />}
        </div>
      </button>
      {isOpen && (
        <div
          className={`${dropdownClassName}`}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 99,
            display: 'block',
            ...dropdownStyle
          }}
        >
          <ul className="dropdown-menu !block !py-[10px] w-[max-content]">
            {options.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value || option.label;
              const optionLabel = typeof option === 'string' ? option : option.label || option.value;
              const optionImage = typeof option === 'object' && option?.image ? option.image : null;

              // Improved selection comparison - works for both string and object selectedValue
              let isSelected = false;
              if (typeof selectedValue === 'string') {
                // Compare string selectedValue with option value/label
                isSelected = selectedValue === optionValue || selectedValue === optionLabel;
              } else if (typeof selectedValue === 'object' && selectedValue !== null) {
                // Compare object selectedValue with option
                isSelected = selectedValue === option ||
                  selectedValue?.value === optionValue ||
                  selectedValue?.label === optionLabel ||
                  (selectedValue?.value && optionValue && selectedValue.value === optionValue);
              }

              return (
                <li key={index}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleSelect(option); }}
                    className={`!py-[5px] !px-[20px] block flex items-center gap-[8px] ${isSelected ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    {optionImage && (
                      <img
                        src={optionImage}
                        alt={optionLabel}
                        style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                      />
                    )}
                    {optionLabel}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;

