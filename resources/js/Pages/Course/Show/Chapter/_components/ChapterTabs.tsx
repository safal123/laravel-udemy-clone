import EditorPreview from '@/Components/shared/EditorPreview'
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { Chapter } from '@/types'
import { BookOpenIcon, MessageCircleIcon, StarIcon, BellIcon, DownloadIcon, UserIcon, ClockIcon, ThumbsUpIcon, ShareIcon, CheckCircleIcon, BookIcon, GraduationCapIcon, CodeIcon, PlayIcon, CalendarIcon, FileTextIcon, BookmarkIcon } from 'lucide-react'
import React, { useState } from 'react'
import { format } from 'date-fns'

interface ChapterTabsProps {
  chapter: Chapter;
}

const ChapterTabs = ({ chapter }: ChapterTabsProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // More realistic dummy data
  const dummyData = {
    downloadResources: [
      { name: 'Chapter Source Code', type: 'zip', size: '2.4 MB', downloads: 324 },
      { name: 'Slide Presentation', type: 'pdf', size: '1.8 MB', downloads: 546 },
      { name: 'Exercise Files', type: 'zip', size: '3.7 MB', downloads: 419 },
      { name: 'Cheat Sheet', type: 'pdf', size: '420 KB', downloads: 782 },
    ],
    qa: [
      {
        id: 1,
        user: { name: 'Michael Chen', avatar: '/images/avatars/avatar-1.png', role: 'Student' },
        time: '2 days ago',
        question: "How do React's useEffect cleanup functions work when the component unmounts?",
        answer: 'The cleanup function in useEffect runs when the component unmounts or before the effect runs again (if it depends on changing dependencies). This is important for preventing memory leaks by canceling network requests, removing event listeners, or clearing timers.',
        replies: 3,
        likes: 12
      },
      {
        id: 2,
        user: { name: 'Sarah Johnson', avatar: '/images/avatars/avatar-2.png', role: 'Student' },
        time: '1 week ago',
        question: "What's the difference between React.memo and useMemo?",
        answer: 'React.memo is a higher-order component that memoizes an entire component, preventing re-renders if props don\'t change. useMemo is a hook that memoizes a computed value within a component, recalculating only when dependencies change.',
        replies: 5,
        likes: 8
      },
      {
        id: 3,
        user: { name: 'David Williams', avatar: '/images/avatars/avatar-3.png', role: 'Student' },
        time: '2 weeks ago',
        question: 'When should I use Redux versus React Context API?',
        answer: 'Use Redux for complex global state with many updates or when you need time-travel debugging and middleware. Use Context API for simpler state sharing across components, theme data, or user settings that change infrequently.',
        replies: 4,
        likes: 15
      },
    ],
    announcements: [
      {
        id: 1,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        title: 'New Exercise Added for Component Optimization',
        content: 'I\'ve added a new exercise to help you practice performance optimization techniques. It covers React.memo, useMemo, and useCallback with real-world examples. Check it out in the Resources section!',
        isNew: true
      },
      {
        id: 2,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        title: 'Updated Content for React 18 Features',
        content: 'The course materials have been updated to include the latest React 18 features including automatic batching, transitions, and suspense. Make sure to download the latest resources.',
        isNew: false
      },
      {
        id: 3,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        title: 'Live Q&A Session Next Week',
        content: 'Join me for a live Q&A session next Wednesday at 2pm EST where I\'ll be answering your questions about this chapter and demonstrating some advanced techniques.',
        isNew: false
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Alex Thompson',
        avatar: '/images/avatars/avatar-4.png',
        rating: 5,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        text: 'The explanations in this chapter are incredibly clear. I finally understand how the React reconciliation process works after struggling with it for months.',
        isVerified: true,
        likes: 42
      },
      {
        id: 2,
        user: 'Madison Lee',
        avatar: '/images/avatars/avatar-5.png',
        rating: 4,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        text: 'Great content and examples. I especially appreciated the performance optimization section. Would have liked more exercises, but overall excellent material.',
        isVerified: true,
        likes: 26
      },
      {
        id: 3,
        user: 'James Wilson',
        avatar: '/images/avatars/avatar-6.png',
        rating: 5,
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        text: 'This chapter transformed how I think about component design. The real-world examples made complex concepts accessible. Highly recommend spending extra time on the exercises.',
        isVerified: false,
        likes: 18
      },
    ],
  };

  // Calculate time to read based on word count (dummy estimate)
  const getDurationDisplay = () => {
    // Use a safer way to access potential duration
    if (chapter.media && chapter.media[0] && chapter.media[0].duration) {
      return chapter.media[0].duration;
    }
    return '42 minutes';
  };

  return (
    <div className="w-full mb-16 text-left">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-gray-200 sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-white shadow-sm">
          <ScrollArea className="w-full">
            <TabsList className="flex w-full h-16 justify-start rounded-none px-4 space-x-8">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 py-5 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <BookOpenIcon className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex items-center gap-2 py-5 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <FileTextIcon className="h-4 w-4" />
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="qa"
                className="flex items-center gap-2 py-5 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <MessageCircleIcon className="h-4 w-4" />
                Q&A
              </TabsTrigger>
              <TabsTrigger
                value="announcements"
                className="flex items-center gap-2 py-5 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <BellIcon className="h-4 w-4" />
                Announcements
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex items-center gap-2 py-5 relative font-medium bg-transparent text-gray-600 rounded-none hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all"
              >
                <StarIcon className="h-4 w-4" />
                Reviews
              </TabsTrigger>
              <ScrollBar orientation="horizontal" />
            </TabsList>
          </ScrollArea>
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

              <EditorPreview value={chapter.description || `
                <h2>React Component Lifecycle and Rendering</h2>
                <p>In this comprehensive chapter, we'll explore the React component lifecycle and how rendering works under the hood. You'll learn:</p>
                <ul>
                  <li>How components are mounted, updated, and unmounted</li>
                  <li>The virtual DOM and reconciliation process</li>
                  <li>Performance optimization techniques</li>
                  <li>Best practices for efficient component design</li>
                </ul>
                <p>We'll dive deep into practical examples that demonstrate these concepts in real-world scenarios, helping you build more performant React applications.</p>
                <h3>Key Topics Covered</h3>
                <p>This chapter covers several advanced React concepts that will take your development skills to the next level:</p>
                <ol>
                  <li>Understanding the component lifecycle</li>
                  <li>Using lifecycle methods and hooks effectively</li>
                  <li>Implementing controlled vs. uncontrolled components</li>
                  <li>Optimizing renders with memoization techniques</li>
                  <li>Debugging rendering issues</li>
                </ol>
              `} />

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
                      <ClockIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><span className="font-medium">Duration:</span> {getDurationDisplay()}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <PlayIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><span className="font-medium">Chapter:</span> {chapter.order} of {chapter.course?.chapters?.length || 12}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <DownloadIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><span className="font-medium">Resources:</span> 4 downloadable files</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-lg border border-green-200 hover:border-green-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Prerequisites</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>Basic JavaScript knowledge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>Understanding of ES6 features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>Familiarity with React basics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>Completion of previous chapters</span>
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

        <TabsContent value="qa" className="mt-8 px-4 sm:px-6 animate-in fade-in-50 duration-300">
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircleIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Questions & Answers</h2>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-md font-medium transition-colors shadow-sm flex items-center gap-1.5">
                <MessageCircleIcon className="h-4 w-4" />
                Ask a Question
              </button>
            </div>

            <div className="flex items-center space-x-2 mb-6 bg-indigo-50 p-2 rounded-lg">
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'all' ? 'bg-white shadow text-indigo-600' : 'text-gray-700 hover:bg-white/50'}`}
                onClick={() => setActiveFilter('all')}
              >
                All Questions
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'mine' ? 'bg-white shadow text-indigo-600' : 'text-gray-700 hover:bg-white/50'}`}
                onClick={() => setActiveFilter('mine')}
              >
                My Questions
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'unanswered' ? 'bg-white shadow text-indigo-600' : 'text-gray-700 hover:bg-white/50'}`}
                onClick={() => setActiveFilter('unanswered')}
              >
                Unanswered
              </button>
            </div>

            <div className="space-y-6">
              {dummyData.qa.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">
                        {item.user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{item.user.name}</h3>
                          <span className="text-xs text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-full">{item.user.role}</span>
                          <span className="text-xs text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-gray-800 font-medium">{item.question}</p>

                        <div className="flex items-center gap-3 mt-3">
                          <button className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1">
                            <ThumbsUpIcon className="h-3.5 w-3.5" />
                            Helpful ({item.likes})
                          </button>
                          <button className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1">
                            <BookmarkIcon className="h-3.5 w-3.5" />
                            Save
                          </button>
                          <button className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1">
                            <ShareIcon className="h-3.5 w-3.5" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-indigo-50/50">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                        I
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">Instructor</h3>
                          <span className="text-xs text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-full">Teacher</span>
                        </div>
                        <p className="text-gray-700">{item.answer}</p>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                            <MessageCircleIcon className="h-4 w-4" />
                            {item.replies} replies
                          </button>
                          <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">View all</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-8 px-4 sm:px-6 animate-in fade-in-50 duration-300">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <BellIcon className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
            </div>

            <div className="space-y-6">
              {dummyData.announcements.map((announcement) => (
                <div key={announcement.id} className={`bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow ${announcement.isNew ? 'border-l-4 border-l-amber-500' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-gray-900">{announcement.title}</h3>
                      {announcement.isNew && (
                        <span className="bg-amber-100 text-amber-600 text-xs px-2 py-0.5 rounded font-medium">New</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-gray-500">{format(announcement.date, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-8 px-4 sm:px-6 animate-in fade-in-50 duration-300">
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <StarIcon className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Student Reviews</h2>
                  <p className="text-gray-600">See what students are saying about this chapter</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-white p-4 rounded-lg border border-yellow-200 md:w-64">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-3xl font-bold text-gray-900">4.8</div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-200'}`} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">Based on 24 reviews</p>
                <div className="mt-3 grid grid-cols-5 gap-1 text-xs text-gray-600">
                  <div className="text-right">5★</div>
                  <div className="col-span-3 pt-1.5">
                    <div className="bg-gray-200 h-1.5 rounded-full w-full">
                      <div className="bg-yellow-400 h-1.5 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  <div>85%</div>

                  <div className="text-right">4★</div>
                  <div className="col-span-3 pt-1.5">
                    <div className="bg-gray-200 h-1.5 rounded-full w-full">
                      <div className="bg-yellow-400 h-1.5 rounded-full w-[10%]"></div>
                    </div>
                  </div>
                  <div>10%</div>

                  <div className="text-right">3★</div>
                  <div className="col-span-3 pt-1.5">
                    <div className="bg-gray-200 h-1.5 rounded-full w-full">
                      <div className="bg-yellow-400 h-1.5 rounded-full w-[3%]"></div>
                    </div>
                  </div>
                  <div>3%</div>

                  <div className="text-right">2★</div>
                  <div className="col-span-3 pt-1.5">
                    <div className="bg-gray-200 h-1.5 rounded-full w-full">
                      <div className="bg-yellow-400 h-1.5 rounded-full w-[1%]"></div>
                    </div>
                  </div>
                  <div>1%</div>

                  <div className="text-right">1★</div>
                  <div className="col-span-3 pt-1.5">
                    <div className="bg-gray-200 h-1.5 rounded-full w-full">
                      <div className="bg-yellow-400 h-1.5 rounded-full w-[1%]"></div>
                    </div>
                  </div>
                  <div>1%</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {dummyData.reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center text-yellow-600 font-bold">
                      {review.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{review.user}</h3>
                          {review.isVerified && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Verified Student</span>
                          )}
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{format(review.date, 'MMM d, yyyy')}</span>
                      </div>
                      <p className="text-gray-700">{review.text}</p>

                      <div className="flex items-center gap-3 mt-3">
                        <button className="text-xs text-gray-500 hover:text-yellow-600 flex items-center gap-1 transition-colors">
                          <ThumbsUpIcon className="h-3.5 w-3.5" />
                          Helpful ({review.likes})
                        </button>
                        <button className="text-xs text-gray-500 hover:text-yellow-600 flex items-center gap-1 transition-colors">
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-8 text-center">
                <button className="px-4 py-2 border border-yellow-300 bg-yellow-50 hover:bg-yellow-100 rounded-md text-sm font-medium text-yellow-700 transition-colors">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChapterTabs;
