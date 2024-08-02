import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import React, {useState} from "react";
import {Head, Link, router, usePage} from "@inertiajs/react";
import {Course} from "@/types";
import {Button} from "@/Components/ui/button";
import axios from "axios";
import AddChapter from "@/Pages/Teacher/Courses/Edit/Partials/AddChapter";
import ChaptersTable from "@/Pages/Teacher/Courses/Edit/Partials/ChaptersTable";
import {Loader} from "lucide-react";
import {toast} from "sonner";
import CourseForm from "@/Pages/Teacher/Courses/Edit/Partials/CourseForm";

const Edit = () => {
  const {course} = usePage<{ course: Course }>().props
  const [isPublishing, setIsPublishing] = useState<boolean>(false)

  const handleCoursePublish = async () => {
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
      <Head title={'Edit Course'}/>
      <div className="flex items-center px-8 py-4 bg-white border-b border-gray-200 mb-2 rounded-md">
        <h1 className="text-xl lg:text-xl font-bold">
          <Link
            href={route('teachers.courses')}
            className="text-gray-600 hover:text-gray-700 underline"
          >
            Courses
          </Link>
          <span className="font-medium text-gray-600"> /</span> {course.title}
        </h1>
        <div className="ml-auto flex items-center">
          <Button
            variant={course.is_published ? 'default' : 'outline'}
            onClick={handleCoursePublish}
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
        <CourseForm course={course} />
      </div>
      <div className={'mt-6'}>
        <div className={'flex items-center justify-between py-4 mt-2 bg-white mb-2 px-8 rounded-md'}>
          <h2 className={'text-xl font-semibold text-gray-700'}>Chapters</h2>
          {/*<AddChapter course={course}/>*/}
        </div>
        <ChaptersTable chapters={course.chapters}/>
      </div>
    </div>
  )
}

Edit.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Edit;
