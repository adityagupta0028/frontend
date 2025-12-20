import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="site-footer" className="site-footer background four-columns">
      <div className="footer">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-lg-3 col-md-6 column-1">
                  <div className="block block-menu m-b-20">
                    <h2 className="block-title">Contact Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <span>Head Office:</span> New Delhi
                        </li>
                        <li>
                          <span>Tel:</span> 0403848283023
                        </li>
                        <li>
                          <span>Email:</span> <a href="mailto:support@jewel.com">support@jewel.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="block block-social">
                    <ul className="social-link">
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                      <li><a href="#"><i className="fa fa-behance"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 column-2">
                  <div className="block block-menu">
                    <h2 className="block-title">Customer Services</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                          <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                          <Link to="/return-policy">Return Policy</Link>
                        </li>
                        <li>
                          <a href="#">Lorem</a>
                        </li>
                        <li>
                          <a href="#">Lorem</a>
                        </li>
                        <li>
                          <a href="#">Lorem</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 column-3">
                  <div className="block block-menu">
                    <h2 className="block-title">About Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                          <Link to="/terms">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link to="/privacy">Privacy Policy</Link>
                        </li>
                        <li>
                          <a href="#">Lorem</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 column-4">
                  <div className="block block-menu">
                    <h2 className="block-title">Catalog</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <Link to="/shop">Earrings</Link>
                        </li>
                        <li>
                          <Link to="/shop">Necklaces</Link>
                        </li>
                        <li>
                          <Link to="/shop">Bracelets</Link>
                        </li>
                        <li>
                          <Link to="/shop">Rings</Link>
                        </li>
                        <li>
                          <Link to="/shop">Jewelry Box</Link>
                        </li>
                        <li>
                          <Link to="/shop">Studs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-left">
                    <p className="copyright">Copyright © 2025. All Right Reserved</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-right">
                    <div className="block block-image">
                      <img width="309" height="32" src="/media/payments.png" alt="payments" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

