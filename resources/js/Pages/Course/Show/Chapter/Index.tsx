import React from "react";
import ChapterLayout from "@/Layouts/ChapterLayout";
import { Head, usePage } from "@inertiajs/react";
import { Chapter } from "@/types";
import ReactPlayer from "react-player";

const CourseChapter = () => {
  const { chapter } = usePage<{ chapter: Chapter[] }>().props;

  if (!chapter) {
    return null;
  }

  return (
    <div className="text-gray-50 w-full flex flex-col items-center">
      <Head title={`Course Chapter: ${chapter[0].title}`} />
      {/* Centered Video Player Container */}
      <div className="relative bg-gray-800 rounded-3xl shadow-lg overflow-hidden mx-auto w-full max-w-9xl flex justify-center items-center">
        <ReactPlayer
          url={chapter[0]?.video_url}
          controls
          width="100%"
          height="100%"
          className="aspect-video"
        />
      </div>

      {/* Chapter Details */}
      <div className="mt-8 bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-7xl">
        <h2 className="text-xl font-semibold mb-4">Chapter Overview</h2>
        <p className="text-gray-300">
          {chapter[0]?.description || "No description available for this chapter."}
        </p>
      </div>
    </div>
  );
};

CourseChapter.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
);

export default CourseChapter;
