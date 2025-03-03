import { Button } from '@/Components/ui/button'
import { cn } from '@/lib/utils'
import { Loader, UploadIcon } from 'lucide-react'
import React, { ComponentProps, useRef } from 'react'
import ReactPlayer from 'react-player'

interface TextInputProps extends ComponentProps<'input'> {
  error?: string;
  previewUrl?: string;
  objectUrl?: string;
  uploadToS3?: () => void;
  accept?: 'image/*' | 'video/*';
  loading?: boolean;
}

export default function FileInput({
  name,
  className,
  error,
  previewUrl,
  objectUrl,
  uploadToS3,
  loading,
  accept,
  ...props
}: TextInputProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileRef.current?.click()
  }

  const renderPreviewContent = () => {
    if (accept === 'video/*') {
      return (
        <div className="w-full h-full relative rounded-md">
          {previewUrl || objectUrl ? (
            <ReactPlayer
              url={previewUrl || objectUrl}
              controls
              width="100%"
              height="100%"
              className="rounded-md aspect-video w-full"
            />
          ) : (
            <div className="flex items-center min-h-[300px] h-full justify-center border-2 border-dashed border-red-900 rounded-md p-2"/>
          )}
          {previewUrl && (
            <div className="p-4 flex items-center gap-2">
              <Button
                type="button"
                disabled={loading || !previewUrl}
                onClick={uploadToS3}
              >
                {loading && <Loader className="animate-spin w-6 h-6 mr-2"/>}
                Upload Video
              </Button>
              <Button
                type="button"
                size="sm"
                variant={'destructive'}
                disabled={loading}
                onClick={() => {
                  objectUrl = ''
                  previewUrl = ''
                }}
                className={cn( !previewUrl && 'hidden')}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      )
    }

    // Render for images
    return (
      <div className="w-full h-[400px]">
        {previewUrl || objectUrl ? (
          <>
            <img
              alt="course-image"
              src={previewUrl || objectUrl}
              className="rounded-md object-cover h-full w-full"
            />
            <Button
              type="button"
              size="sm"
              disabled={loading || !previewUrl}
              onClick={uploadToS3}
              className={cn('absolute bottom-2 right-2 z-10', !previewUrl && 'hidden')}
            >
              {loading && <Loader className="animate-spin w-4 h-4 mr-2"/>}
              Upload
            </Button>
          </>
        ) : null}
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          'relative bg-gray-100 rounded-md h-full',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
          loading && 'opacity-50',
          className
        )}
      >
        <UploadIcon
          onClick={handleUploadClick}
          className="z-20 absolute right-2 top-2 bg-gray-900 text-white w-12 h-12 cursor-pointer border-2 shadow-2xl border-white rounded-full p-2"
        />
        <div className="relative">{renderPreviewContent()}</div>
      </div>
      <input
        ref={fileRef}
        hidden
        type="file"
        accept={accept}
        id={name}
        name={name}
        {...props}
      />
    </>
  );
}
