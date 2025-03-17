import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Chapter, Course } from "@/types"
import { Button } from "@/Components/ui/button"
import { CheckCircle2Icon, Clock, LockIcon, PlayCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

interface ChaptersPreviewProps {
  course: Course
}

export default function ChaptersPreview({ course }: ChaptersPreviewProps) {
  // Add the animation styles to the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes rotateGradient {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes pulseGlow {
        0%, 100% {
          opacity: 0.6;
          filter: blur(1px);
        }
        50% {
          opacity: 0.8;
          filter: blur(2px);
        }
      }

      .rotating-gradient {
        background: conic-gradient(from 0deg, #4f46e5, #3b82f6, #0ea5e9, #4f46e5);
        animation: rotateGradient 4s linear infinite;
      }

      .pulsing-glow {
        animation: pulseGlow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Card className="mb-8">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-2xl flex items-center">
          <span className="mr-2">Course Chapters</span>
          <span className="text-sm font-normal text-gray-500 ml-2">({course.chapters.length} chapters)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {course.chapters.map((chapter, index) => {
            const isLocked = !chapter.is_free && !course.is_enrolled && !course.is_author;

            return (
              <div
                key={chapter.id}
                className={`relative group flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 ${isLocked ? 'bg-gray-50' : 'bg-white'} border border-gray-100 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200 shadow-sm hover:shadow`}
              >
                {/* Chapter status badge */}
                <div className="absolute -top-3 sm:-top-2 right-3 sm:right-3 z-20">
                  {chapter.is_free ? (
                    <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] sm:text-xs font-medium rounded-full">
                      Free
                    </span>
                  ) : isLocked && (
                    <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                      <div className="absolute inset-0 rounded-full rotating-gradient p-[1.5px]"></div>
                      <div className="absolute inset-0 rounded-full rotating-gradient opacity-50 pulsing-glow"></div>
                      <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary z-10">
                        <LockIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start w-full mb-3 sm:mb-0 sm:mr-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-semibold mr-2 sm:mr-3 text-xs sm:text-sm">
                    {index + 1}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate pr-6 sm:pr-0 group-hover:text-primary transition-colors duration-200 leading-tight tracking-tight">
                      <span className="line-clamp-1">
                        {chapter.title}
                      </span>
                    </h3>
                    <div className="flex flex-wrap items-center mt-1.5 gap-x-3 text-[10px] sm:text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                        {Math.floor(Math.random() * 100)} mins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons - Restoring the functionality */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 mt-2 sm:mt-0">
                  {/* Action button based on chapter access */}
                  {(chapter.is_free || course.is_enrolled || course.is_author) && (
                    <Link
                      href={`/courses/${course.slug}/chapters/${chapter.id}`}
                      className="inline-flex"
                      preserveScroll
                    >
                      <Button
                        size="sm"
                        className={`${chapter.is_free ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'} h-8 text-white rounded-md text-xs sm:text-sm px-2 sm:px-3 transition-all duration-200`}
                      >
                        <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                        <span>
                          {chapter.is_completed ? 'Replay' : (chapter.is_free ? 'Preview' : 'Start')}
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-500 flex-wrap px-2">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1.5"></div>
              <span>Free preview</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary mr-1.5"></div>
              <span>Premium content</span>
            </div>
            {course.is_enrolled && (
              <>
                <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-700 mr-1.5"></div>
                  <span>Completed</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}