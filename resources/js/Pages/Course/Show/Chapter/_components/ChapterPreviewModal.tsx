import React from 'react'
import Modal from '@/Components/Modal'
import { PlayCircle } from 'lucide-react'
import VideoPlayer from './Videoplayer'
import { Chapter } from '@/types'

interface ChapterPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  chapter: Chapter
}

const ChapterPreviewModal = ({ isOpen, onClose, chapter }: ChapterPreviewModalProps) => {
  // Create a preview chapter object with only the necessary properties
  const previewChapter = {
    id: chapter.id,
    title: chapter.title,
    media: chapter.media
  }

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
          {chapter.media && chapter.media.length > 0 ? (
            <div className="w-full aspect-video">
              <VideoPlayer
                src={chapter.media[0].path}
                chapter={previewChapter as any}
                nextChapterId=""
                previousChapterId=""
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
      </div>
    </Modal>
  )
}

export default ChapterPreviewModal
