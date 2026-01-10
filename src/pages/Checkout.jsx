import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useAddAddressMutation,
  useGetAddressesQuery,
  useCheckoutMutation,
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
} from "../Services/CustomerApi";
import { GetUrl } from "../config/GetUrl";
import "./checkout.css";

function Checkout() {
  const navigate = useNavigate();
  
  // API Hooks
  const { data: cartData, refetch: refetchCart } = useGetCartQuery();
  const { data: profileData } = useGetProfileQuery();
  const { data: addressesData, refetch: refetchAddresses } = useGetAddressesQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [addAddress] = useAddAddressMutation();
  const [checkout] = useCheckoutMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation();

  // Manage active sections
  const [activeSection, setActiveSection] = useState("contactSection");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form States
  const [contactInfo, setContactInfo] = useState({
    email: "",
    newsOffers: true,
  });

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    specialInstructions: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    saveCard: false,
  });

  // Order state
  const [createdOrder, setCreatedOrder] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  // Manage special instructions visibility
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(false);
  const [isOrderSummaryCollapsed, setIsOrderSummaryCollapsed] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Load user profile data
  useEffect(() => {
    if (profileData?.data?.email) {
      setContactInfo((prev) => ({
        ...prev,
        email: profileData.data.email,
      }));
    }
  }, [profileData]);

  // Calculate cart totals
  const cartItems = cartData?.data?.items || [];
  const cartSubtotal = cartData?.data?.subtotal || 0;
  const cartDiscount = 0; // Can be calculated from promotions
  const cartShipping = 0; // Free shipping
  const cartTax = 0; // Calculated at next step
  const cartTotal = cartSubtotal - cartDiscount + cartShipping + cartTax;

  // Handle contact information submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Update profile with email if different
      if (contactInfo.email && contactInfo.email !== profileData?.data?.email) {
        await updateProfile({ email: contactInfo.email }).unwrap();
      }
      setActiveSection("shippingSection");
    } catch (err) {
      setError(err?.data?.message || "Failed to save contact information");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle shipping details submission
  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const addressData = {
        fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        phoneNumber: shippingInfo.phoneNumber,
        addressLine1: shippingInfo.address,
        addressLine2: shippingInfo.address2 || "",
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.zipCode,
        country: shippingInfo.country,
        isDefault: true,
      };

      const addressResult = await addAddress(addressData).unwrap();
      // Refetch addresses to get the newly created address
      await refetchAddresses();
      setActiveSection("paymentSection");
    } catch (err) {
      setError(err?.data?.message || "Failed to save shipping address");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payment and create order
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Refetch addresses to get the latest one
      await refetchAddresses();
      const latestAddress = addressesData?.data?.addresses?.[0];

      if (!latestAddress) {
        throw new Error("Address not found. Please add shipping address first.");
      }

      // Create order
      const orderData = {
        addressId: latestAddress._id,
        paymentMethod: "stripe",
        shipping: cartShipping,
        tax: cartTax,
        discount: cartDiscount,
        notes: shippingInfo.specialInstructions || "",
      };

      const orderResult = await checkout(orderData).unwrap();
      setCreatedOrder(orderResult.data);

      // Create payment intent
      const paymentIntentResult = await createPaymentIntent({
        orderId: orderResult.data._id,
      }).unwrap();

      setPaymentIntentId(paymentIntentResult.data.paymentIntentId);
      setClientSecret(paymentIntentResult.data.clientSecret);

      setActiveSection("reviewSection");
    } catch (err) {
      setError(err?.data?.message || "Failed to process payment");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle complete order (confirm payment)
  const handleCompleteOrder = async () => {
    if (!createdOrder || !paymentIntentId || !clientSecret) {
      setError("Order or payment information missing");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // NOTE: For production, you MUST install @stripe/stripe-js and @stripe/react-stripe-js
      // and use Stripe Elements to securely collect and process card details.
      // The current implementation is a placeholder and will not work without Stripe.js
      
      // TODO: Install Stripe.js: npm install @stripe/stripe-js @stripe/react-stripe-js
      // Then use Stripe Elements to confirm the payment with the clientSecret
      // Example:
      // const stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: { name: paymentInfo.cardName }
      //   }
      // });

      // For now, we'll just confirm the payment on the backend
      // This assumes the payment was already processed (which won't work without Stripe.js)
      const confirmResult = await confirmPayment({
        orderId: createdOrder._id,
        paymentIntentId: paymentIntentId,
      }).unwrap();

      // Clear cart
      await refetchCart();

      // Redirect to success page
      navigate(`/order-success/${createdOrder._id}`);
    } catch (err) {
      setError(err?.data?.message || "Payment failed. Please install Stripe.js and use Stripe Elements for secure payment processing.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const toggleInstructions = () => {
    setIsInstructionsVisible((prevState) => !prevState);
  };

  const toggleOrderSummary = () => {
    setIsOrderSummaryCollapsed((prevState) => !prevState);
  };

  const removeDiscount = () => {};

  const toggleFaq = (index) => {
    setOpenFaq((prevIndex) => (prevIndex === index ? null : index));
  };

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <main className="checkout-main !pt-[40px]">
      <div className="checkout-container">
        {error && (
          <div className="error-message" style={{ padding: "10px", background: "#fee", color: "#c33", marginBottom: "20px" }}>
            {error}
          </div>
        )}
        <div className="!grid grid-cols-12">
          {/* Left Column: Checkout Steps */}
          <div className="checkout-steps-column col-span-7 py-[50px] px-[70px]">
            <h2 className="checkout-title">Checkout</h2>

            {/* Contact Information Section */}
            <div
              className={`checkout-section ${
                activeSection === "contactSection" ? "active" : "inactive"
              }`}
              id="contactSection"
            >
              <h3 className="section-title">Contact information</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="section-content">
                  <div className="form-group">
                    <input
                      type="email"
                      id="contact-email"
                      name="contactEmail"
                      placeholder="Email"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="news-offers"
                      name="newsOffers"
                      checked={contactInfo.newsOffers}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          newsOffers: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="news-offers">Email me with news and offers</label>
                  </div>
                  <button
                    type="submit"
                    className="btn-continue"
                    disabled={isLoading || !contactInfo.email}
                  >
                    {isLoading ? "Saving..." : "Continue to shipping"}
                  </button>
                </div>
              </form>
              <div className="section-separator"></div>
            </div>

            {/* Shipping Address Section */}
            <div
              className={`checkout-section ${
                activeSection === "shippingSection" ? "active" : "inactive"
              }`}
              id="shippingSection"
            >
              <h3 className="section-title">Shipping details</h3>
              <form onSubmit={handleShippingSubmit}>
                <div className="section-content">
                  <div className="form-row flex">
                    <div className="form-group flex-1">
                      <input
                        type="text"
                        id="shipping-first-name"
                        name="shippingFirstName"
                        placeholder="First Name"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="form-group flex-1">
                      <input
                        type="text"
                        id="shipping-last-name"
                        name="shippingLastName"
                        placeholder="Last Name"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="shipping-address"
                      name="shippingAddress"
                      placeholder="Address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="shipping-address-2"
                      name="shippingAddress2"
                      placeholder="Include apt, floor, suite, or company here"
                      value={shippingInfo.address2}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address2: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="shipping-city"
                      name="shippingCity"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-row flex">
                    <div className="form-group flex-1">
                      <select
                        id="shipping-country"
                        name="shippingCountry"
                        value={shippingInfo.country}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            country: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                      >
                        <option value="">Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="IN">India</option>
                      </select>
                    </div>
                    <div className="form-group flex-1">
                      <select
                        id="shipping-state"
                        name="shippingState"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                      >
                        <option value="">Select a State</option>
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
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          zipCode: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      id="shipping-phone"
                      name="shippingPhone"
                      placeholder="Phone Number"
                      value={shippingInfo.phoneNumber}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
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
                      <span className="toggle-icon-plus">
                        {isInstructionsVisible ? "+" : "-"}
                      </span>
                    </button>
                    <div
                      className={`instructions-content ${
                        isInstructionsVisible ? "" : "collapsed"
                      }`}
                      id="instructionsContent"
                    >
                      <div className="form-group">
                        <textarea
                          id="special-instructions"
                          name="specialInstructions"
                          rows="4"
                          placeholder="Add any special delivery instructions here..."
                          value={shippingInfo.specialInstructions}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              specialInstructions: e.target.value,
                            })
                          }
                          disabled={isLoading}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn-continue"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Continue to payment"}
                  </button>
                </div>
              </form>
              <div className="section-separator"></div>
            </div>

            {/* Payment Section */}
            <div
              className={`checkout-section ${
                activeSection === "paymentSection" ? "active" : "inactive"
              }`}
              id="paymentSection"
            >
              <h3 className="section-title">Payment</h3>
              <form onSubmit={handlePaymentSubmit}>
                <div className="section-content">
                  <div className="payment-methods">
                    <div className="payment-form active" id="credit-card-form">
                      <div className="form-group">
                        <input
                          type="text"
                          id="card-number"
                          name="cardNumber"
                          placeholder="Card Number"
                          maxLength="19"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          id="card-name"
                          name="cardName"
                          placeholder="Name on Card"
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardName: e.target.value,
                            })
                          }
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="form-row flex">
                        <div className="form-group flex-1">
                          <input
                            type="text"
                            id="card-expiry"
                            name="cardExpiry"
                            placeholder="Expiry Date (MM/YY)"
                            maxLength="5"
                            value={paymentInfo.cardExpiry}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cardExpiry: formatExpiryDate(e.target.value),
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="form-group flex-1">
                          <input
                            type="text"
                            id="card-cvv"
                            name="cardCvv"
                            placeholder="CVV"
                            maxLength="4"
                            value={paymentInfo.cardCvv}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cardCvv: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="checkbox-label !flex items-center !gap-[5px]">
                          <input
                            type="checkbox"
                            id="save-card"
                            name="saveCard"
                            checked={paymentInfo.saveCard}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                saveCard: e.target.checked,
                              })
                            }
                            disabled={isLoading}
                          />
                          <span className="checkbox-custom"></span>
                          <span className="checkbox-text">
                            Save this card for future purchases
                          </span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn-continue"
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Continue to review"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="section-separator"></div>
            </div>

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
                {createdOrder && (
                  <div style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5", borderRadius: "5px" }}>
                    <p><strong>Order Number:</strong> {createdOrder.orderNumber}</p>
                    <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>
                  </div>
                )}
                <button
                  className="btn-continue"
                  onClick={handleCompleteOrder}
                  disabled={isLoading || !createdOrder}
                >
                  {isLoading ? "Processing Payment..." : "Complete Order"}
                </button>
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
                    strokeWidth="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span className="item-count">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </span>
                  <svg
                    className="chevron-icon"
                    id="summaryChevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <span className="summary-total-header">
                  ${cartTotal.toFixed(2)}
                </span>
              </button>
              <div
                className={`summary-content ${
                  isOrderSummaryCollapsed ? "collapsed" : ""
                }`}
                id="orderSummaryContent"
              >
                {cartItems.map((item, index) => (
                  <div key={item._id || index} className="summary-item">
                    <div className="item-image">
                      <img
                        src={
                          item.productId?.images?.[0] ||
                          "../assets/images/placeholder-ring.png"
                        }
                        alt={item.productId?.product_name || "Product"}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="item-info">
                      <h4 className="item-name !text-left !font-bold">
                        {item.productId?.product_name || item.productName || "Product"}
                      </h4>
                      <p className="item-spec">
                        {item.selectedVariant?.metal_type || "N/A"}
                      </p>
                      <div className="item-pricing">
                        {item.price > (item.discountedPrice || item.price) && (
                          <span className="original-price">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                        <span className="current-price">
                          ${(item.discountedPrice || item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="cost-breakdown-text">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {cartDiscount > 0 && (
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
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}
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
                      strokeWidth="2"
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
                      strokeWidth="2"
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
                <span className="total-amount">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3 className="faq-title">FAQ</h3>
              <div className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(0)}
                >
                  Will the packaging keep the surprise safe?
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div
                  className={`faq-answer ${openFaq == 0 ? "!block" : undefined}`}
                >
                  Yes, our packaging is designed to be discreet and secure.
                </div>
              </div>
              <div className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(1)}
                >
                  Can I return my order?
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div
                  className={`faq-answer ${openFaq == 1 ? "!block" : undefined}`}
                >
                  Yes, we offer 30-day returns with no fine print.
                </div>
              </div>
              <div className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(2)}
                >
                  What if the ring doesn't fit?
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div
                  className={`faq-answer ${openFaq == 2 ? "!block" : undefined}`}
                >
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
