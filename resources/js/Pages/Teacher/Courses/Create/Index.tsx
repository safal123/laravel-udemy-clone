import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import React, {useEffect, useState} from "react";
import {Link, useForm, usePage} from "@inertiajs/react";
import FieldGroup from "@/Components/shared/form/FieldGroup";
import TextInput from "@/Components/shared/form/TextInput";
import SelectInput from "@/Components/shared/form/SelectInput";
import LoadingButton from "@/Components/shared/button/LoadingButton";
import TextareaInput from "@/Components/shared/form/TextareaInput";
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

  useEffect(() => {
    setData('slug', slugify(data.title, {lower: true}))
  },[data.title])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(data);
    post(route('teachers.courses.store'));
  }

  return (
    <div className={'w-full overflow-hidden'}>
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup label="Course Title" name="title" error={errors.title}>
              <TextInput
                name="name"
                error={errors.title}
                value={data.title}
                onChange={e => setData('title', e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Course Slug" name="slug" error={errors.slug}>
              <TextInput
                name="slug"
                disabled={true}
                error={errors.slug}
                value={data.slug}
                onChange={(e: any) => setData('slug', e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Price" name="price" error={errors.price}>
              <TextInput
                type='number'
                name="price"
                error={errors.price}
                value={data.price}
                onChange={(e: any) => setData('price', parseFloat(e.target.value))}
              />
            </FieldGroup>
            <FieldGroup label="Course Category" name="category" error={errors.category_id}>
              <SelectInput
                name="category"
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
          <div className={'px-8 pb-4'}>
            <FieldGroup label="Course Description" name="description" error={errors.description}>
              <TextareaInput
                name="description"
                error={errors.description}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center justify-end px-8 py-4 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Course
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
