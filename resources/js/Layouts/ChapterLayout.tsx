import { SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import { Chapter } from '@/types'
import { Link, usePage } from '@inertiajs/react'

export default function ChapterLayout({children}: { children: React.ReactNode }) {
  const {course} = usePage<{ course: { slug: string; chapters: Chapter[] } }>().props
  const {chapter} = usePage<{ chapter: Chapter }>().props
  const url = usePage().url
  const chapterId = url.split('/').pop()

  // Ensure we have the required data
  if (!course || !course.chapters || !chapter) {
    return null
  }
  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar
        variant="dark"
      >
        {course.chapters.map((chapterItem, index) => (
          <SidebarMenuItem key={chapterItem.id} className="p-1">
            <Link href={`/courses/${course.slug}/chapters/${chapterItem.id}`}>
              <div
                className={cn(
                  'flex items-center hover:bg-gray-200 p-3 rounded-md',
                  chapterId === String(chapterItem.id) ? 'bg-gray-200 border border-gray-300' : ''
                )}
              >
                <span className={'h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center mr-1'}>
                  {index + 1}
                </span>
                <span className="text-gray-700 font-semibold">
                  {chapterItem.title.substring(0, 20)}
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        ))}
      </AppSidebar>
      <main className="flex-1 flex flex-col overflow-auto">
        <SidebarTrigger className="m-2"/>
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
