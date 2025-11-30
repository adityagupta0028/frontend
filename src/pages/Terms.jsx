import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Terms & Conditions
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>Terms & Conditions
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-terms">
                  <div className="terms-content">
                    <h2>Terms & Conditions</h2>
                    <p>Last updated: January 2025</p>
                    <h3>Agreement to Terms</h3>
                    <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    <h3>Use License</h3>
                    <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
                    <h3>Disclaimer</h3>
                    <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>
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

export default Terms;

