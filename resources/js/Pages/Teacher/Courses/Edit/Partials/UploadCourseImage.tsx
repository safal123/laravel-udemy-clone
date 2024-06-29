import FileInput from "@/Components/shared/form/FileInput";
import FieldGroup from "@/Components/shared/form/FieldGroup";
import React, {useEffect, useState} from "react";
import axios from "axios";

type UploadCourseImageProps = {
  errors: any;
  imageStorageId?: string;
  courseId: string;
}

const IMAGE_UPLOAD_PATH = 'courses/images'

const UploadCourseImage =
  ({
     errors,
    imageStorageId,
    courseId,
   }: UploadCourseImageProps) => {
    const [objectUrl, setObjectUrl] = useState<string>('')
    const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
    const [uploading, setUploading] = useState<boolean>(false)
    const [courseFile, setCourseFile] = useState<File | null>(null)

    function handleImageChange(e: any) {
      setObjectUrl('')
      const file = e.target.files?.[0]
      if (!file) {
        return
      }
      setPreviewImageUrl(URL.createObjectURL(file))
      setCourseFile(file)
    }

    const getObjectFromS3 = async () => {
      try {
        if (!imageStorageId) {
          return
        }
        const objectUrl = await axios.post('/s3/get-object-url', {
          fileName: courseId,
          path: 'courses/images'
        })
        if (!objectUrl) {
          return
        }
        setObjectUrl(objectUrl.data.url)
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      if (imageStorageId) {
        getObjectFromS3()
      }
    }, [])

    const uploadToS3 = async () => {
      try {
        setUploading(true)
        const presignedUrl = await axios.post('/s3/get-signed-url', {
          // @ts-ignore
          fileName: courseId,
          path: 'courses/images'
        })
        if (!presignedUrl) {
          return
        }
        const response = await fetch(presignedUrl.data.url, {
          method: 'PUT',
          body: courseFile
        })
        if (!response.ok) {
          throw new Error('Failed to upload image to S3')
        }
        const objectUrl = await axios.post('/s3/get-object-url', {
          // @ts-ignore
          fileName: courseId,
          path: 'courses/images'
        })
        if (!objectUrl) {
          return
        }
        setObjectUrl(objectUrl.data.url)
        setCourseFile(null)
      } catch (e) {
        console.log(e)
      } finally {
        setUploading(false)
      }
    }


    return (
      <FieldGroup
        label="Course Image"
        name="image"
        error={errors.image_storage_id}
      >
        <FileInput
          name="image"
          accept={'image/*'}
          objectUrl={objectUrl}
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
