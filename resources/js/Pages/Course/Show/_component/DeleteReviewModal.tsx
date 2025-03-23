import { useState } from "react";
import { Course, Review } from "@/types";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { AlertTriangle, Loader2, Trash2, X, Edit, PencilLine } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";

interface DeleteReviewModalProps {
  isOpen: boolean;
  course: Course;
  review?: Review;
  onClose: () => void;
  onEdit?: () => void;
}

export default function DeleteReviewModal({ isOpen, course, review, onClose, onEdit }: DeleteReviewModalProps) {
  const { delete: destroy, processing, reset } = useForm();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!review) return;

    destroy(route('courses.reviews.destroy', [course.id, review.id]), {
      preserveScroll: true,
      onSuccess: () => onClose(),
      onFinish: () => reset()
    });
  };

  const handleEdit = () => {
    onClose();
    if (onEdit) onEdit();
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
    >
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleDelete}
        className="overflow-hidden rounded-lg shadow-lg"
      >
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-red-50 to-white dark:from-gray-800 dark:to-gray-900 px-7 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 shadow-sm"
            >
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Review</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">This action cannot be undone</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-7 py-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <div className="space-y-5">
            <div>
              <p className="text-base leading-relaxed">
                Are you sure you want to delete your review for:
              </p>
              <div className="mt-2 p-3 rounded-md bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white text-lg">{course.title}</p>
              </div>
            </div>

            {/* Enhanced Edit Option Information - only show if onEdit is available */}
            {onEdit && (
              <div className="p-5 border border-blue-100 dark:border-blue-800/30 rounded-md bg-blue-50 dark:bg-blue-900/10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <PencilLine className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                      Consider editing instead of deleting
                    </h3>
                    <p className="mt-1 text-sm text-blue-600/90 dark:text-blue-300/90">
                      Editing allows you to:
                    </p>
                  </div>
                </div>

                <ul className="mt-3 ml-8 space-y-1.5 list-disc text-sm text-blue-700 dark:text-blue-300">
                  <li>Update your rating if your opinion has changed</li>
                  <li>Clarify or correct information in your review</li>
                  <li>Add more details based on your experience</li>
                  <li>Keep your contribution to help other students</li>
                </ul>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="mt-4 flex items-center gap-1.5 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 dark:border-blue-900 dark:hover:border-blue-800 bg-white/80 dark:bg-gray-800/60"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit Review</span>
                </Button>
              </div>
            )}

            {/* Review Content Section */}
            {review && (
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800/80">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-md">Your Current Review</h3>
                </div>

                <div className="space-y-2">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Title</h4>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{review.title || "No title"}</p>
                  </div>

                  {review.comment && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Review</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  )}

                  {review.rating && (
                    <div className="mt-3">
                      <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Rating</h4>
                      <div className="flex">
                        <span className="flex text-amber-500">
                          {Array(5).fill(0).map((_, i) => (
                            <span key={i} className={i < (review.rating || 0) ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}>
                              ★
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Added note about when review was created */}
                {review.created_at && (
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Review posted on {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-start p-4 border border-red-100 dark:border-red-900/30 rounded-md bg-red-50 dark:bg-red-900/10">
              <div className="flex-shrink-0 mr-3">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                  Warning: Permanent deletion
                </p>
                <p className="mt-1 text-sm text-red-600/80 dark:text-red-300/80">
                  Your review and rating will be permanently removed from this course.
                  This will also remove your contribution from the course's overall rating.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-5 py-2.5 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
          >
            Cancel
          </Button>

          {/* Edit button in footer if onEdit is available */}
          {onEdit && (
            <Button
              type="button"
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white px-5 py-2.5 flex items-center transition-all duration-200 font-medium"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Instead
            </Button>
          )}

          <Button
            type="submit"
            disabled={processing}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white px-5 py-2.5 flex items-center transition-all duration-200 font-medium shadow-sm hover:shadow"
          >
            {processing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete Review
          </Button>
        </div>
      </motion.form>
    </Modal>
  );
}
