import {useForm} from "@inertiajs/react";
import React from "react";
import FieldGroup from "@/Components/shared/form/FieldGroup";
import TextInput from "@/Components/shared/form/TextInput";
import TextareaInput from "@/Components/shared/form/TextareaInput";
import {Button} from "@/Components/ui/button";
import {cn} from "@/lib/utils";
import {Loader2} from "lucide-react";
import {Chapter, Course} from "@/types";

type ChapterFormProps = {
  course?: Course
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  chapter?: Chapter
  action?: string
}

const ChapterForm = ({course, setShow, chapter, action = 'create'}: ChapterFormProps) => {
  const {data, setData, errors, post, put, processing, reset} = useForm({
    'title': chapter?.title || '',
    'description': chapter?.description || '',
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === 'update') {
      put(route('teachers.courses.chapters.update', {
        course: chapter?.course_id,
        chapter: chapter?.id
      }), {
        preserveScroll: true,
        onSuccess: () => {
          reset()
          setShow(false)
        }
      })
    } else {
      post(route('teachers.courses.chapters.store', course?.id), {
        preserveScroll: true,
        onSuccess: () => {
          reset()
          setShow(false)
        }
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-4rem)] w-full overflow-y-auto sticky">
      <h2 className="text-2xl mb-2 font-medium text-gray-900 dark:text-gray-100">
        {action === 'update' ? 'Update Chapter' : 'Add New Chapter'}
      </h2>

      <div className={'w-full flex flex-col gap-4'}>
        <FieldGroup label="Chapter Title" name="title" error={errors.title}>
          <TextInput
            name="name"
            error={errors.title}
            value={data.title}
            onChange={e => setData('title', e.target.value)}
          />
        </FieldGroup>
        <FieldGroup label="Chapter Description" name="description" error={errors.description}>
          <TextareaInput
            name="description"
            error={errors.description}
            value={data.description}
            onChange={e => setData('description', e.target.value)}
          />
        </FieldGroup>
      </div>
      <div className={'mt-4 flex gap-4'}>
        <Button
          className={cn('btn-indigo', processing && 'cursor-not-allowed opacity-50')}
          type="submit"
          disabled={processing}
        >
          {processing && <Loader2 className="animate-spin inline-block mr-2"/>}
          {action === 'update' ? 'Update Chapter' : 'Add Chapter'}
        </Button>
        <Button type={"button"} onClick={() => setShow(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default ChapterForm;
