import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import { PlayCircle, X, Lock } from "lucide-react";
import VideoPlayer from "@/Pages/Course/Show/Chapter/_components/Videoplayer";
import { useEffect } from "react";

interface ChapterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: {
    id: string;
    title: string;
    video_url?: string;
    course?: { slug: string; title?: string };
    media?: any[];
  } | null;
}

export default function ChapterPreviewModal({ isOpen, onClose, chapter }: ChapterPreviewModalProps) {
  if (!chapter) return null;

  // Prepare simplified chapter object for preview
  const previewChapter = {
    ...chapter,
    course: chapter.course || { slug: "", title: "" },
    media: chapter.media || []
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      closeIcon={true}
      maxWidth="5xl"
    >
      <div className="w-full flex flex-col bg-white dark:bg-gray-900 rounded-md shadow-2xl overflow-hidden">
        {/* Chapter title */}
        <div className="py-3 px-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {chapter.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Preview this lesson
          </p>
        </div>

        {/* Video Container - Takes full width */}
        <div className="w-full">
          {chapter.media ? (
            <div className="w-full aspect-video">
              <VideoPlayer
                src={chapter.media[0].path}
                chapter={previewChapter as any}
                isCompleted={false}
                isPreview={true}
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-center text-gray-400">
              <div className="px-6 py-10">
                <PlayCircle className="h-20 w-20 mx-auto mb-4 text-gray-500/70" />
                <p className="text-xl mb-2">Preview video not available</p>
                <p className="text-gray-500 max-w-md mx-auto">This preview content cannot be played at the moment. Please try again later.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Premium message */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-t border-amber-100 dark:border-amber-900/20">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-0.5">
                    Preview Only
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enroll today to get full access to all course content.
                  </p>
                </div>
              </div>
              <Button className="whitespace-nowrap px-6 py-2 h-auto text-base font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
