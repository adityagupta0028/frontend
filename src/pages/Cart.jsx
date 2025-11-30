import { Link } from 'react-router-dom';

function Cart() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Cart
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span><Link to="/shop">Shop</Link><span className="delimiter"></span>Cart
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-cart">
                  <div className="cart-table">
                    <table className="shop_table shop_table_responsive cart">
                      <thead>
                        <tr>
                          <th className="product-remove">&nbsp;</th>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="cart-item">
                          <td className="product-remove">
                            <a href="#" className="remove" title="Remove this item">×</a>
                          </td>
                          <td className="product-thumbnail">
                            <Link to="/details">
                              <img width="600" height="600" src="/media/product/1.jpg" alt="" />
                            </Link>
                          </td>
                          <td className="product-name" data-title="Product">
                            <Link to="/details">Medium Flat Hoops</Link>
                          </td>
                          <td className="product-price" data-title="Price">
                            <span className="amount">$150.00</span>
                          </td>
                          <td className="product-quantity" data-title="Quantity">
                            <div className="quantity">
                              <button type="button" className="minus">-</button>
                              <input type="number" className="input-text qty text" step="1" min="1" max="" name="quantity" value="1" title="Qty" size="4" />
                              <button type="button" className="plus">+</button>
                            </div>
                          </td>
                          <td className="product-subtotal" data-title="Total">
                            <span className="amount">$150.00</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-collaterals">
                    <div className="cart_totals">
                      <h2>Cart totals</h2>
                      <table>
                        <tbody>
                          <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td><span className="amount">$150.00</span></td>
                          </tr>
                          <tr className="order-total">
                            <th>Total</th>
                            <td><strong><span className="amount">$150.00</span></strong></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="wc-proceed-to-checkout">
                        <Link to="/checkout" className="checkout-button button alt wc-forward">Proceed to checkout</Link>
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

export default Cart;

