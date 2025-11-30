import { Link } from 'react-router-dom';
import { useState } from 'react';
import './PaymentMethods.css';

function PaymentMethods() {
  const [activeForm, setActiveForm] = useState(null); // null, 'credit-card', 'gift-card', 'jared-card'

  const handleAddClick = (formType) => {
    setActiveForm(formType);
  };

  const handleCancel = () => {
    setActiveForm(null);
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { value: month, label: month.toString().padStart(2, '0') };
  });

  // Generate year options (current year to 20 years ahead)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => {
    const year = currentYear + i;
    return { value: year, label: year.toString() };
  });

  // US States
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Render form based on activeForm state
  if (activeForm === 'credit-card' || activeForm === 'jared-card') {
    return (
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* Breadcrumb */}
            <div className="payment-methods-breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Payment Details Page</span>
            </div>

            {/* Main Title */}
            <div className="payment-methods-header">
              <h1 className="payment-methods-title">Payment Methods</h1>
            </div>

            {/* Add Credit Card Form */}
            <div className="payment-form-container">
              <form className="payment-form">
                {/* Add Credit Card Section */}
                <div className="form-section">
                  <h2 className="form-section-title">Add Credit Card</h2>
                  
                  <div className="form-group">
                    <label htmlFor="cardType" className="form-label">
                      Select Card Type <span className="required">*</span>
                    </label>
                    <select id="cardType" name="cardType" className="form-input" required>
                      <option value="">Please Select a Card Type</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                      <option value="discover">Discover</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardNumber" className="form-label">
                      Credit Card Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="form-input"
                      placeholder=""
                      maxLength="19"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group form-group-half">
                      <label htmlFor="month" className="form-label">
                        Month <span className="required">*</span>
                      </label>
                      <select id="month" name="month" className="form-input" required>
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group form-group-half">
                      <label htmlFor="year" className="form-label">
                        Year <span className="required">*</span>
                      </label>
                      <select id="year" name="year" className="form-input" required>
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year.value} value={year.value}>
                            {year.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv" className="form-label">
                      CVV <span className="required">*</span>
                    </label>
                    <div className="cvv-input-wrapper">
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className="form-input"
                        placeholder=""
                        maxLength="4"
                        required
                      />
                      <button type="button" className="info-icon" title="CVV is the 3-4 digit code on the back of your card">
                        <i className="fa fa-info-circle"></i>
                      </button>
                    </div>
                  </div>
                
                </div>
                <div className="section-divider"></div>
                {/* Billing Address Section */}
                <div className="form-section">
                  <h2 className="form-section-title">Billing Address</h2>
                  
                  <div className="form-row">
                    <div className="form-group form-group-half">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group form-group-half">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="streetAddress" className="form-label">
                      Street Address <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="aptSuite" className="form-label">
                      + Apt, suite, etc (optional)
                    </label>
                    <input
                      type="text"
                      id="aptSuite"
                      name="aptSuite"
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group form-group-half">
                      <label htmlFor="city" className="form-label">
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group form-group-half">
                      <label htmlFor="state" className="form-label">
                        State <span className="required">*</span>
                      </label>
                      <select id="state" name="state" className="form-input" required>
                        <option value="">Select a State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className="form-input"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    Add Credit Card
                  </button>
                  <button type="button" onClick={handleCancel} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* OFFERS Button */}
            <button className="offer-button">
              <i className="fa fa-tag offer-icon"></i>
              <span className="offer-text">OFFERS</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeForm === 'gift-card') {
    return (
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* Breadcrumb */}
            <div className="payment-methods-breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Payment Details Page</span>
            </div>

            {/* Main Title */}
            <div className="payment-methods-header">
              <h1 className="payment-methods-title">Payment Methods</h1>
            </div>

            {/* Add Gift Card Form */}
            <div className="payment-form-container">
              <form className="payment-form">
                <div className="form-section">
                  <h2 className="form-section-title">Add Gift Card</h2>
                  
                  <div className="form-group">
                    <label htmlFor="giftCardNumber" className="form-label">
                      Gift Card Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="giftCardNumber"
                      name="giftCardNumber"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="giftCardPin" className="form-label">
                      PIN <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="giftCardPin"
                      name="giftCardPin"
                      className="form-input"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    Add Gift Card
                  </button>
                  <button type="button" onClick={handleCancel} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* OFFERS Button */}
            <button className="offer-button">
              <i className="fa fa-tag offer-icon"></i>
              <span className="offer-text">OFFERS</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default view - Payment Methods List
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="payment-methods-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Payment Details Page</span>
          </div>

          {/* Main Title */}
          <div className="payment-methods-header">
            <h1 className="payment-methods-title">Payment Methods</h1>
          </div>

          {/* Payment Method Sections */}
          <div className="payment-methods-container">
            {/* Credit Cards Section */}
            <div className="payment-section">
              <div className="section-header">
                <div className="section-left">
                  <h2 className="section-title">Credit Cards</h2>
                  <p className="section-message">You do not have any saved credit cards</p>
                </div>
                <button 
                  type="button"
                  className="add-button"
                  onClick={() => handleAddClick('credit-card')}
                >
                  Add Credit Card
                </button>
              </div>
              <div className="section-divider"></div>
            </div>

            {/* Jared Store Credit Cards Section */}
            <div className="payment-section">
              <div className="section-header">
                <div className="section-left">
                  <h2 className="section-title">Jared Store Credit Cards</h2>
                  <p className="section-message">You do not have any saved Jared store credit cards</p>
                </div>
                <button 
                  type="button"
                  className="add-button"
                  onClick={() => handleAddClick('jared-card')}
                >
                  Add Jared Card
                </button>
              </div>
              <div className="section-divider"></div>
            </div>

            {/* Gift Cards Section */}
            <div className="payment-section">
              <div className="section-header">
                <div className="section-left">
                  <h2 className="section-title">Gift Cards</h2>
                  <p className="section-info">Only Jared gift cards can be used while checking out online or in store</p>
                  <p className="section-message">You do not have any saved gift cards</p>
                </div>
                <button 
                  type="button"
                  className="add-button"
                  onClick={() => handleAddClick('gift-card')}
                >
                  Add Gift Card
                </button>
              </div>
             
            </div>
          </div>

          {/* OFFERS Button */}
          <button className="offer-button">
            <i className="fa fa-tag offer-icon"></i>
            <span className="offer-text">OFFERS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;

