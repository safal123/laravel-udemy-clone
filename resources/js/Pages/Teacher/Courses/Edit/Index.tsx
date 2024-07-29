import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import React, {useEffect, useState} from "react";
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import {Course} from "@/types";
import FieldGroup from "@/Components/shared/form/FieldGroup";
import LoadingButton from "@/Components/shared/button/LoadingButton";
import TextInput from "@/Components/shared/form/TextInput";
import {Button} from "@/Components/ui/button";
import TextareaInput from "@/Components/shared/form/TextareaInput";
import axios from "axios";
import SelectInput from "@/Components/shared/form/SelectInput";
import slugify from "slugify";
// @ts-ignore
import {truncate} from "lodash";
import AddChapter from "@/Pages/Teacher/Courses/Edit/Partials/AddChapter";
import ChaptersTable from "@/Pages/Teacher/Courses/Edit/Partials/ChaptersTable";
import {Loader} from "lucide-react";
import UploadCourseImage from "@/Pages/Teacher/Courses/Edit/Partials/UploadCourseImage";
import {toast} from "sonner";

const Edit = () => {
  const {course} = usePage<{ course: Course }>().props
  const {categories} = usePage<any>().props
  const {chapters} = usePage<any>().props
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
  const [objectUrl, setObjectUrl] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [courseFile, setCourseFile] = useState<File | null>(null)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)

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
    setData('slug', slugify(data.title, {lower: true}))
  }, [data.title])

  const handleChapterPublish = async () => {
    try {
      setIsPublishing(true)
      await axios.put(route('teachers.courses.toggle-publish', course.id))
      router.reload({
        only: ['course']
      })
      toast.success(`Course ${course.is_published ? 'unpublished' : 'published'} successfully.`)
    } catch (e) {
      console.log(e)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }
  return (
    <div>
      <Head title={course.title}/>
      <div className="flex items-center px-8 py-4 bg-white border-b border-gray-200 mb-2 rounded-md">
        <h1 className="text-xl lg:text-xl font-bold">
          <Link
            href={route('teachers.courses')}
            className="text-gray-600 hover:text-gray-700 underline"
          >
            Courses
          </Link>
          <span className="font-medium text-gray-600"> /</span> {data.title}
        </h1>
        <div className="ml-auto flex items-center">
          <Button
            variant={course.is_published ? 'default' : 'outline'}
            onClick={handleChapterPublish}
          >
            {isPublishing && <Loader className={'animate-spin mr-2'} size={20}/>}
            {course.is_published ? 'Unpublish' : 'Publish'}
          </Button>
          <Button
            className="ml-4"
            variant={'destructive'}
            onClick={() => console.log('clicked')}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit} className={'flex flex-col lg:flex-row h-full items-stretch'}>
          <div className="w-full lg:w-1/2 flex-1 min-h-full h-full">
            <div className="grid gap-8 p-8 lg:grid-cols-2">
              <FieldGroup label="Course Title" name="title" error={errors.title}>
                <TextInput
                  name="name"
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
                  disabled={true}
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
              <FieldGroup label="Course Description" name="title" error={errors.description}>
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
      </div>
      <div className={'mt-6'}>
        <div className={'flex items-center justify-between py-4'}>
          <h2 className={'text-xl font-semibold text-gray-800'}>Chapters</h2>
          <AddChapter course={course}/>
        </div>
        <ChaptersTable chapters={course.chapters}/>
      </div>
    </div>
  )
}

Edit.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Edit;
