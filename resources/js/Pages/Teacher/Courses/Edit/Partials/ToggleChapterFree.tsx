
import {Label} from "@/Components/ui/label";
import {Chapter} from "@/types";
import axios from "axios";
import {router} from "@inertiajs/react";
import React from "react";
import {Switch} from "@/Components/ui/switch";
import {toast} from "sonner";

type ToggleChapterIsFreeProps = {
  chapter: Chapter
}

const ToggleChapterIsFree = ({ chapter }: ToggleChapterIsFreeProps) => {
  const handleChapterIsFree = async (chapter: Chapter) => {
    try {
      await axios.put(route('teachers.courses.chapters.toggle-is-free', {
        course: chapter.course_id,
        chapter: chapter.id
      })).then(() => {
        router.reload({
          only: ['course']
        })
        toast.error(`Chapter ${chapter.title} is now ${chapter.is_free ? 'paid' : 'free'}`);
      })
    } catch (e) {
      console.error(e);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={chapter.is_free}
        onCheckedChange={() => handleChapterIsFree(chapter)}
        id="toggle-is-free"
      />
      <Label htmlFor="toggle-is-free">
        {chapter.is_free ? 'Free' : 'Free'}
      </Label>
    </div>
  )
}

export default ToggleChapterIsFree;
