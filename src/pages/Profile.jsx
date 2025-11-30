import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    firstName: 'Mohammad',
    lastName: 'Ali',
    phoneNumber: '',
    email: 'mohammadali10298@gmail.com',
    password: '************',
    anniversary: '',
    birthday: '',
    hasFacebook: false,
    hasGoogle: true
  });

  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    firstName: 'Mohammad',
    lastName: 'Ali',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    anniversary: '',
    birthday: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    shippingPhone: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false
  });

  const handleEditClick = (modalType) => {
    setActiveModal(modalType);
    // Pre-fill form data based on current user data
    if (modalType === 'name-phone') {
      setFormData(prev => ({
        ...prev,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber
      }));
    } else if (modalType === 'password') {
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: ''
      }));
    } else if (modalType === 'personal-info') {
      setFormData(prev => ({
        ...prev,
        anniversary: userData.anniversary,
        birthday: userData.birthday
      }));
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (modalType) => {
    if (modalType === 'name-phone') {
      setUserData(prev => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber
      }));
    } else if (modalType === 'password') {
      setUserData(prev => ({
        ...prev,
        password: '************' // In real app, this would be hashed
      }));
    } else if (modalType === 'personal-info') {
      setUserData(prev => ({
        ...prev,
        anniversary: formData.anniversary,
        birthday: formData.birthday
      }));
    } else if (modalType === 'shipping') {
      // Handle shipping address save
      console.log('Shipping address saved:', formData);
    }
    handleCloseModal();
  };

  const getFullName = () => {
    return `${userData.firstName} ${userData.lastName}`;
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="profile-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Personal Details</span>
          </div>

          {/* Main Title */}
          <div className="profile-header">
            <h1 className="profile-title">Personal Details</h1>
            <div className="title-divider"></div>
          </div>

          {/* Profile Sections */}
          <div className="profile-container">
            {/* Account Section */}
            <div className="profile-section">
              <div className="section-header-row">
                <h2 className="section-title">Account</h2>
              </div>
              
              <div className="info-row">
                <div className="info-label">Name</div>
                <div className="info-value">{getFullName()}</div>
                <button onClick={() => handleEditClick('name-phone')} className="edit-link">Edit</button>
              </div>

              <div className="info-row">
                <div className="info-label">Phone Number</div>
                <div className="info-value">{userData.phoneNumber || ''}</div>
                {/* <button onClick={() => handleEditClick('name-phone')} className="edit-link">Edit</button> */}
              </div>

              <div className="info-row">
                <div className="info-label">Email</div>
                <div className="info-value">{userData.email}</div>
              </div>

              <div className="info-row">
                <div className="info-label">Password</div>
                <div className="info-value">{userData.password}</div>
                <button onClick={() => handleEditClick('password')} className="edit-link">Edit</button>
              </div>
            </div>

            {/* Shipping Section */}
            <div className="profile-section">
              <div className="section-header-row">
                <h2 className="section-title">Shipping</h2>
                <button onClick={() => handleEditClick('shipping')} className="add-link">Add</button>
              </div>
              
              <div className="info-message">
                You do not have any saved addresses.
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="profile-section">
              <div className="section-header-row">
                <h2 className="section-title">Personal Info</h2>
              </div>
              
              <div className="info-row">
                <div className="info-label">Anniversary</div>
                <div className="info-value">
                  {userData.anniversary || 'You do not have a saved anniversary.'}
                </div>
                <button onClick={() => handleEditClick('personal-info')} className="edit-link">Edit</button>
              </div>

              <div className="info-row">
                <div className="info-label">Birthday</div>
                <div className="info-value">
                  {userData.birthday || 'You do not have a saved birthday.'}
                </div>
                
              </div>

              <div className="info-row">
                <div className="info-label">Social Media Accounts</div>
                <div className="info-value"></div>
                
              </div>

              <div className="social-buttons">
                {!userData.hasFacebook && (
                  <button className="social-button facebook-button">
                    <i className="fa fa-facebook"></i>
                    Link with Facebook
                  </button>
                )}
                
                {userData.hasGoogle ? (
                  <button className="social-button google-button unlink">
                    <i className="fa fa-google"></i>
                    Unlink with Google
                  </button>
                ) : (
                  <button className="social-button google-button">
                    <i className="fa fa-google"></i>
                    Link with Google
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* OFFERS Button */}
          {!activeModal && (
            <button className="offer-button">
              <i className="fa fa-tag offer-icon"></i>
              <span className="offer-text">OFFERS</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Edit Name, Phone Modal */}
            {activeModal === 'name-phone' && (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Edit Name, Phone</h2>
                  <button className="modal-close" onClick={handleCloseModal}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-input"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                  </div>
                  <div className="modal-actions">
                    <button className="save-button" onClick={() => handleSave('name-phone')}>
                      SAVE
                    </button>
                    <button className="cancel-link" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Change Password Modal */}
            {activeModal === 'password' && (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Change Password</h2>
                  <button className="modal-close" onClick={handleCloseModal}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="modal-instruction">Please enter your password to modify.</p>
                  <div className="form-group">
                    <label className="form-label">Current Password*</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        name="currentPassword"
                        className="form-input"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Current Password*"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                      >
                        <i className={`fa ${showPassword.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password*</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="newPassword"
                        className="form-input"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="New Password*"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                      >
                        <i className={`fa ${showPassword.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="password-requirements">
                    <div className="requirement-item">
                      <i className="fa fa-check requirement-check"></i>
                      <span>8+ characters</span>
                    </div>
                    <div className="requirement-item">
                      <i className="fa fa-check requirement-check"></i>
                      <span>Number</span>
                    </div>
                    <div className="requirement-item">
                      <i className="fa fa-check requirement-check"></i>
                      <span>Upper & Lower</span>
                    </div>
                    <div className="requirement-item">
                      <i className="fa fa-check requirement-check"></i>
                      <span>Special Character</span>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="save-button" onClick={() => handleSave('password')}>
                      SAVE
                    </button>
                    <button className="cancel-link" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Edit Personal Info Modal */}
            {activeModal === 'personal-info' && (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Edit Personal Info</h2>
                  <button className="modal-close" onClick={handleCloseModal}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Anniversary</label>
                    <input
                      type="text"
                      name="anniversary"
                      className="form-input"
                      value={formData.anniversary}
                      onChange={handleInputChange}
                      placeholder="Date"
                    />
                    <p className="form-hint">(Use mm/dd/yyyy format.)</p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Birthday</label>
                    <input
                      type="text"
                      name="birthday"
                      className="form-input"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      placeholder="Date"
                    />
                    <p className="form-hint">(Use mm/dd format.)</p>
                  </div>
                  <div className="modal-actions">
                    <button className="save-button" onClick={() => handleSave('personal-info')}>
                      SAVE
                    </button>
                    <button className="cancel-link" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Add Shipping Modal */}
            {activeModal === 'shipping' && (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Add Shipping</h2>
                  <button className="modal-close" onClick={handleCloseModal}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 1*</label>
                    <input
                      type="text"
                      name="addressLine1"
                      className="form-input"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      className="form-input"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="(e.g. Company, Apartment, Building, etc.)"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City*</label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State*</label>
                    <select
                      name="state"
                      className="form-input form-select"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a state</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code*</label>
                    <input
                      type="text"
                      name="zipCode"
                      className="form-input"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number*</label>
                    <input
                      type="tel"
                      name="shippingPhone"
                      className="form-input"
                      value={formData.shippingPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="modal-actions">
                    <button className="save-button" onClick={() => handleSave('shipping')}>
                      SAVE
                    </button>
                    <button className="cancel-link" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

