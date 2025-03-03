import { AppTooltip } from '@/Components/shared/AppTooltip'
import FileInput from '@/Components/shared/form/FileInput'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog'
import { Chapter } from '@/types'
import axios from 'axios'
import { Video } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type ChapterVideoProps = {
  chapter: Chapter
}

const ChapterVideo = ({chapter}: ChapterVideoProps) => {
  const [show, setShow] = React.useState(false)
  const [video, setVideo] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string>('')
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  const handleVideoUpload = async () => {
    console.log('uploading video')
    try {
      setIsUploading(true)
      if (!video) {
        return
      }
      const presignedUrl = await axios.post('/s3/get-signed-url', {
        fileName: chapter.id,
        path: 'courses/chapters/videos'
      })
      const response = await fetch(presignedUrl.data.url, {
        method: 'PUT',
        body: video
      })
      if (!response.ok) {
        throw new Error('Failed to upload video to S3')
      }
      await axios.post(route('teachers.courses.chapters.video', {
        course: chapter.course_id,
        chapter: chapter.id
      }))
      toast('Video uploaded successfully')
      onUploadSuccess()
    } catch (e) {
      console.log(e);
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

  const onUploadSuccess = () => {
    setPreviewUrl('')
    setVideo(null)
    setIsUploading(false)
  }

  return (
    <AppTooltip message={'Upload video'}>
      <Dialog>
        <DialogTrigger>
          <Video className={'w-7 h-7 cursor-pointer text-green-600 mt-2'}/>
        </DialogTrigger>
        <DialogContent className={'max-w-4xl min-h-[calc(100vh-40%)]'}>
          <DialogHeader>
            <DialogTitle>
              Chapter Video
            </DialogTitle>
          </DialogHeader>
          <div className={'rounded-md'}>
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
        </DialogContent>
      </Dialog>
    </AppTooltip>
  )
}
export default ChapterVideo
