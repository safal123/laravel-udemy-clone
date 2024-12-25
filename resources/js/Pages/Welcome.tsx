import {Head, usePage} from '@inertiajs/react';
import {Course, PageProps} from '@/types';
import HomePageCarousel from "@/Components/shared/HomePageCarousel";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import {Card, CardContent, CardHeader} from "@/Components/ui/card";
import {Button} from "@/Components/ui/button";
import Pagination from "@/Components/shared/pagination/Pagination";
import CourseCard from "@/Components/shared/card/CourseCard";
import Courses from "@/Pages/Partials/Courses";

export default function Welcome({auth}: PageProps<{
  laravelVersion: string,
  phpVersion: string
}>) {
  const props = usePage().props as any
  const {courses} = props
  return (
    <div>
      <Head title="Udemy Clone"/>
      <HomePageNavbar auth={auth}/>
      <div className={'pb-12 pt-2 px-6 bg-gray-900'}>
        <div className={'px-2'}>
          <HomePageCarousel courses={courses?.data}/>
        </div>
        <Courses courses={courses?.data} />
        <div className={'mt-4 flex justify-center'}>
          {courses && <Pagination links={courses.meta.links}/>}
        </div>
      </div>
    </div>
  );
}
