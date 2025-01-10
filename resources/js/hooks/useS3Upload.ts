import {useState} from "react";
import axios from "axios";

const useS3Upload = ({ fileStorageId, path }: {
  fileStorageId: string,
  path: string,
}) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
  const [objectUrl, setObjectUrl] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)

  const getObjectFromS3 = async () => {
    try {
      if (!fileStorageId) {
        return
      }
      const objectUrl = await axios.post('/s3/get-object-url', {
        // @ts-ignore
        fileName: fileStorageId,
        path: path
      })
      if (!objectUrl) {
        return
      }
      setObjectUrl(objectUrl.data.url)
    } catch (e) {
      console.log(e)
    }
  }

  const uploadToS3 = async (file: File | null) => {
    try {
      setUploading(true)
      const presignedUrl = await axios.post('/s3/get-signed-url', {
        // @ts-ignore
        fileName: course.id,
        path: 'courses/images'
      })
      if (!presignedUrl) {
        return
      }
      const response = await fetch(presignedUrl.data.url, {
        method: 'PUT',
        body: file
      })
      if (!response.ok) {
        throw new Error('Failed to upload image to S3')
      }
      await getObjectFromS3()
    } catch (e) {
      console.log(e)
    } finally {
      setUploading(false)
    }
  }
  return {
    previewImageUrl,
    setPreviewImageUrl,
    objectUrl,
    uploading,
    file,
    setFile,
    getObjectFromS3,
    uploadToS3
  }
}
