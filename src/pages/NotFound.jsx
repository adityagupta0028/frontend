import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-404 text-center">
                  <h1>404</h1>
                  <h2>Page Not Found</h2>
                  <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                  <Link to="/" className="button">Go to Homepage</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

