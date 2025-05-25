import React, { type JSX } from 'react'
import EditorPreview from '@/Components/shared/EditorPreview'
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { Chapter } from '@/types'
import { BookOpenIcon, DownloadIcon, BookIcon, GraduationCapIcon, CodeIcon, PlayIcon, FileTextIcon } from 'lucide-react'

interface ChapterTabsProps {
  chapter: Chapter;
}

const ChapterTabs = ({ chapter }: ChapterTabsProps) => {
  // Simplified dummy data - only keeping resources
  const dummyData = {
    downloadResources: [
      { name: 'Chapter Source Code', type: 'zip', size: '2.4 MB', downloads: 324 },
      { name: 'Slide Presentation', type: 'pdf', size: '1.8 MB', downloads: 546 },
      { name: 'Exercise Files', type: 'zip', size: '3.7 MB', downloads: 419 },
      { name: 'Cheat Sheet', type: 'pdf', size: '420 KB', downloads: 782 },
    ]
  };

  // Calculate time to read based on word count (dummy estimate)
  const getDurationDisplay = () => {
    if (chapter.media && chapter.media[0] && chapter.media[0].duration) {
      return chapter.media[0].duration;
    }
    return '42 minutes';
  };

  return (
    <div className="w-full mb-16 text-left">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-gray-200 sticky top-0 z-10 bg-white">
          <div className="flex w-full">
            <TabsList className="flex w-full h-14 justify-start rounded-none">
              <TabsTrigger
                value="overview"
                className="flex-1 flex items-center justify-center gap-2 py-3 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <BookOpenIcon className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex-1 flex items-center justify-center gap-2 py-3 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <FileTextIcon className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="mt-8 px-4 sm:px-6 animate-in fade-in-50 duration-300">
          <div className="w-full">
            <div className="prose prose-blue max-w-none">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 m-0">{chapter.title}</h1>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
                <p className="text-sm text-blue-700 flex items-start gap-2 m-0">
                  <GraduationCapIcon className="h-5 w-5 text-blue-500 shrink-0" />
                  <span><span className="font-semibold">Learning objective:</span> By the end of this chapter, you'll understand how React's component lifecycle works and be able to implement efficient rendering strategies.</span>
                </p>
              </div>

              <EditorPreview value={chapter.description || ''} />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CodeIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Chapter Details</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-sm">
                      <PlayIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><span className="font-medium">Duration:</span> {getDurationDisplay()}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <PlayIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><span className="font-medium">Chapter:</span> {chapter.order} of {chapter.course?.chapters?.length || 12}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-8 px-4 sm:px-6 animate-in fade-in-50 duration-300">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileTextIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Chapter Resources</h2>
                <p className="text-gray-600 m-0">Download these materials to enhance your learning experience</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <ul className="divide-y divide-gray-200">
                {dummyData.downloadResources.map((resource, index) => (
                  <li key={index} className="p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded flex items-center justify-center text-white ${resource.type === 'pdf' ? 'bg-red-500' : resource.type === 'zip' ? 'bg-blue-500' : 'bg-green-500'}`}>
                          {resource.type.toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{resource.size}</span>
                            <span className="flex items-center gap-1">
                              <DownloadIcon className="h-3.5 w-3.5 text-blue-500" />
                              {resource.downloads}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-md font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                        <DownloadIcon className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChapterTabs;
