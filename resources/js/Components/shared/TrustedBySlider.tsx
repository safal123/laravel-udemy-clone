import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const companies = [
  // Google logo
  { id: 1, logo: "https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg=s0" },
  { id: 2, logo: "https://swiperjs.com/images/clients/disney.jpg" },
  { id: 3, logo: "https://swiperjs.com/images/clients/adobe.jpg" },
  { id: 4, logo: "https://swiperjs.com/images/clients/toyota.svg" },
  { id: 5, logo: "https://swiperjs.com/images/clients/vodafone.svg" },
  { id: 6, logo: "https://swiperjs.com/images/clients/huawei.png" },
  { id: 7, logo: "https://swiperjs.com/images/clients/cisco.jpg" },
  { id: 8, logo: "https://swiperjs.com/images/clients/mcdonalds.svg" },
];

const TrustedBySlider = () => {
  return (
    <section className="py-12 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 underline tracking-wide text-gray-900">
          Trusted By
        </h2>
        <Swiper
          slidesPerView={3} // Show 2 slides on small screens
          spaceBetween={20} // Space between slides
          autoplay={{
            delay: 2500, // Autoplay delay in milliseconds
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          pagination={{
            clickable: true, // Enable clickable pagination
          }}
          breakpoints={{
            640: {
              slidesPerView: 3, // Show 3 slides on medium screens
            },
            1024: {
              slidesPerView: 5, // Show 5 slides on large screens
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {companies.map((company) => (
            <SwiperSlide key={company.id}>
              <div className="flex items-center justify-center p-12">
                <img
                  src={company.logo}
                  alt={`Company ${company.id}`}
                  className="w-full h-auto max-h-20 object-contain rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrustedBySlider;
