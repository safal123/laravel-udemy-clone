import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import CourseForm from '@/Pages/Teacher/Courses/Edit/Partials/CourseForm'
import React, {useEffect} from "react";
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import slugify from "slugify";


const Index = () => {
  const { categories } = usePage<any>().props
  const {data, setData, errors, post, processing} = useForm({
    title: '',
    price: 0,
    category_id: '',
    description: '',
    slug: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(data);
    post(route('teachers.courses.store'))
  }

  return (
    <div className={'w-full overflow-hidden'}>
      <Head title="Create Course" />
      <div className="flex items-center px-8 py-4 bg-white border-b border-gray-200 mb-2 rounded-md">
        <h1 className="text-xl lg:text-3xl font-bold">
          <Link
            href={route('teachers.courses.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Courses
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>
      <div className="bg-white rounded shadow">
        <CourseForm mode={'create'}/>
      </div>
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
