import { Label } from '@/Components/ui/label'
import { Switch } from '@/Components/ui/switch'
import { Chapter } from '@/types'
import { useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import React from 'react'

type ChapterTogglePublishProps = {
  chapter: Chapter
}

const ChapterTogglePublish = ({chapter}: ChapterTogglePublishProps) => {
  const {put, processing, reset} = useForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(route('teachers.courses.chapters.toggle-publish', {
      course: chapter.course_id,
      chapter: chapter.id
    }), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => reset()
    })
  }
  if (processing) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin"/>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Switch
        type={'submit'}
        checked={chapter.is_published}
        id="toggle-publish"
      />
      {/*<Label htmlFor="toggle-publish">*/}
      {/*  {chapter.is_published ? 'Unpublish' : 'Publish'}*/}
      {/*</Label>*/}
    </form>
  )
}

export default ChapterTogglePublish;
