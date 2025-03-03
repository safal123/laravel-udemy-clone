import EditorPreview from '@/Components/shared/EditorPreview'
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { Chapter } from '@/types'
import { StarIcon } from 'lucide-react'
import React from 'react'

interface ChapterTabsProps {
  chapter: Chapter;
}

const ChapterTabs = ({chapter}: ChapterTabsProps) => {
  const dummyData = {
    description: chapter?.description || 'Dive deep into React\'s fundamentals, including component structure, state management, and props. This chapter provides hands-on examples and best practices to build scalable applications.',
    qa: Array.from({length: 20}, (_, i) => ({
      question: `What is React feature #${i + 1}?`,
      answer: `React feature #${i + 1} provides an in-depth look into advanced concepts like reconciliation, virtual DOM, and more.`
    })),
    notes: Array.from({ length: 20 }, (_, i) => `Key takeaway #${i + 1}: Understand how React optimizes rendering through diffing and batching updates.`),
    announcements: Array.from({ length: 20 }, (_, i) => ({
      date: `2025-03-${i + 1}`,
      text: `Announcement #${i + 1}: Important updates about the course structure and new learning materials.`
    })),
    reviews: Array.from({ length: 20 }, (_, i) => ({
      user: `User ${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      text: `Review #${i + 1}: This chapter was extremely helpful in understanding React's core concepts.`
    })),
    learningTools: Array.from({ length: 20 }, (_, i) => ({
      name: `Learning Resource #${i + 1}`,
      url: `#`
    })),
  };

  return (
    <div className="mt-4 rounded-xl w-full min-h-screen">
      <Tabs defaultValue="overview" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList
            className="flex w-full space-x-2 bg-white justify-start border-b rounded-none border-gray-500 px-4">
            {['Overview', 'Announcements', 'Reviews', 'Learning Tools'].map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.toLowerCase().replace(' ', '-')}
                className="pt-1 pb-4 relative font-medium bg-none text-gray-700 rounded-none hover:text-blue-500 data-[state=active]:border-b-4 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
              >
                {tab}
              </TabsTrigger>
            ))}
            <ScrollBar orientation="horizontal" />
          </TabsList>
        </ScrollArea>

        <TabsContent value="overview" className="mt-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Chapter Overview</h2>
          <EditorPreview value={chapter.course.description} />
        </TabsContent>

        <TabsContent value="qa" className="mt-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Questions & Answers</h2>
          {dummyData.qa.map((item, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <p className="font-medium">Q: {item.question}</p>
              <p>A: {item.answer}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="notes" className="mt-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Notes</h2>
          <ul className="list-disc list-inside">
            {dummyData.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="announcements" className="mt-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
          {dummyData.announcements.map((announcement, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <p className="font-medium">{announcement.date}</p>
              <p>{announcement.text}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="reviews" className="mt-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {dummyData.reviews.map((review, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <p className="font-medium flex items-center">
                {review.user} - {review.rating}/5
                <StarIcon className="w-4 h-4 text-yellow-500 ml-2" />
              </p>
              <p>{review.text}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="learning-tools" className="mt-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Learning Tools</h2>
          <ul className="space-y-2">
            {dummyData.learningTools.map((tool, index) => (
              <li key={index}>
                <a href={tool.url} className="text-blue-500 hover:underline">
                  {tool.name}
                </a>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChapterTabs;
