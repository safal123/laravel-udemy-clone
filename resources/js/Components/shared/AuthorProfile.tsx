import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Link } from "@inertiajs/react"
import { Globe, Twitter, Linkedin, Github, Youtube, MapPin, BookOpen, Users, Star, Award, Briefcase, Clock, GraduationCap, Calendar } from "lucide-react"

interface SocialLink {
  platform: 'website' | 'twitter' | 'linkedin' | 'github' | 'youtube';
  url: string;
}

interface AuthorStats {
  courses?: number;
  students?: number;
  rating?: number;
  reviews?: number;
  yearsTeaching?: number;
}

interface Achievement {
  icon: 'award' | 'star' | 'users' | 'book';
  label: string;
  color?: string;
}

interface AuthorProfileProps {
  author: {
    id: string;
    name: string;
    role?: string;
    avatar?: string;
    bio?: string;
    joinDate?: string;
    location?: string;
    socialLinks?: SocialLink[];
    stats?: AuthorStats;
    verified?: boolean;
    featured?: boolean;
    achievements?: Achievement[];
    specialties?: string[];
  };
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export default function AuthorProfile({
  author,
  variant = 'default',
  className = ''
}: AuthorProfileProps) {
  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  // Helper function to render social media icons with links
  const renderSocialLinks = () => {
    if (!author.socialLinks?.length) return null;

    return (
      <div className="flex space-x-2 mt-3">
        {author.socialLinks.map((link, index) => {
          let Icon;
          switch (link.platform) {
            case 'website': Icon = Globe; break;
            case 'twitter': Icon = Twitter; break;
            case 'linkedin': Icon = Linkedin; break;
            case 'github': Icon = Github; break;
            case 'youtube': Icon = Youtube; break;
            default: Icon = Globe;
          }

          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 hover:scale-110 hover:shadow-sm"
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    );
  }

  // Helper function to render author stats
  const renderStats = () => {
    if (!author.stats) return null;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
        {author.stats.courses !== undefined && (
          <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-lg font-semibold text-gray-800">{author.stats.courses.toLocaleString()}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Courses
            </div>
          </div>
        )}

        {author.stats.students !== undefined && (
          <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-lg font-semibold text-gray-800">{author.stats.students.toLocaleString()}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" /> Students
            </div>
          </div>
        )}

        {author.stats.rating !== undefined && (
          <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-lg font-semibold text-gray-800">{author.stats.rating}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Rating
            </div>
          </div>
        )}

        {author.stats.yearsTeaching !== undefined && (
          <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-lg font-semibold text-gray-800">{author.stats.yearsTeaching}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Years
            </div>
          </div>
        )}

        {author.stats.reviews !== undefined && (
          <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-lg font-semibold text-gray-800">{author.stats.reviews.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Reviews</div>
          </div>
        )}
      </div>
    );
  }

  // Helper function to render author achievements
  const renderAchievements = () => {
    if (!author.achievements?.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {author.achievements.map((achievement, index) => {
          let Icon;
          let bgColor = achievement.color || 'bg-blue-50';
          let textColor = achievement.color ? achievement.color.replace('bg-', 'text-') : 'text-blue-700';
          let borderColor = achievement.color ? achievement.color.replace('bg-', 'border-') : 'border-blue-200';

          switch (achievement.icon) {
            case 'award': Icon = Award; break;
            case 'star': Icon = Star; break;
            case 'users': Icon = Users; break;
            case 'book': Icon = BookOpen; break;
            default: Icon = Award;
          }

          return (
            <Badge
              key={index}
              className={`${bgColor} ${textColor} border ${borderColor} py-1 px-2 gap-1 h-auto font-normal`}
            >
              <Icon className="w-3 h-3" />
              {achievement.label}
            </Badge>
          );
        })}
      </div>
    );
  }

  // Helper function to render specialties
  const renderSpecialties = () => {
    if (!author.specialties?.length) return null;

    return (
      <div className="mt-3">
        <div className="text-sm text-gray-700 font-medium mb-2 flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" /> Specializes in:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {author.specialties.map((specialty, index) => (
            <Badge variant="outline" key={index} className="bg-gray-50/50">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  // Helper function to render quick bio info
  const renderQuickBio = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
        {author.stats?.courses && (
          <div className="flex items-center gap-2 text-gray-700">
            <GraduationCap className="w-4 h-4 text-primary/70" />
            <span>Created <strong>{author.stats.courses}</strong> {author.stats.courses === 1 ? 'course' : 'courses'}</span>
          </div>
        )}
        {author.stats?.students && (
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-4 h-4 text-primary/70" />
            <span>Taught <strong>{author.stats.students.toLocaleString()}</strong> students</span>
          </div>
        )}
        {author.joinDate && (
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-primary/70" />
            <span>Teaching since <strong>{author.joinDate}</strong></span>
          </div>
        )}
        {author.stats?.rating && (
          <div className="flex items-center gap-2 text-gray-700">
            <Star className="w-4 h-4 text-yellow-500" />
            <span><strong>{author.stats.rating}</strong> instructor rating</span>
          </div>
        )}
      </div>
    );
  }

  // Different variants
  if (variant === 'compact') {
    return (
      <Card className={`shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(author.name)}</AvatarFallback>
              </Avatar>
              {author.verified && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{author.name}</h3>
              {author.role && <p className="text-xs text-gray-500">{author.role}</p>}
              {author.stats?.courses && (
                <p className="text-xs text-gray-500 mt-1">{author.stats.courses} {author.stats.courses === 1 ? 'course' : 'courses'} created</p>
              )}
            </div>
            <Link
              href={`/instructors/${author.id}`}
              className="ml-auto text-primary hover:text-primary/90 text-sm font-medium"
            >
              View Profile
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'featured') {
    return (
      <Card className={`shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
        <div className="h-20 bg-gradient-to-r from-primary/70 via-primary to-primary/80 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIj48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLThoLTJ2LTRoMnY0em0wLThoLTJWMTRoMnY0em0wLThoLTJWNmgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        </div>
        <div className="px-5 pb-5 -mt-10">
          <div className="relative inline-block">
            <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="bg-primary text-white text-lg">{getInitials(author.name)}</AvatarFallback>
            </Avatar>
            {author.verified && (
              <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-900">{author.name}</h3>
              </div>
              {author.featured && (
                <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                  Featured
                </Badge>
              )}
            </div>
            {author.role && <p className="text-sm text-gray-600 mt-0.5">{author.role}</p>}

            {author.location && (
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                <span>{author.location}</span>
              </div>
            )}

            {renderQuickBio()}
            {renderAchievements()}
            {renderSpecialties()}
            {author.bio && <p className="mt-3 text-gray-600 text-sm">{author.bio}</p>}

            {renderSocialLinks()}
            {renderStats()}

            <div className="mt-4">
              <Link href={`/instructors/${author.id}`}>
                <Button className="w-full group">
                  <span>View Full Profile</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={`shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      <CardHeader className="border-b pb-4 bg-gray-50/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Instructor</CardTitle>
          {author.featured && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              Featured Instructor
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border border-gray-200 ring-2 ring-primary/5 ring-offset-2">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">{getInitials(author.name)}</AvatarFallback>
            </Avatar>
            {author.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{author.name}</h3>
            </div>

            {author.role && <p className="text-gray-600 mt-0.5">{author.role}</p>}

            {author.location && (
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                <span>{author.location}</span>
              </div>
            )}

            {renderQuickBio()}
            {renderAchievements()}
            {author.bio && <p className="mt-3 text-gray-600">{author.bio}</p>}

            {renderSocialLinks()}
            {renderSpecialties()}
          </div>
        </div>

        {renderStats()}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link href={`/instructors/${author.id}`}>
            <Button className="w-full sm:w-auto group">
              <span>View Full Profile</span>
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
