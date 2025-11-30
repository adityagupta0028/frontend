import { Link } from 'react-router-dom';

function FAQ() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  FAQ
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>FAQ
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-faq">
                  <div className="faq-content">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-item">
                      <h3>What is your return policy?</h3>
                      <p>We offer free returns within 30 days of purchase. Please see our <Link to="/return-policy">Return Policy</Link> page for more details.</p>
                    </div>
                    <div className="faq-item">
                      <h3>How long does shipping take?</h3>
                      <p>Standard shipping takes 5-7 business days. Express shipping is available for faster delivery.</p>
                    </div>
                    <div className="faq-item">
                      <h3>Do you offer international shipping?</h3>
                      <p>Yes, we ship internationally. Shipping costs and delivery times vary by location.</p>
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
}

export default FAQ;

