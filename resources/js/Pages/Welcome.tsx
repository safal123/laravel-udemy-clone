import Footer from '@/Components/shared/Footer'
import HeroSection from '@/Components/shared/HeroSection'
import HomePageCategories from '@/Components/shared/HomePageCategories'
import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import TrustedBySlider from '@/Components/shared/TrustedBySlider'
import { useWishlist } from '@/hooks/useWishlist' // shadcn/ui Card
import { Course, PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react' // shadcn/ui Avatar
import { Toaster } from 'sonner' // Framer Motion
import RecentlyAddedCourses from '@/Components/shared/RecentlyAddedCourses'
import Testimonials from '@/Components/shared/Testimonials'

export default function LandingPage({ auth }: PageProps) {
  const courses = usePage().props.courses as {
    newReleases: Course[];
    mostPopular: Course[];
    topRated: Course[];
  };
  const allCategories = usePage().props?.categories as any[]
  const categories = allCategories.slice(0, 8)
  const { addToWishlist } = useWishlist()

  const handleAddToWishlist = (courseId: string) => {
    const course = [...courses.newReleases, ...courses.mostPopular, ...courses.topRated]
      .find((c: Course) => c.id.toString() === courseId);
    if (course) addToWishlist(course);
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
      <div className={'mt-16'}>
        <HeroSection />
      </div>
      <RecentlyAddedCourses
        courses={courses}
        addToWishlist={handleAddToWishlist}
      />
      <HomePageCategories categories={categories} />
      <TrustedBySlider />
      <Testimonials />
      <Footer />
    </div>
  );
}
