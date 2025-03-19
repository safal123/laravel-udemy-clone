import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { Course } from "@/types";
import { MessageCircle, PenLine, Star, ThumbsUp } from "lucide-react";
import { FormEvent, useState } from "react";
import { router } from "@inertiajs/react";

interface CourseReviewFormProps {
  course: Course;
  hasReviewed: boolean;
}

export default function CourseReviewForm({ course, hasReviewed }: CourseReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Submit review
    router.post(route('courses.submitReview', course.id), {
      rating: selectedRating,
      title,
      comment
    }, {
      onSuccess: () => {
        // Reset form
        setSelectedRating(0);
        setTitle("");
        setComment("");
        setIsSubmitting(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setIsSubmitting(false);
      }
    });
  }

  if (hasReviewed) {
    return (
      <Card className="border-0 shadow-md mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-6 border-b border-amber-100">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 rounded-full p-2 text-amber-600">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  We appreciate your feedback!  
                </h3>
                <p className="text-sm text-gray-600 mt-1">Thank you for sharing your feedback with the community!</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.get(route('courses.editReview', course.id))}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 gap-2 font-medium"
            >
              <PenLine className="h-4 w-4" />
              Edit Review
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md mb-8 overflow-hidden">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <MessageCircle className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Share Your Experience
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="space-y-3 bg-gray-50 px-5 py-4 rounded-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-800">How would you rate this course?</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
                  onClick={() => setSelectedRating(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={cn(
                      "w-9 h-9 transition-all duration-300",
                      (rating <= (hoveredRating || selectedRating))
                        ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                        : "text-gray-300"
                    )}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                {selectedRating > 0
                  ? selectedRating === 5
                    ? "Outstanding!"
                    : selectedRating >= 4
                      ? "Excellent!"
                      : selectedRating >= 3
                        ? "Good"
                        : selectedRating >= 2
                          ? "Fair"
                          : "Poor"
                  : "Select a rating"}
              </span>
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {errors.rating}
              </p>
            )}
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-800">Review Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience in a few words"
              className="bg-white border-gray-200 focus:border-blue-500 shadow-sm text-base"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-800">Your Review</label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this course. What did you like? What could be improved?"
              className="bg-white border-gray-200 focus:border-blue-500 shadow-sm min-h-[120px] text-base"
            />
            <p className="text-xs text-gray-500 italic">
              Your honest review will help other students make informed decisions and help instructors improve their content.
            </p>
            {errors.comment && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {errors.comment}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 h-auto text-sm font-medium shadow-sm transition-all duration-200 hover:shadow rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Submitting...
                </>
              ) : "Submit Your Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
