import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Switch } from '@/Components/ui/switch'
import { Chapter } from '@/types'
import { router } from '@inertiajs/react'
import React from 'react'
import { toast } from 'sonner'

type ToggleChapterIsFreeProps = {
  chapter: Chapter
}

const ToggleChapterIsFree = ({chapter}: ToggleChapterIsFreeProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.visit(route('teachers.courses.chapters.update', {
      course: chapter.course_id,
      chapter: chapter.id
    }), {
      method: 'put',
      data: {
        is_free: !chapter.is_free
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
      <AppTooltip message={chapter.is_free ? 'Mark as paid' : 'Mark as free'}>
        <Switch
          checked={chapter.is_free}
          type={'submit'}
          id="toggle-is-free"
        />
      </AppTooltip>
    </form>
  )
}

export default ToggleChapterIsFree;
