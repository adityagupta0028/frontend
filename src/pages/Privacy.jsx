import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Privacy Policy
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>Privacy Policy
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-privacy">
                  <div className="privacy-content">
                    <h2>Privacy Policy</h2>
                    <p>Last updated: January 2025</p>
                    <h3>Information We Collect</h3>
                    <p>We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                    <h3>How We Use Your Information</h3>
                    <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
                    <h3>Data Security</h3>
                    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;

