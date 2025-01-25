import CourseLayout from '@/Layouts/CourseLayout'
import CheckoutForm from '@/Pages/Payment/Partials/CheckoutForm'
import { Course, PageProps } from '@/types'
import { router } from '@inertiajs/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const stripePromise = loadStripe('pk_test_51PY3wiCKzGstGhEeysB3zOfMD1Wuv76IwA2xjkXvj9rZD69KIH0P17d731dvSYm6mxwgmEpU10iM0wbhZaLpo6z800uhwx77KX')

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
    <div className={'bg-gray-800 rounded-md py-6'}>
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm course={course}/>
      </Elements>
    </div>
  );
}

PaymentIndex.layout = (page: React.ReactNode) =>
  <CourseLayout>
    {page}
  </CourseLayout>

export default PaymentIndex;
