import {Video} from "lucide-react";
import {Chapter} from "@/types";
import React, {useEffect} from "react";
import Modal from "@/Components/Modal";
import axios from "axios";
import FileInput from "@/Components/shared/form/FileInput";
import {toast} from "sonner";

type ChapterVideoProps = {
  chapter: Chapter
}

const ChapterVideo = ({chapter}: ChapterVideoProps) => {
  const [show, setShow] = React.useState(false);
  const [video, setVideo] = React.useState<File | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string>('');
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const getObjectFromS3 = async () => {
    try {
      if (!chapter.video_storage_id) {
        return
      }
      const objectUrl = await axios.post('/s3/get-object-url', {
        fileName: chapter.id,
        path: 'courses/chapters/videos'
      })
      if (!objectUrl) {
        return
      }
      setVideoUrl(objectUrl.data.url)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (chapter.video_storage_id) {
      getObjectFromS3()
    }
  }, [])

  const handleVideoUpload = async () => {
    console.log('uploading video');
    try {
      setIsUploading(true)
      if (!video) {
        return;
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

  return (
    <div>
      <Video
        onClick={() => setShow(true)}
        className={'w-4 h-4 cursor-pointer text-green-600'}
      />
      <Modal show={show} onClose={() => setShow(false)}>
        <div className={'w-full h-full'}>
          <FileInput
            accept={'video/*'}
            previewUrl={previewUrl}
            objectUrl={videoUrl}
            loading={isUploading}
            uploadToS3={handleVideoUpload}
            onChange={handleVideoFileChange}
            name={'video'}
          />
        </div>
      </Modal>
    </div>
  )
}
export default ChapterVideo
