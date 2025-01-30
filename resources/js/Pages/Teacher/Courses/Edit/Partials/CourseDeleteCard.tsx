import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import React from 'react'

export const CourseDeleteCard = () => {
  return (
    <Card className={'mt-6 border border-red-500 bg-red-50'}>
      <CardHeader>
        <h2 className={'text-xl font-semibold text-gray-700'}>Danger Zone</h2>
      </CardHeader>
      <CardContent className={'flex flex-col space-y-4'}>
        <p>
          Deleting a course is irreversible. Are you sure you want to delete this course?
        </p>
        <Button variant={'destructive'} className={'w-fit'}>Delete Course</Button>
      </CardContent>
    </Card>
  )
}
