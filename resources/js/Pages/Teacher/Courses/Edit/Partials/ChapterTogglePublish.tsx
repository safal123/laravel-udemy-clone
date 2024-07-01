
import {Label} from "@/Components/ui/label";
import {Chapter} from "@/types";
import axios from "axios";
import {router} from "@inertiajs/react";
import React from "react";
import {Switch} from "@/Components/ui/switch";
import {toast} from "sonner";

type ChapterTogglePublishProps = {
  chapter: Chapter
}

const ChapterTogglePublish = ({ chapter }: ChapterTogglePublishProps) => {
  const handleTogglePublish = async (chapter: Chapter) => {
    try {
      await axios.put(route('teachers.courses.chapters.toggle-publish', {
        course: chapter.course_id,
        chapter: chapter.id
      })).then(() => {
        router.reload({
          only: ['chapters']
        })
        toast.error(`Chapter ${chapter.is_published ? 'unpublished' : 'published'} successfully.`);
      })
    } catch (e) {
      console.error(e);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={chapter.is_published}
        onCheckedChange={() => handleTogglePublish(chapter)}
        id="toggle-publish"
      />
      <Label htmlFor="toggle-publish">
        {chapter.is_published ? 'Unpublish' : 'Publish'}
      </Label>
    </div>
  )
}

export default ChapterTogglePublish;
