import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useSignupMutation, useGoogleLoginMutation, useFacebookLoginMutation, useSyncCartMutation, useSyncWishlistMutation } from '../Services/CustomerApi';
import { syncLocalCartToDatabase, getLocalCart, clearLocalCart } from '../utils/cartService';
import { syncLocalWishlistToDatabase } from '../utils/wishlistService';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();
  const [syncCart] = useSyncCartMutation();
  const [syncWishlist] = useSyncWishlistMutation();

  // Load Google Identity Services
  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Load Facebook SDK
    const fbScript = document.createElement('script');
    fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = 'anonymous';
    document.body.appendChild(fbScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(fbScript);
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const result = await login({ email, password }).unwrap();
      if ((result.status === 1 || result.success) && result.data && result.data.accessToken) {
        localStorage.setItem('customerToken', result.data.accessToken);
        localStorage.setItem('customerData', JSON.stringify(result.data));
        
        // Sync localStorage cart to database if items exist
        try {
          await syncLocalCartToDatabase(syncCart);
        } catch (syncError) {
          console.error('Error syncing cart:', syncError);
          // Continue even if cart sync fails
        }

        // Sync localStorage wishlist to database if items exist
        try {
          await syncLocalWishlistToDatabase(syncWishlist);
        } catch (syncError) {
          console.error('Error syncing wishlist:', syncError);
          // Continue even if wishlist sync fails
        }
        
        navigate(-1);
       // window.location.reload();
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError(err.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const countryCode = formData.get('country-code');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const phone_number = countryCode ? `${countryCode}${phone}` : phone;

    try {
      const result = await signup({
        firstName,
        lastName,
        email,
        password,
        phone_number
      }).unwrap();
      
      if ((result.status === 1 || result.success) && result.data) {
        if (result.data.accessToken) {
          localStorage.setItem('customerToken', result.data.accessToken);
        }
        localStorage.setItem('customerData', JSON.stringify(result.data));
        
        // Sync localStorage cart to database if items exist
        try {
          await syncLocalCartToDatabase(syncCart);
        } catch (syncError) {
          console.error('Error syncing cart:', syncError);
          // Continue even if cart sync fails
        }

        // Sync localStorage wishlist to database if items exist
        try {
          await syncLocalWishlistToDatabase(syncWishlist);
        } catch (syncError) {
          console.error('Error syncing wishlist:', syncError);
          // Continue even if wishlist sync fails
        }
        
        navigate(-1);
        window.location.reload();
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.data?.message || err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      // Wait for Google Identity Services to load
      if (!window.google || !window.google.accounts) {
        // If not loaded, wait a bit and try again
        setTimeout(() => {
          if (window.google && window.google.accounts) {
            handleGoogleSignIn();
          } else {
            setError('Google Sign-In is not available. Please refresh the page.');
            setLoading(false);
          }
        }, 1000);
        return;
      }

      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        callback: async (response) => {
          try {
            // Send the credential (JWT) token to backend
            const result = await googleLogin({ token: response.credential }).unwrap();
            
            if ((result.status === 1 || result.success) && result.data && result.data.accessToken) {
              localStorage.setItem('customerToken', result.data.accessToken);
              localStorage.setItem('customerData', JSON.stringify(result.data));
              
              // Sync localStorage cart to database if items exist
              try {
                await syncLocalCartToDatabase(syncCart);
              } catch (syncError) {
                console.error('Error syncing cart:', syncError);
              }

              // Sync localStorage wishlist to database if items exist
              try {
                await syncLocalWishlistToDatabase(syncWishlist);
              } catch (syncError) {
                console.error('Error syncing wishlist:', syncError);
              }
              
              navigate(-1);
              window.location.reload();
            } else {
              setError(result.message || 'Google login failed');
              setLoading(false);
            }
          } catch (err) {
            setError(err.data?.message || err.message || 'Google login failed');
            setLoading(false);
          }
        },
      });

      // Trigger the sign-in prompt
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If prompt is not shown, use button flow
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
            scope: 'email profile',
            callback: async (tokenResponse) => {
              try {
                const result = await googleLogin({ token: tokenResponse.access_token }).unwrap();
                
                if ((result.status === 1 || result.success) && result.data && result.data.accessToken) {
                  localStorage.setItem('customerToken', result.data.accessToken);
                  localStorage.setItem('customerData', JSON.stringify(result.data));
                  
                  // Sync localStorage cart to database if items exist
                  const localCartItems = getLocalCart();
                  if (localCartItems && localCartItems.length > 0) {
                    try {
                      await syncCart({ items: localCartItems }).unwrap();
                      clearLocalCart(); // Clear localStorage after successful sync
                    } catch (syncError) {
                      console.error('Error syncing cart:', syncError);
                    }
                  }

                  // Sync localStorage wishlist to database if items exist
                  try {
                    await syncLocalWishlistToDatabase(syncWishlist);
                  } catch (syncError) {
                    console.error('Error syncing wishlist:', syncError);
                  }
                  
                  navigate(-1);
                  window.location.reload();
                } else {
                  setError(result.message || 'Google login failed');
                  setLoading(false);
                }
              } catch (err) {
                setError(err.data?.message || err.message || 'Google login failed');
                setLoading(false);
              }
            },
          });
          client.requestAccessToken();
        }
      });
    } catch (err) {
      setError('Failed to initialize Google login. Please try again.');
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      if (window.FB) {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });

        window.FB.login(async (response) => {
          if (response.authResponse) {
            try {
              const result = await facebookLogin({ token: response.authResponse.accessToken }).unwrap();
              
              if ((result.status === 1 || result.success) && result.data && result.data.accessToken) {
                localStorage.setItem('customerToken', result.data.accessToken);
                localStorage.setItem('customerData', JSON.stringify(result.data));
                
                // Sync localStorage cart to database if items exist
                try {
                  await syncLocalCartToDatabase(syncCart);
                } catch (syncError) {
                  console.error('Error syncing cart:', syncError);
                }

                // Sync localStorage wishlist to database if items exist
                try {
                  await syncLocalWishlistToDatabase(syncWishlist);
                } catch (syncError) {
                  console.error('Error syncing wishlist:', syncError);
                }
                
                navigate(-1);
                window.location.reload();
              } else {
                setError(result.message || 'Facebook login failed');
              }
            } catch (err) {
              setError(err.data?.message || err.message || 'Facebook login failed');
            } finally {
              setLoading(false);
            }
          } else {
            setError('Facebook login was cancelled');
            setLoading(false);
          }
        }, { scope: 'email,public_profile' });
      } else {
        setError('Facebook SDK not loaded. Please refresh the page.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to initialize Facebook login');
      setLoading(false);
    }
  };

  return (
    <div className="account-container-login">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/contact">Customer Service</Link> / <span>Account</span>
      </nav>

      {/* Main Title */}
      <h1 className="page-title">My Account</h1>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="account-sections">
        {/* Left Section: Sign In */}
        <section className="sign-in-section">
          <h2>Sign In</h2>
          <p className="section-description">If you have a Brilliant Earth customer account, please sign in.</p>
          
          {/* Google Sign In Button */}
          <button 
            className="btn-google" 
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            SIGN IN WITH GOOGLE
          </button>

          {/* Facebook Sign In Button */}
          <button 
            className="btn-facebook" 
            onClick={handleFacebookSignIn}
            disabled={loading}
            type="button"
          >
            <svg className="facebook-icon" viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            SIGN IN WITH FACEBOOK
          </button>

          {/* Separator */}
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-text">or</span>
            <span className="separator-line"></span>
          </div>

          {/* Sign In Form */}
          <form className="sign-in-form" onSubmit={handleSignIn}>
            <div className="form-group">
              <input type="email" id="signin-email" name="email" placeholder="Email Address" required />
            </div>
            
            <div className="form-group">
              <input type="password" id="signin-password" name="password" placeholder="Password" required />
            </div>

            <div className="form-actions">
              <Link to="/forgot-password" className="forgot-password">Forgot your password?</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </section>

        {/* Vertical Divider with OR */}
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </div>

        {/* Right Section: Create Account */}
        <section className="create-account-section">
          <h2>Create an Account</h2>
          <p>
            <span style={{fontSize: '17px', fontWeight: 400, color: 'var(--text-color)'}}>
              Enjoy the benefits of being a Brilliant Earth customer
            </span>
          </p>

          {/* Benefits List */}
          <ul className="benefits-list">
            <li>Save items to Wish List and Shopping Cart</li>
            <li>Request a ring resize online</li>
            <li>Faster check out</li>
            <li>Exclusive offers</li>
            <li>View Order History</li>
          </ul>

          {/* Create Account Form */}
          <form className="create-account-form" onSubmit={handleCreateAccount}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="first-name" name="firstName" placeholder="First Name" required />
              </div>
              
              <div className="form-group">
                <input type="text" id="last-name" name="lastName" placeholder="Last Name" required />
              </div>
            </div>

            <div className="form-group">
              <input type="email" id="create-email" name="email" placeholder="Email Address" required />
            </div>
            
            <div className="form-group">
              <div className="phone-input-wrapper">
                <select id="country-code" name="country-code" className="country-code-select">
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+61">+61 (AU)</option>
                  <option value="+86">+86 (CN)</option>
                  <option value="+33">+33 (FR)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+81">+81 (JP)</option>
                  <option value="+82">+82 (KR)</option>
                  <option value="+65">+65 (SG)</option>
                  <option value="+971">+971 (AE)</option>
                  <option value="+966">+966 (SA)</option>
                </select>
                <input type="tel" id="phone" name="phone" placeholder="Phone Number" required />
              </div>
            </div>

            <div className="form-group">
              <input type="password" id="create-password" name="password" placeholder="Password" required />
            </div>

            <div className="form-group">
              <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm Password" required />
            </div>

            <p className="password-requirements">Passwords are case sensitive and must be at least 6 characters long.</p>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="marketing-opt-in" name="marketingOptIn" />
              <label htmlFor="marketing-opt-in">Email me Brilliant Earth news, updates and offers.</label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>

            <p className="privacy-text">
              Your privacy is important to us. By Clicking "Create Account", you agree to our 
              <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;

