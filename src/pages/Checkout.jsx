import { Link } from 'react-router-dom';

function Checkout() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Checkout
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span><Link to="/shop">Shop</Link><span className="delimiter"></span>Checkout
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-checkout">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="checkout-form">
                        <h2>Billing details</h2>
                        <form>
                          <div className="row">
                            <div className="col-md-6">
                              <label>First name <span className="required">*</span></label>
                              <input type="text" className="input-text" name="billing_first_name" />
                            </div>
                            <div className="col-md-6">
                              <label>Last name <span className="required">*</span></label>
                              <input type="text" className="input-text" name="billing_last_name" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>Email address <span className="required">*</span></label>
                              <input type="email" className="input-text" name="billing_email" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>Address <span className="required">*</span></label>
                              <input type="text" className="input-text" name="billing_address_1" placeholder="Street address" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>City <span className="required">*</span></label>
                              <input type="text" className="input-text" name="billing_city" />
                            </div>
                            <div className="col-md-6">
                              <label>Postcode / ZIP <span className="required">*</span></label>
                              <input type="text" className="input-text" name="billing_postcode" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="order-review">
                        <h2>Your order</h2>
                        <table>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Medium Flat Hoops <strong>× 1</strong></td>
                              <td><span>$150.00</span></td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Total</th>
                              <td><strong><span>$150.00</span></strong></td>
                            </tr>
                          </tfoot>
                        </table>
                        <div className="place-order">
                          <button type="submit" className="button alt">Place order</button>
                        </div>
                      </div>
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

export default Checkout;

