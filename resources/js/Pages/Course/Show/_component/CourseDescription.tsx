import EditorPreview from "@/Components/shared/EditorPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Course } from "@/types";
import { BookOpen, FileText, Info } from "lucide-react";
import React from "react";

interface CourseDescriptionProps {
  course: Course;
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  return (
    <Card className="mb-8 shadow-sm overflow-hidden border border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">Course Description</CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">Detailed information about this course</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-8">
        <div className="prose prose-slate max-w-none">
          <EditorPreview
            value={course.description}
            className="course-description-content text-gray-700 leading-relaxed"
          />
        </div>

        {/* Course highlights */}
        {course.language || course.level ? (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-base font-medium text-gray-800 mb-4 flex items-center">
              <Info className="h-4 w-4 mr-2 text-indigo-500" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.language && (
                <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 16.87 16.87 0 01-.554-.514 19.05 19.05 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.05 17.05 0 003.07-3.148 18.97 18.97 0 01-1.11-2.592 1 1 0 111.847-.754A16.95 16.95 0 008 3.5h1V2a1 1 0 011-1zm2 5a1 1 0 011 1v1h3a1 1 0 110 2h-3v1a1 1 0 11-2 0v-1H6a1 1 0 110-2h3V8a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium text-gray-800">{course.language}</p>
                  </div>
                </div>
              )}

              {course.level && (
                <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Difficulty Level</p>
                    <p className="font-medium text-gray-800">{course.level}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
