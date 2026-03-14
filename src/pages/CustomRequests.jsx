import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomRequests.css';

const CustomRequests = () => {
    const [formData, setFormData] = useState({
        images: [],
        url: '',
        description: '',
        metalColor: '18K White Gold',
        contactName: '',
        contactEmail: '',
        contactPhone: ''
    });

    const metalOptions = [
        { id: '14k-white', name: '14K White Gold', label: '14K', color: '#f5f5f5' },
        { id: '14k-yellow', name: '14K Yellow Gold', label: '14K', color: '#eed9a8' },
        { id: '14k-rose', name: '14K Rose Gold', label: '14K', color: '#e5c1ab' },
        { id: '18k-white', name: '18K White Gold', label: '18K', color: '#ffffff' },
        { id: '18k-yellow', name: '18K Yellow Gold', label: '18K', color: '#e9cc8a' },
        { id: '18k-rose', name: '18K Rose Gold', label: '18K', color: '#dca68d' },
        { id: 'platinum', name: 'Platinum', label: 'PL', color: '#e5e4e2' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const selectMetal = (metal) => {
        setFormData(prev => ({
            ...prev,
            metalColor: metal
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Thank you! Your custom request has been submitted.');
    };

    return (
        <div id="site-main" className="site-main">
            <div id="main-content" className="main-content">
                <div id="primary" className="content-area">
                    {/* Header / Page Title Section */}
                    <div id="title" className="page-title">
                        <div className="section-container">
                            <div className="content-title-heading">
                                <h1 className="text-title-heading">
                                    Truly Custom Engagement Rings
                                </h1>
                            </div>
                            <div className="breadcrumbs">
                                <Link to="/">Home</Link>
                                <span className="delimiter">/</span>
                                <span>Truly Custom Requests</span>
                            </div>
                        </div>
                    </div>

                    <div id="content" className="site-content" role="main">
                        <div className="section-padding">
                            <div className="section-container">
                                <div className="row">
                                    {/* Sidebar Instructions */}
                                    <div className="col-lg-4 col-md-12">
                                        <aside className="custom-sidebar">
                                            <div className="sidebar-step">
                                                <div className="step-header">
                                                    <span className="step-icon">✔</span>
                                                    <h3 className="step-title">Upload images</h3>
                                                </div>
                                                <p className="step-description">
                                                    At least 1 image should be added.
                                                    Formats: jpg, jpeg, png or webp (max 5 MB).
                                                </p>
                                            </div>

                                            <div className="sidebar-step">
                                                <div className="step-header">
                                                    <span className="step-icon">✔</span>
                                                    <h3 className="step-title">Tell us more</h3>
                                                </div>
                                                <p className="step-description">
                                                    Be specific about what you do and don't want. The more detail, the better we can design your dream ring.
                                                </p>
                                            </div>

                                            <div className="sidebar-step">
                                                <div className="step-header">
                                                    <span className="step-icon">✔</span>
                                                    <h3 className="step-title">Metal color</h3>
                                                </div>
                                                <p className="step-description">
                                                    Select the metal and color preference for your custom design.
                                                </p>
                                            </div>
                                        </aside>
                                    </div>

                                    {/* Form Content */}
                                    <div className="col-lg-8 col-md-12">
                                        <div className="custom-form-container">
                                            <form onSubmit={handleSubmit} className="custom-form">
                                                {/* Upload Section */}
                                                <section className="form-section">
                                                    <h4 className="form-section-title">Step 1: Reference Inspiration</h4>
                                                    <div className="upload-grid">
                                                        <div className="upload-placeholder">
                                                            <span className="upload-icon">+</span>
                                                            <span className="upload-text">Upload Design Picture</span>
                                                        </div>
                                                        <div className="image-preview-slot">
                                                            <span className="upload-icon">🖼</span>
                                                            <span className="preview-label">View 1*</span>
                                                        </div>
                                                        <div className="image-preview-slot">
                                                            <span className="upload-icon">🖼</span>
                                                            <span className="preview-label">View 2</span>
                                                        </div>
                                                    </div>

                                                    <div className="or-divider">OR</div>

                                                    <div className="form-group">
                                                        <label className="form-label">Web Image URL<span className="required-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="url"
                                                            placeholder="Paste inspiration link here..."
                                                            className="custom-input"
                                                            value={formData.url}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </section>

                                                {/* Description Section */}
                                                <section className="form-section">
                                                    <h4 className="form-section-title">Step 2: Tell Us More</h4>
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Design Requirements<span className="required-star">*</span>
                                                            <span className="label-hint"> (Min 15 chars)</span>
                                                        </label>
                                                        <textarea
                                                            name="description"
                                                            rows="6"
                                                            className="custom-textarea"
                                                            placeholder="Modify or keep exactly the same..."
                                                            value={formData.description}
                                                            onChange={handleInputChange}
                                                        ></textarea>

                                                        <p className="disclaimer">
                                                            *Note: While we use styles for inspiration, we ensure no trademark infringement.
                                                        </p>
                                                    </div>
                                                </section>

                                                {/* Metal Selection Section */}
                                                <section className="form-section">
                                                    <h4 className="form-section-title">Step 3: Metal Preference</h4>
                                                    <div className="metal-swatches">
                                                        {metalOptions.map(option => (
                                                            <div
                                                                key={option.id}
                                                                className={`swatch-item ${formData.metalColor === option.name ? 'active' : ''}`}
                                                                onClick={() => selectMetal(option.name)}
                                                            >
                                                                <div className="swatch-circle" style={{ backgroundColor: option.color }}>
                                                                    {option.label}
                                                                </div>
                                                                <span className="swatch-name">{option.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>

                                                {/* Contact Details Section */}
                                                <section className="form-section">
                                                    <h4 className="form-section-title">Step 4: Contact Details</h4>
                                                    <div className="contact-grid">
                                                        <div className="form-group">
                                                            <label className="form-label">Full Name<span className="required-star">*</span></label>
                                                            <input
                                                                type="text"
                                                                name="contactName"
                                                                className="custom-input"
                                                                required
                                                                value={formData.contactName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Email Address<span className="required-star">*</span></label>
                                                            <input
                                                                type="email"
                                                                name="contactEmail"
                                                                className="custom-input"
                                                                required
                                                                value={formData.contactEmail}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            name="contactPhone"
                                                            className="custom-input"
                                                            placeholder="(Optional)"
                                                            value={formData.contactPhone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </section>

                                                <div className="form-actions">
                                                    <button type="submit" className="continue-button">Submit Request</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomRequests;
