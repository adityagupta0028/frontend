import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";

const sliderData = [
  {
    id: 1,
    title: "Lorem Ipsum",
    href: "/shop",
    img: "/media/blog/1.jpg",
    alt: "Bridal Fair Collections 2023",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    href: "/shop",
    img: "/media/blog/2.jpg",
    alt: "Our Sterling Silver",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    href: "/shop",
    img: "/media/blog/3.jpg",
    alt: "Modern Gold Earrings",
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    href: "/shop",
    img: "/media/blog/4.jpg",
    alt: "Glossary of Jewelry Terms",
  },
];

export default function SubCategoryCarousel() {
  return (
    <section className="section section-padding top-border p-t-50">
      <div className="section-container">
        <div className="block block-posts slider">
          <div className="block-widget-wrap">
            <div className="block-title text-center">
              <h2 className="t-brown">Lorem Gifts Lorem1</h2>
            </div>

            <div className="block-content slider_container1 relative">
              {/* Custom navigation buttons */}
              <button className="swiper-btn prev-btn">
                <FaChevronLeft />
              </button>

              <button className="swiper-btn next-btn">
                <FaChevronRight />
              </button>

              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: ".prev-btn",
                  nextEl: ".next-btn",
                }}
                spaceBetween={24}
                slidesPerView={3}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="swiper-sliders"
              >
                {sliderData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="post-grid post">
                      <div className="post-inner">
                        <div className="post-image">
                          <Link className="post-thumbnail" to={item.href}>
                            <img
                              width="720"
                              height="484"
                              src={item.img}
                              alt={item.alt}
                            />
                          </Link>
                        </div>

                        <div className="post-content">
                          <h2 className="post-title">
                            <Link to={item.href}>{item.title}</Link>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
