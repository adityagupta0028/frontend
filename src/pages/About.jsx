import { Link } from 'react-router-dom';

function About() {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">
                  About Us
                </h1>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link><span className="delimiter"></span>About Us
              </div>
            </div>
          </div>
          <div id="content" className="site-content" role="main">
            <div className="page-about-us">
              <section className="section section-padding m-t-20 m-b-70">
                <div className="section-container">
                  <div className="block block-banners banners-effect">
                    <div className="block-widget-wrap">
                      <div className="row">
                        <div className="col-md-4 sm-m-b-20">
                          <div className="block-widget-banner">
                            <div className="bg-banner">
                              <div className="banner-wrapper banners">
                                <div className="banner-image hover-opacity">
                                  <Link to="/shop">
                                    <img src="/media/banner/banner-about-1.jpg" alt="Banner Image" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 sm-m-b-20">
                          <div className="block-widget-banner">
                            <div className="bg-banner">
                              <div className="banner-wrapper banners">
                                <div className="banner-image hover-opacity">
                                  <Link to="/shop">
                                    <img src="/media/banner/banner-about-2.jpg" alt="Banner Image" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="block-widget-banner">
                            <div className="bg-banner">
                              <div className="banner-wrapper banners">
                                <div className="banner-image hover-opacity">
                                  <Link to="/shop">
                                    <img src="/media/banner/banner-about-3.jpg" alt="Banner Image" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-padding m-b-70">
                <div className="section-container">
                  <div className="block block-intro layout-5 text-center">
                    <div className="block-widget-wrap">
                      <div className="intro-wrap">
                        <div className="intro-icon animation-horizontal">
                          <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" height="512" viewBox="0 0 512.001 512.001" width="512">
                            <g><g><g><g><path d="m479.371 131.029c-3.099 0-6.154-1.436-8.11-4.139-3.236-4.475-2.233-10.727 2.241-13.963l22.638-16.376c4.475-3.239 10.727-2.233 13.964 2.241 3.236 4.475 2.233 10.727-2.241 13.963l-22.638 16.376c-1.772 1.281-3.823 1.898-5.854 1.898z"></path></g></g><g><g><path d="m32.63 131.029c-2.032 0-4.082-.617-5.854-1.898l-22.637-16.376c-4.475-3.237-5.478-9.488-2.241-13.963 3.238-4.474 9.49-5.478 13.964-2.241l22.638 16.375c4.475 3.237 5.478 9.488 2.241 13.963-1.956 2.703-5.012 4.14-8.111 4.14z"></path></g></g><g><g><path d="m256.001 49.025c-5.522 0-10-4.477-10-10v-23.867c0-5.523 4.478-10 10-10s10 4.477 10 10v23.866c0 5.523-4.478 10.001-10 10.001z"></path></g></g><g><path d="m492.647 215.277-77.499-133.949c-1.787-3.09-5.086-4.992-8.655-4.992h-300.986c-3.569 0-6.868 1.902-8.655 4.992l-77.498 133.949c-2.092 3.614-1.717 8.147.939 11.369l227.991 276.558c1.899 2.305 4.729 3.639 7.716 3.639s5.816-1.334 7.716-3.639l85.631-103.871 1.009.399 22.572 57.368c1.505 3.824 5.196 6.338 9.306 6.338s7.801-2.514 9.306-6.338l22.572-57.368 57.228-22.623c3.817-1.509 6.324-5.196 6.324-9.3s-2.507-7.791-6.323-9.3l-57.229-22.623-4.026-10.231 81.621-99.009c2.657-3.222 3.032-7.754.94-11.369zm-25.994-4.992h-113.904l53.737-103.991zm-210.652 248.864-67.465-228.863h22.259c5.522 0 10-4.477 10-10s-4.478-10-10-10h-17.303l62.508-102.427 62.508 102.426h-17.301c-5.522 0-10 4.477-10 10s4.478 10 10 10h22.26zm79.601-259.246-63.204-103.567h116.722zm-167.918 30.382 65.943 223.697-184.414-223.697zm8.713-30.382-53.517-103.567h116.722zm-70.883-93.609 53.736 103.991h-113.902zm172.86 347.689 21.836-74.074 29.588 11.696zm162.089-86.174-37.741 14.919c-2.577 1.019-4.615 3.06-5.63 5.638l-14.857 37.76-14.857-37.76c-1.015-2.578-3.053-4.62-5.63-5.638l-37.741-14.919 37.742-14.92c2.576-1.019 4.614-3.06 5.629-5.638l14.857-37.76 14.857 37.76c1.015 2.578 3.053 4.62 5.629 5.638zm-48.923-89.291c-1.505-3.824-5.196-6.338-9.306-6.338s-7.801 2.514-9.306 6.338l-22.572 57.368-42.071 16.631 36.032-122.232h118.47l-61.075 74.087z"></path><g><path d="m256.18 230.291c-4.12 0-7.897-2.638-9.35-6.483-1.491-3.948-.269-8.58 3.006-11.255 3.235-2.643 7.897-2.987 11.481-.842 3.583 2.144 5.496 6.426 4.674 10.529-.924 4.61-5.103 8.051-9.811 8.051z"></path></g></g></g></g>
                          </svg>
                        </div>
                        <h2 className="intro-title">
                          Where It All Began
                        </h2>
                        <div className="intro-text">
                          Aenean imperdiet. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Vestibulum fringilla pede sit amet augue. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Fusce fermentum odio nec arcu.Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed cursus turpis vitae tortor. Vestibulum eu odio. Sed in libero ut nibh placerat accumsan. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>	
              </section>

              <section className="section section-padding background-img bg-img-2 p-t-70 p-b-70 m-b-70">
                <div className="section-container">
                  <div className="block block-intro layout-6">
                    <div className="block-widget-wrap">
                      <div className="row">
                        <div className="section-column left">
                          <div className="intro-wrap">
                            <h2 className="intro-title">We Know Jewellery – <br /> & We Know Our Customers</h2>
                            <div className="intro-item m-b-0">
                              Cenean imperdiet. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Vestibulum fringilla pede sit amet augue. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Fusce fermentum odio nec arcu.
                            </div>
                          </div>
                        </div>
                        <div className="section-column right">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="intro-image left animation-horizontal hover-opacity">
                                <img width="262" height="333" src="/media/banner/intro-about-1.jpg" alt="intro" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="intro-image right animation-horizontal hover-opacity">
                                <img width="330" height="419" src="/media/banner/intro-about-2.jpg" alt="intro" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-padding m-b-70">
                <div className="section-container">
                  <div className="block block-feature layout-2">
                    <div className="block-widget-wrap">
                      <div className="row">
                        <div className="col-md-4 sm-m-b-50">
                          <div className="box">
                            <div className="box-icon animation-horizontal">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.998 511.998" style={{enableBackground: 'new 0 0 511.998 511.998'}}>
                                  <g><g><path d="M256.013,59.844c-108.193,0-196.218,88.025-196.218,196.218c0,108.201,88.025,196.218,196.218,196.218S452.23,364.263,452.23,256.061C452.23,147.869,364.206,59.844,256.013,59.844z M256.013,435.217c-98.791,0-179.155-80.372-179.155-179.155c0-98.791,80.364-179.155,179.155-179.155s179.155,80.364,179.155,179.155C435.168,354.844,354.804,435.217,256.013,435.217z"></path></g></g>
                                </svg>
                              </span>
                            </div>
                            <div className="box-title-wrap">
                              <h3 className="box-title">Shipping Worldwide</h3>
                              <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 sm-m-b-50">
                          <div className="box">
                            <div className="box-icon icon-2 animation-horizontal">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508 508" style={{enableBackground: 'new 0 0 508 508'}}>
                                  <g><g><path d="M254,0C128.3,0,26.1,102.2,26.1,227.9c0,122.9,97.9,223.4,219.8,227.7V508l60.3-60.3l-60.3-60.3v52c-113-4.4-203.5-97.5-203.5-211.5c0-116.7,94.9-211.6,211.6-211.6s211.6,94.9,211.6,211.6h16.3C481.9,102.2,379.7,0,254,0z M262.1,426.6l21,21l-21,21V426.6z"></path></g></g>
                                </svg>
                              </span>
                            </div>
                            <div className="box-title-wrap">
                              <h3 className="box-title">14 Days Return</h3>
                              <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="box">
                            <div className="box-icon icon-3 animation-horizontal">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}}>
                                  <g><g><path d="M457.987,31.531c-2.688-6.997-13.013-8.533-17.749-3.499c-21.44,18.88-48.939,29.248-77.547,29.248c-39.424,0-75.989-19.627-97.771-52.501C262.937,1.792,259.609,0,256.025,0c-3.563,0-6.912,1.792-8.875,4.757c-21.845,32.875-58.411,52.501-97.835,52.501c-28.928,0-56.704-10.603-78.208-29.867c-3.136-2.816-7.616-3.499-11.477-1.792c-3.84,1.707-6.315,5.525-6.315,9.728v231.317c0,133.205,189.44,239.552,197.504,244.011c1.6,0.896,3.392,1.344,5.163,1.344c1.771,0,3.563-0.448,5.163-1.301c8.064-4.459,197.504-110.827,197.504-244.011v-230.4C458.777,34.688,458.563,33.067,457.987,31.531z"></path></g></g>
                                </svg>
                              </span>
                            </div>
                            <div className="box-title-wrap">
                              <h3 className="box-title">Security Payment</h3>
                              <p className="box-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-padding background-13 p-t-70 p-b-70 m-b-70">
                <div className="section-container">
                  <div className="block block-intro layout-7">
                    <div className="block-widget-wrap">
                      <div className="row">
                        <div className="section-column left animation-horizontal hover-opacity">
                          <img width="600" height="440" src="/media/banner/intro-about-3.jpg" alt="intro" />
                        </div>
                        <div className="section-column right">
                          <div className="intro-wrap">
                            <h2 className="intro-title">Top Jewellers at Ice Online</h2>
                            <div className="intro-item m-b-0">
                              Cenean imperdiet. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Vestibulum fringilla pede sit amet augue. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Fusce fermentum odio nec arcu.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-padding m-b-70">
                <div className="section-container">
                  <div className="block block-testimonial layout-2">
                    <div className="block-widget-wrap">
                      <div className="testimonial-wrap slick-wrap">
                        <div className="slick-sliders" data-slidestoscroll="true" data-nav="1" data-dots="0" data-columns4="1" data-columns3="1" data-columns2="1" data-columns1="2" data-columns="3">
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Amazing piece of history"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/1.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Robet Smith</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-4"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Fabulous Grounds"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/2.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Saitama One</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Great vineyard tour and tasting!"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/3.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Sara Colinton</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5"></div>
                                  </div>
                                </div>
                                <h2 className="testimonial-title">"Stunning Design"</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep...
                                </div>
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width="110" height="110" src="/media/testimonial/4.jpg" alt="" />
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Shetty Jamie</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-padding top-border p-t-10 p-b-10 m-b-0">
                <div className="section-container">
                  <div className="block block-image slider">
                    <div className="block-widget-wrap">
                      <div className="slick-wrap">
                        <div className="slick-sliders" data-nav="0" data-columns4="1" data-columns3="2" data-columns2="3" data-columns1="4" data-columns1440="4" data-columns="5">
                          <div className="item slick-slide">
                            <div className="item-image animation-horizontal">
                              <Link to="/shop">
                                <img width="450" height="450" src="/media/brand/1.jpg" alt="Brand 1" />
                              </Link>
                            </div>
                          </div>
                          <div className="item slick-slide">
                            <div className="item-image animation-horizontal">
                              <Link to="/shop">
                                <img width="450" height="450" src="/media/brand/2.jpg" alt="Brand 2" />
                              </Link>
                            </div>
                          </div>
                          <div className="item slick-slide">
                            <div className="item-image animation-horizontal">
                              <Link to="/shop">
                                <img width="450" height="450" src="/media/brand/3.jpg" alt="Brand 3" />
                              </Link>
                            </div>
                          </div>
                          <div className="item slick-slide">
                            <div className="item-image animation-horizontal">
                              <Link to="/shop">
                                <img width="450" height="450" src="/media/brand/4.jpg" alt="Brand 4" />
                              </Link>
                            </div>
                          </div>
                          <div className="item slick-slide">
                            <div className="item-image animation-horizontal">
                              <Link to="/shop">
                                <img width="450" height="450" src="/media/brand/5.jpg" alt="Brand 5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

