import { useState, useRef, useEffect } from "react";
import EditorPreview from "@/Components/shared/EditorPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Course } from "@/types";
import { ChevronDown, ChevronUp, FileText, Globe, Info, BarChart2 } from "lucide-react";

interface CourseDescriptionProps {
  course: Course;
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content height exceeds max height
  useEffect(() => {
    if (contentRef.current) {
      const shouldShowButton = contentRef.current.scrollHeight > 300;
      setShouldShowToggle(shouldShowButton);
    }
  }, [course.description]);

  return (
    <Card className="mb-8 shadow-sm overflow-hidden border border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">About This Course</CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">What you'll learn and course overview</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-8">
        <div
          className={`prose prose-slate max-w-none relative ${!isExpanded && shouldShowToggle ? 'max-h-[300px] overflow-hidden' : ''}`}
          ref={contentRef}
        >
          {!isExpanded && shouldShowToggle && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
          )}
          <EditorPreview
            value={course.description}
            className="course-description-content text-gray-700 leading-relaxed"
          />
        </div>

        {shouldShowToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show more
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}

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
                    <Globe className="h-4 w-4 text-blue-600" />
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
                    <BarChart2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Difficulty Level</p>
                    <p className="font-medium text-gray-800">
                      {course.level
                        .replace(/-/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')}
                    </p>
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
