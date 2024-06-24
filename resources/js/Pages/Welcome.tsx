import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import HomePageCarousel from "@/Components/shared/HomePageCarousel";
import {courses} from "@/lib/consts";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";

export default function Welcome({auth, laravelVersion, phpVersion}: PageProps<{
  laravelVersion: string,
  phpVersion: string
}>) {
  return (
    <>
      <Head title="Udemy Clone"/>
      <HomePageNavbar auth={auth}/>
      <div className={'p-2'}>
        <HomePageCarousel courses={courses}/>
      </div>
    </>
  );
}
