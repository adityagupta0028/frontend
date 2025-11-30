import { Link } from 'react-router-dom';
import './MyItems.css';

function MyItems() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="my-items-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">My Items</span>
          </div>

          {/* Main Title */}
          <div className="my-items-header">
            <h1 className="my-items-title">My Items</h1>
            <div className="title-divider"></div>
          </div>

          {/* Introductory Text */}
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

          {/* Content Cards */}
          <div className="my-items-cards">
            {/* Existing Item Card */}
            <div className="item-card existing-item">
              <div className="item-badge">Just Added!</div>
              <div className="item-icon-wrapper">
                <i className="fa fa-diamond item-icon"></i>
              </div>
              <h3 className="item-name">Tom's Anniversary Gift 2022</h3>
            </div>

            {/* Add New Item Card */}
            <div className="item-card add-item">
              <div className="item-icon-wrapper">
                <div className="add-icon-circle">
                  <i className="fa fa-plus add-icon"></i>
                </div>
              </div>
              <h3 className="item-name">Add New Item</h3>
            </div>
          </div>

          {/* OFFER Button */}
          <button className="offer-button">
            <i className="fa fa-tag offer-icon"></i>
            <span className="offer-text">OFFER</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyItems;

