import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface WelcomeCardProps {
  userName: string;
  activeCourses: number;
  completedCourses: number;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName,
  activeCourses,
  completedCourses
}) => {
  return (
    <Card className="lg:col-span-2 overflow-hidden border-none relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/images/dots-pattern.png')] opacity-5"></div>
      <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Welcome back, {userName}!</h2>
            <p className="text-sm sm:text-base text-indigo-100 mt-1">Continue your learning journey where you left off.</p>

            <div className="hidden sm:flex mt-4 space-x-1">
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                {activeCourses} Active Courses
              </Badge>
              {completedCourses > 0 && (
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                  {completedCourses} Completed
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-indigo-700" asChild>
              <Link href={route('courses.index')}>
                Browse All Courses
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link href={route('dashboard')}>
                My Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
