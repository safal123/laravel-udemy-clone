import CourseCard from '@/Components/shared/CourseCard'
import Footer from '@/Components/shared/Footer'
import HeroSection from '@/Components/shared/HeroSection'
import HomePageCategories from '@/Components/shared/HomePageCategories'
import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import TrustedBySlider from '@/Components/shared/TrustedBySlider'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Card, CardContent } from '@/Components/ui/card'
import { useWishlist } from '@/hooks/useWishlist' // shadcn/ui Card
import { Course, PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react' // shadcn/ui Avatar
import { motion } from 'framer-motion'
import { Toaster } from 'sonner' // Framer Motion
import { Button } from '@/Components/ui/button'

export default function LandingPage({ auth }: PageProps) {
  const courses = usePage().props.courses as { data: Course[] }
  // only take six categories
  const allCategories = usePage().props?.categories as any[]
  const categories = allCategories.slice(0, 8)
  const { addToWishlist } = useWishlist()

  // Dummy data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Web Developer',
      comment: 'This platform helped me master React in just 3 months! Highly recommended.',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Data Scientist',
      comment: 'The courses are well-structured and easy to follow. Great for beginners!',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      role: 'UI/UX Designer',
      comment: 'I loved the design courses. They are practical and up-to-date.',
      avatar: 'https://via.placeholder.com/150'
    }
  ]

  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        toastOptions={{
          duration: 2000,
          classNames: {
            toast: 'bg-gray-800 text-white',
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
          }
        }}
      />
      <Head title={'Home'} />
      <HomePageNavbar auth={auth} />
      <HeroSection />
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <div className="inline-block text-sm font-medium text-orange-600 mb-2 tracking-wide">EXPAND YOUR KNOWLEDGE</div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                Recently Added <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Courses</span>
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl">
                Discover our latest additions to help you master new skills and advance your career with expert-led instruction.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-slate-300 text-slate-700 hover:border-orange-300 hover:text-orange-600 px-4"
              >
                View All
              </Button>
              <div className="hidden md:flex items-center space-x-1 border border-slate-200 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-slate-600 hover:text-orange-600 px-3 text-xs"
                >
                  Most Popular
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full bg-white text-slate-800 hover:bg-white shadow-sm px-3 text-xs"
                >
                  New Releases
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-slate-600 hover:text-orange-600 px-3 text-xs"
                >
                  Top Rated
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {courses?.data.map((course: Course) => (
              <motion.div
                key={course.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard course={course} addToWishlist={addToWishlist} />
              </motion.div>
            ))}
          </motion.div>

          {/* "View More" button when there are many courses */}
          {courses?.data.length > 0 && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-slate-300 hover:border-orange-300 hover:text-orange-600 px-8"
              >
                Browse All Courses
              </Button>
            </div>
          )}
        </div>
      </section>
      <HomePageCategories categories={categories} />
      <TrustedBySlider />
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="text-sm font-medium text-orange-500 mb-2 tracking-wide">SUCCESS STORIES</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Learners</span> Say
              </h2>
              <p className="mt-3 text-slate-300 max-w-2xl">
                Discover how our courses have helped thousands of students transform their careers and achieve their goals
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-slate-700 text-slate-300 hover:border-orange-500 hover:text-orange-500 px-4 hover:bg-slate-800/50"
              >
                View All Testimonials
              </Button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-hidden rounded-xl border border-slate-700/50 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Quote mark */}
                    <div className="mb-4 text-orange-500 opacity-80">
                      <svg width="45" height="36" className="fill-current" viewBox="0 0 45 36" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.415.43c-2.523 0-4.75.473-6.683 1.419-1.933.946-3.708 2.21-5.325 3.795C-.22 7.229-1.09 9.286-1.55 11.814c0 .473.157.946.63 1.42.315.473.788.709 1.262.709h.631c.947 0 1.736-.473 2.367-1.42.631-.946 1.42-1.419 2.05-1.419.632 0 1.264.473 1.896 1.42.631.946.947 2.05.947 3.468 0 1.42-.316 2.628-.947 3.574-.631.946-1.42 1.42-2.367 1.42-.947 0-1.736-.474-2.367-1.42-.631-.946-.947-2.155-.947-3.574v-.71c0-.473-.316-.946-.631-1.419-.316-.473-.631-.71-1.105-.71h-.631c-.474 0-.947.237-1.263.71-.315.473-.631.946-.631 1.42v.709c.157 3.468.947 6.096 2.525 7.988 1.42 1.892 3.34 2.838 5.746 2.838 2.683 0 4.908-.946 6.525-3.156 1.579-1.892 2.525-4.257 2.525-7.252 0-3.156-.946-5.677-2.525-7.57C18.324 1.85 16.098.429 13.415.429zm25.621 0c-2.525 0-4.75.473-6.683 1.419-1.934.946-3.71 2.21-5.326 3.795-1.578 1.585-2.683 3.642-3.156 6.17 0 .473.157.946.63 1.42.316.473.79.709 1.263.709h.631c.947 0 1.736-.473 2.367-1.42.631-.946 1.42-1.419 2.051-1.419.631 0 1.262.473 1.894 1.42.631.946.947 2.05.947 3.468 0 1.42-.316 2.628-.947 3.574-.632.946-1.42 1.42-2.367 1.42-.947 0-1.736-.474-2.367-1.42-.631-.946-.947-2.155-.947-3.574v-.71c0-.473-.316-.946-.631-1.419-.316-.473-.632-.71-1.105-.71h-.631c-.474 0-.947.237-1.263.71-.316.473-.631.946-.631 1.42v.709c0 3.468.947 6.096 2.525 7.988 1.42 1.892 3.34 2.838 5.746 2.838 2.683 0 4.908-.946 6.525-3.156 1.578-1.892 2.525-4.257 2.525-7.252 0-3.156-.947-5.677-2.525-7.57-1.617-2.21-3.842-3.63-6.525-3.63z" />
                      </svg>
                    </div>

                    {/* Testimonial content */}
                    <div className="mb-6 flex-grow">
                      <p className="text-slate-300 italic leading-relaxed">{testimonial.comment}</p>
                    </div>

                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    {/* User info */}
                    <div className="flex items-center">
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
                        <div className="ml-auto bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full flex items-center">
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
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-6">Ready to transform your career?</h3>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-medium px-6 shadow-lg shadow-orange-500/20"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
