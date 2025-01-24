import { Card } from '@/Components/ui/card'
import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import { CardsStats } from '@/Pages/Teacher/Dashboard/Partials/CardStats'
import { Students } from '@/Pages/Teacher/Dashboard/Partials/Students'
import { Head, usePage } from '@inertiajs/react'
import React from "react";

const Index = () => {
  const students = usePage().props.students
  return (
    <Card className={"p-6 min-h-screen"}>
      <Head title="Teacher Dashboard"/>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
      </div>
      <CardsStats />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Students</h2>
      </div>
      <Students students={students as any}/>
      <div>
      </div>
    </Card>
  );
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
