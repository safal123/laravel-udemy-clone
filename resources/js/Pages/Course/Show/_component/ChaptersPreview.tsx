import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Course } from "@/types"
import { Button } from "@/Components/ui/button"
import { CheckCircle2Icon, Clock, FileBox, LockIcon, PlayCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ChapterPreviewModal from "./ChapterPreviewModal";

interface ChaptersPreviewProps {
  course: Course
}

export default function ChaptersPreview({ course }: ChaptersPreviewProps) {
  const [previewChapter, setPreviewChapter] = useState<{ id: string, title: string, video_url?: string } | null>(null);

  const openPreviewModal = (chapter: any) => {
    setPreviewChapter(chapter);
  };

  const closePreviewModal = () => {
    setPreviewChapter(null);
  };

  return (
    <>
      <Card className="mb-5 shadow-sm">
        <CardHeader className="bg-slate-50 border-b py-3">
          <div className="flex items-center gap-2">
            <FileBox className="h-4 w-4 text-indigo-600" />
            <div>
              <CardTitle className="text-base">Course Chapters</CardTitle>
              <p className="text-xs text-gray-500">{course.chapters.length} chapters</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            {course.chapters.map((chapter, index) => {
              // These variables help us determine the state and access rights of each chapter
              const isComplete = chapter.is_completed;    // Has the user completed this chapter?
              const isFree = chapter.is_free;             // Is this chapter free for everyone?
              const hasAccess = isFree || course.is_enrolled || course.is_author;  // Can the user access this chapter?

              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "border rounded-md p-3 flex items-start border-l-[3px]",
                    isComplete
                      ? "border-l-green-500 bg-white"
                      : isFree
                        ? "border-l-green-500 bg-white"
                        : "border-l-indigo-400 bg-slate-50"
                  )}
                >

                  {/* Chapter number or completed icon */}
                  <span className={cn(
                    "w-6 h-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-xs",
                    isComplete ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600"
                  )}>
                    {isComplete ? <CheckCircle2Icon className="w-3 h-3" /> : (index + 1)}
                  </span>

                  {/* Chapter title and duration */}
                  <div className="min-w-0 flex-1">
                    <h3 className={cn(
                      "text-sm font-medium truncate",
                      isComplete ? "text-green-700" : "text-gray-800"
                    )}>
                      {chapter.title}
                    </h3>

                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor(Math.random() * 100)} mins

                      {isComplete && (
                        <span className="flex items-center text-green-600 ml-3">
                          <CheckCircle2Icon className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chapter action button */}
                  <div className="ml-auto pl-2">
                    {hasAccess ? (
                      isFree && !isComplete ? (
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-green-500"
                          onClick={() => openPreviewModal(chapter)}
                        >
                          <PlayCircle className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      ) : (
                        <Link href={`/courses/${course.slug}/chapters/${chapter.id}`}>
                          <Button
                            size="sm"
                            className={cn(
                              "h-7 text-xs",
                              isComplete
                                ? "bg-green-600"
                                : "bg-indigo-600"
                            )}
                          >
                            <PlayCircle className="w-3 h-3 mr-1" />
                            {isComplete ? 'Replay' : 'Start'}
                          </Button>
                        </Link>
                      )
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        disabled
                      >
                        <LockIcon className="w-3 h-3 mr-1" />
                        Premium
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Use the separate modal component */}
      <ChapterPreviewModal
        isOpen={!!previewChapter}
        onClose={closePreviewModal}
        chapter={previewChapter}
      />
    </>
  )
}