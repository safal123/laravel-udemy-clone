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
  thumbnail?: string;
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

// Reusable component for course stats
interface CourseStatItemProps {
  icon: any;
  value: string | number;
  label: string;
  bgColor: string;
  isMobile?: boolean;
}

const CourseStatItem = ({ icon: Icon, value, label, bgColor, isMobile = false }: CourseStatItemProps) => (
  <div className={cn(
    "flex items-center gap-3",
    isMobile ? "bg-black/20 backdrop-blur-sm p-3 rounded-lg" : ""
  )}>
    <div className={cn(
      "rounded-full flex items-center justify-center",
      isMobile ? "w-8 h-8" : "w-10 h-10",
      bgColor
    )}>
      <Icon className={cn(
        "text-white",
        isMobile ? "w-4 h-4" : "w-5 h-5"
      )} />
    </div>
    <div>
      <p className="font-bold text-lg text-white">{value}</p>
      <p className="text-sm text-white/80">{label}</p>
    </div>
  </div>
);

export default function CourseHeader({ course, toggleWishlist, isOnWishlist }: CourseHeaderProps) {
  // Helper function to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Helper function to format duration
  const formatDuration = (minutes?: number | null) => {
    const mins = minutes ?? 0;
    const hours = Math.floor(mins / 60);
    const remainingMinutes = mins % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <section className="relative bg-slate-900">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

      <div className="relative py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Top navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/courses">
              <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <ChevronLeft size={16} className="mr-2" />
                Browse All Series
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              {course.categories?.map((category: string, index: number) => (
                <Badge key={index} className="bg-white/20 text-white hover:bg-white/30">
                  {category}
                </Badge>
              ))}
              {course.level && (
                <Badge variant="outline" className="border-white/30 text-white">
                  {course.level}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-start">
            {/* Left column - Course info */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                {course.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center mb-8">
                <Avatar className="h-12 w-12 border-2 border-white/20 mr-4">
                  <AvatarImage src={course.author.avatar} alt={course.author.name} />
                  <AvatarFallback className="bg-white/20 text-white">{getInitials(course.author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-medium text-white">
                    By <Link href={`/instructors/${course.author.id}`} className="hover:text-primary-400">{course.author.name}</Link>
                  </p>
                  {course.author.role && (
                    <p className="text-sm text-white/70">{course.author.role}</p>
                  )}
                </div>
              </div>

              {/* Course stats - Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-6 mb-8">
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <CourseStatItem icon={Star} value={course.rating} label={`${course.reviews_count || 0} Reviews`} bgColor="bg-yellow-500" />
                </div>
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <CourseStatItem icon={Clock} value={formatDuration(course?.duration_minutes)} label="Course Duration" bgColor="bg-blue-500" />
                </div>
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <CourseStatItem icon={User} value={course.students_count || 0} label="Students Enrolled" bgColor="bg-green-500" />
                </div>
                {course.chapters?.length > 0 && (
                  <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                    <CourseStatItem icon={BookOpen} value={course.chapters.length} label="Total Chapters" bgColor="bg-purple-500" />
                  </div>
                )}
                {course.updated_at && (
                  <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                    <CourseStatItem icon={Calendar} value={course.updated_at} label="Last Updated" bgColor="bg-red-500" />
                  </div>
                )}
              </div>

              {/* Course stats - Mobile */}
              <div className="grid grid-cols-2 gap-3 mb-8 lg:hidden">
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <CourseStatItem icon={Star} value={course.rating || 5} label="Rating" bgColor="bg-yellow-500" isMobile />
                </div>
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <CourseStatItem icon={Clock} value={formatDuration(course?.duration_minutes)} label="Duration" bgColor="bg-blue-500" isMobile />
                </div>
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <CourseStatItem icon={User} value={course.students_count || 0} label="Students" bgColor="bg-green-500" isMobile />
                </div>
                {course.chapters?.length > 0 && (
                  <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                    <CourseStatItem icon={BookOpen} value={course.chapters.length} label="Chapters" bgColor="bg-purple-500" isMobile />
                  </div>
                )}
                {course.updated_at && (
                  <div className="col-span-2 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                    <CourseStatItem icon={Calendar} value={course.updated_at} label="Last Updated" bgColor="bg-red-500" isMobile />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {!course.is_author && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  {course.is_enrolled ? (
                    <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`} className="w-full sm:w-auto">
                      <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90">
                        <VideoIcon size={18} className="mr-2" />
                        Continue Learning
                        <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                          {course.user_progress[0]?.progress_percentage}% Complete
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <Button
                        variant="outline"
                        onClick={() => toggleWishlist(course as unknown as Course)}
                        className={cn(
                          "w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20",
                          isOnWishlist && "bg-white/20"
                        )}
                      >
                        <SaveIcon size={18} className={cn("mr-2", isOnWishlist && "fill-white")} />
                        {isOnWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column - Course thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/30 shadow-xl ring-1 ring-white/10">
              {course.image_url ? (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <VideoIcon className="w-16 h-16 text-white/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile enroll button */}
      {!course.is_author && !course.is_enrolled && (
        <Link href={`/courses/${course.slug}/enroll`} className="sm:hidden fixed bottom-6 right-6 z-50">
          <Button size="icon" className="w-14 h-14 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg">
            <TrendingUp size={24} />
          </Button>
        </Link>
      )}
    </section>
  );
}
