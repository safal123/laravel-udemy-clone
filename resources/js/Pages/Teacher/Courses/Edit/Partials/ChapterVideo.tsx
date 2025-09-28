import Modal from '@/Components/Modal'
import { AppTooltip } from '@/Components/shared/AppTooltip'
import FileInput from '@/Components/shared/form/FileInput'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog'
import { cn } from '@/lib/utils'
import { Chapter } from '@/types'
import axios from 'axios'
import { Video, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type ChapterVideoProps = {
  chapter: Chapter
}

const ChapterVideo = ({ chapter }: ChapterVideoProps) => {
  const [show, setShow] = React.useState(false)
  const [video, setVideo] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string>('')
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  const handleVideoUpload = async () => {
    try {
      setIsUploading(true)
      if (!video) {
        return
      }
      const presignedUrl = await axios.post('/s3/get-signed-url', {
        fileName: chapter.id,
        resourceType: 'chapter_video',
        chapterId: chapter.id,
        path: 'courses/chapters/videos'
      })
      const response = await fetch(presignedUrl.data.url, {
        method: 'PUT',
        body: video
      })

      if (!response.ok) {
        throw new Error('Failed to upload video to S3')
      }
      toast('Video uploaded successfully')
      onUploadSuccess(video)
    } catch (e) {
      toast.error('Failed to upload video')
    } finally {
      setIsUploading(false)
    }
  }

  const handleVideoFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  const getVideoDuration = (file: File) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        resolve(video.duration);
        URL.revokeObjectURL(video.src);
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const onUploadSuccess = async (video: File) => {
    const duration = await getVideoDuration(video)
    await axios.post(route('teachers.courses.chapters.video', {
      course: chapter.course_id,
      chapter: chapter.id,
      size: video.size,
      mime_type: video.type,
      type: 'video',
      duration
    }))
    setPreviewUrl('')
    setVideo(null)
    setIsUploading(false)
  }

  return (
    <>
      <AppTooltip message={chapter.video_storage_id ? 'Update video' : 'Add video'}>
        <button
          onClick={() => setShow(true)}
          className={cn(
            "p-1.5 rounded-md transition-colors flex items-center justify-center",
            chapter.video_storage_id
              ? "hover:bg-green-50 text-green-600"
              : "hover:bg-red-50 text-red-500"
          )}
        >
          <Video className="w-5 h-5" />
        </button>
      </AppTooltip>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        maxWidth="4xl"
      >
        <div className="overflow-hidden border rounded-md">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Video className={cn(
                "w-5 h-5",
                chapter.video_storage_id ? "text-green-600" : "text-gray-600"
              )} />
              <h2 className="text-xl font-semibold text-gray-900">
                {chapter.video_storage_id ? 'Update Chapter Video' : 'Add Chapter Video'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <FileInput
              accept={'video/*'}
              previewUrl={previewUrl}
              objectUrl={chapter.video_url}
              loading={isUploading}
              uploadToS3={handleVideoUpload}
              onChange={handleVideoFileChange}
              name={'video'}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
export default ChapterVideo
