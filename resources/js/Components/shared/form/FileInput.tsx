import React, {ComponentProps} from 'react';
import {Loader, UploadIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/Components/ui/button";
import ReactPlayer from "react-player";

interface TextInputProps extends ComponentProps<'input'> {
  error?: string;
  previewUrl?: string,
  objectUrl?: string,
  uploadToS3?: () => void,
  accept?: 'image/*' | 'video/*',
  loading?: boolean
}

export default function FileInput
({
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
  const fileRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <div className={cn('relative min-h-[400px] bg-gray-100 rounded-md border border-dashed border-gray-300',
        error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
        loading && 'opacity-50'
      )}>
        <UploadIcon
          onClick={() => fileRef.current?.click()}
          className={'z-20 absolute right-2 top-2 bg-gray-900 text-white w-12 h-12 cursor-pointer border-2 shadow-2xl border-white rounded-full p-2'}
        />
        <div className={'relative'}>
          {accept === 'video/*' ?
            <div className={'w-full min-h-[400px] h-full bg-gray-100'}>
              <ReactPlayer
                // @ts-ignore
                url={previewUrl || objectUrl}
                pip={true}
                controls
                width={'100%'}
                height={'100%'}
              />
            </div>
            :
            <img
              alt={'course-image'}
              src={previewUrl || objectUrl}
              className={'rounded-md object-cover h-full w-full'}
            />
          }
          <div className={'absolute bottom-20 right-2 z-10'}>
            {(previewUrl || objectUrl) &&
              <Button
                type={'button'}
                disabled={loading || !previewUrl}
                onClick={uploadToS3}
                className={cn( !previewUrl && 'hidden')}
              >
                {loading && <Loader className={'animate-spin w-6 h-6 mr-2'}/>}
                Upload
              </Button>
            }
          </div>
        </div>

      </div>
      <input
        ref={fileRef}
        hidden={true}
        type="file"
        accept={accept}
        id={name}
        name={name}
        {...props}
        className='hidden'
      />
    </div>
  );
}
