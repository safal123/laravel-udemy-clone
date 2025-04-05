import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Chapter, Course } from "@/types"
import { Button } from "@/Components/ui/button"
import { BookOpenCheck, CheckCircle2Icon, Clock, FileBox, LockIcon, PlayCircle } from "lucide-react";
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
      
      .chapter-card {
        transition: all 0.2s ease-in-out;
      }
      
      .chapter-card:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Card className="mb-8 shadow-sm overflow-hidden border border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
            <FileBox className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">Course Curriculum</CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">{course.chapters.length} chapters • Complete learning path</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-8">
        <div className="space-y-4">
          {course.chapters.map((chapter, index) => {
            const isLocked = !chapter.is_free && !course.is_enrolled && !course.is_author;
            const hasCompleted = chapter.is_completed;

            return (
              <div
                key={chapter.id}
                className={`chapter-card relative group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 ${isLocked ? 'bg-gray-50' : 'bg-white'
                  } ${hasCompleted ? 'border-l-4 border-l-green-500 pl-3 sm:pl-3.5' : 'border-l-4 border-l-transparent'
                  } border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow`}
              >
                {/* Chapter status indicator */}
                <div className="absolute -top-2.5 right-3 z-20">
                  {chapter.is_free ? (
                    <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] sm:text-xs font-medium rounded-full shadow-sm">
                      Free Access
                    </span>
                  ) : isLocked && (
                    <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                      <div className="absolute inset-0 rounded-full rotating-gradient p-[1.5px]"></div>
                      <div className="absolute inset-0 rounded-full rotating-gradient opacity-50 pulsing-glow"></div>
                      <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary z-10 shadow-md">
                        <LockIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start w-full mb-3 sm:mb-0 sm:mr-4">
                  <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full ${hasCompleted
                    ? 'bg-green-100 text-green-600'
                    : 'bg-indigo-100 text-indigo-600'
                    } font-semibold mr-3 sm:mr-4 text-xs sm:text-sm`}>
                    {hasCompleted ? (
                      <CheckCircle2Icon className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className={`font-medium text-gray-800 text-sm sm:text-base truncate pr-8 sm:pr-0 
                      ${hasCompleted ? 'text-green-700' : 'group-hover:text-indigo-600'} 
                      transition-colors duration-200 leading-tight tracking-tight`}>
                      <span className="line-clamp-1">
                        {chapter.title}
                      </span>
                    </h3>
                    <div className="flex flex-wrap items-center mt-1.5 gap-x-3 text-[10px] sm:text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 flex-shrink-0" />
                        {Math.floor(Math.random() * 100)} mins
                      </span>

                      {/* Chapter status badge - for mobile view */}
                      {hasCompleted && (
                        <span className="flex items-center text-green-600">
                          <CheckCircle2Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 mt-1 sm:mt-0">
                  {/* Action button based on chapter access */}
                  {(chapter.is_free || course.is_enrolled || course.is_author) ? (
                    <Link
                      href={`/courses/${course.slug}/chapters/${chapter.id}`}
                      className="inline-flex"
                      preserveScroll
                    >
                      <Button
                        size="sm"
                        className={`${hasCompleted
                          ? 'bg-green-600 hover:bg-green-700'
                          : chapter.is_free
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                          } h-8 text-white rounded-md text-xs sm:text-sm px-2.5 sm:px-3.5 transition-all duration-200 shadow-sm`}
                      >
                        <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        <span>
                          {hasCompleted ? 'Replay' : (chapter.is_free ? 'Preview' : 'Start')}
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 rounded-md text-xs sm:text-sm px-2.5 sm:px-3.5 transition-all duration-200"
                      disabled
                    >
                      <LockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      <span>Premium</span>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-center gap-x-5 gap-y-3 text-xs sm:text-sm text-gray-600 flex-wrap px-2">
            <div className="flex items-center">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 mr-2"></div>
              <span>Free preview</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-indigo-600 mr-2"></div>
              <span>Premium content</span>
            </div>

            {course.is_enrolled && (
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-700 mr-2"></div>
                <span className="flex items-center gap-1">
                  <CheckCircle2Icon className="w-3.5 h-3.5" />
                  Completed
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}