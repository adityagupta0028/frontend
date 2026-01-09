import { useState } from "react";
import { Link } from "react-router-dom";

import "./checkout.css";

function Checkout() {
  // Manage active sections
  const [activeSection, setActiveSection] = useState("contactSection");
  const [cartItemCount, setCartItemCount] = useState(1); // This can be dynamically set based on your cart
  const [orderTotal, setOrderTotal] = useState(1152); // Placeholder order total, can be dynamic

  // Manage special instructions visibility
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(false);

  // Manage Order Summary visibility and chevron rotation
  const [isOrderSummaryCollapsed, setIsOrderSummaryCollapsed] = useState(true);

  // Manage FAQ visibility
  const [openFaq, setOpenFaq] = useState(null); // Keep track of the open FAQ item

  // Handle navigation between sections
  const goToShipping = () => {
    if (activeSection !== "shippingSection") {
      setActiveSection("shippingSection");
    }
  };

  const goToPayment = () => {
    if (activeSection !== "paymentSection") {
      setActiveSection("paymentSection");
    }
  };

  const goToReview = () => {
    if (activeSection !== "reviewSection") {
      setActiveSection("reviewSection");
    }
  };

  // Handle toggling of collapsible sections
  const toggleSection = (sectionId) => {
    setActiveSection((prev) => (prev === sectionId ? "" : sectionId));
  };

  const toggleInstructions = () => {
    setIsInstructionsVisible((prevState) => !prevState);
  };

  const toggleOrderSummary = () => {
    setIsOrderSummaryCollapsed((prevState) => !prevState);
  };

  const removeDiscount = () => {};

  // Handle FAQ toggle
  const toggleFaq = (index) => {
    setOpenFaq((prevIndex) => (prevIndex === index ? null : index)); // Toggle open/close of FAQ
  };

  return (
    <main className="checkout-main !pt-[40px]">
      <div className="checkout-container">
        <div className="!grid grid-cols-12">
          {/* Left Column: Checkout Steps */}
          <div className="checkout-steps-column col-span-7 py-[50px] px-[70px]">
            <h2 className="checkout-title">Checkout</h2>

            {/* Contact Information Section */}
            {/* Contact Information Section */}
            <div
              className={`checkout-section ${
                activeSection === "contactSection" ? "active" : "inactive"
              }`}
              id="contactSection"
            >
              <h3 className="section-title">Contact information</h3>
              <div className="section-content">
                <div className="form-group">
                  {/* <label for="contact-email">Email address (for order notifications)</label> */}
                  <input
                    type="email"
                    id="contact-email"
                    name="contactEmail"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="news-offers"
                    name="newsOffers"
                    checked
                  />
                  <label for="news-offers">Email me with news and offers</label>
                </div>
                <button className="btn-continue" onClick={goToShipping}>
                  Continue to shipping
                </button>
              </div>
              <div className="section-separator"></div>
            </div>

            {/* Shipping Address Section */}
            {/* Shipping Address Section */}
            <div
              className={`checkout-section ${
                activeSection === "shippingSection" ? "active" : "inactive"
              }`}
              id="shippingSection"
            >
              <h3 className="section-title">Shipping details</h3>
              <div className="section-content">
                <div className="form-row flex">
                  <div className="form-group flex-1">
                    <input
                      type="text"
                      id="shipping-first-name"
                      name="shippingFirstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <input
                      type="text"
                      id="shipping-last-name"
                      name="shippingLastName"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="shipping-address"
                    name="shippingAddress"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="shipping-address-2"
                    name="shippingAddress2"
                    placeholder="Include apt, floor, suite, or company here"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="shipping-city"
                    name="shippingCity"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-row flex">
                  <div className="form-group flex-1">
                    <select
                      id="shipping-country"
                      name="shippingCountry"
                      required
                    >
                      <option value="" disabled selected>
                        Country
                      </option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                  <div className="form-group flex-1">
                    <select id="shipping-state" name="shippingState" required>
                      <option value="" disabled selected>
                        Select a State
                      </option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="shipping-zip"
                    name="shippingZip"
                    placeholder="Zip/Postal Code"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    id="shipping-phone"
                    name="shippingPhone"
                    placeholder="Phone Number"
                    required
                  />
                  <p className="field-help">
                    This will be only used in case of issues related to your
                    order.
                  </p>
                </div>
                <div className="instructions-collapsible">
                  <button
                    type="button"
                    className="instructions-toggle"
                    onClick={toggleInstructions}
                  >
                    <span className="instructions-label">
                      Special Instructions
                    </span>
                    <span className="toggle-icon-plus">{isInstructionsVisible ? "+" : "-"}</span>
                  </button>
                  <div
                    className={`instructions-content ${isInstructionsVisible ? "" : "collapsed"}`}
                    id="instructionsContent"
                  >
                    <div className="form-group">
                      <textarea
                        id="special-instructions"
                        name="specialInstructions"
                        rows="4"
                        placeholder="Add any special delivery instructions here..."
                      ></textarea>
                    </div>
                    {/* <div className="form-group">
                                <input type="tel" id="special-phone" name="specialPhone" placeholder="Phone Number (for special instructions)">
                            </div> */}
                  </div>
                </div>
                <button className="btn-continue" onClick={goToPayment}>
                  Continue to payment
                </button>
              </div>
              <div className="section-separator"></div>
            </div>

            {/* Payment Section */}
            {/* Payment Section */}
            <div
              className={`checkout-section ${
                activeSection === "paymentSection" ? "active" : "inactive"
              }`}
              id="paymentSection"
            >
              <h3 className="section-title">Payment</h3>
              <div className="section-content">
                <div className="payment-methods">
                  <div className="payment-tabs">
                    {/* <button className="payment-tab active" onclick="showPaymentMethod('credit-card')">Credit Card</button> */}
                  </div>

                  {/* Credit Card Payment Form */}
                  <div className="payment-form active" id="credit-card-form">
                    <div className="form-group">
                      <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        placeholder="Card Number"
                        maxlength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="card-name"
                        name="cardName"
                        placeholder="Name on Card"
                        required
                      />
                    </div>
                    <div className="form-row flex">
                      <div className="form-group flex-1">
                        <input
                          type="text"
                          id="card-expiry"
                          name="cardExpiry"
                          placeholder="Expiry Date"
                          maxlength="5"
                          required
                        />
                      </div>
                      <div className="form-group flex-1">
                        <input
                          type="text"
                          id="card-cvv"
                          name="cardCvv"
                          placeholder="CVV"
                          maxlength="4"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="checkbox-label !flex items-center !gap-[5px]">
                        <input type="checkbox" id="save-card" name="saveCard" />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-text">
                          Save this card for future purchases
                        </span>
                      </label>
                    </div>
                    <button className="btn-continue" onClick={goToReview}>
                      Continue to review
                    </button>
                  </div>
                </div>
              </div>
              <div className="section-separator"></div>
            </div>

            {/* Review Your Order Section */}
            {/* Review Your Order Section */}
            <div
              className={`checkout-section ${
                activeSection === "reviewSection" ? "active" : "inactive"
              }`}
              id="reviewSection"
            >
              <h3 className="section-title">Review your order</h3>
              <div className="section-content">
                <p>
                  Review your order details before completing your purchase.
                </p>
                <button className="btn-continue">Complete Order</button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="order-summary-column col-span-5">
            <div className="order-summary-header">
              <h3>Order summary</h3>
            </div>

            {/* Collapsible Item Summary Card */}
            <div className="order-summary-card">
              <button
                className="summary-card-header"
                onClick={toggleOrderSummary}
              >
                <div className="summary-card-left">
                  <svg
                    className="bag-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span className="item-count">1 item</span>
                  <svg
                    className="chevron-icon"
                    id="summaryChevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <span className="summary-total-header">$1,152.00</span>
              </button>
              <div
                className={`summary-content ${isOrderSummaryCollapsed ? "collapsed" : ""}`}
                id="orderSummaryContent"
              >
                {/* Engagement Ring */}
                <div className="summary-item">
                  <div className="item-image">
                    <img
                      src="../assets/images/placeholder-ring.png"
                      alt="Engagement Ring"
                      onerror="this.style.display='none';"
                    />
                  </div>
                  <div className="item-info">
                    <h4 className="item-name !text-left !font-bold">
                      Avalon Classic Solitaire 1.00 ct. Oval Lab Engagement Ring
                    </h4>
                    <p className="item-spec">14K White Gold</p>
                    <div className="item-pricing">
                      <span className="original-price">$1,920.00</span>
                      <span className="current-price">$1,152.00</span>
                    </div>
                    <div className="item-options">
                      <button className="size-select-btn">
                        Select Ring Size
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <a href="#" className="engraving-link">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                          <path d="M2 2l7.586 7.586"></path>
                          <circle cx="11" cy="11" r="2"></circle>
                        </svg>
                        Add free engraving
                      </a>
                    </div>
                    <div className="discount-info">
                      <div className="discount-badge">
                        <svg
                          className="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        $768 discount applied
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Protection Section */}
            {/* <div className="protection-card">
                <div className="protection-header" onclick="toggleProtection()">
                    <h3>Protect your engagement ring</h3>
                    <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </div>
                <div className="protection-content" id="protectionContent">
                    <ul className="protection-benefits">
                        <li>Loss of center or side stones due to damage</li>
                        <li>Free, unlimited repairs up to item value</li>
                        <li>Annual care: cleaning, re-tipping, inspections</li>
                    </ul>
                    <div className="protection-options">
                        <label className="radio-option">
                            <input type="radio" name="protection" value="3years" checked />
                            <span className="radio-custom"></span>
                            <div className="radio-content">
                                <span className="radio-label">3 Years</span>
                                <span className="radio-price">$119</span>
                            </div>
                        </label>
                        <label className="radio-option">
                            <input type="radio" name="protection" value="lifetime" />
                            <span className="radio-custom"></span>
                            <div className="radio-content">
                                <div>
                                    <span className="radio-label">Lifetime</span>
                                    <span className="discount-badge-small">40% off</span>
                                </div>
                                <div className="radio-pricing">
                                    <span className="original-price-small">$499</span>
                                    <span className="radio-price">$299</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <a href="#" className="see-benefits-link">See all benefits ></a>
                </div>
            </div> */}

            {/* Cost Breakdown */}
            <div className="cost-breakdown-text">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>$1,920.00</span>
              </div>
              <div className="breakdown-row discount">
                <span className="flex items-center">
                  Discount
                  <span className="discount-code-badge">LAST CHANCE</span>
                  <button
                    className="remove-discount !bg-gray-300 !border px-[4px] h-[20px] w-[20px] flex justify-center items-center !text-[12px] !ml-[6px]"
                    onClick={removeDiscount}
                    aria-label="Remove discount"
                  >
                    X
                  </button>
                </span>
                <span>-$768.00</span>
              </div>
              <div className="breakdown-row">
                <span>
                  Shipping
                  <button
                    className="info-icon-small"
                    aria-label="Shipping information"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </span>
                <span>Free</span>
              </div>
              <div className="breakdown-row">
                <span>
                  Tax
                  <button
                    className="info-icon-small"
                    aria-label="Tax information"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </span>
                <span>Calculated at next step</span>
              </div>
              <div className="breakdown-total">
                <span>Total</span>
                <span className="total-amount">$1,152.00</span>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3 className="faq-title">FAQ</h3>
              <div className="faq-item">
                <button className="faq-question" onClick={()=>toggleFaq(0)}>
                  Will the packaging keep the surprise safe?
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div className={`faq-answer ${openFaq == 0 ? "!block" : undefined}`} >
                  Yes, our packaging is designed to be discreet and secure.
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={()=>toggleFaq(1)}>
                  Can I return my order?
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div className={`faq-answer ${openFaq == 1 ? "!block" : undefined}`} >
                  Yes, we offer 30-day returns with no fine print.
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={()=>toggleFaq(2)}>
                  What if the ring doesn't fit?
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div className={`faq-answer ${openFaq == 2 ? "!block" : undefined}`} >
                  We offer free resizing within the first year of purchase.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
