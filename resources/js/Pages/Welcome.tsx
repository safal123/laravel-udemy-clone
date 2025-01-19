import Footer from '@/Components/shared/Footer'
import HeroSection from '@/Components/shared/HeroSection'
import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import Pagination from '@/Components/shared/pagination/Pagination'
import Testimonials from '@/Components/shared/Testimonials'
import Courses from '@/Pages/Partials/Courses'
import { PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { Toaster } from 'sonner'

export default function Welcome({auth}: PageProps<{
  laravelVersion: string,
  phpVersion: string
}>) {
  const props = usePage().props as any
  const {courses} = props
  return (
    <div className={'bg-gray-900'}>
      <Toaster />
      <Head title="Udemy Clone"/>
      <HomePageNavbar auth={auth}/>
      <div className={'flex flex-col gap-6 pb-12 pt-2 px-6 container'}>
        <div className={'px-2'}>
          <HeroSection />
        </div>
        <div className={'mt-4 flex flex-col gap-4'}>
          <h2 className={'text-white text-2xl mt-4 px-2'}>
            Recently Added Courses
          </h2>
          <Courses courses={courses?.data}/>
        </div>
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
}
