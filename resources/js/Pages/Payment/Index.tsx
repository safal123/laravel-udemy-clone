import {Head, usePage} from "@inertiajs/react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/Pages/Payment/Partials/CheckoutForm";
import {Course, PageProps} from "@/types";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import {Toaster} from "@/Components/ui/sonner";
import React from "react";

const stripePromise = loadStripe('pk_test_51PY3wiCKzGstGhEeysB3zOfMD1Wuv76IwA2xjkXvj9rZD69KIH0P17d731dvSYm6mxwgmEpU10iM0wbhZaLpo6z800uhwx77KX');

const PaymentIndex = ({ auth }: PageProps) => {
  const clientSecret = usePage().props.clientSecret as string
  const course = usePage().props.course as Course
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret
  };
  if (!clientSecret) {
    return <div>Loading</div>
  }
  return (
    <div className={'bg-gray-200 min-h-screen'}>
      <Head title="Udemy Clone"/>
      <HomePageNavbar auth={auth}/>
      <Toaster
        position={'top-right'}
      />
      <div className={'flex justify-center items-center p-2'}>
        <div className={'max-w-2xl mx-auto p-6 bg-gray-100 m-4 rounded-md'}>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              course={course}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}


export default PaymentIndex;
