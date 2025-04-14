import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/Components/ui/breadcrumb'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import TeacherDashboardLayout from '@/Layouts/TeacherDashboardLayout'
import CourseForm from '@/Pages/Teacher/Courses/Edit/Partials/CourseForm'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'


const Index = () => {
  const { categories } = usePage<any>().props
  const { data, setData, errors, post, processing } = useForm({
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
      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center border px-8 py-4 border-gray-200 rounded-md mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={route('teachers.courses.index')}>
                    Courses
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Create Course
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Create Course</h2>
          </CardHeader>
          <CardContent>
            <CourseForm mode="create" categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
