import {Head, Link, router} from "@inertiajs/react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/Pages/Payment/Partials/CheckoutForm";
import {Course, PageProps} from "@/types";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import {Toaster} from "@/Components/ui/sonner";
import React from "react";

const stripePromise = loadStripe('pk_test_51PY3wiCKzGstGhEeysB3zOfMD1Wuv76IwA2xjkXvj9rZD69KIH0P17d731dvSYm6mxwgmEpU10iM0wbhZaLpo6z800uhwx77KX');

type PaymentIndexProps = {
  auth: PageProps['auth']
  course: Course
  hasPurchase: boolean
  clientSecret: string
  isAuthor: boolean
}

const PaymentIndex = ({auth, course, clientSecret, hasPurchase}: PaymentIndexProps) => {

  if (hasPurchase) {
    return router.replace(route('courses.show', course.id))
  }
  if (!clientSecret) {
    return <div>Loading</div>
  }
  if (course.author.id === auth.user.id) {
    return router.replace(route('courses.show', course.id))
  }

  return (
    <div className={'bg-gray-900 min-h-screen'}>
      <Head title="Udemy Clone"/>
      <HomePageNavbar auth={auth}/>
      <Toaster
        position={'top-right'}
      />
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
          <div className={"flex-1 space-y-4 bg-gray-800 p-4 rounded-lg"}>
            <Elements stripe={stripePromise} options={{clientSecret}}>
              <CheckoutForm course={course}/>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PaymentIndex;
