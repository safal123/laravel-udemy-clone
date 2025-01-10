import { Label } from '@/Components/ui/label'
import { Switch } from '@/Components/ui/switch'
import { Chapter } from '@/types'
import { useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import React from 'react'

type ToggleChapterIsFreeProps = {
  chapter: Chapter
}

const ToggleChapterIsFree = ({chapter}: ToggleChapterIsFreeProps) => {
  const {put, processing, reset} = useForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(route('teachers.courses.chapters.toggle-is-free', {
      course: chapter.course_id,
      chapter: chapter.id
    }), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => reset()
    })
  }

  if (processing) {
    return <Loader2 className="w-6 h-6 animate-spin"/>
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Switch
        checked={chapter.is_free}
        type={'submit'}
        id="toggle-is-free"
      />
      <Label htmlFor="toggle-is-free">
        {chapter.is_free ? 'Free' : 'Free'}
      </Label>
    </form>
  )
}

export default ToggleChapterIsFree;
