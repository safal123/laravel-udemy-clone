import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/Components/ui/card'
import React from 'react'

interface TestimonialsProps {
  name: string;
  title: string;
  image: string;
  testimonial: string;
}

const TestimonialCard = ({name, title, image, testimonial}: TestimonialsProps) => {
  return (
    <Card className={'bg-gray-800 border-gray-700'}>
      <CardContent className={'pt-8'}>
        <p className={'text-gray-400 font-semibold text-lg'}>
          "{testimonial.substring(0, 100)}..."
        </p>
      </CardContent>
      <CardFooter>
        <div className={'flex items-center gap-4'}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-gray-200">
            <div className="text-lg font-bold">{name}</div>
            <div className="text-blue-400 font-semibold">{title}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TestimonialCard
