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
        <div className="w-full relative rounded-md">
          {previewUrl || objectUrl ? (
            <div className="aspect-video">
              <ReactPlayer
                url={previewUrl || objectUrl}
                controls
                width="100%"
                height="100%"
                className="rounded-md overflow-hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group">
              <div className="relative">
                <UploadIcon
                  className="w-12 h-12 text-gray-400 mb-2 cursor-pointer group-hover:text-gray-500 transition-colors"
                  onClick={handleUploadClick}
                />
                <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </div>
              <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, WebM, MOV, AVI</p>
              <span className="mt-3 text-xs text-gray-400">Max file size: 500MB</span>
            </div>
          )}
          {previewUrl && (
            <div className="p-4 flex items-center gap-2">
              <Button
                type="button"
                disabled={loading || !previewUrl}
                onClick={uploadToS3}
              >
                {loading && <Loader className="animate-spin w-5 h-5 mr-2" />}
                Upload Video
              </Button>
              <Button
                type="button"
                size="sm"
                variant={'destructive'}
                disabled={loading}
                onClick={() => {
                  if (fileRef.current) fileRef.current.value = '';
                  if (props.onChange) {
                    const event = new Event('change', { bubbles: true }) as any;
                    event.target = { value: '', files: [] };
                    props.onChange(event);
                  }
                }}
                className={cn(!previewUrl && 'hidden')}
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
      <div className="w-full rounded-md overflow-hidden">
        {previewUrl || objectUrl ? (
          <div className="relative">
            <div className="h-[320px] bg-gray-100">
              <img
                alt="course-image"
                src={previewUrl || objectUrl}
                className="object-contain h-full w-full shadow-md transition-all duration-300 hover:brightness-95"
              />
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <Button
                type="button"
                size="sm"
                disabled={loading || !previewUrl}
                onClick={uploadToS3}
                className={cn(
                  'ml-auto flex items-center gap-1.5 transition-all duration-200 hover:scale-105 sm:px-4',
                  !previewUrl && 'hidden'
                )}
              >
                {loading && <Loader className="animate-spin w-4 h-4" />}
                <span className="hidden sm:inline">Upload</span>
                <span className="inline sm:hidden">Save</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[320px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No image selected</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-md overflow-hidden mb-4">
      <div
        className={cn(
          'relative bg-gray-100 rounded-md',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
          loading && 'opacity-50',
          className
        )}
      >
        <div
          onClick={handleUploadClick}
          className="z-20 absolute right-3 top-3 bg-gradient-to-br from-gray-800 to-gray-950 text-white w-10 h-10 cursor-pointer border border-gray-200/30 shadow-lg rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 group"
        >
          <UploadIcon className="w-5 h-5 group-hover:text-blue-200 transition-colors" />
          <span className="absolute -bottom-6 right-0 bg-gray-900/90 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Upload</span>
        </div>
        <div className="relative">{renderPreviewContent()}</div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
      <input
        ref={fileRef}
        hidden
        type="file"
        accept={accept}
        id={name}
        name={name}
        {...props}
      />
    </div>
  );
}
