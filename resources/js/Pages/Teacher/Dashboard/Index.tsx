import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import React from "react";

const Index = () => {
  return (
    <div>
      <h1>Teacher Page</h1>
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
