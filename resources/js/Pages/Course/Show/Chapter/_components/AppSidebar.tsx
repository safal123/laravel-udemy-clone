import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Chapter } from "@/types";
import Logo from "@/Components/shared/Logo";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import {UserMenu} from "@/Components/shared/tooltip/UserMenu";

export function AppSidebar() {
  const { course } = usePage<{ course: { slug: string; chapters: Chapter[] } }>().props;
  const { chapter } = usePage<{ chapter: Chapter }>().props;
  const url = usePage().url;
  const chapterId = url.split('/').pop(); // This will be a string or undefined.

  // Ensure we have the required data
  if (!course || !course.chapters || !chapter) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader className="bg-gray-900">
        <Link href="/">
          <div className="flex items-center justify-center p-4 rounded-md">
            <Logo />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900 text-gray-100">
        <SidebarGroupContent>
          <SidebarMenu>
            {course.chapters.map((chapterItem) => (
              <SidebarMenuItem key={chapterItem.id} className="p-1">
                <Link href={`/courses/${course.slug}/chapters/${chapterItem.id}`}>
                  <div
                    className={cn(
                      "flex items-center hover:bg-gray-600 p-3 rounded-xl",
                      chapterId === String(chapterItem.id) ? "bg-gray-800" : ""
                    )}
                  >
                    <span className="text-gray-100 font-semibold">{chapterItem.title}</span>
                  </div>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter className={'bg-gray-900'}>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
