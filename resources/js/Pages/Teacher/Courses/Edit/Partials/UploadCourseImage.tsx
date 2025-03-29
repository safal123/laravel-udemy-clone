import FieldGroup from '@/Components/shared/form/FieldGroup'
import FileInput from '@/Components/shared/form/FileInput'
import { Course } from '@/types'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

type UploadCourseImageProps = {
  errors: any;
  course: Course;
}

const UploadCourseImage = ({
  errors,
  course
}: UploadCourseImageProps) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [courseFile, setCourseFile] = useState<File | null>(null)

  function handleImageChange(e: any) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    setPreviewImageUrl(URL.createObjectURL(file))
    setCourseFile(file)
  }

  const uploadToS3 = async () => {
    try {
      setUploading(true)
      const preSignedUrl = await axios.post('/s3/get-signed-url', {
          fileName: course.id,
          path: 'courses/images'
        })
        if (!preSignedUrl) {
          throw new Error('Failed to get signed url')
        }
        const response = await fetch(preSignedUrl.data.url, {
          method: 'PUT',
          body: courseFile
        })
        if (!response.ok) {
          throw new Error('Failed to upload image to S3')
        }
        toast('Image uploaded successfully')
      } catch (e) {
        console.log(e)
        toast('Failed to upload image')
      } finally {
        setUploading(false)
      }
    }

    return (
      <FieldGroup
        name="image"
        error={errors.image_storage_id}
      >
        <FileInput
          name="image"
          accept={'image/*'}
          objectUrl={course.image_url}
          previewUrl={previewImageUrl}
          error={errors.image_storage_id}
          onChange={handleImageChange}
          uploadToS3={uploadToS3}
          loading={uploading}
        />
      </FieldGroup>
    )
  }

export default UploadCourseImage;
