import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Star, ThumbsUp, Calendar, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/Components/ui/button"
import CourseReviewForm from "./CourseReviewForm"
import { Course } from "@/types"
import { usePage } from "@inertiajs/react"

interface CourseReviewProps {
  course?: Course;
  isEnrolled?: boolean;
}

export default function CourseReview({ course, isEnrolled = false }: CourseReviewProps) {
  // Get hasReviewed from page props
  const { props } = usePage();

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  return (
    <>
      {/* Show review form for enrolled users (CourseReviewForm handles both review form and thank you message) */}
      {isEnrolled && course && (
        <CourseReviewForm course={course} hasReviewed={course.has_reviewed} />
      )}

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
              Student Reviews
            </CardTitle>
            <div className="flex items-center gap-1">
              <div className="flex">
                {renderStars(course?.rating || 0)}
              </div>
              <span className="text-gray-800 font-medium ml-2">
                {course?.rating}
              </span>
              <span className="text-gray-500 text-sm">({course?.reviews?.length} reviews)</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {(!course?.reviews || course.reviews.length === 0) ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 inline-flex rounded-full p-3 mb-4">
                  <Star className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Reviews Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This course doesn't have any reviews yet.
                  {isEnrolled && !course?.has_reviewed && " Be the first to share your experience!"}
                </p>
              </div>
            ) : (
              <>
                {course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Review header with user info and rating */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-gray-200">
                            <AvatarImage src={review.user?.profile_photo_url} alt={review.user?.name || ''} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {getInitials(review.user?.name || 'Anonymous')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900">{review.user?.name || 'Anonymous'}</h3>
                              <Badge variant="secondary" className="py-0 px-1.5 h-5 bg-green-50 text-green-700 border border-green-200 text-[10px] font-normal">
                                Verified
                              </Badge>
                            </div>
                            <p className="text-gray-500 text-sm">Student</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDistanceToNow(review.created_at, { addSuffix: true })}
                          </span>
                        </div>
                      </div>

                      {/* Review content */}
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Review footer with helpful count */}
                      <div className="flex items-center justify-end mt-1">
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{review.helpful_count || 0} people found this helpful</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-8 flex flex-col items-center border-t border-gray-100 pt-6">
                  <Button>
                    <span>Load more</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
