//@ts-nocheck
import { Config } from 'ziggy-js';

export interface User {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  owner: string;
  photo: string;
  deleted_at: string;
  email_verified_at: string;
  courses: Course[];
  purchased_courses: Course[];
  wishlists: Wishlist[];
  image_url: string,
  role: string,
  is_teacher: boolean,
  is_admin: boolean,
}


export interface Course {
  image_storage_id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number | null;
  is_published: boolean;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
  category_id: string;
  image_url: string;
  preview_video_id?: string | null;
  chapters: Chapter[];
  chapters_count: number;
  duration: number;
  duration_minutes?: number | null;
  author: User;
  user_id: string;
  rating: number;
  average_rating?: number | null;
  students: User[];
  is_enrolled: boolean;
  students_count: number;
  is_author: boolean;
  is_purchased: boolean;
  is_wishlisted: boolean;
  reviews?: CourseReview[];
  has_reviewed: boolean;
  user_progress: UserProgress[]
  reviews_count: number;
  level: string;
  language?: string;
  category: string;
  requirements?: string;
  target_audience?: string;
  what_you_will_learn?: string;
  tags?: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
  course: Course;
}

export interface UserProgress {
  id: string;
  user_id: string;
  chapter_id: string;
  completed_at: string;
  created_at: string;
  course_id: string;
  progress_percentage: number
}

export interface Chapter {
  id: string;
  title: string;
  video_storage_id: string;
  description: string;
  order: number;
  course_id: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  is_free: boolean;
  video_url: string;
  course: Course;
  is_completed: boolean;
  next_chapter_id: string;
  previous_chapter_id: string;
  progress: UserProgress[]
  media: Media[]
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  title: string;
  comment: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}



export type PaginatedData<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
    courses: Course[];
  };
  flash: {
    success: string | null;
    error: string | null;
  };
  ziggy: Config & { location: string };
};

export interface CourseReview {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  title: string;
  comment: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
    profile_photo_url?: string;
  };
}
