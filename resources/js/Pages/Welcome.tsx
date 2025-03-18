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
import RecentlyAddedCourses from '@/Components/shared/RecentlyAddedCourses'
import Testimonials from '@/Components/shared/Testimonials'

export default function LandingPage({ auth }: PageProps) {
  const courses = usePage().props.courses as { data: Course[] }
  const allCategories = usePage().props?.categories as any[]
  const categories = allCategories.slice(0, 8)
  const { addToWishlist } = useWishlist()

  // Create an adapter function to handle the type mismatch
  const handleAddToWishlist = (courseId: string) => {
    const course = courses.data.find(c => c.id.toString() === courseId);
    if (course) addToWishlist(course);
  }

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
      <RecentlyAddedCourses courses={courses.data} addToWishlist={handleAddToWishlist} />
      <HomePageCategories categories={categories} />
      <TrustedBySlider />
      <Testimonials />
      <Footer />
    </div>
  );
}
