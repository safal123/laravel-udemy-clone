import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Switch } from '@/Components/ui/switch'
import { Chapter } from '@/types'
import { router, useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type ChapterTogglePublishProps = {
  chapter: Chapter
}

const ChapterTogglePublish = ({chapter}: ChapterTogglePublishProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.visit(route('teachers.courses.chapters.update', {
      course: chapter.course_id,
      chapter: chapter.id
    }), {
      method: 'put',
      data: {
        is_published: !chapter.is_published
      },
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        toast.success('Chapter updated')
      },
      onError: () => {
        toast.error('Failed to update chapter')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <AppTooltip
        message={chapter.is_published ? 'Unpublish' : 'Publish'}>
        <Switch
          type={'submit'}
          checked={chapter.is_published}
          id="toggle-publish"
        />
      </AppTooltip>
    </form>
  )
}

export default ChapterTogglePublish;
