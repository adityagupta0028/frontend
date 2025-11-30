import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  Forgot Password
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span><Link to="/login">Login</Link><span className="delimiter"></span>Forgot Password
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-forgot-password">
                  <div className="box-form-login">
                    <h2>Reset Password</h2>
                    <div className="box-content">
                      <p>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                      <form method="post" className="lost_reset_password">
                        <div className="form-row">
                          <label htmlFor="user_login">Username or email</label>
                          <input type="text" className="input-text" name="user_login" id="user_login" />
                        </div>
                        <div className="form-row">
                          <button type="submit" className="button" value="Reset password">Reset password</button>
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
}

export default ForgotPassword;

