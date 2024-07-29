import {Course} from "@/types";
import CourseCard from "@/Components/shared/card/CourseCard";
import React, {memo} from "react";

type CoursesProps = {
  courses: Course[]
}

const Courses = memo(({ courses }: CoursesProps) => {
  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
      {courses?.map((course: Course, index: number) => (
        <div key={index} className={'p-2'}>
          <CourseCard course={course} />
        </div>
      ))}
    </div>
    );
})

export default Courses;
