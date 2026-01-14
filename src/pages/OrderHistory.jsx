import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrdersQuery, useGetOrderByIdQuery } from '../Services/CustomerApi';
import { GetUrl } from '../config/GetUrl';
import './OrderHistory.css';

function OrderHistory() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const limit = 10;

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('customerToken');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Fetch orders
  const { data: ordersData, isLoading, error, refetch } = useGetOrdersQuery(
    {
      page,
      limit,
      status: statusFilter || undefined,
      paymentStatus: paymentStatusFilter || undefined,
    },
    {
      skip: !isLoggedIn,
    }
  );

  // Fetch selected order details
  const { data: orderDetailData } = useGetOrderByIdQuery(selectedOrderId, {
    skip: !selectedOrderId || !isLoggedIn,
  });

  const orders = ordersData?.data?.orders || [];
  const pagination = ordersData?.data?.pagination || {};
  const selectedOrder = orderDetailData?.data;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'delivered') return 'status-delivered';
    if (statusLower === 'shipped') return 'status-shipped';
    if (statusLower === 'pending') return 'status-pending';
    if (statusLower === 'cancelled') return 'status-cancelled';
    if (statusLower === 'processing') return 'status-processing';
    return 'status-default';
  };

  const getPaymentStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'paid') return 'payment-paid';
    if (statusLower === 'pending') return 'payment-pending';
    if (statusLower === 'refunded') return 'payment-refunded';
    if (statusLower === 'failed') return 'payment-failed';
    return 'payment-default';
  };

  const getProductImage = (item) => {
    if (item.productId?.images && item.productId.images.length > 0) {
      const image = item.productId.images[0];
      return image.startsWith('http') ? image : `${GetUrl.IMAGE_URL}${image}`;
    }
    return '/media/product/1.jpg';
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = () => {
    setPage(1); // Reset to first page when filter changes
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="order-history-breadcrumb">
            <Link to="/my-account">My Account</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Order History</span>
          </div>

          {/* Main Title */}
          <div className="order-history-header">
            <h1 className="order-history-title">Order History</h1>
            <div className="title-divider"></div>
          </div>

          {/* Filters */}
          <div className="order-filters">
            <div className="filter-group">
              <label htmlFor="status-filter">Order Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  handleFilterChange();
                }}
                className="filter-select"
              >
                <option value="">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="payment-filter">Payment Status:</label>
              <select
                id="payment-filter"
                value={paymentStatusFilter}
                onChange={(e) => {
                  setPaymentStatusFilter(e.target.value);
                  handleFilterChange();
                }}
                className="filter-select"
              >
                <option value="">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="loading-container">
              <p>Loading orders...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-container">
              <p>Error loading orders. Please try again.</p>
              <button onClick={() => refetch()} className="retry-button">
                Retry
              </button>
            </div>
          )}

          {/* Orders List */}
          {!isLoading && !error && (
            <>
              {orders.length === 0 ? (
                <div className="empty-orders">
                  <p>You have no orders yet.</p>
                  <Link to="/shop" className="shop-link">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3 className="order-number">
                            Order #{order.orderNumber || order._id.slice(-8)}
                          </h3>
                          <p className="order-date">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="order-statuses">
                          <span
                            className={`status-badge ${getStatusBadgeClass(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus || 'Pending'}
                          </span>
                          <span
                            className={`payment-badge ${getPaymentStatusBadgeClass(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus || 'Pending'}
                          </span>
                        </div>
                      </div>

                      <div className="order-items">
                        {order.items && order.items.length > 0 ? (
                          order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="order-item-preview">
                              <img
                                src={getProductImage(item)}
                                alt={item.productName || 'Product'}
                                className="item-image"
                                onError={(e) => {
                                  e.target.src = '/media/product/1.jpg';
                                }}
                              />
                              <div className="item-info">
                                <p className="item-name">
                                  {item.productName || 'Product'}
                                </p>
                                <p className="item-quantity">
                                  Quantity: {item.quantity || 1}
                                </p>
                                <p className="item-price">
                                  {formatCurrency(item.discountedPrice || item.price)}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No items found</p>
                        )}
                        {order.items && order.items.length > 3 && (
                          <p className="more-items">
                            +{order.items.length - 3} more item(s)
                          </p>
                        )}
                      </div>

                      <div className="order-footer">
                        <div className="order-total">
                          <span className="total-label">Total:</span>
                          <span className="total-amount">
                            {formatCurrency(order.total)}
                          </span>
                        </div>
                        <div className="order-actions">
                          <button
                            className="view-details-btn"
                            onClick={() => setSelectedOrderId(order._id)}
                          >
                            View Details
                          </button>
                          {order.orderStatus !== 'cancelled' &&
                            order.orderStatus !== 'delivered' && (
                              <Link
                                to={`/order/${order._id}/cancel`}
                                className="cancel-order-link"
                              >
                                Cancel Order
                              </Link>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {pagination.page || page} of {pagination.pages}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pagination.pages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* Order Detail Modal */}
          {selectedOrderId && selectedOrder && (
            <div
              className="order-modal-overlay"
              onClick={() => setSelectedOrderId(null)}
            >
              <div
                className="order-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>
                    Order #{selectedOrder.orderNumber || selectedOrder._id.slice(-8)}
                  </h2>
                  <button
                    className="modal-close"
                    onClick={() => setSelectedOrderId(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="modal-body">
                  <div className="order-detail-section">
                    <h3>Order Information</h3>
                    <div className="detail-row">
                      <span className="detail-label">Order Date:</span>
                      <span className="detail-value">
                        {formatDate(selectedOrder.createdAt)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Order Status:</span>
                      <span
                        className={`status-badge ${getStatusBadgeClass(
                          selectedOrder.orderStatus
                        )}`}
                      >
                        {selectedOrder.orderStatus}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Payment Status:</span>
                      <span
                        className={`payment-badge ${getPaymentStatusBadgeClass(
                          selectedOrder.paymentStatus
                        )}`}
                      >
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Payment Method:</span>
                      <span className="detail-value">
                        {selectedOrder.paymentMethod || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="order-detail-section">
                    <h3>Shipping Address</h3>
                    {selectedOrder.shippingAddress ? (
                      <div className="address-details">
                        <p>{selectedOrder.shippingAddress.fullName}</p>
                        <p>{selectedOrder.shippingAddress.addressLine1}</p>
                        {selectedOrder.shippingAddress.addressLine2 && (
                          <p>{selectedOrder.shippingAddress.addressLine2}</p>
                        )}
                        <p>
                          {selectedOrder.shippingAddress.city},{' '}
                          {selectedOrder.shippingAddress.state}{' '}
                          {selectedOrder.shippingAddress.postalCode}
                        </p>
                        <p>{selectedOrder.shippingAddress.country}</p>
                        <p>Phone: {selectedOrder.shippingAddress.phoneNumber}</p>
                      </div>
                    ) : (
                      <p>No shipping address available</p>
                    )}
                  </div>

                  <div className="order-detail-section">
                    <h3>Order Items</h3>
                    <div className="order-items-list">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, index) => (
                          <div key={index} className="order-item-detail">
                            <img
                              src={getProductImage(item)}
                              alt={item.productName || 'Product'}
                              className="item-image-large"
                              onError={(e) => {
                                e.target.src = '/media/product/1.jpg';
                              }}
                            />
                            <div className="item-details-full">
                              <h4 className="item-name-full">
                                {item.productName || 'Product'}
                              </h4>
                              {item.product_id && (
                                <p className="item-sku">SKU: {item.product_id}</p>
                              )}
                              {item.selectedVariant && (
                                <div className="item-variant">
                                  {Object.entries(item.selectedVariant).map(
                                    ([key, value]) => (
                                      <span key={key} className="variant-tag">
                                        {key}: {value}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                              {item.engraving_text && (
                                <p className="engraving-info">
                                  Engraving: {item.engraving_text}
                                </p>
                              )}
                              <div className="item-quantity-price">
                                <span>Quantity: {item.quantity || 1}</span>
                                <span className="item-price-full">
                                  {formatCurrency(
                                    (item.discountedPrice || item.price) *
                                      (item.quantity || 1)
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No items found</p>
                      )}
                    </div>
                  </div>

                  <div className="order-detail-section">
                    <h3>Order Summary</h3>
                    <div className="summary-details">
                      <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className="summary-row">
                          <span>Discount:</span>
                          <span className="discount-value">
                            -{formatCurrency(selectedOrder.discount)}
                          </span>
                        </div>
                      )}
                      <div className="summary-row">
                        <span>Shipping:</span>
                        <span>
                          {selectedOrder.shipping > 0
                            ? formatCurrency(selectedOrder.shipping)
                            : 'Free'}
                        </span>
                      </div>
                      {selectedOrder.tax > 0 && (
                        <div className="summary-row">
                          <span>Tax:</span>
                          <span>{formatCurrency(selectedOrder.tax)}</span>
                        </div>
                      )}
                      <div className="summary-row total-row">
                        <span>Total:</span>
                        <span className="total-amount-large">
                          {formatCurrency(selectedOrder.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div className="order-detail-section">
                      <h3>Notes</h3>
                      <p className="order-notes">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    className="close-modal-btn"
                    onClick={() => setSelectedOrderId(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;

