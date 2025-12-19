import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import { useEffect } from "react";



export default function SubCategoryCarousel({ data }) {

  useEffect(() => {
    console.log('data products====>', data)
  }, [data])


  return (
    <section className="section section-padding top-border p-t-50">
      <div className="section-container">
        <div className="block block-posts slider">
          <div className="block-widget-wrap">
            {/* <div className="block-title text-center mb-6">
              <h2 className="t-brown">Lorem Gifts Lorem1</h2>
            </div> */}

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
                spaceBetween={36}
                slidesPerView={8}
                breakpoints={{
                  0: { slidesPerView: 3 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                }}
                className="swiper-sliders"
              >
                {data.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="post-grid post">
                      <div className="post-inner">
                        <Link className="post-thumbnail" to={item.href}>
                          <div className="post-image mb-2">
                            <img
                              width="720"
                              height="484"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>

                          <div className="post-content">
                            <h6 className="post-title !text-[18px] text-center !leading-[20px]">
                              {item.name}
                            </h6>
                          </div>
                        </Link>
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
