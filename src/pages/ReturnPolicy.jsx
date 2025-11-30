import { Link } from 'react-router-dom';

function ReturnPolicy() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Return Policy
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>Return Policy
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-return-policy">
                  <div className="return-policy-content">
                    <h2>Return Policy</h2>
                    <p>We offer free returns within 30 days of purchase. Items must be in their original condition with tags attached.</p>
                    <h3>How to Return</h3>
                    <p>To initiate a return, please contact our customer service team or use our online return portal.</p>
                    <h3>Refund Process</h3>
                    <p>Refunds will be processed within 5-7 business days after we receive your returned item.</p>
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

export default ReturnPolicy;

