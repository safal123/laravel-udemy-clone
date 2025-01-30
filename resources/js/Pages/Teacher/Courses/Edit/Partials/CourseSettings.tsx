import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import React from 'react'

type CourseSettingsProps = {
  course: any;
}

const CourseSettings = ({ course }: CourseSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className={'text-xl font-semibold text-gray-700'}>Course Settings</h2>
      </CardHeader>
      <CardContent>
        <div className={'flex flex-col space-y-4'}>
          <div className={'flex flex-col md:flex-row md:items-center justify-between gap-y-2'}>
            <label htmlFor="is_published" className={'text-gray-700 w-1/2'}>
              Course Level
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={'Select Course Level'}/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'beginner'}>Beginner</SelectItem>
                <SelectItem value={'intermediate'}>Intermediate</SelectItem>
                <SelectItem value={'advanced'}>Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={'flex flex-col md:flex-row md:items-center justify-between gap-y-2'}>
            <label htmlFor="is_published" className={'text-gray-700 w-1/2'}>
              Course Tags
            </label>
            <div className={'w-full'}>
              <Input type="text" className={'w-full'} placeholder={'Enter tags separated by commas'}/>
              <p className={'text-xs text-gray-500 mt-1'}>
                <span className={'block text-gray-800'}>
                  Example: Web Development, React, JavaScript
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSettings
