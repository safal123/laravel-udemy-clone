import { Course } from '@/types'
import { router } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export const useWishlist = () => {
    const addToWishlist = (course: Course) => {
      router.post(route('wishlists.store'), {course_id: course.id}, {
        preserveScroll: true,
        onStart: () => {
          toast.info('Adding to wishlist. Please wait...')
        },
        onSuccess: () => {
          toast.success('Course added to wishlist')
        },
        onError: (errors) => {
          toast.error(errors.error || 'An error occurred')
        }
      })
    };

    const removeFromWishlist = (course: Course) => {
      router.delete(route('wishlists.destroy', course.id), {
        preserveScroll: true,
        onStart: () => {
          toast.info('Removing from wishlist. Please wait...')
        },
        onSuccess: () => {
          toast.success('Course removed from wishlist')
        },
        onError: (errors) => {
          toast.error(errors.error || 'An error occurred')
        }
      })
    }

    return {
        addToWishlist,
        removeFromWishlist
    };
}
