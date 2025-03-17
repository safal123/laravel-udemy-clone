import EditorPreview from "@/Components/shared/EditorPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Course } from "@/types";
import { BookOpen } from "lucide-react";

interface CourseDescriptionProps {
  course: Course
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  return (
    <Card className="mb-8 shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-semibold">About This Course</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <EditorPreview
          value={course.description}
          className="course-description-content"
        />
      </CardContent>
    </Card>
  )
}
