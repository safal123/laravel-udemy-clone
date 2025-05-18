import React from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { toast } from 'sonner'
import { BookOpen } from 'lucide-react'
import { Course, PageProps } from '@/types'
import DashboardLayout from '@/Layouts/DashboardLayout'

// Import our components
import WelcomeCard from '@/Components/dashboard/WelcomeCard'
import LearningStatsCard from '@/Components/dashboard/LearningStatsCard'
import CourseTable from '@/Components/dashboard/CourseTable'
import EventsCard from '@/Components/dashboard/EventsCard'
import ResourcesCard from '@/Components/dashboard/ResourcesCard'
import EmptyState from '@/Components/dashboard/EmptyState'
import WishlistTable from '@/Components/dashboard/WishlistTable'

export default function Dashboard({ auth }: PageProps) {
  const courses = usePage<{ courses: Course[] }>().props.courses

  // Wishlist removal handler
  const remove = (wishlist: any) => {
    router.delete(route('wishlists.destroy', {
      wishlist: wishlist.id,
      course: wishlist.course.id
    }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Course removed from wishlist')
      },
      onError: (errors) => {
        toast.error(errors.error || 'An error occurred')
      }
    })
  }

  // Dashboard statistics
  const totalCourses = courses.length
  const completionStats = {
    inProgress: Math.min(totalCourses, Math.max(1, Math.floor(Math.random() * 3))),
    completed: Math.floor(Math.random() * 2)
  }

  // Sample upcoming event
  const generateRandomDate = () => {
    const today = new Date()
    const futureDate = new Date()
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 1)
    return futureDate
  }

  const upcomingEvents = [
    {
      title: "Live Q&A Session: Modern Web Development",
      date: generateRandomDate(),
      time: "11:00 AM - 12:30 PM"
    }
  ]

  // Sample recommended resources
  const recommendedResources = [
    {
      id: "1",
      type: "guide" as const,
      title: "Getting Started Guide",
      description: "Learn how to navigate the platform and make the most of your courses.",
      icon: "guide" as const,
      link: "#"
    },
    {
      id: "2",
      type: "video" as const,
      title: "New Student Orientation",
      description: "A quick video introduction to help you get started with your learning.",
      icon: "video" as const,
      duration: 10
    },
    {
      id: "3",
      type: "path" as const,
      title: "Learning Path: Web Development",
      description: "A curated set of courses to master full-stack web development.",
      icon: "path" as const,
      courses: 5
    }
  ]

  // Create empty states for courses
  const coursesEmptyState = (
    <EmptyState
      icon={BookOpen}
      title="No courses yet"
      description="Start your learning journey by exploring our course catalog."
      actionText="Explore Courses"
      actionLink={route('courses.index')}
      bgColor="bg-blue-50"
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
    />
  )

  return (
    <DashboardLayout>
      <Head title="Student Dashboard" />

      {/* Top section - Welcome and Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 px-4 sm:px-6">
        {/* Welcome Card */}
        <WelcomeCard
          userName={auth.user.name}
          activeCourses={completionStats.inProgress}
          completedCourses={completionStats.completed}
        />

        {/* Learning Stats Card */}
        <LearningStatsCard
          totalCourses={totalCourses}
          inProgress={completionStats.inProgress}
          completed={completionStats.completed}
        />
      </div>

      {/* My Learning Section with Table */}
      <div className="mb-6 sm:mb-8 px-4 sm:px-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">My Learning</h2>
          {courses.length > 0 && (
            <Link
              href="#"
              className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium flex items-center"
            >
              View all courses
            </Link>
          )}
        </div>

        {courses.length > 0 ? (
          <CourseTable courses={courses} />
        ) : (
          coursesEmptyState
        )}
      </div>

      {/* Upcoming Events - Full width row */}
      <div className="mb-6 sm:mb-8 px-4 sm:px-6">
        <EventsCard events={upcomingEvents} />
      </div>

      {/* Recommended Resources - Full width row */}
      <div className="mb-6 sm:mb-8 px-4 sm:px-6">
        <ResourcesCard resources={recommendedResources} />
      </div>

      {/* Wishlist section - Now with table */}
      <div className="px-4 sm:px-6 mb-8">
        {auth.user.wishlists.length > 0 ? (
          <WishlistTable
            wishlistItems={auth.user.wishlists}
            onRemove={remove}
          />
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No courses in your wishlist"
            description="Save courses you're interested in for later."
            actionText="Discover Courses"
            actionLink={route('courses.index')}
            bgColor="bg-gray-50"
            iconBgColor="bg-gray-100"
            iconColor="text-gray-600"
          />
        )}
      </div>
    </DashboardLayout>
  );
}
