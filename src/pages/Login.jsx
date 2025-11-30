import { Link } from 'react-router-dom';

function Login() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="container ">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Login / Register
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>Login / Register
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-login-register">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 sm-m-b-50">
                      <div className="box-form-login">
                        <h2>Login</h2>
                        <div className="box-content">
                          <div className="button-login">
                            <button className="d-flex align-items-center justify-content-center w-100 btn btn-outline-primary p-2">
                              <img src="/media/facebook.svg" alt="" className="me-3" />  Sign in with Facebook
                            </button>
                          </div>
                          <div className="line-text">OR</div>
                          <div className="form-login mt-3">
                            <form method="post" className="login">
                              <div className="username">
                                <label>Email address <span className="required">*</span></label>
                                <input type="text" className="input-text" name="username" id="username" />
                              </div>
                              <div className="password">
                                <label htmlFor="password">Password <span className="required">*</span></label>
                                <input className="input-text" type="password" name="password" />
                              </div>
                              <div className="rememberme-lost">
                                <div className="remember-me">
                                  <input name="rememberme" type="checkbox" value="forever" />
                                  <label className="inline">Remember me</label>
                                </div>
                                <div className="lost-password">
                                  <Link to="/forgot-password">Lost your password?</Link>
                                </div>
                              </div>
                              <div className="button-login">
                                <input type="submit" className="button" name="login" value="Login" /> 
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="box-form-login">
                        <h2 className="register">Register</h2>
                        <div className="box-content">
                          <ul className="list-unstyled">
                            <li><i className="fa fa-gift me-2"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><i className="fa fa-refresh me-2"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><i className="fa fa-shopping-cart me-2"></i>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                          </ul>

                          <div className="form-register">
                            <form method="post" className="register">
                              <div className="email">
                                <label>Name <span className="required">*</span></label>
                                <input type="text" className="input-text" name="name" defaultValue="" />
                              </div>
                              <div className="email">
                                <label>Phone Number <span className="required">*</span></label>
                                <input type="tel" className="input-text" name="phone" defaultValue="" />
                              </div>
                              <div className="email">
                                <label>Email address <span className="required">*</span></label>
                                <input type="email" className="input-text" name="email" defaultValue="" />
                              </div>
                              <div className="password">
                                <label>Password <span className="required">*</span></label>
                                <input type="password" className="input-text" name="password" />
                              </div>

                              <div className="rememberme-lost">
                                <div className="remember-me">
                                  <input name="rememberme" type="checkbox" value="forever" />
                                  <label className="inline"> By agreeing, you confirm that you have read and accepted our<Link to="/terms" target="_blank" className="text-primary">  Terms and Privacy Policy </Link> before completing your purchase on this shopping site.</label>
                                </div>
                              </div>
                              <div className="button-register">
                                <input type="submit" className="button" name="register" value="Register" />
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
        </div>
      </div>
    </div>
  );
}

export default Login;

