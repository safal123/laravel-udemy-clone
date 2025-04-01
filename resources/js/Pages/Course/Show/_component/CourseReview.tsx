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

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // ... existing submit logic ...
  }

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${index < Math.round(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    )
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
          <Card className="border border-slate-200 mb-8 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-5 py-6 sm:px-7 sm:py-8">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              ></div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* Left side with icon and text */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 shadow-lg">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Center content with heading and stats */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Thank you for your review!
                      </h3>
                      <div className="hidden sm:block px-2 py-0.5 bg-white/10 rounded-full">
                        <span className="text-xs font-medium text-white/90">Verified</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">
                      Your feedback helps other students make informed decisions and helps improve this course.
                    </p>

                    {userReview && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(userReview.rating)}
                          </div>
                          <span className="text-white font-medium text-sm">{userReview.rating}/5</span>
                        </div>

                        {userReview.title && (
                          <div className="hidden sm:block text-white/30">|</div>
                        )}

                        {userReview.title && (
                          <div className="text-white/90 text-sm italic font-medium">
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
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border-white/20 h-9 transition-all duration-200 hover:shadow-lg hover:shadow-white/5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span className="font-medium">Edit Review</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDeleteReviewModalOpen(true)}
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border-white/20 h-9 transition-all duration-200 hover:shadow-lg hover:shadow-white/5"
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

      <Card className="border border-slate-200 rounded-xl overflow-hidden mb-10">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2">
                Student Reviews
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(course?.rating || 0)}
                  <span className="text-slate-300 text-sm">({course?.reviews?.length || 0} reviews)</span>
                </div>
                {isEnrolled && !course?.reviews?.some(review => review.user_id === props.auth?.user?.id) && (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 transition-all duration-200"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {showReviewForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors duration-200 ${star <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 hover:text-yellow-400'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                    placeholder="Share your experience with this course..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0 || !comment.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  className="border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : course?.reviews?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Reviews Yet</h3>
              <p className="text-slate-600 max-w-md mb-6">
                Be the first to share your experience with this course. Your review helps other students make informed decisions.
              </p>
              {isEnrolled && (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Write the First Review
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {course?.reviews?.map((review) => (
                <div key={review.id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.user.image_url || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-slate-900">{review.user.name}</h4>
                          <p className="text-sm text-slate-500">
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-sm font-medium text-slate-700">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
