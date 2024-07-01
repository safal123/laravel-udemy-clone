import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import React from "react";
import {usePage} from "@inertiajs/react";

const Index = () => {
  const course = usePage().props.course
    return (
        <div>
            <h1>Index</h1>
          <pre>
            {JSON.stringify(course, 0, 2)}
          </pre>
        </div>
    );
}

// Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
