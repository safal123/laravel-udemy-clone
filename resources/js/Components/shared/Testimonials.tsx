import TestimonialCard from '@/Components/shared/TestimonialCard'
import { Button } from '@/Components/ui/button'
import React from "react";
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

const Testimonials = () => {
  // Enhanced testimonial data with more realistic content and better images
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Web Developer at TechCorp',
      comment: 'The React Advanced course was transformative for my career. I went from struggling with basic concepts to implementing complex state management patterns within weeks. The instructor\'s expertise and the hands-on projects made all the difference.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      company: 'TechCorp',
      course: 'React Advanced',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Data Scientist',
      comment: 'As someone transitioning into data science, I found the Machine Learning Fundamentals course incredibly accessible yet comprehensive. The course progression was logical, and the practical exercises reinforced my understanding of complex algorithms.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      company: 'DataInsights Inc.',
      course: 'Machine Learning Fundamentals',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'UI/UX Design Lead',
      comment: 'The UI/UX Masterclass exceeded my expectations. The instructor\'s approach to design thinking and user research methodologies has completely changed how I approach projects. I\'ve already implemented several techniques from the course in my daily work.',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      company: 'CreativeDesign Studios',
      course: 'UI/UX Masterclass',
      rating: 4
    }
  ]
  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Moving gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-blue-800/10 opacity-70 animate-gradient-slow pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
        >
          <div>
            <div className="text-sm font-medium text-orange-500 mb-2 tracking-wide">SUCCESS STORIES</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Learners</span> Say
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl">
              Discover how our courses have helped thousands of students transform their careers and achieve their goals with industry-recognized certifications.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-slate-800/80 border-slate-700 text-slate-300 hover:border-orange-500 hover:text-orange-500 px-4 hover:bg-slate-700/80"
            >
              View All Testimonials
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden rounded-xl border border-slate-700/50 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  {/* Course badge */}
                  <div className="mb-4 flex items-center">
                    <span className="bg-orange-500/20 text-orange-400 text-xs font-medium px-2.5 py-1 rounded-full">
                      {testimonial.course}
                    </span>
                    <div className="ml-auto flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Quote mark */}
                  <div className="mb-4 text-orange-500 opacity-80">
                    <svg width="45" height="36" className="fill-current" viewBox="0 0 45 36" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.415.43c-2.523 0-4.75.473-6.683 1.419-1.933.946-3.708 2.21-5.325 3.795C-.22 7.229-1.09 9.286-1.55 11.814c0 .473.157.946.63 1.42.315.473.473.709 1.262.709h.631c.947 0 1.736-.473 2.367-1.42.631-.946 1.42-1.419 2.05-1.419.632 0 1.264.473 1.896 1.42.631.946.947 2.05.947 3.468 0 1.42-.316 2.628-.947 3.574-.631.946-1.42 1.42-2.367 1.42-.947 0-1.736-.474-2.367-1.42-.631-.946-.947-2.155-.947-3.574v-.71c0-.473-.316-.946-.631-1.419-.316-.473-.631-.71-1.105-.71h-.631c-.474 0-.947.237-1.263.71-.315.473-.631.946-.631 1.42v.709c.157 3.468.947 6.096 2.525 7.988 1.42 1.892 3.34 2.838 5.746 2.838 2.683 0 4.908-.946 6.525-3.156 1.579-1.892 2.525-4.257 2.525-7.252 0-3.156-.946-5.677-2.525-7.57C18.324 1.85 16.098.429 13.415.429zm25.621 0c-2.525 0-4.75.473-6.683 1.419-1.934.946-3.71 2.21-5.326 3.795-1.578 1.585-2.683 3.642-3.156 6.17 0 .473.157.946.63 1.42.316.473.79.709 1.263.709h.631c.947 0 1.736-.473 2.367-1.42.631-.946 1.42-1.419 2.051-1.419.631 0 1.262.473 1.894 1.42.631.946.947 2.05.947 3.468 0 1.42-.316 2.628-.947 3.574-.632.946-1.42 1.42-2.367 1.42-.947 0-1.736-.474-2.367-1.42-.631-.946-.947-2.155-.947-3.574v-.71c0-.473-.316-.946-.631-1.419-.316-.473-.632-.71-1.105-.71h-.631c-.474 0-.947.237-1.263.71-.316.473-.631.946-.631 1.42v.709c0 3.468.947 6.096 2.525 7.988 1.42 1.892 3.34 2.838 5.746 2.838 2.683 0 4.908-.946 6.525-3.156 1.578-1.892 2.525-4.257 2.525-7.252 0-3.156-.947-5.677-2.525-7.57-1.617-2.21-3.842-3.63-6.525-3.63z" />
                    </svg>
                  </div>

                  {/* Testimonial content */}
                  <div className="mb-6 flex-grow">
                    <p className="text-slate-300 italic leading-relaxed">{testimonial.comment}</p>
                  </div>

                  {/* User info */}
                  <div className="flex items-center pt-4 border-t border-slate-700/30">
                    <Avatar className="h-12 w-12 border-2 border-orange-500/20 ring-2 ring-orange-500/10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white">
                        {testimonial.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="text-base font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>

                    {/* Verified badge */}
                    {index % 2 === 0 && (
                      <div className="ml-auto bg-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Ready to transform your career?</h3>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-medium px-8 py-6 shadow-lg shadow-orange-500/20 rounded-full"
          >
            Start Learning Today
          </Button>
          <p className="mt-4 text-slate-400 text-sm">Join over 50,000 students worldwide</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
