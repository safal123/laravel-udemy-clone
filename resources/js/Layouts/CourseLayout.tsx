import {Head, Link, usePage} from "@inertiajs/react";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import {Toaster} from "@/Components/ui/sonner";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/Pages/Payment/Partials/CheckoutForm";
import React from "react";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const auth = usePage<any>().props.auth
  const course = usePage<any>().props.course
  if (!course || !auth) {
    return <div>Loading...</div>
  }
  return (
    <div className={'bg-gray-900 min-h-screen'}>
      <Head title="Udemy Clone"/>
      <HomePageNavbar auth={auth}/>
      <Toaster position={'top-right'}/>
      <div className={"container mx-auto mt-4"}>
        <div className={"flex gap-4 flex-col-reverse pb-10 text-white lg:flex-row lg:justify-center"}>
          <div
            className={"md:sticky xl:top-[40px] lg:self-start flex flex-col gap-4 min-w-[300px] lg:min-w-[310px]"}>
            <div
              className={"bg-gray-800 relative transition-colors duration-300 rounded-xl px-5 flex items-center justify-between w-full py-3"}>
              <h1 className={"text-gray-300 font-semibold"}>
                Your Instructor
              </h1>
              <Link href={`/browse/instructors/${course.author?.id}`}>
                <p className={"text-white text-xl font-bold hover:underline"}>
                  {course.author.name}
                </p>
              </Link>
            </div>
            <div className={'relative lg:max-w-sm flex flex-1 overflow-hidden rounded-xl'}>
              <img
                src={course.image_url}
                alt={course.author.name}
                className={"mx-auto w-full lg:object-cover lg:h-[445px]"}
              />
            </div>
          </div>
          <div className={"flex-1"}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
