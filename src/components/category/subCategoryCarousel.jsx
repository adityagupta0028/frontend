import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import { useEffect } from "react";



export default function SubCategoryCarousel({ data }) {

  useEffect(() => {

  }, [data])


  return (
    <section className="section section-padding top-border p-t-5">
      <div className="section-container">
        <div className="block block-posts slider">
          <div className="block-widget-wrap">
            {/* <div className="block-title text-center mb-6">
              <h2 className="t-brown">Lorem Gifts Lorem1</h2>
            </div> */}

            <div className="block-content slider_container1 relative">
              {/* Custom navigation  buttons */}
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
                spaceBetween={0}
                slidesPerView={9}
                breakpoints={{
                  0: { slidesPerView: 3 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 10 },
                }}
                className="swiper-sliders"
              >
                {data.map((item) => (
                  // <SwiperSlide key={item.id}>
                  //   <div className="post-grid post">
                  //     <div className="post-inner">
                  //       <Link className="post-thumbnail" to={item.href}>
                  //         <div className="post-image mb-2">
                  //           <img
                  //             width="720"
                  //             height="484"
                  //             src={item.image}
                  //             alt={item.name}
                  //           />
                  //         </div>

                  //         <div className="post-content">
                  //           <h6 className="post-title !text-[18px] text-center !leading-[20px]">
                  //             {item.name}
                  //           </h6>
                  //         </div>
                  //       </Link>
                  //     </div>
                  //   </div>
                  // </SwiperSlide>
                  <SwiperSlide key={item.id} className="py-6">
                    <div className="group flex flex-col items-center text-center cursor-pointer">

                      <Link to={item.href} className="flex flex-col items-center">

                        {/* Image Container */}
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 shadow-sm 
                      transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                          <img
                            className="w-24 h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>

                        {/* Title */}
                        <p className="mt-3 text-xs tracking-wide text-gray-700 
                     group-hover:text-[#cb8161] transition-colors duration-300 
                     truncate w-24">
                          {item.name}
                        </p>

                      </Link>
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
