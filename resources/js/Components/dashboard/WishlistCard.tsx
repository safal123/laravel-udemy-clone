import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Award } from 'lucide-react';

interface WishlistItem {
  id: string;
  course: {
    id: string;
    slug: string;
    title: string;
    image_url: string;
    level: string;
    price: number;
  };
}

interface WishlistCardProps {
  wishlistItems: WishlistItem[];
  onRemove: (wishlist: WishlistItem) => void;
  emptyStateComponent: React.ReactNode;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  wishlistItems,
  onRemove,
  emptyStateComponent
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">My Wishlist</h2>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlistItems.map((wishlist) => (
            <Card key={wishlist.id} className="border overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <Link href={route('courses.show', wishlist.course.slug)}>
                  <div className="relative aspect-video">
                    <img
                      src={wishlist.course.image_url}
                      alt={wishlist.course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50"></div>
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <Link href={route('courses.show', wishlist.course.slug)}>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 hover:text-indigo-600 transition-colors">
                    {wishlist.course.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <div className="flex items-center">
                    <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 mr-1 sm:mr-1.5" />
                    <span className="text-xs sm:text-sm text-gray-600">{wishlist.course.level} Level</span>
                  </div>
                  <p className="font-bold text-sm sm:text-base text-gray-900">${wishlist.course.price}</p>
                </div>
              </CardContent>
              <CardFooter className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 px-2 sm:h-9 sm:px-3"
                  onClick={() => onRemove(wishlist)}
                >
                  Remove
                </Button>
                <Button size="sm" className="text-xs h-8 px-2 sm:h-9 sm:px-3" asChild>
                  <Link href={route('courses.show', wishlist.course.slug)}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        emptyStateComponent
      )}
    </div>
  );
};

export default WishlistCard;
