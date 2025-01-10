import TestimonialCard from '@/Components/shared/TestimonialCard'
import { Button } from '@/Components/ui/button'
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      title: "CEO, Company",
      image: "https://via.placeholder.com/150",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "Jane Doe",
      title: "CTO, Company",
      image: "https://via.placeholder.com/150",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "John Doe",
      title: "CEO, Company",
      image: "https://via.placeholder.com/150",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]
  return (
    <div className='mx-auto py-6 text-gray-200'>
      <div className='mb-6'>
        <h2 className='text-3xl font-bold'>Testimonials</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            name={testimonial.name}
            title={testimonial.title}
            image={testimonial.image}
            testimonial={testimonial.testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
