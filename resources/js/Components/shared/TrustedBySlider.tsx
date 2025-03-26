import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

// Updated company logos with better quality and more recognizable brands
const companies = [
  // Google and Spotify removed due to logo loading issues
  { id: 2, name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { id: 3, name: "Amazon", logo: "https://cdn.worldvectorlogo.com/logos/amazon-dark.svg" },
  { id: 4, name: "Adobe", logo: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg" },
  { id: 5, name: "Slack", logo: "https://cdn.worldvectorlogo.com/logos/slack-2.svg" },
  { id: 7, name: "Netflix", logo: "https://cdn.worldvectorlogo.com/logos/netflix-4.svg" },
  { id: 8, name: "Airbnb", logo: "https://cdn.worldvectorlogo.com/logos/airbnb.svg" },
];

const TrustedBySlider = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="inline-block text-sm font-semibold text-blue-600 mb-3 tracking-wide px-3 py-1 bg-blue-50 rounded-full">TRUSTED BY INDUSTRY LEADERS</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4">
            Join Thousands of Companies <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Worldwide</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is trusted by leading companies for employee upskilling and professional development
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 border border-gray-100">
          <Swiper
            slidesPerView={2}
            spaceBetween={40}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            modules={[Autoplay]}
            className="trusted-slider"
          >
            {companies.map((company) => (
              <SwiperSlide key={company.id}>
                <div className="flex items-center justify-center py-6 px-4 h-24 hover:scale-105 transition-transform duration-300">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-auto max-h-12 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            See how companies succeed with our platform
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySlider;
