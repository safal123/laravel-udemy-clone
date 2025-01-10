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
}


export interface Course {
  image_storage_id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  category_id: string;
  image_url: string;
  chapters: Chapter[];
  chapters_count: number;
  duration: number;
  author: User;
  user_id: string;
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
