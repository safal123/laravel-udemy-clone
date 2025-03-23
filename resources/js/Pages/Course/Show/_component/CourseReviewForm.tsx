import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { Course, Review } from "@/types";
import { MessageCircle, PenLine, Star, ThumbsUp, Loader2, Sparkles } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import EditReviewModal from "./EditReviewModal";
import { motion, AnimatePresence } from "framer-motion";

interface CourseReviewFormProps {
  course: Course;
  hasReviewed: boolean;
  review?: Review;
}

export default function CourseReviewForm({ course, hasReviewed, review }: CourseReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(review?.rating || 0);
  const [title, setTitle] = useState(review?.title || "");
  const [comment, setComment] = useState(review?.comment || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isEditing = !!review;

  // Update form when review prop changes
  useEffect(() => {
    if (review) {
      setSelectedRating(review.rating);
      setTitle(review.title);
      setComment(review.comment);
    }
  }, [review]);

  // Animation when rating is selected
  useEffect(() => {
    if (selectedRating > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timer);
    }
  }, [selectedRating]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Clear previous errors
    setErrors({});

    // Validate form
    let formErrors: Record<string, string> = {};

    if (selectedRating === 0) {
      formErrors.rating = "Rating is required";
    }

    if (!title || title.length < 3) {
      formErrors.title = "Title must be at least 3 characters";
    }

    if (!comment || comment.length < 10) {
      formErrors.comment = "Comment must be at least 10 characters";
    }

    // If there are validation errors, show them and stop submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    const reviewData = {
      rating: selectedRating,
      title,
      comment
    };

    if (isEditing) {
      // Update existing review
      router.put(route('courses.updateReview', { course: course.id, review: review.id }), reviewData, {
        onSuccess: () => {
          setIsSubmitting(false);
          toast.success("Review updated successfully");
        },
        onError: (errors) => {
          setErrors(errors);
          setIsSubmitting(false);
        },
        preserveScroll: true,
      });
    } else {
      // Submit new review
      router.post(route('courses.submitReview', course.id), reviewData, {
        onSuccess: () => {
          // Reset form
          setSelectedRating(0);
          setTitle("");
          setComment("");
          setIsSubmitting(false);
          toast.success("Review submitted successfully");
        },
        onError: (errors) => {
          setErrors(errors);
          setIsSubmitting(false);
        },
        preserveScroll: true,
      });
    }
  }

  const getRatingLabel = (rating: number) => {
    if (rating === 0) return "Select a rating";
    if (rating === 5) return "Outstanding!";
    if (rating >= 4) return "Excellent!";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Fair";
    return "Poor";
  };

  const ratingLabelColors = {
    0: "bg-white text-gray-500",
    1: "bg-red-50 text-red-600 border-red-200",
    2: "bg-orange-50 text-orange-600 border-orange-200",
    3: "bg-yellow-50 text-yellow-600 border-yellow-200",
    4: "bg-green-50 text-green-600 border-green-200",
    5: "bg-blue-50 text-blue-600 border-blue-200"
  };

  return (
    <Card className="rounded-xl overflow-hidden transform transition-all duration-300 mb-10 border border-gray-100 dark:border-gray-800/60">
      <CardHeader className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 border-b-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzApIj48cGF0aCBkPSJNMjAgNUwyMCAyMCBNMTAgMTVMMzAgMTUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC4xIiAvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz48L3N2Zz4=')]" />
        <div className="relative z-10 flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm text-white mr-4 shadow-lg shadow-purple-500/20"
          >
            {isEditing ? (
              <PenLine className="h-7 w-7" />
            ) : (
              <MessageCircle className="h-7 w-7" />
            )}
          </motion.div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              {isEditing ? "Edit Your Review" : "Share Your Experience"}
            </CardTitle>
            <p className="text-purple-100 mt-1 text-sm max-w-md">
              {isEditing
                ? "Update your feedback to reflect your latest thoughts on this course"
                : "Your honest feedback helps other students and contributes to course improvement"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
          {/* Rating Stars Section */}
          <div className="p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex flex-col space-y-1">
              <label className="text-base font-semibold text-gray-800">How would you rate this course?</label>
              <p className="text-gray-500 text-sm">Select the number of stars that best represents your experience</p>
            </div>

            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">
              <div className="flex items-center justify-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none relative p-1"
                    onClick={() => setSelectedRating(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 transition-all duration-300",
                        (rating <= (hoveredRating || selectedRating))
                          ? "text-yellow-400 fill-yellow-400 drop-shadow-md"
                          : "text-gray-200"
                      )}
                    />
                    {isAnimating && rating <= selectedRating && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRating}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all",
                    ratingLabelColors[selectedRating as keyof typeof ratingLabelColors] || ratingLabelColors[0]
                  )}
                >
                  {getRatingLabel(selectedRating)}
                </motion.div>
              </AnimatePresence>
            </div>

            {errors.rating && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-500 mt-1 flex items-center"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {errors.rating}
              </motion.p>
            )}
          </div>

          {/* Review Title Section */}
          <div className="p-6 space-y-4 bg-white">
            <div className="flex flex-col space-y-1">
              <label htmlFor="title" className="text-base font-semibold text-gray-800">
                Review Title
              </label>
              <p className="text-gray-500 text-sm">
                Summarize your overall impression in a concise title
              </p>
            </div>

            <div className="relative">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., 'Comprehensive and well-structured course'"
                className="bg-white border-gray-200 focus:border-purple-500 shadow-sm text-base pl-4 pr-12 py-3 h-12 rounded-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <PenLine className="h-5 w-5" />
              </div>
            </div>

            {errors.title && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-500 mt-1 flex items-center"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {errors.title}
              </motion.p>
            )}
          </div>

          {/* Review Comment Section */}
          <div className="p-6 space-y-4 bg-white">
            <div className="flex flex-col space-y-1">
              <label htmlFor="comment" className="text-base font-semibold text-gray-800">
                Your Detailed Review
              </label>
              <p className="text-gray-500 text-sm">
                Share specific aspects of the course that you enjoyed or feel could be improved
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-200">
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like about this course? What did you learn? What could be improved?"
                className="bg-white border-0 focus:ring-0 shadow-none min-h-[160px] text-base p-4 resize-y"
              />
              <div className="bg-gray-50 py-2 px-4 flex justify-between items-center border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {comment.length} characters
                </p>
                <p className="text-xs text-gray-500">
                  {comment.length < 10 ? `At least ${10 - comment.length} more characters needed` : 'Looking good!'}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700 flex items-start space-x-3">
              <ThumbsUp className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Pro tip</p>
                <p className="mt-1">
                  The most helpful reviews include specific examples and balanced feedback about both strengths and areas for improvement.
                </p>
              </div>
            </div>

            {errors.comment && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-500 mt-1 flex items-center"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {errors.comment}
              </motion.p>
            )}
          </div>

          {/* Submit Button Section */}
          <div className="p-6 bg-gray-50 flex justify-end">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className={cn(
                  "relative overflow-hidden text-white font-medium py-3 px-8 h-auto text-sm rounded-lg shadow-lg transition-all duration-300",
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>{isEditing ? "Updating..." : "Submitting..."}</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">{isEditing ? "Update Review" : "Submit Review"}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-lg">
                      <span className="absolute left-0 aspect-square w-12 bg-white/20 blur-[2px] transform -translate-x-full skew-x-[45deg] animate-shimmer"></span>
                    </span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
