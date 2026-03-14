import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyItems.css';

const itemTypes = ['Bracelet', 'Earrings', 'Necklace', 'Ring', 'Other'];

function MyItems() {
  const [viewState, setViewState] = useState('list'); // 'list', 'add', 'success'
  const [selectedType, setSelectedType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);

  // Appointment modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    purpose: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(false);
      setFormData({ purpose: '', date: '', startTime: '', endTime: '' });
      alert('Appointment request submitted successfully!');
    }, 1000);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!selectedType || !itemName.trim()) {
      alert('Please select an item type and enter a name.');
      return;
    }
    setViewState('success');
  };

  const resetForm = () => {
    setSelectedType('');
    setItemName('');
    setItemImage(null);
    setViewState('add');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setItemImage(e.target.files[0]);
    }
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="my-items-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">My Items</span>
            {viewState !== 'list' && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">Add New Item</span>
              </>
            )}
          </div>

          {/* Main Title */}
          <div className="my-items-header">
            <h1 className="my-items-title">My Items</h1>
            <div className="title-divider"></div>
          </div>

          {/* View States */}
          {viewState === 'list' && (
            <>
              <div className="my-items-intro">
                <p className="intro-text">
                  Organize all your jewelry in one place, including the ones not purchased from us! Add an item below to get started.
                </p>
                <p className="intro-note">
                  Please note that in-store purchases should be added manually.
                </p>
                <p className="intro-text">
                  Here you can see your online purchases, start repairs, and more. Need service on an item not listed here?{' '}
                  <Link to="/in-store-repair" className="in-store-link">Start In-Store Repair</Link>
                </p>
              </div>

              <div className="my-items-cards">
                <div className="item-card existing-item">
                  <div className="item-badge">Just Added!</div>
                  <div className="item-icon-wrapper">
                    <i className="fa fa-diamond item-icon"></i>
                  </div>
                  <h3 className="item-name">Tom's Anniversary Gift 2022</h3>
                </div>

                <div className="item-card add-item" onClick={() => setViewState('add')}>
                  <div className="item-icon-wrapper">
                    <div className="add-icon-circle">
                      <i className="fa fa-plus add-icon"></i>
                    </div>
                  </div>
                  <h3 className="item-name">Add New Item</h3>
                </div>
              </div>

              <button className="offer-button">
                <i className="fa fa-tag offer-icon"></i>
                <span className="offer-text">OFFER</span>
              </button>
            </>
          )}

          {viewState === 'add' && (
            <form className="add-item-form" onSubmit={handleAddItem}>
              <button type="button" className="back-btn" onClick={() => setViewState('list')}>
                <i className="fa fa-chevron-left"></i>
              </button>

              <div className="form-section">
                <h2>What item are you adding?</h2>
                <div className="item-types-grid">
                  {itemTypes.map((type) => (
                    <div
                      key={type}
                      className={`item-type-card ${selectedType === type ? 'selected' : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h2>Name your item</h2>
                <p className="section-desc">Giving your item a nickname keeps your My Items organized.</p>
                <p className="section-example"><strong>Example:</strong> Tom's Anniversary Gift 2022</p>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    maxLength={100}
                  />
                  <span className="char-count">{itemName.length} / 100</span>
                </div>

                <div className="image-upload-wrapper">
                  <label className="upload-label">
                    <i className="fa fa-camera upload-icon"></i>
                    <span className="upload-text">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden-file-input"
                    />
                  </label>
                  {itemImage && (
                    <div className="selected-image-name">
                      {itemImage.name}
                      <button type="button" className="remove-image-btn" onClick={() => setItemImage(null)}>
                        <i className="fa fa-times-circle"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h2>Review Your Item</h2>
                <p className="section-desc">If the info below looks accurate, click confirm and continue to the next page for instructions.</p>
                <div className="review-box">
                  <div className="review-row">
                    <div className="review-label">Type</div>
                    <div className="review-value">
                      <div>{selectedType || '-'}</div>
                      <div className="edit-link" onClick={() => setSelectedType('')}>Edit</div>
                    </div>
                  </div>
                  <hr className="review-divider" />
                  <div className="review-row">
                    <div className="review-label">Name</div>
                    <div className="review-value">
                      <div>{itemName || '-'}</div>
                      <div className="edit-link" onClick={() => setItemName('')}>Edit</div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="confirm-btn" disabled={!selectedType || !itemName.trim()}>
                  Confirm
                </button>
              </div>
            </form>
          )}

          {viewState === 'success' && (
            <div className="success-view">
              <h2 className="success-title">Item Added</h2>
              <p className="success-msg"><strong>{itemName}</strong> will now show up in My Items.</p>

              <button className="add-another-btn" onClick={resetForm}>
                <i className="fa fa-plus-circle"></i> ADD ANOTHER ITEM
              </button>

              <div className="view-items-wrapper">
                <button className="view-items-link" onClick={() => setViewState('list')}>
                  View Item in My Items
                </button>
              </div>

              <div className="next-steps-section">
                <h3>Next Steps</h3>
                <div className="next-steps-grid">
                  <div className="next-step-card">
                    <h4>Chat with a Jewelry Expert Now</h4>
                    <p>Start a chat to help find coordinating pieces, ask about jewelry care—whatever you need.</p>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="action-link">Start Chat</a>
                  </div>

                  <div className="next-step-card">
                    <h4>Meet with a Jewelry Expert</h4>
                    <p>Skip the line and schedule a time for a one-on-one review—in person or online.</p>
                    <button className="action-link as-button" onClick={() => setShowModal(true)}>Book Appointment</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Request Modal */}
      {showModal && (
        <div className="appointment-modal-overlay">
          <div className="appointment-modal">
            <div className="appointment-modal-header">
              <h2>Request Appointment</h2>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleRequestSubmit} className="appointment-modal-form">
              <div className="form-group">
                <label>Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Consultation, Custom Design"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Availability Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="time-group">
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="appointment-modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyItems;
