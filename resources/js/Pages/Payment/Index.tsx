import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import CheckoutForm from '@/Pages/Payment/Partials/CheckoutForm';
import { Course, PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe('pk_test_51PY3wiCKzGstGhEeysB3zOfMD1Wuv76IwA2xjkXvj9rZD69KIH0P17d731dvSYm6mxwgmEpU10iM0wbhZaLpo6z800uhwx77KX');

type PaymentIndexProps = {
  auth: PageProps['auth'];
  course: Course;
  hasPurchase: boolean;
  clientSecret: string;
  isAuthor: boolean;
};

const PaymentIndex = ({ auth, course, clientSecret, hasPurchase }: PaymentIndexProps) => {
  if (hasPurchase) {
    return router.replace(route('courses.show', course.id));
  }
  if (!clientSecret) {
    return <div>Loading</div>;
  }
  if (course.author.id === auth.user.id) {
    return router.replace(route('courses.show', course.id));
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Complete Your Purchase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Details Card */}
        <Card className="hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
          <CardHeader>
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-2xl font-bold mb-4">{course.title}</CardTitle>
            <CardDescription className="text-gray-600 mb-6">
              {course.description.length > 100
                ? course.description.substring(0, 100) + '...'
                : course.description}
            </CardDescription>
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">${course.price}</span>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Enroll Now
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm course={course} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentIndex;
