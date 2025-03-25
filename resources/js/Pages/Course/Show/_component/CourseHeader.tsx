import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  ChevronLeft,
  Clock,
  SaveIcon,
  Star,
  User,
  VideoIcon,
  BookOpen,
  TrendingUp,
  Calendar,
  ChevronDown
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { Course } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { cn } from "@/lib/utils";

// Extended types to support new properties
// @ts-ignore
interface ExtendedCourse extends Omit<Course, 'price'> {
  categories?: string[];
  level?: string;
  reviews_count?: number;
  last_updated?: string;
  progress?: number;
  price?: string | number;
}

interface ExtendedUser {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface CourseHeaderProps {
  course: ExtendedCourse & { author: ExtendedUser };
  toggleWishlist: (course: Course) => void;
  isOnWishlist: boolean;
}

export default function CourseHeader({ course, toggleWishlist, isOnWishlist }: CourseHeaderProps) {
  // Helper function to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="relative">
      {/* Background gradient with pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary to-primary/80 opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:20px_20px] opacity-20" />

      {/* Content container */}
      <div className="relative py-8 md:py-12 text-white">
        <div className="container mx-auto px-4">
          {/* Top navigation and category */}
          <div className="flex flex-row items-center justify-between flex-wrap gap-3 mb-10 pt-6 md:pt-0">
            <Link href="/courses">
              <Button size={'sm'} variant={'outline'} className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-200">
                <ChevronLeft size={16} className="mr-2" />
                Browse All Series
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-2 justify-end">
              {course.categories?.map((category: string, index: number) => (
                <Badge key={index} className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-200">
                  {category}
                </Badge>
              )) || (
                  <Badge className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-200">
                    Frameworks
                  </Badge>
                )}

              {course.level && (
                <Badge variant="outline" className="border-white/20 text-white">
                  {course.level}
                </Badge>
              )}
            </div>
          </div>

          {/* Course title with animated gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-pink-500/80 animate-gradient">
            {course.title}
          </h1>

          {/* Author info with avatar */}
          <div className="flex items-center mb-8 group">
            <Avatar className="h-10 w-10 border-2 border-white/20 mr-3 group-hover:scale-105 transition-all duration-300">
              <AvatarImage src={course.author.avatar} alt={course.author.name} />
              <AvatarFallback className="bg-white/10 text-white">{getInitials(course.author.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium">
                By <Link href={`/instructors/${course.author.id}`} className="underline decoration-2 decoration-white/30 hover:decoration-white/70 transition-all duration-200 ml-1">{course.author.name}</Link>
              </p>
              {course.author.role && (
                <p className="text-sm text-white/70">{course.author.role}</p>
              )}
            </div>
          </div>

          {/* Course stats with improved visual design */}
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="w-full md:w-fit bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
              {/* Mobile view - Grid layout */}
              <div className="grid grid-cols-2 gap-2 p-4 md:hidden">
                <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-yellow-500/20 flex-shrink-0 flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold leading-tight">{course.rating || 5}</p>
                    <p className="text-xs text-white/70">Rating</p>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold leading-tight">{course.duration}</p>
                    <p className="text-xs text-white/70">Duration</p>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold leading-tight">{course.students_count || 500}</p>
                    <p className="text-xs text-white/70">Students</p>
                  </div>
                </div>

                {course.chapters?.length > 0 && (
                  <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight">{course.chapters.length}</p>
                      <p className="text-xs text-white/70">Chapters</p>
                    </div>
                  </div>
                )}

                {course.updated_at && (
                  <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 col-span-2">
                    <div className="w-9 h-9 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{course.updated_at}</p>
                      <p className="text-xs text-white/70">Last updated</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Desktop view - Row layout */}
              <div className="hidden md:flex md:flex-row md:items-center gap-4 md:gap-8 p-4 md:px-6 md:py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{course.rating}</p>
                    <p className="text-xs text-white/70">{course.reviews_count} reviews</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{course.duration}</p>
                    <p className="text-xs text-white/70">Course duration</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{course.students_count || 500}</p>
                    <p className="text-xs text-white/70">Enrolled students</p>
                  </div>
                </div>

                {course.chapters?.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{course.chapters.length}</p>
                      <p className="text-xs text-white/70">Total chapters</p>
                    </div>
                  </div>
                )}

                {course.updated_at && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-base font-medium">{course.updated_at}</p>
                      <p className="text-xs text-white/70">Last updated</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons with improved styling */}
          {!course.is_author && (
            <div className="flex flex-col sm:flex-row gap-4">
              {course.is_enrolled ? (
                <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                    <VideoIcon size={18} className="mr-2 group-hover:animate-pulse" />
                    Continue Learning
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                      {course.user_progress[0]?.progress_percentage}% Complete
                    </span>
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleWishlist(course as unknown as Course)}
                    className={cn(
                      "border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-200",
                      isOnWishlist && "bg-white/20"
                    )}
                  >
                    <SaveIcon size={18} className={cn(
                      "mr-2 transition-all duration-300",
                      isOnWishlist && "fill-white"
                    )} />
                    {isOnWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </Button>

                  {/* Mobile-only enroll button - Floating action button style */}
                  <Link href={`/courses/${course.slug}/enroll`} className="sm:hidden fixed bottom-6 right-6 z-50">
                    <Button size="icon" className="w-14 h-14 rounded-full bg-white text-primary hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                      <TrendingUp size={24} />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
