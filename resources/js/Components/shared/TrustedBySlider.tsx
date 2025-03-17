import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

// Updated company logos with better quality and more recognizable brands
const companies = [
  // Add names for better accessibility
  { id: 1, name: "Google", logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg" },
  { id: 2, name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { id: 3, name: "Amazon", logo: "https://cdn.worldvectorlogo.com/logos/amazon-dark.svg" },
  { id: 4, name: "Adobe", logo: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg" },
  { id: 5, name: "Slack", logo: "https://cdn.worldvectorlogo.com/logos/slack-2.svg" },
  { id: 6, name: "Spotify", logo: "https://cdn.worldvectorlogo.com/logos/spotify-1.svg" },
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="inline-block text-sm font-medium text-orange-600 mb-2 tracking-wide">TRUSTED BY INDUSTRY LEADERS</div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4">
            Join Thousands of Companies <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Worldwide</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our platform is trusted by leading companies for employee upskilling and professional development
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
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
            modules={[Autoplay, EffectFade]}
            className="trusted-slider"
          >
            {companies.map((company) => (
              <SwiperSlide key={company.id}>
                <div className="flex items-center justify-center py-6 px-4 h-24 transition-opacity hover:opacity-80">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-auto max-h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
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
