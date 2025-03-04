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

export default function LandingPage({auth}: PageProps) {
  const courses = usePage().props.courses as { data: Course[] }
  // only take six categories
  const allCategories = usePage().props?.categories as any[]
  const categories = allCategories.slice(0, 8)
  const {addToWishlist} = useWishlist()

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
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6}}
  }

  const stagger = {
    visible: {transition: {staggerChildren: 0.2}}
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
      <Head title={'Home'}/>
      <HomePageNavbar auth={auth}/>
      <HeroSection/>
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recently Added Courses</h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {courses?.data.map((course: Course) => (
              <motion.div
                key={course.id}
                variants={fadeInUp}
              >
                <CourseCard course={course} addToWishlist={addToWishlist}/>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <HomePageCategories categories={categories}/>
      <TrustedBySlider/>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Learners Say</h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
              >
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={testimonial.avatar}/>
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 mb-4">{testimonial.role}</p>
                    <p className="text-gray-800">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
