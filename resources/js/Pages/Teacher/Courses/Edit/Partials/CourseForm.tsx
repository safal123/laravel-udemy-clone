import LoadingButton from '@/Components/shared/button/LoadingButton'
import Editor from '@/Components/shared/Editor'
import FieldGroup from '@/Components/shared/form/FieldGroup'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Textarea } from '@/Components/ui/textarea'
import UploadCourseImage from '@/Pages/Teacher/Courses/Edit/Partials/UploadCourseImage'
import { Course } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import slugify from 'slugify'

type CourseFormProps = {
  course?: Course;
  mode?: 'create' | 'edit';
}

const CourseForm = ({course, mode}: CourseFormProps) => {
  const {categories} = usePage().props as any
  const {data, setData, errors, put, post, processing} = useForm({
    'title': course?.title || '',
    'description': course?.description || '',
    'price': course?.price,
    'image_storage_id': course?.image_storage_id || '',
    'category_id': course?.category_id || '',
    'slug': course?.slug || ''
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (mode === 'create') return post(route('teachers.courses.store'))
    put(route('teachers.courses.update', course?.id))
  }
  useEffect(() => {
    if (!data.title ) return
    setData('slug', slugify(data.title, {lower: true}))
  }, [data.title])

  return (
    <>
      <form onSubmit={handleSubmit} className={'flex flex-col lg:flex-row gap-4 h-full items-stretch'}>
        <div className="w-full lg:w-1/2 flex-1 min-h-full h-full">
          <div className="grid gap-8 lg:grid-cols-2">
            <FieldGroup label="Course Title" name="title" error={errors.title}>
              <Input
                name="title"
                value={data.title}
                onChange={(e: any) => setData('title', e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Course Price" name="price" error={errors.price}>
              <Input
                name="price"
                type="number"
                value={data.price}
                onChange={(e: any) => setData('price', e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Course Slug" name="price" error={errors.slug}>
              <Input
                name="slug"
                value={data.slug}
                onChange={(e: any) => setData('slug', e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Course Category" name="category_id" error={errors.category_id}>
              <Select
                onValueChange={(value) => setData('category_id', value)}
                defaultValue={data.category_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder={'Select Category'}/>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}

                      onClick={() => setData('category_id', category)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldGroup>
          </div>
          <div className={'pt-6'}>
            <FieldGroup label="Course Description" name="description" error={errors.description}>
              <div className={'max-w-2xl'}>
                <Editor
                  value={data.description}
                  onChange={(value) => setData('description', value)}
                />
              </div>
            </FieldGroup>
          </div>
          <div className="flex items-center pt-6">
            <LoadingButton
              loading={processing}
              type="submit"
            >
              {mode === 'create' ? 'Create Course' : 'Update Course'}
            </LoadingButton>
          </div>
        </div>
      </form>
    </>
  )
}

export default CourseForm;
