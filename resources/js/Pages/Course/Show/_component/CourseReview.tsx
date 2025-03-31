import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Star, ThumbsUp, Calendar, ChevronDown, Pencil, Trash, MessageSquare, Check, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/Components/ui/button"
import CourseReviewForm from "./CourseReviewForm"
import { Course, Review } from "@/types"
import { usePage } from "@inertiajs/react"
import { useState } from "react"
import EditReviewModal from "./EditReviewModal"
import DeleteReviewModal from "./DeleteReviewModal"
import { motion } from "framer-motion"

interface CourseReviewProps {
  course?: Course;
  isEnrolled?: boolean;
}

export default function CourseReview({ course, isEnrolled = false }: CourseReviewProps) {
  // Get auth from page props
  const { props } = usePage<{ auth: { user: { id: number } } }>();

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-600 fill-yellow-500' : 'text-gray-200'}`}
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

  const userReview = course?.reviews?.find((review: Review) =>
    review.user_id === props.auth?.user?.id.toString()
  );

  const [isEditReviewModalOpen, setIsEditReviewModalOpen] = useState(false);
  const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);

  // Get stats for the review summary
  const getReviewStats = () => {
    if (!course?.reviews?.length) return null;

    // Count reviews by rating
    const ratingCounts = [0, 0, 0, 0, 0];
    course.reviews.forEach((review: Review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1]++;
      }
    });

    // Calculate percentages
    const ratingPercentages = ratingCounts.map(count =>
      Math.round((count / (course.reviews?.length || 1)) * 100)
    );

    return { ratingCounts, ratingPercentages };
  };

  const reviewStats = getReviewStats();

  return (
    <>
      {course?.has_reviewed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border border-amber-200 mb-8 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-6 sm:px-7 sm:py-8">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              ></div>

              <div className="relative">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* Left side with icon and text */}
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-full p-3 shadow-md">
                      <Award className="w-7 h-7 text-amber-500" />
                    </div>
                  </div>

                  {/* Center content with heading and stats */}
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Thank you for your review!
                    </h3>
                    <p className="text-amber-50 text-sm mb-3">
                      Your feedback helps other students make informed decisions and helps improve this course.
                    </p>

                    {userReview && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30 flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(userReview.rating)}
                          </div>
                          <span className="text-white font-medium text-sm">{userReview.rating}/5</span>
                        </div>

                        {userReview.title && (
                          <div className="hidden sm:block text-white/70">|</div>
                        )}

                        {userReview.title && (
                          <div className="text-white text-sm italic font-medium">
                            "{userReview.title}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right side with action buttons */}
                  {userReview && (
                    <div className="flex gap-2 sm:flex-col md:flex-row mt-4 sm:mt-0 self-start">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsEditReviewModalOpen(true)}
                        className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-amber-700 border-0 shadow-sm h-9"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span className="font-medium">Edit Review</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDeleteReviewModalOpen(true)}
                        className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white border-white/30 h-9"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        <span className="font-medium">Delete</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {isEnrolled && course && !course.has_reviewed && (
        <CourseReviewForm
          course={course} hasReviewed={false} />
      )}

      {isEditReviewModalOpen && userReview && course && (
        <EditReviewModal
          isOpen={isEditReviewModalOpen}
          course={course}
          review={userReview}
          onClose={() => setIsEditReviewModalOpen(false)}
        />
      )}

      <DeleteReviewModal
        isOpen={isDeleteReviewModalOpen}
        course={course || {} as Course}
        review={userReview}
        onEdit={() => setIsEditReviewModalOpen(true)}
        onClose={() => setIsDeleteReviewModalOpen(false)}
      />

      <Card className="border border-gray-200 rounded-xl overflow-hidden mb-10">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-200 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2">
              Student Reviews
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(course?.rating || 0)}
              </div>
              <span className="text-white font-medium">
                {course?.rating?.toFixed(1) || '0.0'}
              </span>
              <span className="text-slate-300 text-sm">({course?.reviews?.length || 0} reviews)</span>
            </div>

            {reviewStats && course?.reviews && course.reviews?.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-100 w-full lg:w-auto">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Rating Breakdown</h4>
                <div className="space-y-2 w-full lg:w-64">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex items-center min-w-16">
                        <span className="text-sm font-medium text-gray-700 mr-1">{rating}</span>
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${reviewStats.ratingPercentages[rating - 1]}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 min-w-8 text-right">
                        {reviewStats.ratingCounts[rating - 1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {(!course?.reviews || course.reviews.length === 0) ? (
              <div className="text-center py-16 px-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-white inline-flex rounded-full p-5 mb-6 shadow-lg border border-indigo-50">
                    <MessageSquare className="w-8 h-8 text-indigo-500" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Reviews Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto text-base leading-relaxed">
                  This course doesn't have any reviews yet.
                  {isEnrolled && !course?.has_reviewed && (
                    <span className="block mt-2 text-indigo-600 font-medium">
                      Be the first to share your experience!
                    </span>
                  )}
                </p>

                {isEnrolled && !course?.has_reviewed && (
                  <Button
                    className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-2.5 rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2 mx-auto"
                    onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Write a Review
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-6">
                {course.reviews.map((review, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={review.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    {/* Review header with rating background */}
                    <div className="border-b border-gray-100">
                      <div
                        className={`h-1.5 ${review.rating >= 4.5 ? 'bg-green-400' :
                          review.rating >= 3.5 ? 'bg-teal-400' :
                            review.rating >= 2.5 ? 'bg-yellow-400' :
                              review.rating >= 1.5 ? 'bg-orange-400' : 'bg-red-400'
                          }`}
                      ></div>
                    </div>

                    <div className="p-4 sm:p-5">
                      {/* Review meta information - Redesigned for better mobile display */}
                      <div className="flex flex-wrap sm:flex-nowrap items-start gap-4 mb-4">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-gray-100 shadow-sm flex-shrink-0">
                          <AvatarImage src={review.user?.profile_photo_url} alt={review.user?.name || ''} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 font-medium">
                            {getInitials(review.user?.name || 'Anonymous')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-grow min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-gray-900 mr-1">{review.user?.name || 'Anonymous'}</h3>
                            <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-100 text-[10px] font-normal">
                              Verified Student
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Review title */}
                      {review.title && (
                        <h4 className="font-medium text-gray-800 text-base sm:text-lg mb-2 line-clamp-2">
                          "{review.title}"
                        </h4>
                      )}

                      {/* Review content */}
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 my-3 border border-gray-100">
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {review.comment}
                        </p>
                      </div>

                      {/* Review footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
                        <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
                          Review ID: {review.id.substring(0, 8)}...
                        </span>
                        <div className="flex items-center gap-2 ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Helpful</span>
                            {(review.helpful_count > 0 || !review.helpful_count) && (
                              <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                                {review.helpful_count || 0}
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {course?.reviews?.length > 5 && (
                  <div className="mt-6 flex flex-col items-center border-t border-gray-100 pt-6">
                    <Button className="px-6 text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300">
                      <span>Load more reviews</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
