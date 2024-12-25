import FieldGroup from "@/Components/shared/form/FieldGroup";
import TextInput from "@/Components/shared/form/TextInput";
import SelectInput from "@/Components/shared/form/SelectInput";
import TextareaInput from "@/Components/shared/form/TextareaInput";
import LoadingButton from "@/Components/shared/button/LoadingButton";
import UploadCourseImage from "@/Pages/Teacher/Courses/Edit/Partials/UploadCourseImage";
import React, {useEffect} from "react";
import {useForm, usePage} from "@inertiajs/react";
import {Course} from "@/types";
import slugify from "slugify";

type CourseFormProps = {
  course: Course;
}

const CourseForm = ({ course }: CourseFormProps) => {
  const { categories } = usePage().props as any;
  const {data, setData, errors, put, processing} = useForm({
    'title': course.title || '',
    'description': course.description || '',
    'price': course.price,
    'image_storage_id': course.image_storage_id || '',
    'category_id': course.category_id || '',
    'slug': course.slug || '',
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('teachers.courses.update', course.id))
  }
  useEffect(() => {
    if (!data.title || data.slug) return;
    setData('slug', slugify(data.title, {lower: true}))
  }, [data.title])
  return (
    <form onSubmit={handleSubmit} className={'flex flex-col lg:flex-row h-full items-stretch'}>
      <div className="w-full lg:w-1/2 flex-1 min-h-full h-full">
        <div className="grid gap-8 p-8 lg:grid-cols-2">
          <FieldGroup label="Course Title" name="title" error={errors.title}>
            <TextInput
              name="title"
              error={errors.title}
              value={data.title}
              onChange={e => setData('title', e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Course Price" name="price" error={errors.price}>
            <TextInput
              name="price"
              type={'number'}
              error={errors.price}
              value={data.price}
              onChange={(e: any) => setData('price', parseFloat(e.target.value))}
            />
          </FieldGroup>
          <FieldGroup label="Course Slug" name="price" error={errors.slug}>
            <TextInput
              name="slug"
              error={errors.slug}
              value={data.slug}
              onChange={(e: any) => setData('slug', e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Course Category" name="category_id" error={errors.category_id}>
            <SelectInput
              name="category_id"
              error={errors.category_id}
              value={data.category_id}
              onChange={e => setData('category_id', e.target.value)}
              options={categories.map((category: any) => ({
                label: category.name,
                value: category.id
              }))}
            />
          </FieldGroup>
        </div>
        <div className={'px-6'}>
          <FieldGroup label="Course Description" name="description" error={errors.description}>
            <TextareaInput
              name="description"
              error={errors.description}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
            />
          </FieldGroup>
        </div>
        <div className="flex items-center px-6 py-4">
          <LoadingButton
            loading={processing}
            type="submit"
            className="btn-indigo"
          >
            {processing ? 'Updating...' : 'Update Course'}
          </LoadingButton>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex-1">
        <div className={'px-6 py-4 min-h-[400px]'}>
          <UploadCourseImage
            errors={errors}
            course={course}
          />
        </div>
      </div>
    </form>
  )
}

export default CourseForm;
