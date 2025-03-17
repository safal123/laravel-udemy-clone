import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Star, ThumbsUp, Calendar, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/Components/ui/button"

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Web Developer',
    comment: 'This platform helped me master React in just 3 months! The content was clear, concise, and exactly what I needed to level up my skills. I particularly enjoyed the practical projects that reinforced the concepts.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    verified: true,
    date: new Date(2023, 11, 5),
    helpful: 24
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Data Scientist',
    comment: 'The courses are well-structured and easy to follow. Great for beginners! I had tried several other platforms before finding this one, and this was by far the most comprehensive.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    verified: true,
    date: new Date(2023, 10, 15),
    helpful: 18
  },
  {
    id: 3,
    name: 'Alice Johnson',
    role: 'UI/UX Designer',
    comment: 'I loved the design courses. They are practical and up-to-date with current industry standards. The instructor was engaging and the material was presented in a way that was easy to understand and apply.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    verified: false,
    date: new Date(2023, 9, 28),
    helpful: 31
  },
]

export default function CourseReview() {
  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
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

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
            Student Reviews
          </CardTitle>
          <div className="flex items-center gap-1">
            <div className="flex">
              {renderStars(4.7)}
            </div>
            <span className="text-gray-800 font-medium ml-2">4.7</span>
            <span className="text-gray-500 text-sm">({testimonials.length} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {testimonials?.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4">
                {/* Review header with user info and rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-gray-200">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitials(review.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{review.name}</h3>
                        {review.verified && (
                          <Badge variant="secondary" className="py-0 px-1.5 h-5 bg-green-50 text-green-700 border border-green-200 text-[10px] font-normal">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDistanceToNow(review.date, { addSuffix: true })}
                    </span>
                  </div>
                </div>

                {/* Review content */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {review.comment}
                </p>

                {/* Review footer with helpful count */}
                <div className="flex items-center justify-end mt-1">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{review.helpful} people found this helpful</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 flex flex-col items-center border-t border-gray-100 pt-6">
            <Button>
              <span>Load more</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
