import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog";
import { Course, Review } from "@/types";
import CourseReviewForm from "./CourseReviewForm";
import Modal from "@/Components/Modal";

interface EditReviewModalProps {
  isOpen: boolean;
  course: Course;
  review?: Review;
  onClose: () => void;
}

export default function EditReviewModal({ isOpen, course, review, onClose }: EditReviewModalProps) {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      closeIcon
    >
      <CourseReviewForm
        course={course}
        hasReviewed={true}
        review={review}
      />
    </Modal>
  );
}
